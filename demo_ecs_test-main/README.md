# Deploying the Application on ECS 
Create a cluster and create the configuration required

In the image section , enter the below Image
public.ecr.aws/p2p0s6i2/demo_ecs_test:latest


# Tested using the below Commands
Replace the Below Upload and Download URL with your own generated URL

# UPLOAD:
curl -X POST http://11.12.23.80/dev/upload  -H 'Content-Type: application/json'   -d '{"photoUrl": "http://node.green/logo.png"}'

curl -X POST http://11.12.23.80/dev/upload  -H 'Content-Type: application/json'   -d '{"photoUrl": "https://hullabaloo.co.uk/wp-content/uploads/2021/04/scalemodelmaker.jpg"}'


# DOWNLOAD:

curl -J -O -L -X GET http://11.12.23.80/dev/download?s3Url=rz-500-753661ae-84db-43cb-b0e0-e606f7a941ad.jpeg

curl -J -O -L -X GET http://11.12.23.80/dev/download?s3Url=rz-200-2dce3c2d-4aa8-40b8-8101-4138df2325c3.jpeg

curl -J -O -L -X GET http://11.12.23.80/dev/download?s3Url=rz-200-8d818868-ab2d-412d-901d-2eaafe41ff49.png



docker run --env-file ./.env.list public.ecr.aws/p2p0s6i2/demo_ecs_test:latest