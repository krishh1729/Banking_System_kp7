const mongoose = require("mongoose") ;

const transactionSchema = new mongoose.Schema({

    fromAccount : {

        type : mongoose.Schema.Types.ObjectId , 
        ref : "account" ,
        required : [true , "Transaction must be associated with a from Account"] ,
        index : true
    } ,

     toAccount : {

        type : mongoose.Schema.Types.ObjectId , 
        ref : "account" ,
        required : [true , "Transaction must be associated with a from Account"] ,
        index : true
    } ,

    status :{
        type: String ,
        enum : {
            values : ["PENDING","FAILED","REVERSED","COMPLETED"] ,
            message : "Status can be either PENDING , COMPLETED , FAILED or REVERSED ",
        },
         default : "PENDING"
    } ,

    amount : {

        type : Number ,
        required : [true , "Amount is required to create a Transaction"],
        min : [0,"Amount must be positive , cannot be negative ! "]
    },

    idempotencyKey :{
        type : String,
        required : [true," Idempotency Key is required to create a Transaction "],
        index : true ,
        unique : true ,
    }

     
},
    {
        timestamps : true 
    }
)

const transactionModel = mongoose.model("transaction",transactionSchema) ;

module.exports = transactionModel ;