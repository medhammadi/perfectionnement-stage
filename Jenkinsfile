pipeline {
    agent any

    stages {
       stage('Test Docker') {
            steps {
                script {
                    sh 'docker ps'
                }
            }
        }
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/medhammadi/perfectionnement-stage.git'
            }
        }
        stage('Build Backend image') {
            steps {
                script {
                    // Construction de l'image backend
                    docker.build("medhammadi/backend:latest", "-f ./backend/Dockerfile .")
                }
            }
        }

        stage('Push Backend image to Docker Hub') {
            steps {
                script {
                    docker.withRegistry('https://registry.hub.docker.com', 'credential-med-dockerHub') {
                        // Pousser l'image backend
                        docker.image("medhammadi/backend:latest").push()
                    }
                }
            }
        }

        stage('Build Front image') {
            steps {
                script {
                    // Construction de l'image front
                    docker.build("medhammadi/frontEnd:latest", "-f ./frontEnd/Dockerfile .")
                }
            }
        }

        stage('Push Front image to Docker Hub') {
            steps {
                script {
                    docker.withRegistry('https://registry.hub.docker.com', 'credential-med-dockerHub') {
                        // Pousser l'image front
                        docker.image("medhammadi/frontEnd:latest").push()
                    }
                }
            }
        }

        stage('Deploy Application with Docker Compose') {
            steps {
                script {
                    // Déployer l'application avec Docker Compose
                    sh "docker-compose up -d"
                }
            }
        }
    }

}
