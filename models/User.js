const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const UserSchema=new Schema({
    name:{
        type:String,
        required: true
    },
    username:{
        type:String,
        index:true,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    contact:{
        type: String,
        required: true
    },
    status:{
        type: String, // Active & Inactive
    },
    log:[
        {
            punchType:{
                type: String // IN & OUT
            },
            punchTime:{
                type: String
            }
        }
    ]
},{timestamps:true});

const User=mongoose.model('User',UserSchema);

module.exports=User