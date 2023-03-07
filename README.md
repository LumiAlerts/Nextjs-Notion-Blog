# No BS Advice Blog

A Next.js + Notion Blog that can be easily deployed, built and developed on top of.

## Development
### Setup
Edit the `.env` file to contain the following variables
```
NOTION_KEY=...
NOTION_DATABASE_ID=...
NOTION_QUESTION_DATABASE_ID=...
NOTION_NEWS_LETTER_DATABASE_ID=...
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