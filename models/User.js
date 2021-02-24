const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const UserSchema=new Schema({
    name:{
        type:string,
        required
    },
    username:{
        type:string,
        index:true,
        required
    },
    password:{
        type: String,
        required
    },
    contact:{
        type: String,
        required
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