pipeline {
    agent any

    tools {
        nodejs 'nodejs' // Assurez-vous que Node.js est installé dans Jenkins
        python 'python3' // Assurez-vous que Python 3 est installé dans Jenkins
    }

    environment {
        // Variables d'environnement
        NODE_ENV = 'test'
    }

    stages {

        stage('Checkout') {
            steps {
                // Récupérer le code depuis le dépôt GitHub
                git branch: 'main', url: 'https://github.com/medhammadi/perfectionnement-stage.git'
            }
        }

        stage('Install Dependencies - Node.js Backend') {
            steps {
                dir('backend') {
                    // Installer les dépendances backend Node.js
                    sh 'npm install'
                }
            }
        }

        stage('Install Dependencies - React.js Frontend') {
            steps {
                dir('frontend') {
                    // Installer les dépendances frontend React.js
                    sh 'npm install'
                }
            }
        }

        stage('Install Dependencies - Python') {
            steps {
                dir('python') {
                    // Installer les dépendances Python
                    sh 'pip install -r requirements.txt'
                }
            }
        }

        stage('Run Tests - Node.js Backend') {
            steps {
                dir('backend') {
                    // Exécuter les tests pour le backend Node.js
                    sh 'npm test'
                }
            }
            post {
                always {
                    // Publier les résultats des tests Node.js
                    junit '**/backend/test-reports/*.xml'
                }
            }
        }

        stage('Run Tests - React.js Frontend') {
            steps {
                dir('frontend') {
                    // Exécuter les tests unitaires pour le frontend React.js
                    sh 'npm test -- --watchAll=false' // Désactiver le mode "watch" pour les tests
                }
            }
            post {
                always {
                    // Publier les résultats des tests React.js
                    junit '**/frontend/test-reports/*.xml'
                }
            }
        }

        stage('Run Tests - Python') {
            steps {
                dir('python') {
                    // Exécuter les tests Python avec pytest
                    sh 'pytest --junitxml=test-reports/results.xml'
                }
            }
            post {
                always {
                    // Publier les résultats des tests Python
                    junit '**/python/test-reports/*.xml'
                }
            }
        }

        stage('Build Docker Images') {
            parallel {
                stage('Build Backend Docker Image') {
                    steps {
                        dir('backend') {
                            // Construire l'image Docker pour le backend
                            sh 'docker build -t backend-image:latest .'
                        }
                    }
                }

                stage('Build Frontend Docker Image') {
                    steps {
                        dir('frontend') {
                            // Construire l'image Docker pour le frontend
                            sh 'docker build -t frontend-image:latest .'
                        }
                    }
                }

                stage('Build Python Docker Image') {
                    steps {
                        dir('python') {
                            // Construire l'image Docker pour le projet Python
                            sh 'docker build -t python-image:latest .'
                        }
                    }
                }
            }
        }
    }

    post {
        always {
            // Archiver les rapports de tests et nettoyer si nécessaire
            archiveArtifacts artifacts: '**/test-reports/*.xml', allowEmptyArchive: true
        }

        success {
            echo 'Pipeline completed successfully!'
        }

        failure {
            echo 'Pipeline failed!'
        }
    }
}
