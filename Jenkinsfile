pipeline {
    agent {
        docker {
            image 'mcr.microsoft.com/playwright:v1.50.0-jammy'
            args '--ipc=host'
        }
    }

    options { timestamps() }

    tools {
        nodejs 'Node_20' 
    }

    stages {
        stage('Clean workspace (Start)') {
            steps { 
                cleanWs() 
            }
        }
        
        stage('Checkout source code') {
            steps { 
                echo 'Checking out the code from the repository'
                checkout scm 
            }
        }

        stage('Verify Environment') {
            steps {
                echo 'Checking Node.js path and version'
                sh 'which node && node -v'
                echo 'Checking npm path and version'
                sh 'which npm && npm -v'
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Clean and install dependencies'
                sh 'npm ci'
            }
        }

        stage('Install Playwright Browsers') {
            steps {
                sh 'npx playwright install'
            }
        }

        stage('Run Tests') {
            steps {
                sh 'npx playwright test'
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
            archiveArtifacts artifacts: 'test-results/**', allowEmptyArchive: true
            cleanWs()
        }
    }
}
