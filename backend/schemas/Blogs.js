const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
mongoose.plugin(slug);

let { Schema } = mongoose;

const BlogSchema = new Schema({
    title: { type: String, require: true },
    content: { type: String, require: true },
    excerpt: String,
    slug: { type: String, slug: "title"},
    // slug: { type: String, slug: "title", unique: true, slug_padding_size: 4 },
    thumbnail: String,
});

module.exports = BlogSchema;