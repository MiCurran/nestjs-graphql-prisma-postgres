# GraphQL Server Example with NestJS (code-first)

## Getting started

### 1. Download example and install dependencies


Install npm dependencies:

```
npm install
```

Copy Example env:

```
cp .env.example .env
```

### 2. Create and seed the database

Run the following command to create your docker container with Postgres database. This also creates and seeds the `Player` table that is defined in [`prisma/schema.prisma`](./prisma/schema.prisma):

```
npm run db:dev:init
```

When `npx prisma migrate dev` is executed against a newly created database, seeding is also triggered. The seed file in [`prisma/seed.ts`](./prisma/seed.ts) will be executed and your database will be populated with the sample data.


### 3. Start the GraphQL server

Launch your GraphQL server and start the postgres container with this command:

```
npm run start:dev
```

Navigate to [http://localhost:3000/graphql](http://localhost:3000/graphql) in your browser to explore the API of your GraphQL server in a [GraphQL Playground](https://github.com/prisma/graphql-playground).

## Other Scripts Included  

```JSON
"scripts": {
    // shuts down the postgres container and removes it
    "db:dev:rm": "docker compose rm player_dev_db -s -f -v",
    // starts the postgres container in the background
    "db:dev:up": "docker compose up player_dev_db -d",
    // removes rows from the player table and resets auto-incrementing counts to 1
    "db:clean": "npm run clean && npx prisma db push --force-reset && npx prisma db push",
    // runs the above command then seeds the db from the ./prisma/seed.ts file
    "db:clean:seed": "npm run db:clean && sleep 1 && npx prisma db seed",
    // initialization for postgres container - push migrations - seed the db
    "db:dev:init": "npm run db:dev:up && sleep 1 && npx migrate dev && npx prisma db seed",
    "prebuild": "rimraf dist",
    "build": "nest build",
    "format": "prettier --write \"src/**/*.ts\" \"test/**/*.ts\"",
    "start": "nest start",
    // starts the postgres container + the nest dev server in --watch mode
    "start:dev": "npm run db:dev:up && nest start --watch",
    "start:debug": "nest start --debug --watch",
    "start:prod": "node dist/src/main",
    "lint": "eslint \"{src,apps,libs,test}/**/*.ts\" --fix",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:cov": "jest --coverage",
    "test:debug": "node --inspect-brk -r tsconfig-paths/register -r ts-node/register node_modules/.bin/jest --runInBand",
    "test:e2e": "jest --config ./test/jest-e2e.json",
    "clean": "ts-node prisma/cleanDb.ts"
  },
```

## Using the GraphQL API

The schema that specifies the API operations of your GraphQL server is defined in [`./schema.graphql`](./schema.graphql). Below are a number of operations that you can send to the API using the GraphQL Playground.

Feel free to adjust any operation by adding or removing fields. The GraphQL Playground helps you with its auto-completion and query validation features.

### Create a new player

```graphql
mutation {
  initPlayer(data: { gameId: 12 }) {
    id
    gameId
    sentAttacks
  }
}
```

<details><summary><strong>See more API operations</strong></summary>

### Find Player by ID

```graphql
query {
  findPlayer(id: 12) {
    id
    gameId
    sentAttacks
  }
}
```

### Send Attack From Player

```graphql
mutation {
  sendAttack(id: 4){
    gameId
    sentAttacks
    hits
}
}
```

</details>

## Evolving the app

Evolving the application typically requires two steps:

1. Migrate your database using Prisma Migrate
1. Update your application code

For the following example scenario, assume you want to add a "profile" feature to the app where users can create a profile and write a short bio about themselves.

### 1. Migrate your database using Prisma Migrate

The first step is to add a new table, e.g. called `characters`, to the database. You can do this by adding a new model to your [Prisma schema file](./prisma/schema.prisma) file and then running a migration afterwards:

```diff
// schema.prisma

model Player {
  id        Int      @id @default(autoincrement())
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  name String
  remaining_health Int
+ characterId Int?
+ isActive Boolean?
}

+model Character {
+  id     Int     @default(autoincrement()) @id
+  initial_health Int
+  bio    String?
}
```

Once you've updated your data model, you can execute the changes against your database with the following command:

```
npx prisma migrate dev
```

### 2. Update your application code

You can now use your `PrismaClient` instance to perform operations against the new `Profile` table. Here are some examples:

#### Create a new character

```ts
const character = await prisma.character.create({
  data: { name: "Guile", initial_health: 10, bio: "Sonic Boom" }
});
```

## Next steps

- Check out the [Prisma docs](https://www.prisma.io/docs)
- Share your feedback in the [`prisma2`](https://prisma.slack.com/messages/CKQTGR6T0/) channel on the [Prisma Slack](https://slack.prisma.io/)
- Create issues and ask questions on [GitHub](https://github.com/prisma/prisma/)
- Watch our biweekly "What's new in Prisma" livestreams on [Youtube](https://www.youtube.com/channel/UCptAHlN1gdwD89tFM3ENb6w)