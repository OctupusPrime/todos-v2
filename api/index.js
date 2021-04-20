const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")

const authRouter = require("./router/auth.routes")
const tasksRoutes = require("./router/tasks.routes")
const app = express()

app.use(bodyParser.json())
app.use(express.urlencoded({extended: true}))

app.use("/auth", authRouter)
app.use("/tasks", tasksRoutes)

mongoose.connect("mongodb+srv://MishaSokil:Warmisha_333444@todos.fhsuf.mongodb.net/todos", {
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useFindAndModify: false,
    useCreateIndex: true
})

module.exports = {
    path: "/api/",
    handler: app
}