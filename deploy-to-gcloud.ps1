# AI Skill Gap Radar - Google Cloud Deployment Script
# This script automates the deployment to Google Cloud Run

param(
    [string]$ProjectId = "",
    [string]$Region = "asia-south1",
    [string]$ServiceName = "ai-skill-gap-radar"
)

# Color output functions
function Write-Success { param($msg) Write-Host "✅ $msg" -ForegroundColor Green }
function Write-Info { param($msg) Write-Host "ℹ️  $msg" -ForegroundColor Cyan }
function Write-Warning { param($msg) Write-Host "⚠️  $msg" -ForegroundColor Yellow }
function Write-Error { param($msg) Write-Host "❌ $msg" -ForegroundColor Red }

Write-Host @"
╔════════════════════════════════════════════════════════════╗
║     AI Skill Gap Radar - Google Cloud Deployment          ║
║                  Automated Setup Script                    ║
╚════════════════════════════════════════════════════════════╝
"@ -ForegroundColor Cyan

# Step 1: Check prerequisites
Write-Info "Checking prerequisites..."

try {
    $gcloudVersion = gcloud version 2>$null
    if ($LASTEXITCODE -ne 0) {
        Write-Error "Google Cloud SDK not found. Please install from: https://cloud.google.com/sdk/docs/install"
        exit 1
    }
    Write-Success "Google Cloud SDK is installed"
} catch {
    Write-Error "Google Cloud SDK not found. Please install from: https://cloud.google.com/sdk/docs/install"
    exit 1
}

# Step 2: Get or set project ID
if (-not $ProjectId) {
    $currentProject = gcloud config get-value project 2>$null
    if ($currentProject) {
        Write-Info "Current project: $currentProject"
        $useCurrentProject = Read-Host "Use this project? (Y/n)"
        if ($useCurrentProject -eq "" -or $useCurrentProject -eq "Y" -or $useCurrentProject -eq "y") {
            $ProjectId = $currentProject
        } else {
            $ProjectId = Read-Host "Enter your Google Cloud Project ID"
        }
    } else {
        $ProjectId = Read-Host "Enter your Google Cloud Project ID"
    }
}

Write-Info "Setting project to: $ProjectId"
gcloud config set project $ProjectId

# Step 3: Check for env.yaml
Write-Info "Checking environment configuration..."
if (-not (Test-Path "env.yaml")) {
    Write-Warning "env.yaml not found. Creating from .env.local..."
    
    if (Test-Path ".env.local") {
        $envContent = Get-Content ".env.local"
        $yamlContent = "# Environment variables for Cloud Run`n"
        
        foreach ($line in $envContent) {
            if ($line -match "^([^#=]+)=(.+)$") {
                $key = $matches[1].Trim()
                $value = $matches[2].Trim()
                # Skip DEV URLs
                if ($key -notlike "*DEV*") {
                    $yamlContent += "${key}: `"${value}`"`n"
                }
            }
        }
        
        $yamlContent | Out-File -FilePath "env.yaml" -Encoding UTF8
        Write-Success "Created env.yaml from .env.local"
        Write-Warning "Please review env.yaml and update NEXT_PUBLIC_PROD_SUPABASE_REDIRECT_URL after deployment"
    } else {
        Write-Error "Neither env.yaml nor .env.local found. Please create env.yaml with your environment variables."
        exit 1
    }
}

# Step 4: Enable required APIs
Write-Info "Enabling required Google Cloud APIs (this may take a few minutes)..."
$apis = @(
    "run.googleapis.com",
    "cloudbuild.googleapis.com",
    "artifactregistry.googleapis.com"
)

foreach ($api in $apis) {
    Write-Info "Enabling $api..."
    gcloud services enable $api --project=$ProjectId
}
Write-Success "All APIs enabled"

# Step 5: Create Artifact Registry repository
Write-Info "Creating Artifact Registry repository..."
$repoExists = gcloud artifacts repositories describe $ServiceName --location=$Region 2>$null
if ($LASTEXITCODE -ne 0) {
    gcloud artifacts repositories create $ServiceName `
        --repository-format=docker `
        --location=$Region `
        --description="AI Skill Gap Radar Docker images" `
        --project=$ProjectId
    Write-Success "Artifact Registry repository created"
} else {
    Write-Info "Artifact Registry repository already exists"
}

