import express from 'express';
import articleRoutes from './routes/articleRoutes.js';


// address: http://localhost:5003 or 127.0.0.1:5003

// variable app represents your express application instance. Use this object to define routes, middleware, and other configurations for your server.
// Express() returns an object that listens for http requests

// This express() is a special object that has methods to define routes, add middleware, and start an HTTP server
// Think of app as the brain. It holds all the instructions for what URLs your API can respond to, how to process incoming requests and how to send responses and how to connect middlewar
const app = express();
const PORT = 5003;

// Middleware because express does not parse request bodies
app.use(express.json());

// tells express to start listening for incoming HTTP requests on the specified port (5003 in this case).
app.listen(PORT, () => console.log(`Server is running on: ${PORT}`));

// Browser made an HTTP GET request to the root URL ("/") of your server. Make a route handler for /
// Recall CRUD: Create (POST), Read (GET), Update (PUT), Delete (DELETE)

app.get('/', (req, res) => {
    res.send('This is the website for articles');
}
);


// Use the articleRoutes module to handle requests to the /articles endpoint
app.use('/articles', articleRoutes);