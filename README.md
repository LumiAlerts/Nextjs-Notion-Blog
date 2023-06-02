# Notion CMS Blog

A Next.js + Notion Blog that can be easily deployed, built and developed on top of.

## Development
### Setup
Edit the `.env` file to contain the following variables
```
NOTION_KEY=...
NOTION_DATABASE_ID=...
NOTION_QUESTION_DATABASE_ID=...
NOTION_NEWS_LETTER_DATABASE_ID=...
NEXT_PUBLIC_SITE_NAME="Notion CMS Blog"
NEXT_PUBLIC_SITE_MOTTO_FOOTER="A simple blog built with on Next.js and Notion"
NEXT_PUBLIC_SITE_MOTTO_NAV="A simple blog built with on Next.js and Notion"
```

```
git clone git@github.com:LumiAlerts/no-bs-advice.git
cd no-bs-advice
yarn
```


### Running
```
yarn dev
```

### Building
```
yarn build
yarn start #runs the build locally
```

## Deploying
### Vercel
create a Vercel account and connect new vercel account to Repo and deploy.