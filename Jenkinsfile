pipeline {
    
    agent {
        docker {
            image 'mcr.microsoft.com/playwright:v1.57.0-noble'
            args '--ipc=host'
            label 'docker-agent'
        }
    }

    options { timestamps() }
    
    tools {
        nodejs 'Node_20' 
    }

    stages {

        stage('Clean workspace') { steps { cleanWs() } }

        stage('Checkout source code') { steps { checkout scm } }

        stage('Verify Environment (inside Playwright image)') {
            steps {
                sh '''
                    echo "Node:" && node -v && which node
                    echo "npm:"  && npm -v  && which npm
                    echo "Playwright:" && npx playwright --version
                '''
            }
        }

        stage('Install Dependencies') {
            steps {
                sh '''
                    set -eux
                    if [ -f package-lock.json ]; then
                        npm ci
                    else
                        npm install
                    fi
                '''
            }
        }

        stage('Run Playwright Tests') {
            steps {
                sh 'npx playwright test'
                // sh 'npx playwright test --project=chromium'
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
