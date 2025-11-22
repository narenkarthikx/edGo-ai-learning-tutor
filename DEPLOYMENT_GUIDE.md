# Google Cloud Deployment - Complete Setup

## 📦 What We've Created

### Deployment Files
1. **`Dockerfile`** - Multi-stage Docker build for production
2. **`deploy-to-gcloud.ps1`** - Automated deployment script
3. **`.dockerignore`** - Exclude unnecessary files from Docker
4. **`.gcloudignore`** - Exclude files from Cloud upload
5. **`.github/workflows/deploy.yml`** - CI/CD automation
6. **`env.yaml.template`** - Environment variables template
7. **`.env.production.template`** - Production env template

### Documentation
1. **`docs/GOOGLE_CLOUD_DEPLOYMENT.md`** - Complete deployment guide
2. **`DEPLOY_QUICKSTART.md`** - Quick start guide (10 minutes)

### Configuration Updates
- **`next.config.mjs`** - Added standalone output for Docker
- **`.gitignore`** - Added sensitive files protection

---

## 🚀 3 Ways to Deploy

### Option 1: Automated Script (Easiest)
```powershell
.\deploy-to-gcloud.ps1
```
**Time:** 10 minutes | **Complexity:** ⭐☆☆☆☆

### Option 2: Manual Commands
```powershell
gcloud run deploy ai-skill-gap-radar --source . --region asia-south1
```
**Time:** 15 minutes | **Complexity:** ⭐⭐☆☆☆

### Option 3: GitHub Actions (Best for Teams)
- Push to `main` branch
- Automatic deployment
**Time:** Initial setup 20 min | **Complexity:** ⭐⭐⭐☆☆

---

## 🔧 Your Environment Variables

You have **2 environments** configured:

### Development (.env.local)
```bash
NEXT_PUBLIC_SUPABASE_URL=https://wjstdbspsqmbbcgikxuq.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL=http://localhost:3000
GEMINI_API_KEY=AIzaSyB...
```

### Production (env.yaml for Cloud Run)
```yaml
NEXT_PUBLIC_SUPABASE_URL: "https://wjstdbspsqmbbcgikxuq.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY: "eyJ..."
GEMINI_API_KEY: "AIzaSyB..."
NEXT_PUBLIC_PROD_SUPABASE_REDIRECT_URL: "https://your-app.run.app"
```

**How It Works:**
- **Development:** Uses `.env.local` when running `npm run dev`
- **Production:** Uses `env.yaml` during Cloud Run deployment
- Both can use the same Supabase project or separate dev/prod instances

---

## 📋 Step-by-Step Deployment

### Step 1: Install Google Cloud SDK (5 min)
```powershell
# Download and install:
# https://dl.google.com/dl/cloudsdk/channels/rapid/GoogleCloudSDKInstaller.exe

# Login
gcloud auth login

# Set project
gcloud config set project YOUR_PROJECT_ID
```

### Step 2: Create env.yaml (2 min)
```powershell
# Copy template
Copy-Item env.yaml.template env.yaml

# Edit env.yaml with your values
notepad env.yaml
```

Or the script will auto-create it from `.env.local`!

### Step 3: Deploy (10 min)
```powershell
.\deploy-to-gcloud.ps1
```

### Step 4: Update Supabase (2 min)
1. Go to Supabase Dashboard
2. Authentication → URL Configuration
3. Add your Cloud Run URL

### Step 5: Test! (5 min)
- Login as student/teacher
- Test AI agents
- Try flashcards
- Check teacher dashboard

---

## 💰 Cost Breakdown

### Cloud Run Pricing

**Free Tier (Monthly):**
- 2 million requests FREE
- 360,000 GB-seconds memory FREE
- 180,000 vCPU-seconds FREE

**Your Estimated Costs:**

| Users/Month | Requests/Month | Estimated Cost |
|-------------|----------------|----------------|
| 100         | 10,000         | $0 (free tier) |
| 1,000       | 100,000        | $0-5/month     |
| 10,000      | 1,000,000      | $10-20/month   |
| 100,000     | 10,000,000     | $50-100/month  |

**Cost Optimization:**
- ✅ Auto-scales to zero (no idle costs)
- ✅ Pay per request (no flat fees)
- ✅ 1GB memory, 1 CPU (right-sized)
- ✅ 300s timeout (prevents runaway costs)

### Additional Services (Optional)

| Service | Usage | Cost |
|---------|-------|------|
| Cloud Build | 120 builds/day FREE | $0 |
| Artifact Registry | 0.5 GB FREE | $0 |
| Secret Manager | 6 secrets FREE | $0 |
| **Total** | | **$0-20/month** |

---

## 🔄 Environment Management

### Update Single Variable
```powershell
gcloud run services update ai-skill-gap-radar `
  --region asia-south1 `
  --update-env-vars "GEMINI_API_KEY=new_key"
```

### Update Multiple Variables
```powershell
# Edit env.yaml, then redeploy
.\deploy-to-gcloud.ps1
```

### View Current Variables
```powershell
gcloud run services describe ai-skill-gap-radar `
  --region asia-south1 `
  --format="yaml(spec.template.spec.containers[0].env)"
```