# Step 6: Build and push Docker image
Write-Info "Building Docker image (this will take 5-10 minutes)..."
$imageName = "$Region-docker.pkg.dev/$ProjectId/$ServiceName/${ServiceName}:latest"

Write-Host "`n🏗️  Building image: $imageName`n" -ForegroundColor Yellow

gcloud builds submit --tag $imageName --project=$ProjectId

if ($LASTEXITCODE -ne 0) {
    Write-Error "Docker build failed. Check the logs above for errors."
    exit 1
}
Write-Success "Docker image built and pushed successfully"

# Step 7: Read environment variables from env.yaml
Write-Info "Loading environment variables from env.yaml..."
$envVars = @()
$envContent = Get-Content "env.yaml"
foreach ($line in $envContent) {
    if ($line -match "^([^#:]+):\s*[`"]?([^`"]+)[`"]?") {
        $key = $matches[1].Trim()
        $value = $matches[2].Trim().Trim('"')
        $envVars += "${key}=${value}"
    }
}

# Step 8: Deploy to Cloud Run
Write-Info "Deploying to Cloud Run..."
Write-Host "`n🚀 Deploying service: $ServiceName`n" -ForegroundColor Yellow

$envVarsString = $envVars -join ","

gcloud run deploy $ServiceName `
    --image $imageName `
    --platform managed `
    --region $Region `
    --allow-unauthenticated `
    --port 8080 `
    --memory 1Gi `
    --cpu 1 `
    --min-instances 0 `
    --max-instances 10 `
    --timeout 300 `
    --set-env-vars $envVarsString `
    --project=$ProjectId

if ($LASTEXITCODE -ne 0) {
    Write-Error "Deployment failed. Check the logs above for errors."
    exit 1
}

# Step 9: Get the service URL
$serviceUrl = gcloud run services describe $ServiceName --region $Region --format 'value(status.url)' --project=$ProjectId

Write-Host @"

╔════════════════════════════════════════════════════════════╗
║               🎉 DEPLOYMENT SUCCESSFUL! 🎉                  ║
╚════════════════════════════════════════════════════════════╝

"@ -ForegroundColor Green

Write-Host "🌐 Your application is live at:" -ForegroundColor Cyan
Write-Host "   $serviceUrl`n" -ForegroundColor Yellow

Write-Host "📋 Next Steps:" -ForegroundColor Cyan
Write-Host "   1. Update Supabase Authentication URLs:" -ForegroundColor White
Write-Host "      - Go to Supabase Dashboard → Authentication → URL Configuration" -ForegroundColor Gray
Write-Host "      - Add: $serviceUrl" -ForegroundColor Gray
Write-Host "`n   2. Update env.yaml with production URL:" -ForegroundColor White
Write-Host "      NEXT_PUBLIC_PROD_SUPABASE_REDIRECT_URL: `"$serviceUrl`"" -ForegroundColor Gray
Write-Host "`n   3. Test your application:" -ForegroundColor White
Write-Host "      - Login as student/teacher" -ForegroundColor Gray
Write-Host "      - Test AI agents" -ForegroundColor Gray
Write-Host "      - Verify flashcards load" -ForegroundColor Gray
Write-Host "`n   4. View logs:" -ForegroundColor White
Write-Host "      gcloud run services logs tail $ServiceName --region $Region" -ForegroundColor Gray
Write-Host "`n   5. Monitor in Cloud Console:" -ForegroundColor White
Write-Host "      https://console.cloud.google.com/run?project=$ProjectId" -ForegroundColor Gray

Write-Host "`n💡 Useful Commands:" -ForegroundColor Cyan
Write-Host "   Update service:  gcloud run services update $ServiceName --region $Region" -ForegroundColor Gray
Write-Host "   View logs:       gcloud run services logs tail $ServiceName --region $Region" -ForegroundColor Gray
Write-Host "   Redeploy:        .\deploy-to-gcloud.ps1" -ForegroundColor Gray

Write-Host "`n🎓 Documentation: docs\GOOGLE_CLOUD_DEPLOYMENT.md`n" -ForegroundColor Cyan

Write-Success "Deployment complete! Your app is ready to use."
