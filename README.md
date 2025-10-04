# User-service

Welcome to the User-servise!
This project developed with the help of framework Express, Node.js and couchDB database, it is a service for working with users.

## Running the App in Development Mode.

1. Navigate to the root directory of the project.
2. Open new terminal window.
3. Install User-service dependencies by running the following command:
   > npm install
4. Install the couchDB database from the official website on your computer locally and register with it (login and password).
5. Using the received login and password, configure the variable COUCHDB_CONFIG in the config.js application file:
   COUCHDB_CONFIG = 'http://login:password@127.0.0.1:5984'
6. Run App in the development mode with hot reload feature:
   > npm run dev
   > npm start (running the App in Production Mode)
7. After executing this command, the following messages should appear in the terminal:
   Server running on port 5000.
   Database 'users' created.
8. Server will be running at the 'http:/127.0.0.1:5000/'('http:/localhost:5000/').
9. A database named "users" was automatically created in couchDB. There is no information in the created database!
10. The application is ready to work.

## Documentation

### The user model in the couchDB contains:

    {
      fullName :'string'|| 'fullName',
      dateOfBirth : 'string' || 'dateOfBirth',
      email : 'string',
      password : 'string',
      role : 'string' || 'user',
      isActive = boolean || true
    }

### App endpoints:

1. $/api/users/register - POST request for user registration. The request "body" contains an object with user data according to the above user model, in the JSON format. The "email" and "password" object properties are required.

2. $/api/users/login - POST request for user authorization. The request "body" contains an object with user data according to the above user model, in the JSON format. The "email" and "password" object properties are required (only the "email" and "password" properties can be specified in the object).

3. $/api/users/:id - GET request for a user to retrieve their data from the database (couchDB) after authorization. The "authorization" property and its value — "jwtToken" obtained after authorization—must be included in the request header, separated by a space (as in "authorization": "Bearer jwtToken"). When authorizing as an admin, this request can retrieve database data for any user by id by specifying the "id" property and its value "\_id from the couchDB" in the request header. By default (if the additional "id" property is not specified in the request header), the admin will retrieve data from the database for all users.

4. $/api/users/:id/block - PUT request to block a user (themselves) after authorization. The "authorization" property and its value — "jwtToken" received after authorization—must be included in the request header, separated by a space (as in "authorization":"$ jwtToken"). When authorizing as an admin, this request can be used to block database data for any user by id. By additionally specifying the "id" property and its value, "\_id from the DB," in the request header.
