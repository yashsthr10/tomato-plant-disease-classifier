# 🌾 Smart Agriculture AI Platform

A 5 microservices based full-scale production-grade Smart Agriculture application with real-time ML inference, autoscaling, monitoring, model training pipeline, and multi-component deployment on Google Kubernetes Engine (GKE).

![GKE](https://img.shields.io/badge/GKE-Deployed-blue)
![GitHub Actions](https://img.shields.io/github/actions/workflow/status/your-username/your-repo/model-server-deployment.yml?label=Model%20Server%20CI/CD)
![MIT License](https://img.shields.io/badge/license-MIT-green)

---

## 🚀 Features

* **FastAPI Inference API** with autoscaling using **KEDA**.
* **Model Training & Serving** with TorchServe.
* **React Frontend** deployed via CI/CD to GKE.
* **Prometheus + Grafana Monitoring**
* **Terraform** to provision GCP infra.
* **GitHub Actions** for automated CI/CD.
* **Docker Compose** for local testing.

---

## 🧱 Folder Structure

```
.
├── .github/
│   └── workflows/
│       ├── model-server-deployment.yml              # CI/CD for model serving on GKE
│       ├── prometheus-deployment.yml                # CI/CD for Prometheus deployment to GKE
│       ├── react-app-deployment.yml                 # CI/CD for react app deployment on GKE
│       ├── fastapi-deployment.yml                   # CI/CD for fastapi backend deployment on GKE
│       └── grafana-deployment.yml                   # CI/CD for grafana container on GKE
│ 
│ 
├── Backend/
│   ├── API/                             # FastAPI model inference service
│   ├── model/                           # Model Training and TorchServe serving
│   └── prometheus/
│       └── prometheus.yml               # Prometheus configuration
│
├── k8s/
│   ├── grafana/
│   │   ├── deployment.yaml
│   │   └── service.yaml
│   ├── API/
│   │   ├── deployment.yaml              
│   │   ├── service.yaml
│   │   └── keda-fastapi-scaledObject.yaml  
│   ├── prometheus/
│   │   ├── deployment.yaml
│   │   └── service.yaml
│   ├── model-server/
│   │   ├── deployment.yaml             
│   │   ├── service.yaml
│   │   └── keda-model-server-scaledObject.yaml 
│   └── react/
│       ├── deployment.yaml              
│       └── service.yaml              
│  
│                
│
├── smart-agriculture-app/
│   ├── Dockerfile
│   ├── public
│   ├── src
│   .... #other files
│
├── terraform/
│   ├── main.tf
│   ├── outputs.tf
│   ├── provider.tf
│   ├── terraform.tfvars                  # Not Commited - contains sensetive data
│   └── variables.tf
│ 
├── docker-compose.yml                    # for local deployment and testing
├── README.md
└── .gitignore


```
---

## ⚙️ Local Setup (For Testing)

# Step 1: Clone the repo
```bash
git clone https://github.com/your-user/smart-agri-app.git
cd smart-agri-app

```
# step 2: Setup everything 
set the GROQ_API_KEY in a .env file inside and as : Backend/API/.env



# Step 3: Build and run everything locally
```bash
docker-compose up --build
```

### Access Services Locally:

* 🧠 FastAPI: `http://localhost:8000`
* 🌱 React App: `http://localhost:3001`
* 📊 Grafana: `http://localhost:3000`
* 📈 Prometheus: `http://localhost:9090`

---

## ☁️ GCP + Kubernetes Deployment

### 🔧 Step 1: Provision Infra with Terraform

```bash
cd terraform
terraform init
terraform apply -auto-approve
```

### 🐳 Step 2: Push Docker Images

Make sure Docker images are built and pushed to Docker Hub.

### ☁️ Step 3: CI/CD via GitHub Actions

GitHub workflows will handle automatic deployment on push to `main`:

| Component      | Workflow File                                   |
| -------------- | ----------------------------------------------- |
| FastAPI API    | `.github/workflows/fastapi-deployment.yml`      |
| React Frontend | `.github/workflows/react-app-deployment.yml`    |
| Model Server   | `.github/workflows/model-server-deployment.yml` |
| Prometheus     | `.github/workflows/prometheus-deployment.yml`   |
| Grafana        | `.github/workflows/grafana-deployment.yml`      |

### 🔐 Secrets Required

In your GitHub repo settings:

```
GKE_CREDENTIALS       = GCP service account key JSON
GCP_PROJECT           = your-gcp-project-id
DOCKER_USERNAME       = your-docker-username
DOCKER_PASSWORD       = your-docker-password
```

---

## 📦 KEDA: Autoscaling Magic

Two KEDA ScaledObjects configured:

* `keda-fastapi-scaledObject.yaml`: Autoscale FastAPI API pods based on queue length or traffic.
* `keda-model-server-scaledObject.yaml`: Autoscale model serving pods based on load.

Located in respective subfolders of `k8s/`

---

## 📊 Observability Stack

### Prometheus:

* Configured via `Backend/prometheus/prometheus.yml`
* Deployed via GitHub Actions to GKE

### Grafana:

* Comes with pre-installed dashboards.
* Exposed on GKE via `k8s/grafana/service.yaml`

---

## 🧠 Model Pipeline

* Model training logic lives in `Backend/model/`
* TorchServe Dockerized model server setup in `k8s/model-server/`
* Supports retraining and pushing updated model via CI/CD

---

## 🚨 Monitoring

Prometheus scrapes FastAPI metrics, model server stats, and autoscaling events. Integrated with Grafana dashboards for real-time visualization.

---

## 📜 License

MIT License. Feel free to fork, contribute, or deploy this on your farm. 🚜

---

## 👨‍💻 Author

Built with caffeine and cluster debugging by **Yash Suthar** 🤖

Ready to scale AI from my village to valley!
>>>>>>> 3edf800 (�Full infra + CI/CD: GKE deployments, KEDA, Prometheus/Grafana, FastAPI model API with secret injection, model serving and langchain LLM integration)
