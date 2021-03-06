const TaskList = require("../models/TaskList")
const mongoose = require('mongoose')

function getTasksList(arr) {
    if (arr.length === 0) {
      return [{
        columTitle: "New",
        taskList: []
        },{
            columTitle: "Processed",
            taskList: []    
        },{
            columTitle: "Done",
            taskList: []         
        }]
    }
    arr.sort((a, b) => (a.index > b.index) ? 1 : -1)
    return Object.values(
        arr.reduce((acc, task) => {
        let status = task.status

        let content = {
           title: task.title,
           description: task.description,
           prioraty: task.prioraty,
           deadline: task.deadline
        }
        if (!acc[status]) {
            acc["New"] = { columTitle: "New", taskList: [] },
            acc["Processed"] = { columTitle: "Processed", taskList: [] },  
            acc["Done"] = { columTitle: "Done", taskList: [] }
        }  
        acc[status].taskList.push(content)
        return acc
      }, {})
    )
}

async function changeIndexUnder(index, taskIndex, status, arrLg, userId) {//Поменять местами имена
    for (let x = 0; x < arrLg; x++) {
        if (x <= index && x > taskIndex) {
            await TaskList.findOneAndUpdate(
                {"author": userId, "context.status": status}, 
                { $set: { "context.$[element].index" : x - 1 } },
                { arrayFilters: [ {'element.index': x} ] })
        }                    
    }
}

async function changeIndexOver(index, taskIndex, status, arrLg, userId) {
    for (let x = arrLg -1; x > -1; x--) {
        if (x >= index && x < taskIndex) {
            await TaskList.findOneAndUpdate(
                {"author": userId, "context.status": status}, 
                { $set: { "context.$[element].index" : x + 1 } },
                { arrayFilters: [ {'element.index': x} ] })
        }                    
    }
}

class TaskListController {
    async getTasksList(req, res) {
        try {
            const tasks = await TaskList.findOne({"author": req.user.userId})//.populate('author')
            return res.send(getTasksList(tasks.context))
        } catch(e) {
            console.log(e);
            return res.status(500).json({message: "Server error"})
        }  
    }

    async addTaskToList(req, res) {
        try {
            let task; 
            const {title, description, deadline, prioraty} = req.body

            if (!title)//Check title qurery
                return res.status(400).json({message: "Title can not be empty"})

            const existedTasks = await TaskList.findOne({"author": req.user.userId, "context.title": title})//Check title in arrray
            if (existedTasks)
                return res.status(404).json({message: `Tasks with title ${ title } already exist`})

            const statusNewTasksArr = await TaskList.aggregate([//Find all status New
                {"$match": {"author": mongoose.Types.ObjectId(req.user.userId)}},
                {"$unwind": "$context"},
                {"$match": {"context.status": "New"}},
                {"$project": {_id: 0, context: "$context"}}
            ])        
            task = {
                title: title,
                description: description,
                deadline: Number(deadline) || null,
                prioraty: prioraty,
                index: statusNewTasksArr.length
            }         

            await TaskList.findOneAndUpdate(
                { "author": req.user.userId }, 
                { $push: { context: task } }
            );
            return res.send(task)
        } catch(e) {
            console.log(e);
            return res.status(500).json({message: "Server error"})
        }  
    }

    async updateTaskInList(req, res) {
        try {
            const {title, description, deadline, prioraty} = req.body
    
            const existedTask = await TaskList.findOne({"author": req.user.userId, "context.title": req.params.title})//Check Title
            if (!existedTask)
                return res.status(404).json({message: `Tasks with title ${ title } not found`})
    
            const updateTasks = await TaskList.findOne({"author": req.user.userId, "context.title": title})//Check Updated title
            if (req.params.title !== title && updateTasks)
                return res.status(404).json({message: `Tasks with title ${ title } already exist`})
            let update = {}
            if (title) 
                update['context.$.title'] = title
            if (prioraty)
                update['context.$.prioraty'] = prioraty
            if (deadline)
                update['context.$.deadline'] = deadline
            if (description || description === '')
                update['context.$.description'] = description

            await TaskList.updateOne({"author": req.user.userId, "context.title": req.params.title}, { $set: update })  
            return res.send({message: "Task was updated"})
        } catch(e) {
            console.log(e)
            return res.status(500).json({message: "Server error"})
        }
    }

