# 🚀 Deploy Guide — Deploying This App to Google Cloud Run Using GitHub Actions + Workload Identity Federation

This repository is fully configured to deploy automatically to **Google Cloud Run** whenever you push to the `main` branch.  
This guide explains every step required to set up a **new project** with the same CI/CD workflow.

---

# 1️⃣ Prerequisites

- Google Cloud project
- GitHub repository
- Docker installed (optional)
- Billing enabled in Google Cloud

---

# 2️⃣ Enable Required Google Cloud APIs

```bash
gcloud services enable \
  artifactregistry.googleapis.com \
  run.googleapis.com \
  iamcredentials.googleapis.com \
  cloudresourcemanager.googleapis.com
```

---

# 3️⃣ Create the GitHub Deployer Service Account

```bash
gcloud iam service-accounts create github-actions-deployer \
  --description="Deploys from GitHub Actions" \
  --display-name="GitHub Actions Deployer"
```

Full email:

```
github-actions-deployer@<PROJECT_ID>.iam.gserviceaccount.com
```

---

# 4️⃣ Assign IAM Roles to the Deployer Service Account

```bash
PROJECT_ID="<PROJECT_ID>"
SA="github-actions-deployer@$PROJECT_ID.iam.gserviceaccount.com"

gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member="serviceAccount:$SA" \
  --role="roles/run.admin"

gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member="serviceAccount:$SA" \
  --role="roles/iam.serviceAccountUser"

gcloud projects add-iam-policy-binding $PROJECT_ID \
  --member="serviceAccount:$SA" \
  --role="roles/artifactregistry.writer"
```

---

# 5️⃣ Allow Deployer SA to Act As the Cloud Run Runtime SA

```bash
PROJECT_NUMBER=$(gcloud projects describe $PROJECT_ID --format='value(projectNumber)')

gcloud iam service-accounts add-iam-policy-binding \
  "$PROJECT_NUMBER-compute@developer.gserviceaccount.com" \
  --member="serviceAccount:$SA" \
  --role="roles/iam.serviceAccountUser"
```

---

# 6️⃣ Create Artifact Registry Repository

```bash
gcloud artifacts repositories create <REPO_NAME> \
  --repository-format=docker \
  --location=<REGION> \
  --description="Container registry for Cloud Run deployments"
```

Final container path:

```
<REGION>-docker.pkg.dev/<PROJECT_ID>/<REPO_NAME>/<SERVICE_NAME>
```

---

# 7️⃣ Configure Workload Identity Federation (WIF)

## Create a Workload Identity Pool

```bash
gcloud iam workload-identity-pools create "github-actions-pool" \
  --location="global" \
  --display-name="GitHub Actions Pool"
```

## Create an OIDC Provider for GitHub

```bash
gcloud iam workload-identity-pools providers create-oidc "github" \
  --location="global" \
  --workload-identity-pool="github-actions-pool" \
  --issuer-uri="https://token.actions.githubusercontent.com" \
  --attribute-mapping="google.subject=assertion.sub,attribute.repository=assertion.repository"
```

## Bind GitHub Repository to the Deployer Service Account

```bash
POOL_ID=$(gcloud iam workload-identity-pools describe github-actions-pool \
  --location=global --format='value(name)')

gcloud iam service-accounts add-iam-policy-binding $SA \
  --role="roles/iam.workloadIdentityUser" \
  --member="principalSet://iam.googleapis.com/${POOL_ID}/attribute.repository/<GITHUB_OWNER>/<GITHUB_REPO>"
```

---

# 8️⃣ Dockerfile Requirements (Cloud Run)

Your Dockerfile **must**:

- expose port `8080`
- obey the `$PORT` environment variable
- run a real server (not a dev server)

Example:

```dockerfile
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:20-alpine
WORKDIR /app
RUN npm install -g serve
COPY --from=build /app/dist ./dist
ENV PORT=8080
EXPOSE 8080
CMD ["sh", "-c", "serve -s dist -l ${PORT:-8080}"]
```

---

# 9️⃣ GitHub Actions Workflow

File: `.github/workflows/deploy.yml`

```yaml
name: Deploy to Cloud Run

on:
  push:
    branches: ["main"]

env:
  PROJECT_ID: "<PROJECT_ID>"
  REGION: "<REGION>"
  SERVICE: "<SERVICE_NAME>"
  REPO: "<ARTIFACT_REGISTRY_REPO>"
  WIF_PROVIDER: "projects/<PROJECT_NUMBER>/locations/global/workloadIdentityPools/github-actions-pool/providers/github"
  SERVICE_ACCOUNT: "github-actions-deployer@<PROJECT_ID>.iam.gserviceaccount.com"

jobs:
  deploy:
    permissions:
      contents: read
      id-token: write

    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - id: auth
        uses: google-github-actions/auth@v2
        with:
          workload_identity_provider: ${{ env.WIF_PROVIDER }}
          service_account: ${{ env.SERVICE_ACCOUNT }}
          token_format: "access_token"

      - name: Docker Auth
        uses: docker/login-action@v3
        with:
          username: "oauth2accesstoken"
          password: ${{ steps.auth.outputs.access_token }}
          registry: "${{ env.REGION }}-docker.pkg.dev"

      - name: Build and Push
        id: build
        run: |
          IMAGE="${{ env.REGION }}-docker.pkg.dev/${{ env.PROJECT_ID }}/${{ env.REPO }}/${{ env.SERVICE }}:${{ github.sha }}"
          docker build -t "$IMAGE" .
          docker push "$IMAGE"
          echo "image=$IMAGE" >> $GITHUB_OUTPUT

      - name: Deploy to Cloud Run
        id: deploy
        uses: google-github-actions/deploy-cloudrun@v2
        with:
          service: ${{ env.SERVICE }}
          region: ${{ env.REGION }}
          image: ${{ steps.build.outputs.image }}

      - name: Show Deployment URL
        run: echo "${{ steps.deploy.outputs.url }}"
```

---

# 🔟 Make Cloud Run Service Public (One-Time)

```bash
gcloud run services add-iam-policy-binding <SERVICE_NAME> \
  --region=<REGION> \
  --member="allUsers" \
  --role="roles/run.invoker"
```

---

# 🎉 Deployment

Just push to `main`:

```bash
git add .
git commit -m "Deploy"
git push
```

GitHub Actions will:

1. Authenticate via Workload Identity Federation  
2. Build the Docker image  
3. Push the image to Artifact Registry  
4. Deploy the image to Cloud Run  
5. Output your public HTTPS URL  

You’re live! 🚀
