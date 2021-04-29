const { Router } = require("express");
const hasToken = require("../middleware/auth.middleware");
const taskListController = require("../controllers/taskListController");
const router = Router();


router.get("/"               , hasToken, taskListController.getTasksList);
router.post("/"              , hasToken, taskListController.addTaskToList);
router.put("/:title"         , hasToken, taskListController.updateTaskInList);
router.delete("/:title"      , hasToken, taskListController.deleteTaskfromList);
router.put("/relocate/:title", hasToken, taskListController.relocateTask);

module.exports = router;