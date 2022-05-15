# TODO List - Backend
Application that allows you to create projects and activities and mark them whenever they are completed

## Database ERD
![image](prisma/ERD.svg)

## To Run Application
1. copy .env.default to .env and modify the values
2. docker-compose up
3. npm install
4. npx prisma migrate dev
5. npm run dev

## To recreate a ERD model
npx prisma generate