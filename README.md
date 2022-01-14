# HelloBuild
 Is a Project that allows an user to login into the system using JWT, DOCKER, MONGODB, NODEJS, REACT and BCRYPT
 
 -----
 ## Required for the project
 - For this project mongodb instance has been created with [Docker](https://www.docker.com/get-started) and [Docker-Compose](https://docs.docker.com/compose/)
 - [NodeJS](https://nodejs.org/es/)
 - [React](https://es.reactjs.org/)
 -----
 ## Before you get the project Running
 As the nature of security it is a env.example file has been added (in both backend and frontend) this file tells you which fields you have to complete
 to the settings of connections working
 
 This allows to have a personal experience and portability within the development project.
 ## Steps to get the project Running
 1. Clone the Repo.
 2. Open the `Hellobuild` folder with this command `cd HelloBuild`
 3. Once You've entered open the database folder with `cd database`
 4. Run the next command `docker-compose up --build`
 5. Got to the backend folder `cd ..` then `cd backend`
 6. Install the libraries listed by running the command `npm install`
 7. Initialize the backend API server with the comand `npm start`
 8. Go to the React folder with `cd ..` and then `cd frontend`
 9. Install all the dependencies with `npm install`
 10. Initialize the frontend with `npm start`
