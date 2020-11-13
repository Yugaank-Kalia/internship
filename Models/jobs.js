const mongoose = require('mongoose');

const jobSchema = mongoose.Schema({
    job_title : {
        type : String,
        required : true
    },
    location : {
        type : String,
        required : true
    },
    company : {
        type : String,
        required : true
    },
    salary : {
        type : Number,
        required : true
    }
})

module.exports = mongoose.model("Jobs", jobSchema);