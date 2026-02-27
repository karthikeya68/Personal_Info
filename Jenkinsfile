pipeline {
    agent any

    stages {

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t portfolio-app .'
            }
        }

        stage('Stop Old Container') {
            steps {
                sh 'docker rm -f portfolio-container || true'
            }
        }

        stage('Run Container') {
            steps {
                sh 'docker run -d -p 80:80 --name portfolio-container portfolio-app'
            }
        }
    }
}
