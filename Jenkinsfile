pipeline {
  agent any

  tools {
    nodejs "Nodejs"
  }

  environment {
    APP_NAME = 'frontend'
    //IMAGE_NAME = 'frontend-image' // Replace with your Docker Hub username or appropriate image name
    GITHUB_REPO='https://github.com/saiful-anuar/frontend-uat'
    DOCKER_ID = credentials('docker_id') // Jenkins credentials for Docker Hub username
    //DOCKER_PASSWORD = credentials('dockerhub-password') // Jenkins credentials for Docker Hub password
    DOCKER_IMAGE = 'sflnr/frontend-uat2'            // Docker Hub image name
    IMAGE_TAG = 'latest'                                 // Image tag
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
        // Install the dependencies
        echo "installing dependencies..."
        sh "npm install"
        sh "npm i -g @angular/cli"
      }
    }
    stage('TEST') {
      steps {
        echo "running test..."
        //sh 'npm test --watch=false'  //failed at headless chrome
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
          sh 'docker build -t ${DOCKER_IMAGE}:${IMAGE_TAG} .'
          //sh 'docker build -t ${IMAGE_NAME} .'
        }
      }
    }
    stage('Login to Docker Hub') {
        steps {
            script {
                // Log in to Docker Hub using docker login
                sh """
                echo "${DOCKER_PASSWORD}" | docker login -u "${DOCKER_USERNAME}" --password-stdin
                """
            }
        } 
    }  
    stage('Push to Docker Repo') {
        steps {
	  withCredentials([usernamePassword(credentialsId: "${DOCKER_ID}", passwordVariable: 'dockerPassword', usernameVariable: 'dockerUser')]) {
          sh "docker login -u ${env.dockerUser} -p ${env.dockerPassword}"
          sh "docker push ${DOCKER_IMAGE}:${IMAGE_TAG}"
          }
           /* script {
                // Push the Docker image
                sh "docker push ${DOCKER_IMAGE}:${IMAGE_TAG}"
            }*/
        }
    }
   /* stage("DEPLOY & ACTIVATE") {
      steps {
        /*echo 'Starting deployment and activation...'
        sh '''
        if [ "$(docker ps -q -f name=${APP_NAME})" ]; then
            echo "Stopping existing container ${APP_NAME}..."
            docker stop ${APP_NAME}
            echo "Removing existing container ${APP_NAME}..."
            docker rm ${APP_NAME}
        fi
        '''*/
        // Above doesnt seem to be working, need to check
/*
        script {
          // Check if the container is created
          def containerId = sh(script: "docker ps -a -q -f name=${APP_NAME}", returnStdout: true).trim()

          if (containerId) {
            echo "Stopping existing container ${APP_NAME}..."
            sh "docker stop ${APP_NAME}"

            echo "Removing existing container ${APP_NAME}..."
            sh "docker rm ${APP_NAME}"
          } else {
            echo "No existing container named ${APP_NAME} found."
          }
        }

        // Run the new container
        echo "Deploying new container ${APP_NAME}..."
        sh 'docker run --restart always -d --name ${APP_NAME} -p 4202:4200 ${IMAGE_NAME}'
      }
    }*/
    stage("Kubernetes Deploy"){
      steps{
        script {
          // Deploy to Kubernetes using kubectl. Host system must have minikube installed
          sh 'minikube start'
          sh 'kubectl apply -f kubernetes/k8s.yml'
          sh 'kubectl apply -f kubernetes/k8s-svc.yml'
        }
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
