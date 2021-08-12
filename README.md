# Vaccine data 

This is an excercise project done for Solita. The assignment was to do a web app displaying "interesting data" regarding vaccine orders and vaccinations. 

## The implementation

The app was created using React, Node.js, MongoDB & GraphQL (Apollo Server & Apollo Client). Jest was used to implement both frontend and backend tests. 
When starting the app, the initial data files provided as a part of the assignment are processed and loaded to the MongoDB database. To avoid duplicates any pre-existing data is erased before this. This setup is of course purely for development purposes. 

## Instructions 

To run the app, clone it to your computer. 

 ```shell
 git clone https://github.com/aniekar/vaccine-data.git
 ```

You'll need to create your own [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register) cluster to run this project (it's free). Follow the instructions provided on the [MongoDB Atlas website](https://docs.atlas.mongodb.com/getting-started/).

After you have your cluster up and running, you need to add a .env file to the root of your project, specifying the connection string for your cluster, and a separate connection string for a test database for running tests.

In this setup I've also specified the port for the server in the .env file. If you set the port to something other than 3001, remember to also adjust the HTTPLink passed to ApolloClient in index.js in the react-ui folder. 

 MONGODB_URI=mongodb+srv://<username>:<password>@addressofyourcluster.mongodb.net/myFirstDatabase?retryWrites=true&w=majority 
 TEST_MONGODB_URI=mongodb+srv://<username>:<password>@addressofyourcluster.mongodb.net/myTestDatabase?retryWrites=true&w=majority   
 PORT=3001

The project has separate package.jsons for the frontend and the backend. First, install dependencies :

  ```shell
  cd vaccine-data 

  npm install 
  ```

Start the server: 

  ```shell
  npm run dev
  ````

Then do the same for the frontend: 

```shell
 cd react-ui 
 npm install 
 npm start 
 ```

To run the tests, run ```shell npm test``` either in the vaccine-data or the react-ui folder (there are two separate sets of tests). 




