const keys = require('./keys');
const redis = require('redis');
const redisClient = redis.createClient({
    host: keys.redisHost,
    port: keys.redisPort,
    retry_strategy: () => 1000
});

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
app.get('/', (req, res) =>{
    var test = Math.random(); 
    //redisClient.get('test', (err, valueItem) => {
        res.send('changed editor again 26');
        //redisClient.set('test', parseFloat(test));
    //});
});

app.listen(8081, () => {
    console.log('Listening on port 8081');
});