pipeline {
    agent any

    environment {
        APP_DIR = '/home/ec2-user/salon_management'
    }

    stages {
        stage('Checkout') {
            steps {
                git url: 'https://github.com/pratik-parascout/salon_management.git', branch: 'main'
            }
        }
        stage('Install Dependencies') {
            steps {
                dir("${APP_DIR}") {
                    sh 'npm install'
                }
            }
        }
        stage('Test') {
            steps {
                dir("${APP_DIR}") {
                    echo 'Tests skipped (uncomment npm test if available)'
                }
            }
        }
        stage('Deploy') {
            steps {
                dir("${APP_DIR}") {
                    sh 'git pull origin main'
                    sh 'pm2 restart 0'
                }
            }
        }
    }
    post {
        success {
            echo 'Deployment successful!'
        }
        failure {
            echo 'Deployment failed.'
        }
    }
}
