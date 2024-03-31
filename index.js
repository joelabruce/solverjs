const redis = require('redis');
const redisClient = redis.createClient({
    host: 'redis-server',
    port: 6379
});
redisClient.set('test', 0);

const express = require('express');
const app = express();
app.get('/', (req, res) =>{
    var test = Math.random(); 
    redisClient.get('test', (err, valueItem) => {
        res.send(valueItem);
        redisClient.set('test', parseFloat(test));
    });
});

app.listen(8081, () => {
    console.log('Listening on port 8081');
});