const express = require('express'); // Express library
const bodyParser = require('body-parser'); // Express middleware
const exphbs  = require('express-handlebars');
const { engine } = require('express-handlebars');

// import { engine } from 'express-handlebars';

// const template = Handlebars.compile("Name: {{name}}");
// console.log(template({ name: "Nils" }));

const app = express(); // Save Express function in a constant

app.use(bodyParser.json()); // Activate Express middleware

/******** Start Route Definition ********/
  
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/******** Start Route Definition ********/
 

// Set up Handlebars as the view engine
app.engine('handlebars',engine());
app.set('view engine', 'handlebars');

// Set up static files directory (for Tailwind CSS)
app.use(express.static('public'));

// Define route to render the centralized card form
app.get('/', (req, res, next) => {
    res.render('form', {
        pageTitle: 'Centralized Card Form',
        layout:false,
        
    });
});

app.post('/calculate', (req, res) => {
    const { source, destination,percost} = req.body;
    // Validate input
    if (!source || !destination) {
        return res.status(400).json({ error: 'Source and destination required' });
    }

    // Calculate distance
    const distance = calculateDistance(source, destination,percost);

    // Implement your pricing logic based on distance
    // For simplicity, let's assume a flat rate of $0.1 per unit of distance
    const price = distance * percost;

    res.json({ distance, price });
});

/******** End Route Definition ********/

function calculateDistance(source, destination) {
    return Math.abs(source - destination);
}

// OpenAPI definition
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json'); // Your OpenAPI JSON file

// Serve OpenAPI documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port localhost:${PORT}`);
});
