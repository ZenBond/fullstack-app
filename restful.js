import express from 'express';
const app = express();
import pg from 'pg';
const PORT = 8000;

const { Pool } = pg;
const pool = new Pool ({
    user: 'zendo',
    host: 'localhost',
    database: 'basketball',
    port: '5432'
})


app.get(`/api/:endpoint`, async (req, res, next) => {
    try {
        const { endpoint } = req.params;

        let query;

        switch (endpoint) {
            case 'player':
                query = `SELECT * FROM player`;
                break;
            case 'team':
                query = `SELECT * FROM team`;
                break;
            default:
                res.status(404).send('NOT FOUND ☹️');
                return;
        }
        const result = await pool.query(query);
        res.status(200).send(result.rows);
    } catch (err) {
        next(err);
    }
    
})

app.get(`/api/:endpoint/:id`, async (req, res, next) => {
    try {
        const { id, endpoint } = req.params;

        if(isNaN(id)) {
            const err = new Error('NOT FOUND 🙃');
            err.status = 404;
            throw err;
        }

        let query;
        switch(endpoint) {
            case 'player':
                query = `SELECT * FROM player WHERE id = $1`;
                break;
            case 'team':
                query = `SELECT * FROM team WHERE id = $1`;
                break;
            default:
                res.status(404).send('NOT FOUND ☹️');
                return;
        }
        const result = await pool.query(query, [id]);
        if (result.rows.length === 0) {
            const err = new Error('NOT FOUND 🙃');
            err.status = 404;
            throw err;
        }
        res.status(200).send(result.rows)
    } catch (err) {
        next(err);
    }
})



app.use((req,res,next) => {
    const err = new Error('NOT FOUND 🙃');
    err.status = 404;
    next(err);
})


app.use((err, req, res, next) => {
    res.status(err.status).json({error: err.message});
})

app.listen(PORT, (req, res) => {
    console.log(`Listening on port: ${PORT}`)
})
