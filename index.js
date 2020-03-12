require('dotenv').config();
const dbConnect = require('./database');

const express = require('express');
const index = express();
const cors = require('cors');

const port = process.env.PORT;
index.set('port', port);

index.use(express.json());
index.use(cors());

index.use((request, response, next) => {
    console.log(`${request.method} ${request.url}`);
    next();
});


index.post('/users', async (request, response) => {
    const db = await dbConnect();
    const userObj = {
        name: request.body.userName,
        age: request.body.age
    };
    db.collection('users').insertOne(userObj, (error, result) => {
        if (error) {
            const error = `'MongoDB error : ${error}`;
            response
                .status(500)
                .send(error);
            return;
        }
        response
            .status(200)
            .send(result);
    });
});

index.get('/users', async (request, response) => {
    const db = await dbConnect();
    const userName = request.query.userName;

    db.collection('users').findOne({name: userName}, (mongoError, userObj) => {
        if (mongoError) {
            const error = `'MongoDB error : ${mongoError}`;
            response
                .status(500)
                .send(error);
            return;
        }
        response
            .status(200)
            .send(userObj);
    });

});

index.listen(index.get('port'), () => {
    console.log(`Server Listens on Port ${index.get('port')}`);
});




