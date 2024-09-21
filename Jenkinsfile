pipeline {
  agent {
        docker {
            image 'node:latest'  // Use the Node.js image for the pipeline
            args '-v jenkins_home:/var/lib/docker/volumes/jenkins_home/_data'
        }
    }

  tools {nodejs "Node.js"}

  environment {
    APP_NAME = 'frontend'
    IMAGE_NAME = 'root.ccsd.com/${APP_NAME}' // Replace with your Docker Hub username or appropriate image name
    GITHUB_REPO=https://github.com/zsAdiba/frontend
  }

  stages {

    stage('Clone Repository') {
      steps {
        // Clone the Git repository from the remote URL
        git branch: 'main', url: "${GITHUB_REPO}"
      }
    }


    stage('INSTALL PACKAGES') {
      steps {
        echo "installing dependencies..."
        sh "npm install"
        //need to add for chrome?
      }
    }
    stage('TEST') {
      steps {
        echo "running test..."
        sh 'npm test'
      }
    }
    stage('BUILD APP') {
      steps {
        echo "building app..."
        sh 'ng build --configuration production'
      }
    }
    stage("BUILD DOCKER") {
      steps {
        script {
          sh 'docker build -t ${IMAGE_NAME} .'
        }
      }
    }
    stage("DEPLOY & ACTIVATE") {
      steps {
        echo 'this part will differ depending on setup'
        sh '''
        if [ "$(docker ps -q -f name=${APP_NAME})" ]; then
            echo "Stopping existing container ${APP_NAME}..."
            docker stop ${APP_NAME}
            echo "Removing existing container ${APP_NAME}..."
            docker rm ${APP_NAME}
        fi

        // Run the new container
        echo "Deploying new container ${APP_NAME}..."
        docker run -d --name ${APP_NAME} -p 4242:4200 ${IMAGE_NAME}
        '''
      }
    }
  }

  post {
        always {
            // Clean up workspace after build
            cleanWs()
        }
        success {
            echo 'Build, Test, and Deployment completed successfully.'
        }
        failure {
            echo 'Build or Deployment failed.'
        }
    }
}
