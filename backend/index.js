//import dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const passport = require('passport');

const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123',
    database: 'debts_db'
});

const app = express();

const questions = [];

app.use(helmet());
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('combined'));
app.use(
    session({
        secret: 'fraggle-rock', //pick a random string to make the hash that is generated secure
        resave: false, //required
        saveUninitialized: false //required
    })
);
app.use( (req, res, next) => {
  console.log('req.session', req.session);
  return next();
});


app.get('/', (req, res) => {
    connection.query('SELECT * from debts', function (err, rows, fields) {
        if (!err) {
            console.log('The solution is: ', rows);
            //const qs = rows;
            res.send(rows);
        }
        else {
            console.log('Error while performing Query.');
        }
    });



});

app.get('/:id', (req, res) => {
    connection.query('SELECT * from debts WHERE id = ' + parseInt(req.params.id), function (err, rows, fields) {
        if (!err) {
            console.log('Debt: ', rows);
            //const qs = rows;
            if (rows > 1) return res.status(500).send();
            if (rows === 0) return res.status(404).send();
            res.send(rows[0]);
        }
        else {
            console.log('Error while performing Query.');
        }
    });
});

app.post('/', (req, res) => {
    const {person_id, sum, description, is_borrow} = req.body;
    const newDebt = [person_id, sum, description, is_borrow];
    console.log('Put: ', newDebt);
    connection.query('INSERT INTO debts (person_id, sum, description, is_borrow) VALUES (?, ?, ?, ?)', newDebt, function (err, rows) {
        if (err) {
            console.log('Error while performing Query.');
        }
    });
    res.status(200).send();
});

app.post('/login', (req, res) => {
    console.log('user login');
    const login = req.body.login;
    const password = req.body.password;
    console.log('Find: ', login);
    connection.query('SELECT password FROM users WHERE login = '+login, function (err, rows, fields) {
        if (!err) {
            console.log('password: '+rows[0].password);
            if(rows[0].password === password) {
                res.status(200).send();
            }
        } else {
            console.log('Error while performing Query.');
        }
    });
    req.session.login = req.body.login;
    res.end()
});

app.post('/signup', (req, res) => {
    console.log('user signup');
    const {login, email, password} = req.body;
    const newUser = [login, email, password];
    console.log('Put: ', newUser);
    connection.query('INSERT INTO users (login, email, password) VALUES (?, ?, ?)', newUser, function (err, rows) {
        if (err) {
            console.log('Error while performing Query.');
        }
    });
    req.session.login = req.body.login;
    res.end()
});


app.post('/close/:id', (req, res) => {
    const id = req.body.id;
    console.log('Close: ', id);
    connection.query('DELETE FROM debts WHERE id = ' + id, function (err, rows) {
        if (err) {
            console.log('Error while performing Query.');
        }
    });
    res.status(200).send();
    //res.redirect('back');
});

app.post('/answer/:id', (req, res) => {
    const {answer} = req.body;

    const question = questions.filter(q => (q.id === parseInt(req.params.id)));
    if (question.length > 1) return res.status(500).send();
    if (question.length === 0) return res.status(404).send();

    question[0].answers.push({
        answer,
    });

    res.status(200).send();
});

app.listen(8081, () => {
    connection.connect();

    connection.query('SELECT * from debts', function (err, rows, fields) {
        if (!err)
            console.log('The solution is: ', rows);
        else
            console.log('Error while performing Query.');
    });


    console.log('listening on port 8081');
});