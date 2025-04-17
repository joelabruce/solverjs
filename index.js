require('dotenv').config();

const keys = require('./keys');
const redis = require('redis');
const redisClient = redis.createClient({
    host: keys.redisHost,
    port: keys.redisPort,
    retry_strategy: () => 1000
});

const pool = require('./db');
function test(item) {
    return parseInt(test);
}

const sub = redisClient.duplicate();
sub.on('message', (channel, message) => {
    redisClient.hSet('values', message, test(message));
});
sub.subscribe('insert');

//redisClient.connect();
//redisClient.set('test', 0);

const express = require('express');
const app = express();

const jwt = require('jsonwebtoken');

app.use(express.json());
app.use(express.urlencoded({extended: true }));

app.get('/', (req, res) => {
    var test = Math.random(); 
    //redisClient.get('test', (err, valueItem) => {
        res.send('changed editor again 28');
        //redisClient.set('test', parseFloat(test));
    //});
});

app.post('/purchase', (req, res) => {
    // Check database for email and machine id
    // If a match exists, do not register
    // Otherwise return success

    email = req.body.email;
    purchase_key = "This should be cryptographically secure";
    pool.execute('CALL Purchase(?, ?)', [email, purchase_key], (err, results) => {
        if (err) {
          console.error('Error executing query: ', err);
          return res.status(500).send('Database query failed');
        }
        //console.log(successful);
        res.json(results);
    });
});

app.post('/login', (req, res) => {
    // Authenticate
    console.log(req.body);
    email = req.body.email;
    machine_id = req.body.machine_id;

    pool.execute('CALL AttemptLoginOrRegister(?, ?)', [email, machine_id], (err, results) => {
        if (err) {
          console.error('Error executing query: ', err);
          return res.status(500).send('Database query failed');
        }

        //res.json(results);

        const serverdata = results[0][0];

        if (serverdata.success > 0) {
            const payload = { userSession: "stuff" };
            const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET);
            res.json( { accessToken: token });
        }
        else {
            res.json( { error: 'Authentication failed' });
        }
    });
});

app.listen(8081, () => {
    console.log('Listening on port 8081');
});

function authenticateToken(req, res, next) {
    const authHeaders = req.headers['authorization'];
    const token = authHeader && authHeaders.split(' ')[1];

    if (!token) res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, userSession) => {
        if (err) return res.sendStatus(403)

        req.userSession = userSession
        next();
    })
}