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
    - 