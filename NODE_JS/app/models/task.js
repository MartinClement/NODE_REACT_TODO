const mongoose = require('mongoose');

/* *** *** IMPORTS *** *** */

const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  title: { type: String, required: true},
  description: String,
  createdAt : Date,
  updatedAt : Date,
  deadLine : Date,
  complete: Boolean,
});

module.exports = mongoose.model('Tasks', TaskSchema);
