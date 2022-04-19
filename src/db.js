const mongoose = require('mongoose');

//using mongoose models
const ReviewSchema = mongoose.Schema({
    name: String,
    semester: String,
    year: String,
    professor: String,
    review: String,
});

mongoose.model('Review', ReviewSchema);

mongoose.connect('mongodb://localhost/hw07', (err, database) => {
    if (err) {
        return console.log(err);
    } else {
        console.log('Connected to database');
    }
});