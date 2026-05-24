# MyRights Project Standards

## Project Goal
MyRights is a Hebrew RTL frontend app that helps adult children understand which rights, benefits, and allowances may apply to their aging parents.

## Main User
Adult child helping an aging parent.

## Current Module Scope
Frontend only.

Do not add:
- Backend
- Database
- API calls
- Real authentication
- Supabase integration
- OpenAI API integration
- Payments
- File uploads

Use static demo data only.

## User Flow
Home → Questionnaire → Dashboard → Right Details

## Routes
/ → Home
/questionnaire → Questionnaire
/dashboard → Dashboard
/right/:id → Right Details

## MVP Pages
1. Home
2. Questionnaire
3. Dashboard
4. Right Details

## Static Rights Data
Use demo rights:
- קצבת אזרח ותיק
- הנחה בתחבורה ציבורית
- השלמת הכנסה
- קצבת סיעוד

Each right should include:
- id
- title
- status
- shortDescription
- fullDescription
- officialSource
- officialUrl
- actionSteps

## Development Rules
Work in small steps.
Do not build the entire app in one prompt.
After each step, the app should still run in the browser.
Keep components reusable and simple.
Keep the UI Hebrew RTL and accessible.