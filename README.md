# StarterKit NodeJS

This is more than a starter kit : it provides an architecture to quickly start a project, but also tools to quickly develop NodeJS API.

<br />
<br />

## SETUP

 - Install dependencies : `yarn install`

 - Set .env file : `cp env/.env.local .env`

 - Run the app : `yarn run start`

<br />

## DOC
### Mikro-orm
https://mikro-orm.io/docs/installation

### Gestion des migrations
- Create initial migration : `npx mikro-orm migration:create --initial`
- Create new migration with current schema diff : `npx mikro-orm migration:create`
- Migrate up to the latest version : `npx mikro-orm migration:up`
- Migrate one step down : `npx mikro-orm migration:down`
- List all executed migrations : `npx mikro-orm migration:list`
- Check if schema is up to date : `npx mikro-orm migration:check`
- List all pending migrations : `npx mikro-orm migration:pending`
- Drop the database and migrate up to the latest version : `npx mikro-orm migration:fresh`

### Merger les modifs du template
 - Ajouter le template comme remote : `git remote add template https://github.com/GaillardQ/starterkit-nodejs.git`
 - Fetch : `git fetch --all`
 - Merger les modifications : `git merge template/main --allow-unrelated-histories`

<br />

## TODO
- Set Swagger for API documentation
- Add logging
- Set emailing system (SendInBlue and Gmail)
- Set connection for MySQL

- Set connection for MariaDB
- Set connection for MongoDB
- See to available GraphQL usage

