require('dotenv').config();
const express = require('express')
const { connectToDb, getDb } = require('./db')
const cors = require('cors')

const app = express()
const PORT = process.env.PORT || 3000
const CLIENTURL = process.env.CLIENTURL || 'http://127.0.0.1:5500'

// add cors
app.use(cors({ origin: CLIENTURL }));

// db connection

let db

connectToDb((err) => {
    if(!err) {
        app.listen(PORT, () => {
            console.log(`Listening on port ${PORT}`)
        })
        db = getDb()
    }
})


app.get('/quizzes', (req, res) => {

    let quizzes = []
    db.collection('quizzes')
        .find()
        .sort({title: 1})
        .forEach(quiz => quizzes.push(quiz))
        .then(() => {
            res.status(200).json(quizzes)
        })
        .catch(() => {
            res.status(500).json({error: "Could not fetch Info"})
        })
})

app.get('/html', (req, res) => {

    let quizzes = []
    db.collection('quizzes')
        .findOne({title: 'HTML'})
        .then((resp) => {
            res.status(200).json(resp)
        })
        .catch(() => {
            res.status(500).json({error: "Could not fetch Info"})
        })
})

app.get('/css', (req, res) => {

    let quizzes = []
    db.collection('quizzes')
        .findOne({title: 'CSS'})
        .then((resp) => {
            res.status(200).json(resp)
        })
        .catch(() => {
            res.status(500).json({error: "Could not fetch Info"})
        })
})

app.get('/javascript', (req, res) => {

    let quizzes = []
    db.collection('quizzes')
        .findOne({title: 'JavaScript'})
        .then((resp) => {
            res.status(200).json(resp)
        })
        .catch(() => {
            res.status(500).json({error: "Could not fetch Info"})
        })
})

app.get('/accessibility', (req, res) => {

    let quizzes = []
    db.collection('quizzes')
        .findOne({title: 'Accessibility'})
        .then((resp) => {
            res.status(200).json(resp)
        })
        .catch(() => {
            res.status(500).json({error: "Could not fetch Info"})
        })
})