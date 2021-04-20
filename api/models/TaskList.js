const {Schema, model, ObjectId} = require("mongoose")

let date = new Date()
date.setDate(date.getDate() + 1);

const context = new Schema({
    title: {required: true, type: String},
    description: {type: String, default: ""},
    deadline: {type: Number, default: date},
    prioraty: {type: String, default: "low"},
    status: {type: String, default: "New"},
    index: {type: Number}
},{_id: false})

const TaskList = new Schema({
    author: {type: Schema.Types.ObjectId, ref: 'User'},
    context: {type:[context], default: null}
})

module.exports = model("TaskList", TaskList)