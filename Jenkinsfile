pipeline {
  agent any
  environment {
    DOCKER_USER = 'anaghaaaaaa'
    IMAGE       = "${DOCKER_USER}/webapp"
    TAG         = "${BUILD_NUMBER}"
  }
  stages {
    stage('Checkout') { steps { checkout scm } }

    stage('Build Image') {
      steps { sh 'docker build -t $IMAGE:$TAG -t $IMAGE:latest .' }
    }

    stage('Test') {
      steps { sh 'docker run --rm $IMAGE:$TAG node test.js' }
    }

    stage('Push to Docker Hub') {
      steps {
        withCredentials([usernamePassword(credentialsId: 'dockerhub',
                         usernameVariable: 'U', passwordVariable: 'P')]) {
          sh '''
            echo $P | docker login -u $U --password-stdin
            docker push $IMAGE:$TAG
            docker push $IMAGE:latest
          '''
        }
      }
    }

    stage('Deploy to Kubernetes') {
      steps {
        sh '''
          sed "s|IMAGE_PLACEHOLDER|$IMAGE:$TAG|" k8s/deployment.yaml | kubectl apply -f -
          kubectl rollout status deployment/webapp --timeout=120s
        '''
      }
    }

    stage('Verify') {
      steps { sh 'kubectl get pods,svc -l app=webapp' }
    }
  }
  post { always { sh 'docker logout || true' } }
}