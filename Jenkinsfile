pipeline {

    agent any

    stages {

        stage('Clone Repository') {
            steps {
                echo 'Code cloned from GitHub'
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }

        stage('Install Playwright Browsers') {
            steps {
                bat 'npx playwright install'
            }
        }

        stage('Run Playwright Tests') {
            steps {
                bat 'npx playwright test'
            }
        }
    }

    post {

        always {
            echo 'Execution Completed'
        }

        success {
            echo 'Tests Passed Successfully'
        }

        failure {
            echo 'Tests Failed'
        }
    }
}