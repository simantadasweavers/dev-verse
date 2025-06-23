const mongoose = require('mongoose');
const { Schema } = mongoose;

const contactSchema = new Schema({
    name: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    subject: String,
    message: String,
});

module.exports = { contactSchema }