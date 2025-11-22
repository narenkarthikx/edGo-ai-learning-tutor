# 🚀 Quick Start: Deploy to Google Cloud in 10 Minutes

The **fastest** way to get your AI Skill Gap Radar live on Google Cloud.

## Prerequisites (5 minutes)

### 1. Google Cloud Account
- Sign up at [console.cloud.google.com](https://console.cloud.google.com)
- Create a new project
- Enable billing (has free tier)

### 2. Install Google Cloud SDK
**Windows:**
```powershell
# Download and install:
# https://dl.google.com/dl/cloudsdk/channels/rapid/GoogleCloudSDKInstaller.exe

# After install, open NEW PowerShell and login:
gcloud auth login
gcloud config set project YOUR_PROJECT_ID
```

**Get your Project ID:**
```powershell
gcloud projects list
```

## Deploy (5 minutes)

### Method 1: Automated Script (Recommended)

```powershell
# Navigate to project
cd ai-skill-gap-radar

# Run deployment script
.\deploy-to-gcloud.ps1
```

That's it! The script will:
- ✅ Enable all required APIs
- ✅ Build your Docker image
- ✅ Deploy to Cloud Run
- ✅ Give you the live URL

### Method 2: Manual Commands

```powershell
# 1. Set variables
$PROJECT_ID = "your-project-id"
$REGION = "asia-south1"
$SERVICE = "ai-skill-gap-radar"

# 2. Enable APIs
gcloud services enable run.googleapis.com cloudbuild.googleapis.com

# 3. Build and deploy
gcloud run deploy $SERVICE `
  --source . `
  --platform managed `
  --region $REGION `
  --allow-unauthenticated `
  --set-env-vars "NEXT_PUBLIC_SUPABASE_URL=https://wjstdbspsqmbbcgikxuq.supabase.co" `
  --set-env-vars "NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key" `
  --set-env-vars "GEMINI_API_KEY=your_key"
```

## Post-Deployment (2 minutes)

### Update Supabase
1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Select your project
3. Go to **Authentication** → **URL Configuration**
4. Add your Cloud Run URL: `https://your-app-xxxxx.run.app`

### Test Your App
Visit your URL and test:
- ✅ Login/Register
- ✅ AI Agents
- ✅ Flashcards
- ✅ Teacher Dashboard

## View Logs

```powershell
gcloud run services logs tail ai-skill-gap-radar --region asia-south1
```

## Update App

```powershell
# Make your code changes, then:
.\deploy-to-gcloud.ps1
```

## Monitor

- **Cloud Console:** [console.cloud.google.com/run](https://console.cloud.google.com/run)
- **Metrics:** CPU, Memory, Requests, Latency
- **Logs:** Real-time application logs

## Cost

**Estimated:** $0-20/month for typical usage
- Free tier: 2 million requests/month
- Auto-scales to zero when idle
- Pay only for actual usage

## Need Help?

- **Full Guide:** [docs/GOOGLE_CLOUD_DEPLOYMENT.md](./GOOGLE_CLOUD_DEPLOYMENT.md)
- **Troubleshooting:** See deployment guide
- **Support:** Check Cloud Console logs

---

**🎉 That's it! Your app is live on Google Cloud!**
