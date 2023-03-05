# Phonebook Backend

https://phonebook-backend-lerg.onrender.com/api/persons

This is a Node.js backend application that implements a phonebook with basic CRUD operations. The application is accessible through RESTful APIs and is deployed to Render Cloud.

## API Endpoints

### GET /api/persons

This endpoint retrieves a list of phonebook entries. The response is a JSON array with the following format:

```json
[
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]
```

### GET /api/persons/:id
This endpoint retrieves a single phonebook entry with the specified id. If an entry for the given id is not found, the server responds with the status code 404 Not Found.

### POST /api/persons
This endpoint creates a new phonebook entry. The request body must be a JSON object with the following fields:
```json
{
    "name": "Prakash",
    "number": "9710838456"
}
```
The server generates a unique id for the new entry with the Math.random() function. If the name or number is missing, or if the name already exists in the phonebook, the server responds with the status code 400 Bad Request and an error message in the response body.

### DELETE /api/persons/:id
This endpoint deletes a single phonebook entry with the specified id. If an entry for the given id is not found, the server responds with the status code 404 Not Found.

### GET /info
This endpoint retrieves the number of phonebook entries and the time of the last request. The response is a plain text with the following format:
```json
Phonebook has {number} entries. 
Request received on {date} {time}.
```

### Development
To run the application in development mode:
```bash
npm run dev
```
This will start the server with nodemon, which will automatically restart the server whenever changes are made and saved to a file in the source code.

To start the application in production mode:
```bash
npm start
```

### Logging
The application uses the Morgan middleware for logging HTTP requests. The logs are printed to the console in the tiny format.
### Deployment
The application is deployed to Render Cloud and can be accessed at https://phonebook-backend-lerg.onrender.com/api/persons

To deploy the application to Render, follow these steps:

- Create an account on Render and create a new web service.
- Choose the GitHub repository where your code is located.
- Configure the build settings by selecting the Node.js environment and setting the start command to npm start.
- Deploy the application and wait for the build to complete.
- Access the application at the URL provided by Render.
