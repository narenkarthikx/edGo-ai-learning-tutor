# Google Cloud Deployment Guide

Complete guide to deploy AI Skill Gap Radar on Google Cloud Platform using Cloud Run (serverless, cost-effective, auto-scaling).

## 🎯 Deployment Overview

**Services Used:**
- **Cloud Run** - Serverless container deployment (main app)
- **Cloud Build** - Automated Docker builds
- **Artifact Registry** - Docker image storage
- **Secret Manager** - Secure environment variables
- **Supabase** - Database (already configured)

**Estimated Cost:** $0-20/month for low-moderate traffic (Cloud Run has generous free tier)

---

## 📋 Prerequisites

### 1. Google Cloud Account
- Go to [Google Cloud Console](https://console.cloud.google.com/)
- Create a new project or select existing one
- Enable billing (free tier available)

### 2. Install Google Cloud SDK
Download from: https://cloud.google.com/sdk/docs/install

**Windows:**
```powershell
# Download and run the installer
# https://dl.google.com/dl/cloudsdk/channels/rapid/GoogleCloudSDKInstaller.exe

# After installation, open new PowerShell and verify:
gcloud version
```

### 3. Login to Google Cloud
```powershell
gcloud auth login
gcloud config set project YOUR_PROJECT_ID
```

---

## 🚀 Deployment Methods

Choose one method:
- **Method 1: Automated (Recommended)** - Using deployment script
- **Method 2: Manual** - Step-by-step commands
- **Method 3: CI/CD** - GitHub Actions (advanced)

---

## 📦 Method 1: Automated Deployment (Easiest)

### Step 1: Configure Environment Variables

Create a file `env.yaml` in the project root:

```yaml
# env.yaml
NEXT_PUBLIC_SUPABASE_URL: "https://wjstdbspsqmbbcgikxuq.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indqc3RkYnNwc3FtYmJjZ2lreHVxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM3ODc1OTUsImV4cCI6MjA3OTM2MzU5NX0.RE_wZNmKbEagXUgjEqiKcIrWe65cIr21APVv1BxFAK8"
GEMINI_API_KEY: "AIzaSyB7XNZ9NyOHrEFpNFSDMCoOYu9ZFKEyTwo"
```

⚠️ **Security Note:** Add `env.yaml` to `.gitignore` - never commit secrets!

### Step 2: Run Deployment Script

I'll create a deployment script for you (see below).

```powershell
# Run the deployment script
.\deploy-to-gcloud.ps1
```

The script will:
1. ✅ Enable required Google Cloud APIs
2. ✅ Build Docker image
3. ✅ Push to Artifact Registry
4. ✅ Deploy to Cloud Run
5. ✅ Configure environment variables
6. ✅ Set up auto-scaling
7. ✅ Output the public URL

---

## 🛠️ Method 2: Manual Deployment

### Step 1: Enable Required APIs

```powershell
gcloud services enable run.googleapis.com
gcloud services enable cloudbuild.googleapis.com
gcloud services enable artifactregistry.googleapis.com
```

### Step 2: Set Project Variables

```powershell
$PROJECT_ID = "your-project-id"
$REGION = "asia-south1"  # Choose closest: us-central1, europe-west1, asia-south1
$SERVICE_NAME = "ai-skill-gap-radar"
$IMAGE_NAME = "ai-skill-gap-radar"

gcloud config set project $PROJECT_ID
```

### Step 3: Create Artifact Registry Repository

```powershell
gcloud artifacts repositories create $SERVICE_NAME `
  --repository-format=docker `
  --location=$REGION `
  --description="AI Skill Gap Radar Docker images"
```

### Step 4: Build and Push Docker Image

```powershell
# Build the image
gcloud builds submit --tag ${REGION}-docker.pkg.dev/${PROJECT_ID}/${SERVICE_NAME}/${IMAGE_NAME}:latest

# This command:
# - Builds your Dockerfile
# - Pushes to Artifact Registry
# - Takes 5-10 minutes
```

### Step 5: Deploy to Cloud Run

```powershell
gcloud run deploy $SERVICE_NAME `
  --image ${REGION}-docker.pkg.dev/${PROJECT_ID}/${SERVICE_NAME}/${IMAGE_NAME}:latest `
  --platform managed `
  --region $REGION `
  --allow-unauthenticated `
  --port 8080 `
  --memory 1Gi `
  --cpu 1 `
  --min-instances 0 `
  --max-instances 10 `
  --set-env-vars "NEXT_PUBLIC_SUPABASE_URL=https://wjstdbspsqmbbcgikxuq.supabase.co" `
  --set-env-vars "NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indqc3RkYnNwc3FtYmJjZ2lreHVxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM3ODc1OTUsImV4cCI6MjA3OTM2MzU5NX0.RE_wZNmKbEagXUgjEqiKcIrWe65cIr21APVv1BxFAK8" `
  --set-env-vars "GEMINI_API_KEY=AIzaSyB7XNZ9NyOHrEFpNFSDMCoOYu9ZFKEyTwo"
```

### Step 6: Get Your URL

```powershell
gcloud run services describe $SERVICE_NAME --region $REGION --format 'value(status.url)'
```

Your app will be available at: `https://ai-skill-gap-radar-xxxxx-xx.a.run.app`

---

## 🔐 Method 3: Using Secret Manager (More Secure)

For production, store secrets in Google Secret Manager:

### Step 1: Enable Secret Manager API

```powershell
gcloud services enable secretmanager.googleapis.com
```

### Step 2: Create Secrets

```powershell
# Create Gemini API Key secret
echo "AIzaSyB7XNZ9NyOHrEFpNFSDMCoOYu9ZFKEyTwo" | `
  gcloud secrets create gemini-api-key --data-file=-

# Create Supabase secrets
echo "https://wjstdbspsqmbbcgikxuq.supabase.co" | `
  gcloud secrets create supabase-url --data-file=-

echo "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." | `
  gcloud secrets create supabase-anon-key --data-file=-
```

### Step 3: Deploy with Secret References

```powershell
gcloud run deploy $SERVICE_NAME `
  --image ${REGION}-docker.pkg.dev/${PROJECT_ID}/${SERVICE_NAME}/${IMAGE_NAME}:latest `
  --platform managed `
  --region $REGION `
  --allow-unauthenticated `
  --set-secrets "GEMINI_API_KEY=gemini-api-key:latest" `
  --set-secrets "NEXT_PUBLIC_SUPABASE_URL=supabase-url:latest" `
  --set-secrets "NEXT_PUBLIC_SUPABASE_ANON_KEY=supabase-anon-key:latest"
```

---

## 🔄 Continuous Deployment with GitHub Actions

### Step 1: Create Service Account

```powershell
gcloud iam service-accounts create github-actions `
  --display-name="GitHub Actions CI/CD"

$SERVICE_ACCOUNT_EMAIL = "github-actions@${PROJECT_ID}.iam.gserviceaccount.com"

# Grant necessary permissions
gcloud projects add-iam-policy-binding $PROJECT_ID `
  --member="serviceAccount:${SERVICE_ACCOUNT_EMAIL}" `
  --role="roles/run.admin"

gcloud projects add-iam-policy-binding $PROJECT_ID `
  --member="serviceAccount:${SERVICE_ACCOUNT_EMAIL}" `
  --role="roles/storage.admin"

gcloud projects add-iam-policy-binding $PROJECT_ID `
  --member="serviceAccount:${SERVICE_ACCOUNT_EMAIL}" `
  --role="roles/iam.serviceAccountUser"

# Create key
gcloud iam service-accounts keys create key.json `
  --iam-account=$SERVICE_ACCOUNT_EMAIL
```

### Step 2: Add GitHub Secrets

Go to your GitHub repository → Settings → Secrets and variables → Actions

Add these secrets:
- `GCP_PROJECT_ID` - Your project ID
- `GCP_SA_KEY` - Contents of `key.json`
- `GCP_REGION` - e.g., `asia-south1`
- `GEMINI_API_KEY` - Your Gemini API key
- `SUPABASE_URL` - Your Supabase URL
- `SUPABASE_ANON_KEY` - Your Supabase anon key

### Step 3: Create GitHub Actions Workflow

See `.github/workflows/deploy.yml` (created below)

---

## 📊 Environment Variables Management

### Current Environments

You have **2 environments**:

#### 1. Development (.env.local)
```bash
NEXT_PUBLIC_SUPABASE_URL=https://wjstdbspsqmbbcgikxuq.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL=http://localhost:3000
GEMINI_API_KEY=AIzaSyB...
```

#### 2. Production (Cloud Run)
```bash
NEXT_PUBLIC_SUPABASE_URL=https://wjstdbspsqmbbcgikxuq.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
NEXT_PUBLIC_PROD_SUPABASE_REDIRECT_URL=https://your-app.run.app
GEMINI_API_KEY=AIzaSyB...
```

### Update Environment Variables

```powershell
# Update a single variable
gcloud run services update $SERVICE_NAME `
  --region $REGION `
  --update-env-vars "GEMINI_API_KEY=new_key_here"

# Update multiple variables
gcloud run services update $SERVICE_NAME `
  --region $REGION `
  --update-env-vars "VAR1=value1,VAR2=value2"
```

---

## 🔧 Configuration Options

### Scaling Configuration

```powershell
gcloud run services update $SERVICE_NAME `
  --region $REGION `
  --min-instances 0 `      # Scale to zero when idle (save costs)
  --max-instances 100 `    # Maximum concurrent instances
  --concurrency 80         # Requests per instance
```

### Memory & CPU

```powershell
gcloud run services update $SERVICE_NAME `
  --region $REGION `
  --memory 2Gi `           # Options: 512Mi, 1Gi, 2Gi, 4Gi, 8Gi
  --cpu 2                  # Options: 1, 2, 4, 8
```

### Request Timeout

```powershell
gcloud run services update $SERVICE_NAME `
  --region $REGION `
  --timeout 300            # Max 3600 seconds (1 hour)
```

---

## 🔍 Monitoring & Logs

### View Logs

```powershell
# Real-time logs
gcloud run services logs tail $SERVICE_NAME --region $REGION

# View in Cloud Console
# https://console.cloud.google.com/run
```

### Metrics Dashboard

1. Go to Cloud Console → Cloud Run
2. Click your service
3. View metrics: Requests, CPU, Memory, Latency

---

## 🌐 Custom Domain Setup

### Step 1: Verify Domain

```powershell
gcloud domains verify yourdomain.com
```

### Step 2: Map Domain

```powershell
gcloud run domain-mappings create --service $SERVICE_NAME --domain yourdomain.com --region $REGION
```

### Step 3: Configure DNS

Add the provided DNS records to your domain registrar:
- Type: `CNAME`
- Name: `www` or `@`
- Value: `ghs.googlehosted.com`

---

## 💰 Cost Optimization

### Cloud Run Pricing (as of 2024)

**Free Tier (Monthly):**
- 2 million requests
- 360,000 GB-seconds memory
- 180,000 vCPU-seconds

**Estimated Costs for AI Skill Gap Radar:**
- **Low traffic** (1000 users/month): **$0-5/month**
- **Medium traffic** (10,000 users/month): **$10-20/month**
- **High traffic** (100,000 users/month): **$50-100/month**

### Cost Saving Tips

1. **Scale to zero**: Set `--min-instances 0`
2. **Right-size resources**: Start with 1Gi memory, 1 CPU
3. **Enable request timeout**: Prevent long-running requests
4. **Use caching**: Implement Redis/Memcache for repeated queries
5. **Optimize images**: Compress and use WebP format

---

## 🐛 Troubleshooting

### Build Fails

```powershell
# Check build logs
gcloud builds list --limit 5
gcloud builds log [BUILD_ID]
```

**Common Issues:**
- Missing dependencies in `package.json`
- TypeScript errors (set `ignoreBuildErrors: true` in `next.config.mjs`)
- Out of memory (increase Cloud Build machine type)

### Deployment Fails

```powershell
# Check service status
gcloud run services describe $SERVICE_NAME --region $REGION

# View error logs
gcloud run services logs read $SERVICE_NAME --region $REGION --limit 50
```

**Common Issues:**
- Port mismatch (ensure Dockerfile exposes 8080)
- Missing environment variables
- Insufficient permissions

### Runtime Errors

1. Check logs in Cloud Console
2. Test locally with Docker:
```powershell
docker build -t test-app .
docker run -p 8080:8080 --env-file .env.local test-app
```

### Supabase Connection Issues

Update Supabase redirect URL:
1. Go to Supabase Dashboard → Authentication → URL Configuration
2. Add your Cloud Run URL: `https://your-app-xxxxx.run.app`

---

## 🔄 Update Deployment

### Rebuild and Redeploy

```powershell
# Build new image
gcloud builds submit --tag ${REGION}-docker.pkg.dev/${PROJECT_ID}/${SERVICE_NAME}/${IMAGE_NAME}:latest

# Deploy automatically picks latest image
gcloud run deploy $SERVICE_NAME `
  --image ${REGION}-docker.pkg.dev/${PROJECT_ID}/${SERVICE_NAME}/${IMAGE_NAME}:latest `
  --region $REGION
```

### Rollback to Previous Version

```powershell
# List revisions
gcloud run revisions list --service $SERVICE_NAME --region $REGION

# Rollback
gcloud run services update-traffic $SERVICE_NAME `
  --region $REGION `
  --to-revisions REVISION_NAME=100
```

---

## ✅ Post-Deployment Checklist

- [ ] App is accessible at Cloud Run URL
- [ ] Environment variables are set correctly
- [ ] Supabase authentication works
- [ ] AI agents respond correctly
- [ ] Flashcards load properly
- [ ] Teacher dashboard displays data
- [ ] Update Supabase redirect URLs
- [ ] Set up custom domain (optional)
- [ ] Configure monitoring alerts
- [ ] Enable Cloud Run auto-scaling
- [ ] Test on mobile devices
- [ ] Share URL with users!

---

## 📚 Additional Resources

- [Cloud Run Documentation](https://cloud.google.com/run/docs)
- [Cloud Build Documentation](https://cloud.google.com/build/docs)
- [Next.js Deployment Guide](https://nextjs.org/docs/deployment)
- [Dockerfile Best Practices](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/)

---

## 🆘 Need Help?

1. Check Cloud Console logs
2. Review this guide's troubleshooting section
3. Test locally with Docker first
4. Contact Google Cloud Support (if on paid plan)

---

**🎉 Congratulations! Your AI Skill Gap Radar is now live on Google Cloud!**
