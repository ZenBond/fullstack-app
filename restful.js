import express from 'express';
const app = express();
import pg from 'pg';
const PORT = 8000;

app.use(express.json());
app.use(express.static('public'));

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

app.post('/api/:endpoint', async (req, res, next) => {
    try {
        console.log(req.body)
        const { endpoint } = req.params;
        const {name, age, team_id, city} = req.body;
        

        let query;
        let values;
        switch (endpoint) {
            case 'player':
                query = `INSERT INTO player (name, age, team_id) VALUES ($1, $2, $3) RETURNING *`;
                values = [name, age, team_id];
                break;
            case 'team':
                query = `INSERT INTO team (city, name) VALUES ($1, $2) RETURNING *`;
                values = [city, name];
                break;
            default:
            res.status(404).send(`NOT FOUND 🙃`);
            return;  
        }
        const result = await pool.query(query, values);
        res.status(200).json(result.rows)
    } catch (err) {
        next (err)
    }
})

app.put('/api/:endpoint/:id', async (req, res, next) => {
    try {
        const {id, endpoint} = req.params;
        const {name, age, team_id, city} = req.body;

        let query;
        let values;
        switch (endpoint) {
            case 'player':
                query = `UPDATE player SET name = $1, age = $2, team_id = $3 WHERE id = $4 RETURNING *`
                values = [name, age, team_id, id];
                break;
            case 'team':
                query = `UPDATE team SET city = $1, name = $2 WHERE id = $3 RETURNING *`
                values = [city, name, id];
                break;
            default:
                res.status(404).send(`NOT FOUND 🙃`);
                return;
        }
        const result = await pool.query(query, values);
        res.status(200).json(result.rows)
    } catch(err) {
        next(err)
    }
})

app.patch('/api/:endpoint/:id', async (req, res, next) => {
    try {
        const {id, endpoint} = req.params;
        const {name, age, team_id, city} = req.body;

        let query;
        let values;
        switch (endpoint) {
            case 'player':
                query = `UPDATE player SET name = $1, age = $2, team_id = $3 WHERE id = $4 RETURNING *`
                values = [name, age, team_id, id];
                break;
            case 'team':
                query = `UPDATE team SET city = $1, name = $2 WHERE id = $3 RETURNING *`
                values = [city, name, id];
                break;
            default:
                res.status(404).send(`NOT FOUND 🙃`);
                return;
        }
        const result = await pool.query(query, values);
        res.status(200).json(result.rows)
    } catch(err) {
        next(err)
    }
})

app.delete('/api/:endpoint/:id', async (req, res, next) => {
    try {
        const { id, endpoint } = req.params;

        let query;
        switch(endpoint) {
            case 'player':
                query = `DELETE FROM player WHERE id = $1 RETURNING *`;
                break;
            case 'team':
                query = `DELETE FROM team WHERE id = $1 RETURNING *`;
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
        next(err)
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
