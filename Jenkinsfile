pipeline {
    agent any

    stages {
        stage('Load Env Variables') {
            steps {
                configFileProvider([configFile(fileId: 'my-env', variable: 'MY_ENV_FILE')]) {
                    script {
                        def envContent = readFile(MY_ENV_FILE)
                        def envVars = envContent.split("\n").findAll { line ->
                            line.trim() && !line.trim().startsWith('#')
                        }
                        echo "Loaded env variables: ${envVars}"
                        
                        withEnv(envVars) {
                            echo "Value of VAR1: ${env.VAR1}"
                        }
                    }
                }
            }
        }
        stage('Checkout') {
            steps {
                git url: 'https://github.com/pratik-parascout/salon_management.git', branch: 'main'
            }
        }
        stage('Install Dependencies') {
            steps {
                dir("${WORKSPACE}") {
                    sh 'npm install'
                }
            }
        }
        stage('Deploy') {
            steps {
                dir("${WORKSPACE}") {
                    sh 'git pull origin main'
                    sh 'pm2 restart 0 || pm2 start server'
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
