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

### Merger les modifs du template
 - Ajouter le template comme remote : `git remote add template https://github.com/GaillardQ/starterkit-nodejs.git`
 - Fetch : `git fetch --all`
 - Merger les modifications : `git merge template/main --allow-unrelated-histories`

<br />

## TODO
- Handle migrations
- Set Swagger for API documentation
- Add logging
- Set emailing system (SendInBlue and Gmail)
- Set connection for MySQL

- Set connection for MariaDB
- Set connection for MongoDB
- See to available GraphQL usage

