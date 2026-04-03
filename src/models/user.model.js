const mongoose = require("mongoose");

const bcrypt = require("bcryptjs")

const userSchema = mongoose.Schema({

    email:{
        type : String,
        required : [true,"Email is reuired for creating an User "],
        trim : true,
        lowercase : true,
        match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
        unique : [true,"email already exists ! "]
    },
    name : 
    {
        type:String,
        required : [true," Name is reuired for creating an User "]
    },
    password:
    {
        type:String,
        required : [true," Password is reuired for creating an User Account  "],
        minlength : [6,"password should be of atleast 6 characters "],
        select : false
    }
},
{
   timestamps : true
}
)


userSchema.pre("save",async function()
{
     if(!this.isModified("password"))
     {
        return ;
     }

     const hash = await bcrypt.hash(this.password,10) ;
     this.password=hash ;

     return ;
})

userSchema.methods.comparePassword = async function(password)
{
    return bcrypt.compare(password,this.password);
}

const userModel = mongoose.model("user",userSchema);

module.exports = userModel ;