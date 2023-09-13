# HNGx-stage-two-simple-CRUD-API

## Introduction
This API allows users to make CRUD operations such as create, read, update and delete on a person stored in mongodb database

## Setup and usage
### 1. Clone repo:
```
git clone
```
### 2. Install dependencies in package.json:
```
npm install [dependecies]
```
### 3. Create .env file and set db server:
```
DB_SERVER = "mongodb://127.0.0.1:27017/person"
```
### 4. Run command below to start:
```
npm run server
```

## Base URL
https://hngx-ayinenongre.onrender.com

## Endpoints
### 1. Add a person
Endpoint: /api<br>
Description: Adds a person to a database<br>
Example use case:
https://hngx-ayinenongre.onrender.com/api
### Body:
```
{
  name: ayine-nongre
}
```
### Response:
#### Success:
```
{
  name: ayine-nongre
  id: 123
}
```
### Failure:
```
{
  Message: Make sure all spaces are filled
}
```
#### Error:
```
{
  Message: Error creating person
}
```

### 2. Get a person
Endpoint: /api/:user_id<br>
Description: Gets a person from database<br>

Example use case:
https://hngx-ayinenongre.onrender.com/api/ayine-nongre
### Response:
#### Success:
```
{
  name: ayine-nongre
  id: 123
}
```
### Failure:
```
{
  Message: There are no records of user with name ayine-nongre
}
```

#### Error:
```
{
  Message: Error fetching person
}
```

### 3. Update a person
Endpoint: /api/:user_id<br>
Description: Deletes a person from database<br>

Example use case:
https://hngx-ayinenongre.onrender.com/api/ayine-nongre
### Body:
```
{
  name: Jake
}
```
### Response:
#### Success:
```
{
  name: Jake
  id: 123
}
```
### Failure:
```
{
  Message: No new data passed to be updated
}
```

#### Error:
```
{
  Message: Error updating person
}
```

### 4. Delete a person
Endpoint: /api/:user_id<br>
Description: Deleres a person from database<br>

Example use case:
https://hngx-ayinenongre.onrender.com/api/Jake
### Response:
#### Success:
```
{
  name: Jake
  id: 123
}
```
### Failure:
```
{
  Message: Can't delete person if name is not given
}
```

#### Error:
```
{
  Message: Error deleting person
}
```
