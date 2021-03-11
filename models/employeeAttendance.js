const mongoose=require('mongoose');
const Schema=mongoose.Schema;


const EmployeeAttendanceSchema=new Schema({
    day:{
        type: String,
        index: true,
        required: true
    },
    employeeID:{
        type: Number,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    attendance:[
        {
            punchType:{
                type: String // IN=true OUT=false
            },
            punchTime:{
                type: String
            }
        }
    ],
    workHours:{
        type: String
    }
},{timestamps:true});

const EmployeeAttendance=mongoose.model('employeeAttendance',EmployeeAttendanceSchema);

module.exports=EmployeeAttendance;