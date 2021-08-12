# Vaccine data 

## The assignment

This is an excercise project done for Solita. The assignment was to do a web app displaying "interesting informaton" regarding vaccine orders and vaccinations. 

*THL has ordered us to create a vaccination database which contains information about vaccine orders and vaccinations.
We have received files which contains the base data for the application
The Orders are in different files named by the manufacturer of a vaccine.
Injections must be used in 30 days after the arrival of the bottle.
[name].source "Zerpfy"|"Antiqua"|"SolarBuddhica"
The source file has one json item per line.

Make a web application for presenting some interesting data about the vaccinations.*

## The implementation

The app was created using React, Node.js, MongoDB & GraphQL (Apollo Server & Apollo Client). Jest was used to implement both frontend and backend tests. 

## Instructions 

To run the app, clone it to your computer. 

  git clone https://github.com/aniekar/vaccine-data.git

You'll need to create your own [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register) cluster to run this project (it's free). Follow the instructions provided on the [MongoDB Atlas website](https://docs.atlas.mongodb.com/getting-started/).
After you have your cluster up and running, you need to add a .env file to the root of your project, specifying the connection string for your cluster, and a separate connection string for a test database for running tests.
In this setup I've also specified the port in the .env file. If set the port to something other than 3001, remember to also adjust the HTTPLink passed to ApolloClient on in index.js in the react-ui folder. 

  MONGODB_URI=mongodb+srv://<username>:<password>@addressofyourcluster.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
  TEST_MONGODB_URI=mongodb+srv://<username>:<password>@addressofyourcluster.mongodb.net/myTestDatabase?retryWrites=true&w=majority
  PORT=3001



The project has separate package.jsons for the frontend and the backend. First, install dependencies :

  cd vaccine-data 

  npm install 

Start the server: 

  npm run dev or npm start 

Then do the same for the frontend: 

  cd react-ui 
  npm install 
  npm start 

To run the tests, run npm test either in vaccine-data or in the react-ui folder (there are two separate sets of tests). 




