const express = require('express');
const path = require('path');
const PORT = 3000;
const app = express();

const clientPath = path.resolve(__dirname, '../client/favlinks/dist');

app.use(express.static(clientPath));

app.get("/", (req, res) => {
    res.sendFile(path.resolve("../client/favlinks/dist", "index.html"))
})

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})