pipeline {
  agent { label 'docker-agent' }
  options { timestamps() }

  environment {
    PW_IMAGE = 'mcr.microsoft.com/playwright:v1.57.0-jammy'
  }

  stages {
    stage('Clean workspace') {
      steps { cleanWs() }
    }

    stage('Checkout source code') {
      steps { checkout scm }
    }

    stage('Verify Environment (inside Playwright image)') {
      steps {
        // ✅ DEBUG: confirm Jenkins env var is set correctly
        sh 'echo "PW_IMAGE=${PW_IMAGE}"'

        sh '''
          docker run --rm --ipc=host \
            -v "$WORKSPACE:/work" -w /work \
            ${PW_IMAGE} \
            bash -lc '
              set -e
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
          docker run --rm --ipc=host \
            -v "$WORKSPACE:/work" -w /work \
            ${PW_IMAGE} \
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
