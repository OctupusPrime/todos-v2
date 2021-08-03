const { Router } = require("express");
const { body } = require("express-validator");
const hasToken = require("../middleware/auth.middleware");
const authController = require("../controllers/authController");
const router = Router();

router.post("/reg", 
    [
        body("email", "Uncorrect email").isEmail(),
        body("password", "Uncorrect length").isLength({min: 6, max:15})
    ], authController.register);

router.post("/log", authController.login);
router.post("/logout", authController.logout);
router.post('/refresh-token', hasToken, authController.refreshToken);

module.exports = router