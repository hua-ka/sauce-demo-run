pipeline {
    agent { 
        docker { 
            image 'mcr.microsoft.com/playwright:v1.57.0-jammy'
            args '--ipc=host' 
        } 
    }
    options { timestamps() }
    tools {
        nodejs 'Node_20' 
    }

    stages {
        stage('Checkout source code') { steps { checkout scm } }

        stage('Install playwright') {
            steps {
                sh '''
                    npm i -D @playwright/test
                    npx playwright install
                '''
            }
        }

        stage('Verify Environment (inside Playwright image)') {
            steps {
                sh '''
                    echo "Node:" && node -v && which node
                    echo "npm:"  && npm -v  && which npm
                    echo "Playwright:" && npx playwright --version
                '''
            }
        }

        stage('Run Playwright Tests') {
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
