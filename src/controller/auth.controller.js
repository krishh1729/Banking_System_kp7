
const userModel = require("../models/user.model")

const emailService = require("../services/email.service")

const jwt = require("jsonwebtoken")
/**
 * 
 *   user register controller 
 * 
 *  POST  /api/auth/register 
 * 
 * 
 */

async function userRegisterController(req, res) {
  try {
    const { email, name, password } = req.body;

    // 🔹 Only check presence
    if (!email || !name || !password) {
      return res.status(400).json({
        message: "All fields are required",
        status: "failed"
      });
    }

    // 🔹 Normalize email
    const cleanEmail = email.trim().toLowerCase();

    // 🔹 Check existing user
    const isExists = await userModel.findOne({ email: cleanEmail });

    if (isExists) {
      return res.status(409).json({
        message: "User already exists",
        status: "failed"
      });
    }

    // 🔹 Create user (schema handles validation + hashing)
    const user = await userModel.create({
      email: cleanEmail,
      name: name.trim(),
      password
    });

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "3d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict"
    });

    res.status(201).json({
      user: {
        _id: user._id,
        email: user.email,
        name: user.name
      },
      token
    });

    await emailService.sendRegistrationEmail(user.email, user.name);

  } catch (err) {

    // 🔥 IMPORTANT: Handle mongoose validation errors
    if (err.name === "ValidationError") {
      return res.status(400).json({
        message: err.message,
        status: "failed"
      });
    }

    console.error(err);

    return res.status(500).json({
      message: "Internal server error",
      status: "failed"
    });


  }
}

/**
 * 
 *   user LOGIN controller 
 * 
 *  POST  /api/auth/login
 * 
 * 
 */

async function userLoginController(req,res)
{
   const { email , name , password } = req.body;
   
   const user = await userModel.findOne({
    email : email
   }).select("+password")

    if (!user)
    {
        return res.status(401).json({
            message : "user does not exist , user not found! ",
            status : "failed "
        })
    }

    const isValidPassword = await user.comparePassword(password);

    if(!isValidPassword)
    {
        return res.status(401).json({
            message : "Invalid credentials ! wrong password ! ",
            status : "failed "
        })
    }


   
    const token = jwt.sign({userId:user._id},process.env.JWT_SECRET,{
        expiresIn : "3d"
    });

    res.cookie("token",token);


    res.status(200).json({
        user:{
            _id:user._id,
            email:user.email,
            name:user.name

        },
      token
    })

}




module.exports={
    userRegisterController,
    userLoginController

}