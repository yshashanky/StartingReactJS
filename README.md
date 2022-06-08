## Learning ReactJS
### Full stack application using ReactJS
-----
### Technologies
- ReactJS
- NodeJS/Express
- REST
- MySQL
- SequilizeJS
-----
### Setup
- Tutorial series: https://www.youtube.com/playlist?list=PLpPqplz6dKxUaZ630TY1BFIo5nP-_x-nL
- Install NodeJS
- Install and setup SQL Workbench and Server
- We need two folder: client and server
-----
### Server Configurations
- open terminal in server folder
- commands:
    - npm init: Initialize NodeJS API
    - npm install express cors mysql2
        - express: Install Express
        - cors: to make connection between frontend, backend and server
        - mysql2: to use database
    - npm install nodemon: use to sync the changes by restarting server on its own
    - in pakage.json: add {"start": "nodemon index.js"} inside scripts
    - node index.js/npm start: to start backend server
    - npm install sequelize sequelize-cli: install ORM to easliy configure DB
    - sequelize init: initialize sequelize
        - several folders will be created, remove seeders and migrations folder
    - npm install cors: use to allow react to accept request coming from same origin
    - npm install bcrypt: to has password
    - npm install jsonwebtoken: to authenticate user
-----
### Database Configurations
- Create schema in DB, name = tutoraildb
- create posts.js file inside models folder
    - it will use to create post table in our DB
    - for each table we need one file
- update index.js to sync all the DB
- update config.json inside cofig folder to connect with DB
-----
### Client Configurations
- open terminal in server folder
- commands:
    - npx create-react-app . : create react application
    - npm install axios: to make api calls easily
    - npm start: to start react development server
    - Local: http://localhost:3000
    - On Your Network: http://192.168.1.37:3000
    - npm install react-router-dom: to enable multiple routes in our app
    - npm install formik: to create forms
    - npm install yup: to validate forms
    - npm install @mui/material @emotion/react @emotion/styled
    - npm install @mui/icons-material
-----
### Deploy the Application
- heroku for backend
- netlify for UI

### Completed the project as of now
