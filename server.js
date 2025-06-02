import express from 'express';


// address: http://localhost:5003 or 127.0.0.1:5003

const app = express();
const PORT = 5003;

app.listen(PORT, () => console.log(`Server is running on: ${PORT}`));