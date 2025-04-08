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
    // Connect to database
    // Check if email and the machine id are in the database
    // If the email and machine id match, then success, otherwise fail

    console.log(req.body);
    email = req.body.email;
    machine_id = req.body.machine_id;

    pool.execute('CALL AttemptLoginOrRegister(?, ?)', [email, machine_id], (err, results) => {
        if (err) {
          console.error('Error executing query: ', err);
          return res.status(500).send('Database query failed');
        }
        //console.log(successful);
        res.json(results);
    });
    // pool.getConnection((err, connection) => {
    //     if (err) {
    //       console.error('Error connecting to the database:', err);
    //       return res.status(500).send('Database connection failed');
    //     }
        
    //     console.log('Successfully connected to the database!');
    //     connection.release(); // Release the connection back to the pool
    //     res.send('Database connection successful');
    // });
});

app.listen(8081, () => {
    console.log('Listening on port 8081');
});