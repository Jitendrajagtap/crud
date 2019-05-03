const mongoose = require('mongoose');
const db = require('./../config/database');
var Schema = mongoose.Schema;

const schema = new mongoose.Schema({
    full_name:'string',
    email_id:'string',
});

module.exports = mongoose.model('user', schema );