const mongoose = require('mongoose');
let { Schema } = mongoose;

const BlogSchema = new Schema({
    title: { type: String, require: true },
    content: { type: String, require: true },
    excerpt: String,
    slug: { type: String, require: true, unique: true },
    thumbnail: String,
    userId: { type: Schema.Types.ObjectId, ref: 'User' }
});

module.exports = BlogSchema;