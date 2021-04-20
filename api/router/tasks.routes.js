const { Router } = require("express")
const authMiddleware = require("../middleware/auth.middleware")
const taskListController = require("../controllers/taskListController")
const router = Router()


router.get("/"               , authMiddleware, taskListController.getTasksList)
router.post("/"              , authMiddleware, taskListController.addTaskToList)
router.put("/:title"         , authMiddleware, taskListController.updateTaskInList)
router.delete("/:title"      , authMiddleware, taskListController.deleteTaskfromList)
router.put("/relocate/:title", authMiddleware, taskListController.relocateTask)

module.exports = router