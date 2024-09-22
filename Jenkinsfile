
pipeline {
  agent any
  stages {
    stage('Clean workspace') {
      steps {
        deleteDir() // Clean workspace before cloning
      }
    }
    stage('Cloning Git') {
      steps {
        git branch: 'main', url: 'https://github.com/medhammadi/perfectionnement-stage.git'
      }
    }
    stage('TRIVY FS SCAN') {
      steps {
           // Scanner le système de fichiers avec Trivy
        sh 'trivy fs .'
            }
        }
  }
}
