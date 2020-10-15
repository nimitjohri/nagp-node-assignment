const mongoose = require('mongoose')
const jwt = require('jsonwebtoken');

const Schema = mongoose.Schema;

const PositionSchema = new Schema({
    projectname: String,
    clientname: String,
    technologies: [String],
    role: String,
    jobdescription: String,
    status: Boolean,
    createdby: String
})

PositionSchema.methods.validateRequest = function() {
    const decodedToken = jwt.decode(string)
    console.log('decoded token', decodedToken);
}


module.exports = mongoose.model('Position', PositionSchema);
