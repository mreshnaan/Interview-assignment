## Getting Started

To get started with this project, follow these steps:

1. Clone the repository repo: `https://github.com/mreshnaan/interview-assignment.git`
2. Install dependencies: `cd your-repo && npm install` (frontend or backend)
3. Choose a database provider: You can use either SQLite or PostgreSQL. Modify the provider in the Prisma schema file `./prisma/schema.prisma:`
   For SQLite: provider = "sqlite" `https://www.prisma.io/docs/orm/overview/databases/sqlite`
   For PostgreSQL: provider = "postgresql"
4. Before staing the project run these script to push the schema to db `npm run db:push` or `npx prisma generate` and seed the data `npm run seed`
5. Copy the contents of `.env.example` into a new file called `.env` and fill in the appropriate values for your environment

## Login credientials

seed users

user 1
`email : user1@example.com`
`password : password123`

user 2

`email : user2@example.com`
`password : password123`

## Scripts

- `npm run dev`: Start the Node js in development mode
- `npm run test`: to uni test
- `build`: Build the Node application

## Frontend Start

- Install dependencies: `npm i`
- Copy the contents of `.env.example` into a new file called `.env` and fill in the appropriate values for your environment
- Start the ReactJs project: `npm run dev`

## Backend Start

- Install dependencies: `npm i`
- Copy the contents of `.env.example` into a new file called `.env` and fill in the appropriate values for your environment
- Setup ur db url and run this code: `npx prisma db push`
- Before starting the project seed the data: `npm run seed`
- Start the NodeJS server: `npm run dev`
- Check the db Data: `npm run studio`
- Reset the db data : `npx prisma db push --force-reset`

## Database Management

- To setup the prisma schema to your database : `npx prisma db push`
- To reset the db data : `npx prisma db push --force-reset`
- To apply database migrations: `npx prisma migrate dev`
- To reset the database: `npx prisma migrate reset`
- To update the Prisma client: `npx prisma generate`

## Environment Variables

Make sure to set the following environment variables:

- `DATABASE_URL`: URL for your database connection
- `DIRECT_URL`: URL for your database connection

## Contributing

Feel free to contribute to this project by opening issues or pull requests.
