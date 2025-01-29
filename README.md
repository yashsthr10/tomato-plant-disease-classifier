Smart Agriculture Assistant

A deep learning-powered web application for plant disease classification, utilizing a FastAPI backend and a React frontend. The application is designed to assist farmers and researchers in identifying plant diseases from images.

Local Setup

1. Download Pretrained Model

Download the pretrained model from the following link:
Pretrained Model

2. Place the Model

After downloading, place the model file (crop_disease_fine_tuned_model.h5) inside the API directory.

3. Initialize the FastAPI Backend

Open a terminal, navigate to the API folder, and run:

uvicorn fastapi:app --host 0.0.0.0 --port 8000 --reload

This starts the FastAPI server on port 8000.

4. Initialize the React Frontend

Open another terminal, navigate to the React app directory, and run:

npm install  # Install dependencies
npm start    # Start the React app

The React app will run on http://localhost:3000/.

Docker and Kubernetes Setup

1. Build and Push Docker Images

Ensure Docker is installed and running. Then, build and push the FastAPI and React app images to Docker Hub.

Build the FastAPI Docker Image:

docker build -t yashsthr/smart-agri-api:latest ./API

Build the React Docker Image:

docker build -t yashsthr/smart-agri-react:latest ./frontend

Push the Images to Docker Hub:

docker push yashsthr/smart-agri-api:latest
docker push yashsthr/smart-agri-react:latest

2. Deploy with Kubernetes

Ensure kubectl is configured to interact with your cluster.

Apply Kubernetes Configurations:

kubectl apply -f k8s/

Verify Pods and Services:

kubectl get pods
kubectl get services

Port Forwarding (If Needed):

kubectl port-forward service/fastapi-service 8000:80
kubectl port-forward service/react-service 3000:80

Once deployed, you can access the app via the LoadBalancer or NodePort URL assigned by Kubernetes.

Contributors:
Yash Suthar

For any issues, feel free to open an issue in the repository.
