# Product Feedback
Community product feedback that moves through a life cycle: suggestion -> planned -> in-progress -> live.

Live site: https://product-feedback.dlindegren.com

Created with:
- [TypeScript](https://www.typescriptlang.org/)
- [React](https://reactjs.org/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [React Final Form](https://final-form.org/react)
- [Fastify](https://www.fastify.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [Knex](https://knexjs.org/)

## Installation

##### Clone Repository
```
git clone https://github.com/onosendi/product-feedback.git && cd product-feedback
```

### NPM
Install dependencies

```
npm install
```

### Client

#### Environment variables

Create an `.env` file in the `client` directory with:
```ini
REACT_APP_API_BASE_URL=http://localhost:8000
```

### Server

#### Environment variables

Create an `.env` file in the `server` directory with:
```ini
APP_HOST=localhost
APP_PORT=8000
APP_SECRET=my secret

DB_NAME=product_feedback
DB_USER=product_feedback
DB_PASSWORD=product_feedback
DB_DEBUG=false
```

#### PostgreSQL

Enter PostgreSQL shell with administrator privileges
```
psql postgres
```

Create database, user, grant privileges and set superuser
```sql
create database product_feedback;
create user product_feedback with encrypted password 'product_feedback';
grant all privileges on database product_feedback to product_feedback;
alter user product_feedback with superuser;
```

##### Migrate
```
npm -w server run migrate:latest
```

##### Seeds
```
npm -w server run seed:mandatory
```

Optionally, populate the database with fake data
```
npm -w server run seed:all
```

##### Create Administrator
Administrators are able to edit all feedback, and move feedback between planned, in-progress, and live life cycles.

First run the dev server and register a user, then in a PostgreSQL shell (`psql product_feedback`):
```sql
update "user" set role = 'admin' where username = 'registered username here';
```

### Run Development Server
```
npm run dev
```
