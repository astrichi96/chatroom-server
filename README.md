# Getting Started with Node Js, Express Js and Socket.io

Please check all points before to run the project, in order to prevent any issue or wrong configuration.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:4000](http://localhost:4000)

### `npm test`

Run the test available in the project, you can also check the coverage running the command with this param `npm test -- --coverage`

## Learn More

Please take in mind the next recomendations about the configurations tools, in order to use this app without problems

### Advanced Configuration

- Minimun Node Version: v12.5
- Install properly Mongo locally, in order to store the messages
- Install all external dependecies with `npm i`
- Set up the environment file `.env` with the values that you prefer, if you omit this step the project runs with the values by default (Please check the file named `config.js` in the project directory, this file you'll provide the variables that you need set up)

### Dependencies:

- **axios**: To get information from external services (APIs)
- **bcrypt**: To encrypt the user password (Log In or Sign Up)
- **express**: To handle the http methods and validations through middlewares
- **cors**: To handle the access to the app
- **csvjson**: To process files .csv and convert to JSON
- **jsonwebtoken**: To encrypt the user data and protect the entry points in the app
- **mongoose**: To handle the connection with the mongo database
- **dotenv**: To handle the variables that can be change in differents stages (DEV/STAGING/DEMO/PRODUCTION)
- **socket.io**: To handle the real-time communication (Bidirectional o dynamic)

### Testing dependencies

- **jest**
- **chat**
- **sinon**
- **supertest**
