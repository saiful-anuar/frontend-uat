pipeline {
  agent any
  /*agent {
        docker {
            image 'node:latest'  // Use the Node.js image for the pipeline
            args '-v jenkins_home:/var/lib/docker/volumes/jenkins_home/_data'
        }
    }*/

  tools {
    nodejs "Nodejs"
  }

  environment {
    APP_NAME = 'frontend'
    IMAGE_NAME = 'frontend-image' // Replace with your Docker Hub username or appropriate image name
    GITHUB_REPO='https://github.com/saiful-anuar/frontend-uat'
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
        sh "npm cache clean --force"
        //sh "npm init -y"
        //sh "pwd & hostname"
        //sh "ls -lart /home"
        //sh "ls -la"
        //sh "ls -la /"
        sh "npm install"
        //sh "apt install npm"
        //sh "npm init -y"
        //sh "npm install @angular/forms @angular/router @angular/common"
        //need to add for chrome?
      }
    }
    stage('TEST') {
      steps {
        echo "running test..."
        //sh 'npm test --watch=false'
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
        echo 'Starting deployment and activation...'
        sh '''
        if [ "$(docker ps -q -f name=${APP_NAME})" ]; then
            echo "Stopping existing container ${APP_NAME}..."
            docker stop ${APP_NAME}
            echo "Removing existing container ${APP_NAME}..."
            docker rm ${APP_NAME}
        fi
        '''

        // Run the new container
        echo "Deploying new container ${APP_NAME}..."
        sh 'docker run -d --name ${APP_NAME} -p 4242:4200 ${IMAGE_NAME}'
      }
    }
  }

  post {
        always {
            // Clean up workspace after build
           // cleanWs()
            echo 'dummy'
        }
        success {
            echo 'Build, Test, and Deployment completed successfully.'
        }
        failure {
            echo 'Build or Deployment failed.'
            cleanWs()
        }
    }
}
