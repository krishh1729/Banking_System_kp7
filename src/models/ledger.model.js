const mongoose = require("mongoose");

const ledgerSchema = new mongoose.Schema({
   
    account :{
        type : mongoose.Schema.Types.ObjectId,
        ref : "account" ,
        required : [true,"Ledger must be associated with an Account "],
        index : true,
        immutable : true,
    },
    amount : {
        type : Number,
        required : [true,"Amount must be required to create a ledger entry "],
        immutable : true,
    },
    transaction:{
         type : mongoose.Schema.Types.ObjectId,
         ref : "transaction" ,
        required : [true,"Ledger must be associated with a Transaction "],
        index : true,
        immutable : true,
    },
    type :
    {
        type:String ,
        enum :{
            values : ["CREDIT" , "DEBIT"],
            message : " Type can be either DEBIT or CREDIT "
        },
        required : [true,"Ledger type is required "],
        immutable : true
    }
    
},
{
    timestamps : true
})

function preventLedgerModification()
{
    throw new Error("Ledger entries are immutable , cannot be modified or deleted ! ");
}

ledgerSchema.pre('findOneAndUpdate',preventLedgerModification) ;
ledgerSchema.pre('findOneAndDelete',preventLedgerModification) ;
ledgerSchema.pre('findOneAndReplace',preventLedgerModification) ;
ledgerSchema.pre('deleteMany',preventLedgerModification) ;
ledgerSchema.pre('updateMany',preventLedgerModification) ;
ledgerSchema.pre('deleteOne',preventLedgerModification) ;
ledgerSchema.pre('updateOne',preventLedgerModification) ;
ledgerSchema.pre('replaceOne',preventLedgerModification) ;
ledgerSchema.pre('remove',preventLedgerModification) ;




const ledgerModel = mongoose.model("ledger",ledgerSchema);

module.exports = ledgerModel ;