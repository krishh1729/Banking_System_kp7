const express = require("express");

const authMiddleware = require("../middleware/auth.middleware")


const router = express.Router();

const accountController = require("../controller/account.controller")

/**
 * 
 *  POST /api/accounts
 * 
 *   Create a new Account
 * 
 *   Protected Route
 * 
 */


router.post("/",authMiddleware.authMiddleware,accountController.createAccountController) ;




module.exports = router;