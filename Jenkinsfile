pipeline {
    agent { docker { image 'mcr.microsoft.com/playwright:v1.57.0-noble' } }
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
                '
            '''
        }
    }

        stage('Run Playwright Tests') {
            steps {
                sh '''
                    bash -lc "npm ci && npx playwright test"
                '''
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
