node ("MIGRATION-QA") {
 def app
 
 stage('Clone repository') {
 /* Let's make sure we have the repository cloned to our workspace */
 
 checkout scm
 }
 
 stage('Build image') {
 /* This builds the actual image; synonymous to
 * docker build on the command line */
 
 app = docker.build("matilda/ui:qa-${env.BUILD_NUMBER}")
 }
 
 /*stage('Push image') {
 /* Finally, we'll push the image with two tags:
 * First, the incremental build number from Jenkins
 * Second, the 'latest' tag.
 * Pushing multiple tags is cheap, as all the layers are reused. 
  app.push("dev-${env.BUILD_NUMBER}") */
 
}