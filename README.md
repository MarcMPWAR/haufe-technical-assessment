# Your Project Name

## Work Environment

For my local environment, I used the following versions:

- Node.js: 20.8.1
- npm: 10.1.0
- mongodb: 6.3.0

Development tools:
- Visual Studio Code
- Postman
- Google Chrome
- Mongosh (To perform queries in the db)

## System Setup

Follow these steps to set up the project:

1. Clone the repository to your local system.
2. Navigate to the "frontend" folder and run `npm install`.
3. Create a .env file in the "frontend" folder with the specified configurations.
4. Navigate to the "backend" folder and run `npm install`.
5. Create a .env file in the "backend" folder with the specified configurations.
7. Navigate to `\src` and run the command `node server.js` to start the server.
8. Run the command `npm start` in the "frontend" folder to start the frontend application.
9. Navigate to the URL and port of your frontend to create a user in the signup screen.

**Frontend .env Example:**
REACT_APP_API_HOST=localhost
REACT_APP_API_PORT=3001
REACT_APP_API_PROTOCOL=http

**Backend .env Example:**
PORT=3001
MONGODB_URI=mongodb://localhost:27017/haufe-assessment
JWT_SECRET=your_secret


## Database proposal

I opted for an MongoDB because it was super easy to set up, thanks to the entire documentation as well as I'm familiar with such this kind of databases (NoSQL).

## Authentication

Token-based authentication was implemented using JSON Web Tokens (JWT). I think it was enough for the kind of data managed in this application.

# Project structure

## Frontend folders

- **Public folder:** General files being accessible accross al areas.

Inside the "src" folder:

- **Actions:** Contains action creators for Redux. Actions are payloads of information that send data from the application to the store. 
- **Components:** Contains all reusable React components.
- **Contexts:** Contains React Context providers.
- **Hooks:** Holds custom React hooks.
- **Interfaces:** Contains TypeScript interface definitions.
- **Pages:** Stores the LandingPage.
- **Styles:** Includes all the stylings.

- **App.tsx** and **index.tsx**

## Frontend Libraries

Appart from React, I've used:
- Redux: A state management library.
- React Router: A library for handling navigation
- axios: For making HTTP calls.
- Redux Toolkit: Toolset for efficient Redux development.

## Backend folders

Inside of the src we can find:

- **Config**: Application settings, middleware.
- **Models**: Database structure definitions.
- **Routes**: API endpoint handlers.
- **Services**: Reusable helper methods.

- **server.js**

## Backend Libraries

- **axios**: HTTP client for making requests.
- **bcrypt**: Password hashing for security.
- **body-parser**: Parse incoming request bodies.
- **cors**: Enable Cross-Origin Resource Sharing.
- **dotenv**: Load environment variables.
- **express**: Web application framework.
- **jsonwebtoken**: Create and verify JWT tokens.
- **mongodb**: MongoDB driver for Node.js.
- **mongoose**: MongoDB ODM for modeling data.
- **passport**: Authentication middleware.
- **passport-jwt**: JWT strategy for Passport.
- **passport-local**: Local strategy for Passport.

## Known Limitations

- Refresh token system.
- Testing not implemented. I've started doing it but I was running out of time.
- CI/CD not configured.
- A lot of improvement can be done in styling.
- Missing pagination and preload

## Future Work

Proposed improvements:

- Improve UI to use some CSS preprocessors like SASS or LESS (will avoid having repeated classes)
- If the data grows a lot, probably a pre state of better handling the loading would be good.
- Finish backend testing and do the frontend one.
- Implement a password recovery system.
- Configure CI/CD process.
- Drink a beer to celebrate!

