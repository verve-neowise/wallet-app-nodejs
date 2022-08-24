# JWT AUTH STARTER

### For initialize db:
1. create .env file on root directory and fill it with the following variables:
```bash
DATABASE_URL="postgresql://<user>:<password>@<host>:5432/<db>"
JWT_SECRET="B2E38F44187B4541A55DEEABA9AEA"
JWT_EXPIRATION_TIME="2h"
```
2. fill db with sample data:
```bash
npm run db:init
```
3. run server:
```bash
npm run start:dev
```