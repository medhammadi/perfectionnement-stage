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
                script {
                    sh 'docker run --rm -v $WORKSPACE:/root/. aquasec/trivy fs .'
                }
            }
        }
    }
}
