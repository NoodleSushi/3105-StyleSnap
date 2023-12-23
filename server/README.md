# StyleSnap Server

## API Documentation

Swagger API documentation can be accessed `http://<host>/api-docs/`

## Recommended Requirements

- Node.js v20.10.0
- MySQL 8.0.35

## Setup Instructions

### 1. Setup .env file in root directory

example:

```env
SERVER_PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PORT=3306
DB_PASSWORD=password
DB_DATABASE=stylesnap
CORS_ORIGIN=http://localhost:5173
ACCESS_TOKEN_SCERET=2538855f1e59c42ad943b70abc774b2789ea7d94d82f57804229e64060c46491825d6f73f36b7a105ce76d7301b1516d66cb2cb72613b664530f7bbc416bbb97
REFRESH_TOKEN_SECRET=2afcddf0b4c26258cf0c53e861a281736d4113c8796271c649622e06ed8ee6be3c3821092956848b34b5c91100ccb96016c9d8b394e182628c837b6b7fe4bea4
```

### 2. Install Node modules

```console
npm install
```

### 3. Initialize Database

If an existing database has already been initialized, this command deletes the database and initializes a new one.

```console
npm run init-db
```

### 4. Run Server

For normal startup:

```console
npm run start
```

For dev testing:

```console
npm run dev
```
