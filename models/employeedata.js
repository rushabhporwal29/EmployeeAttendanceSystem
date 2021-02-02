const mongoose= require('mongoose');
const Schema= mongoose.Schema;

const employeeDataSchema= new Schema({
    name:{
        type: String,
        required: true,
    },
    contact:{
        type: String,
        required: true
    },
    city:{
        type: String,
        required: true
    },
    address:{
        type: String,
    },
    email:{
        type: String
    },
    employeeID:{
        type: Number,
        index:{unique:true},
        required: true
    }
},{timestamps:true});

const EmployeeData=mongoose.model('PersonalInfo',employeeDataSchema);

module.exports= EmployeeData;

