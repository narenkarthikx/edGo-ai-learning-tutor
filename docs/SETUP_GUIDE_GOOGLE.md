# Google Cloud & Gemini Integration Setup

## 1. Install Required Packages
```bash
npm install @google/generative-ai
npm install @google-cloud/speech
npm install @google-cloud/translate
npm install @google-cloud/language
npm install @google-cloud/bigquery
```

## 2. Environment Variables (.env.local)
```env
# Existing Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key

# Google Cloud
GEMINI_API_KEY=your_gemini_api_key
GOOGLE_CLOUD_PROJECT_ID=your_project_id
GOOGLE_APPLICATION_CREDENTIALS=path/to/service-account.json

# Google Analytics
GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

## 3. Google Cloud Project Setup
1. Create Google Cloud Project
2. Enable APIs:
   - Gemini AI API
   - Speech-to-Text API
   - Translate API
   - Natural Language API
   - BigQuery API
3. Create Service Account with proper permissions
4. Download credentials JSON

## 4. Gemini CLI Setup (for development)
```bash
npm install -g @google/generative-ai-cli
gemini-cli auth login
```

## 5. Quick Implementation Priority (Hackathon)
### Phase 1 (Day 1-2): Core AI Features
- ✅ Gemini-powered lesson generation
- ✅ Smart assessment questions
- ✅ Basic voice interaction

### Phase 2 (Day 2-3): Advanced Features  
- ✅ Real-time translation
- ✅ Speech assessment
- ✅ Predictive analytics

### Phase 3 (Day 3): Polish & Demo
- ✅ Google Analytics integration
- ✅ Performance optimization
- ✅ Demo preparation