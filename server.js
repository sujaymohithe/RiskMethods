const express = require('express');
const app = express();
const port = process.env.port || 5000

app.use(express.static('src'));

app.listen(port, () => 
console.log(`Node app running on port ${port}`));