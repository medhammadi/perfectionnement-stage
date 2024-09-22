pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/medhammadi/perfectionnement-stage.git'
            }
        }

        stage('TRIVY FS SCAN') {
            steps {
                sh '/snap/bin/trivy fs .'
            }
        }
    }
}
