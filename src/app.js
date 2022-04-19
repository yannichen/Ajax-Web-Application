const DEFAULT_AIT_PORT = 3000;

// database setup
require('./db');
const mongoose = require('mongoose');

// express
const express = require('express');
const app = express();

// static files
const path = require("path");
const publicPath = path.resolve(__dirname, "public");
app.use(express.static(publicPath));

// body parser
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'hbs');

const Review = mongoose.model('Review');

app.get('/api/reviews', function(req, res) {
    // TODO: retrieve all reviews or use filters coming in from req.query
    // send back as JSON list
    if (req.query.year.length > 0 || req.query.semester.length > 0) {
        if (req.query.year.length > 0 && req.query.semester.length > 0) {
            const temp = Review.find({ year: { $eq: req.query.year } });
            const reviews = temp.find({ semester: { $eq: req.query.semester } });
            res.json(reviews.map(function(ele) {
                return {
                    'name': ele.name,
                    'semester': ele.semester,
                    'year': ele.year,
                    'review': ele.review
                };
            }));
        } else if (req.query.year.length > 0) {
            const temp = Review.find({ year: { $eq: req.query.year } });
            res.json(temp.map(function(ele) {
                return {
                    'name': ele.name,
                    'semester': ele.semester,
                    'year': ele.year,
                    'review': ele.review
                };
            }));
        } else {
            const reviews = Review.find({ semester: { $eq: req.query.semester } });
            res.json(reviews.map(function(ele) {
                return {
                    'name': ele.name,
                    'semester': ele.semester,
                    'year': ele.year,
                    'review': ele.review
                };
            }));
        }
    } else {
        Review.find({}, function(err, m) {
            res.json(m.map(function(ele) {
                return {
                    'name': ele.name,
                    'semester': ele.semester,
                    'year': ele.year,
                    'review': ele.review
                };
            }));
        });
    }
});

app.post('/api/review/create', (req, res) => {
    // TODO: create new review... if save succeeds, send back JSON
    // representation of saved object
    (new Review({
        name: req.body.name,
        semester: req.body.semester,
        year: req.body.year,
        review: req.body.review
    })).save((err, review) => {
        if (err) {
            console.log(err);
            res.json(err);
        } else {
            res.json(review);
        }
    });
});

app.listen(process.env.PORT || DEFAULT_AIT_PORT, (err) => {
    console.log('Server started (ctrl + c to shut down)');
});