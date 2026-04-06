
const accountModel = require("../models/account.model")


async function createAccountController(req , res )
{
    const user = req.user;

    const account = await accountModel.create(
        {
            user : user._id 
        }
    )

   //  populate user name

  const populatedAccount = await accountModel
    .findById(account._id)
    .populate("user", "name email");

  res.status(201).json({
    message: "account is created successfully",
    account: populatedAccount
  });
}

// exporting the controller 

module.exports = 
{createAccountController } ;