    async deleteTaskfromList(req, res) {
        try {
            var deletedTask = await TaskList.findOne({"author": req.user.userId, "context.title": req.params.title})//Check Title
            if (!deletedTask)
                return res.status(404).json({message: `Tasks with title ${ req.params.title } not found`})
            deletedTask = deletedTask.context.find((obj => obj.title === req.params.title))

            await TaskList.findOneAndUpdate({ "author": req.user.userId }, { $pull: { "context": { "title": req.params.title } }}, { safe: true });//На delete не переделать (удалится весь обьект)
            
            const thisStatusTaskArr = await TaskList.aggregate([//Get array of status
                {"$match": {"author": mongoose.Types.ObjectId(req.user.userId)}},
                {"$unwind": "$context"},
                {"$match": {"context.status": deletedTask.status}},
                {"$project": {_id: 0, context: "$context"}}
            ])

            changeIndexUnder(thisStatusTaskArr.length, deletedTask.index, deletedTask.status, thisStatusTaskArr.length + 1, req.user.userId)

            return res.send({message: "Task was deleted"})
        } catch (e) {
            console.log(e)
            return res.status(500).json({message: "Server error"})
        }
    }

    async relocateTask(req, res) {
        try {
            const{status, index} = req.body 

            var thisTask = await TaskList.findOne({"author": req.user.userId, "context.title": req.params.title})//Validate title
            if (!thisTask)
                return res.status(404).json({message: `Tasks with title ${ req.params.title } not found`})
            thisTask = thisTask.context.find((obj => obj.title === req.params.title))
            //For past colum
            const pastStatusColum = await TaskList.aggregate([//Get array contains of this status task//Dont work if function
                {"$match": {"author": mongoose.Types.ObjectId(req.user.userId)}},
                {"$unwind": "$context"},
                {"$match": {"context.status": thisTask.status}},
                {"$project": {_id: 0, context: "$context"}}
            ])

            changeIndexUnder(pastStatusColum.length, thisTask.index, thisTask.status, pastStatusColum.length, req.user.userId)
            //For next colum
            const thisStatusTaskArr = await TaskList.aggregate([//Get array contains of this status task//Dont work if function
                {"$match": {"author": mongoose.Types.ObjectId(req.user.userId)}},
                {"$unwind": "$context"},
                {"$match": {"context.status": status}},
                {"$project": {_id: 0, context: "$context"}}
            ])

            if (index < 0 || index > thisStatusTaskArr.length) {
                if (thisStatusTaskArr.length < 1)
                    return res.send({message: `Invalid position, max: 0 and min: 0`})
                else
                    return res.send({message: `Invalid position, max: ${thisStatusTaskArr.length} and min: 0`})
            }//Validate index

            await TaskList.findOneAndUpdate({"author": req.user.userId, "context.title": req.params.title},
                {$set: { "context.$.status": status, "context.$.index": thisStatusTaskArr.length + 1} })  

            if (thisTask.index - index < 0) //down
                changeIndexUnder(index, thisTask.index, status, thisStatusTaskArr.length + 1, req.user.userId)
            else //up 
                changeIndexOver(index, thisTask.index, status, thisStatusTaskArr.length + 1, req.user.userId)
            

            await TaskList.findOneAndUpdate({"author": req.user.userId, "context.title": req.params.title},
                {$set : {"context.$.index" : index}})


            return res.send({message: "Task was relocated"})
        } catch (e) {
            console.log(e)
            return res.status(500).json({message: "Server error"})
        }
    }
}

module.exports = new TaskListController()