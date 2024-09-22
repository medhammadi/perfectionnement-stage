pipeline {
  agent { label 'hammadi-node' }
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
    stage('SonarQube Analysis') {
            steps {
                script {
                    withSonarQubeEnv('SonarQubeServer') {
                        withCredentials([string(credentialsId: 'sonar', variable: 'SONAR_TOKEN')]) {
                            sh 'mvn sonar:sonar -Dsonar.token=${SONAR_TOKEN}'
                        }
                    }
                }
            }
        }
  }
}
