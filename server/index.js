const express = require('express');
const path = require('path');
const { Pool } = require('pg');
const PORT = 3000;
const app = express();

const pool = require('pg');

pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'favlinksAPI',
    password: 'root',
    port: 5472,
})

const clientPath = path.resolve(__dirname, '../client/favlinks/dist');

app.use(express.static(clientPath));
app.use(express.json());

app.get("/", (req, res) => {
    res.sendFile(path.resolve("../client/favlinks/dist", "index.html"))
})

app.get("/api/favlinks", (req, res) => {
    pool.Query(`SELECT * FROM favlinks`, (error, result) => {
        if (error) {
            console.log(error)
            res.status(500).send('Internal Server Error');
        } else {
            res.status(200).json(result);
        }
    })
})

app.post("/api/favlinks/new", (req, res) => {
    const { name, url } = req.body;

    pool.Query(`INSERT INTO favlinksAPI (name, link) VALUES ($1, $2)`, [name, url], (error, result) => {
        if (error) {
            console.log(error)
            res.status(500).send('Internal Server Error');
        } else {
            res.status(204).json("Created new link");
        }
    })
})

app.post("/api/favlinks/edit", (req, res) => {
    const { id, name, url } = req.body;

    pool.Query(`UPDATE favlinksAPI SET name = $1, url = $2 WHERE ID = $3`, [name, url, id], (error, result) => {
        if (error) {
            console.log(error)
            res.status(500).send('Internal Server Error');
        } else {
            res.status(204).json("Updated link");
        }

    })
})

app.post("api/favlinks/delete/:id", (req, res) => {
    const id = Number(req.params.id)

    pool.Query(`DELETE FROM favlinksAPI WHERE id = $1`, [id], (error, result) => {
        if (error) {
            console.log(error)
            res.status(500).send('Internal Server Error');
        } else {
            res.status(200).json("Deleted link");
        }

    })
})

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})