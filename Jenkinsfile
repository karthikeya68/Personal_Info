pipeline {
    agent any

    environment {
        IMAGE = "portfolio-app:${BUILD_NUMBER}"
    }

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/karthikeya68/Personal_Info.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t $IMAGE .'
            }
        }

        stage('Remove Old Container') {
            steps {
                sh 'docker rm -f portfolio-container || true'
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                docker run -d \
                --name portfolio-container \
                --restart always \
                -p 80:80 \
                $IMAGE
                '''
            }
        }
    }
}
