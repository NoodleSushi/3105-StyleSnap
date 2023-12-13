# StyleSnap Server

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
```

### 2. Install Node modules

```console
npm install
```

### 3. Initialize Database

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
