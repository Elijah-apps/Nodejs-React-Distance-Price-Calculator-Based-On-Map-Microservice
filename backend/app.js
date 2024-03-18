const express = require('express'); // Express library
const bodyParser = require('body-parser'); // Express middleware

const app = express(); // Save Express function in a constant

app.use(bodyParser.json()); // Activate Express middleware

/******** Start Route Definition ********/

app.get('/', (req, res) => {
    res.send("Welcome to Node.js React Distance Price Calculator Microservice");
});

app.post('/calculate', (req, res) => {
    const { source, destination } = req.body;
    // Validate input
    if (!source || !destination) {
        return res.status(400).json({ error: 'Source and destination required' });
    }

    // Calculate distance
    const distance = calculateDistance(source, destination);

    // Implement your pricing logic based on distance
    // For simplicity, let's assume a flat rate of $0.1 per unit of distance
    const price = distance * 0.1;

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
    console.log(`Server is running on port localhost${PORT}`);
});
