pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/medhammadi/perfectionnement-stage.git', credentialsId: 'med-github'

            }
        }

        stage('TRIVY FS SCAN') {
            steps {
                sh 'trivy fs .'
            }
        }
    }
}
