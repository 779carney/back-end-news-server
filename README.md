# Back End News API

# Setup 

Fork this repo and then clone it 

You will need to create two .env files for your project: .env.test and .env.development. Into each, add PGDATABASE=<database_name_here>, with the correct database name for that environment (see /db/setup.sql for the database names). Double check that these .env files are .gitignored.

You'll need to run npm install to install relevent packages to this project




This project is a back-end server for managing and serving news articles using PostgreSQL (PSQL) as the database. The server provides API endpoints to handle CRUD (Create, Read, Update, and Delete) operations on news articles and categories.

# Setup
To set up the server and database, follow these steps:

Clone the Repository: Clone this repository to your local machine.

Install Dependencies: Run npm install to install the necessary dependencies.

Database Setup: Install PostgreSQL on your machine if you haven't already. Create a new database and update the connection string in config.js with your database credentials.

You will need to create two .env files for your project: .env.test and .env.development. Into each, add PGDATABASE=<database_name_here>, with the correct database name for that environment (see /db/setup.sql for the database names). Double check that these .env files are .gitignored.

Initialize Database: Run npm run seed to set up the necessary tables in your PostgreSQL database.

Start the Server: Run npm start to start the server.