### Separate Dev/Prod Environments

**Option A: Same Supabase, Different URLs**
- Dev: `localhost:3000`
- Prod: `your-app.run.app`
- Same database, different redirect URLs

**Option B: Separate Supabase Projects**
- Dev: `dev-supabase.co`
- Prod: `prod-supabase.co`
- Complete isolation

---

## 🔍 Monitoring & Logs

### View Real-time Logs
```powershell
gcloud run services logs tail ai-skill-gap-radar --region asia-south1
```

### View Last 100 Logs
```powershell
gcloud run services logs read ai-skill-gap-radar `
  --region asia-south1 `
  --limit 100
```

### Cloud Console
- **URL:** https://console.cloud.google.com/run
- **Metrics:** Requests, CPU, Memory, Latency
- **Alerts:** Set up email notifications
- **Logs:** Search and filter

---

## 🔐 Security Best Practices

### Use Secret Manager (Recommended for Production)
```powershell
# Create secrets
echo "your_api_key" | gcloud secrets create gemini-api-key --data-file=-

# Deploy with secrets
gcloud run deploy ai-skill-gap-radar `
  --set-secrets "GEMINI_API_KEY=gemini-api-key:latest"
```

### Enable VPC Connector (Advanced)
- Connect to private databases
- Restrict outbound traffic
- Enhanced security

### Custom Domain with SSL
```powershell
gcloud run domain-mappings create `
  --service ai-skill-gap-radar `
  --domain yourdomain.com `
  --region asia-south1
```

---

## 🐛 Common Issues & Solutions

### 1. Build Fails
**Error:** `npm install failed`
**Solution:** Check `package.json` dependencies

### 2. Deployment Timeout
**Error:** `Deployment timeout`
**Solution:** Increase timeout: `--timeout 600`

### 3. Port Mismatch
**Error:** `Container failed to start`
**Solution:** Ensure Dockerfile exposes port 8080

### 4. Environment Variables Not Set
**Error:** `Missing required env var`
**Solution:** Check `env.yaml` has all variables

### 5. Supabase Auth Fails
**Error:** `Redirect URL not allowed`
**Solution:** Add Cloud Run URL to Supabase settings

---

## 🔄 Update & Rollback

### Redeploy After Changes
```powershell
# Option 1: Using script
.\deploy-to-gcloud.ps1

# Option 2: Manual
gcloud run deploy ai-skill-gap-radar --source . --region asia-south1
```

### Rollback to Previous Version
```powershell
# List revisions
gcloud run revisions list --service ai-skill-gap-radar --region asia-south1

# Rollback
gcloud run services update-traffic ai-skill-gap-radar `
  --to-revisions REVISION_NAME=100 `
  --region asia-south1
```

---

## 📊 Scaling Configuration

### Auto-Scaling
```powershell
gcloud run services update ai-skill-gap-radar `
  --region asia-south1 `
  --min-instances 0 `      # Scale to zero when idle
  --max-instances 100 `    # Handle traffic spikes
  --concurrency 80         # Requests per instance
```

### Resource Allocation
```powershell
gcloud run services update ai-skill-gap-radar `
  --region asia-south1 `
  --memory 2Gi `           # Increase for heavy workloads
  --cpu 2                  # More CPU for AI processing
```

---

## ✅ Deployment Checklist

Before deploying:
- [ ] Google Cloud SDK installed
- [ ] Project created and billing enabled
- [ ] `env.yaml` created with correct values
- [ ] Supabase URLs ready
- [ ] Gemini API key active

After deploying:
- [ ] App accessible at Cloud Run URL
- [ ] Updated Supabase redirect URLs
- [ ] Tested login/authentication
- [ ] Verified AI agents work
- [ ] Checked teacher dashboard
- [ ] Set up monitoring/alerts
- [ ] Shared URL with users

---

## 🎓 Next Steps

1. **Custom Domain:** Set up your own domain name
2. **SSL Certificate:** Automatic with Cloud Run
3. **CDN:** Enable Cloud CDN for faster loading
4. **Monitoring:** Set up Cloud Monitoring alerts
5. **Backup:** Configure Supabase backups
6. **CI/CD:** Set up GitHub Actions automation
7. **Load Testing:** Test with expected user load

---

## 📚 Resources

- **Quick Start:** [DEPLOY_QUICKSTART.md](./DEPLOY_QUICKSTART.md)
- **Full Guide:** [docs/GOOGLE_CLOUD_DEPLOYMENT.md](./docs/GOOGLE_CLOUD_DEPLOYMENT.md)
- **Cloud Run Docs:** https://cloud.google.com/run/docs
- **Next.js Deployment:** https://nextjs.org/docs/deployment

---

## 🆘 Support

**Script Issues:**
- Check script output for errors
- Verify Google Cloud permissions
- Ensure all prerequisites installed

**Runtime Issues:**
- Check Cloud Run logs
- Verify environment variables
- Test locally with Docker first

**Cost Concerns:**
- Monitor Cloud Console billing
- Set budget alerts
- Scale to zero when not in use

---

**🎉 Ready to deploy? Run `.\deploy-to-gcloud.ps1` and go live in 10 minutes!**
