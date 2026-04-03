pipeline {
    agent any

    environment {
        IMAGE = "portfolio-app:${BUILD_NUMBER}"
    }

    stages {

        stage('Build Docker Image') {
            steps {
                sh 'docker build --no-cache -t $IMAGE .'
            }
        }

        stage('Stop Old Container') {
            steps {
                sh 'docker rm -f portfolio-container || true'
            }
        }

        stage('Run Container') {
            steps {
                sh '''
                docker run -d -p 80:80 \
                --name portfolio-container \
                --restart always \
                $IMAGE
                '''
            }
        }

        stage('Clean Old Images') {
            steps {
                sh 'docker image prune -f'
            }
        }
    }
}
