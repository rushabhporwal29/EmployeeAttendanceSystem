const AttendanceData=require('../models/employeeAttendance');
const EmployeeData=require('../models/employeedata');
const Extensions=require('./extensions');


const attendance_details_get=(req,res)=>{
    AttendanceData.find().sort({createAt:-1})
    .then((result)=>{
        for (let i = 0; i < result.length; i++) {
            result[i]['workHours']=Extensions.hrsCalculate(result[i].attendance);
            // console.log("### Hours",result[i].Workhours);
        }
        res.render('./attendances/details',{title:'Details',attendances:result,workHours:'NA'});
    })
};

const attendance_details_post=(req,res)=>{
    let data={};
    req.body.employeeID?data['employeeID']=req.body.employeeID:null;
    req.body.name?data['name']=req.body.name:null;
    req.body.date?data['day']=req.body.date.split('-').join('/'):null;
    console.log(data);
    AttendanceData.find(data).sort({createAt:-1})
    .then((result)=>{
        let hrs=[];
        for (let i = 0; i < result.length; i++) {
            result[i]['workHours']=Extensions.hrsCalculate(result[i].attendance);
        }
        let totalhrs="0:0";
        for (let i = 0; i < result.length; i++) {
            totalhrs=Extensions.timeMath(totalhrs,'+',result[i]['workHours'])
            // console.log("### Hours",result[i].Workhours);
        }
        res.render('./attendances/details',{title:'Details',attendances:result,workHours:totalhrs});
    })
};

const attendance_create_get=(req,res)=>{
    EmployeeData.find().then((result)=>{
        // console.log(result);
        res.render('./attendances/create',{title:'Create', employees: result});
    });
};

const attendance_create_post=(req,res)=>{
    let temp=req.body;
    let data={};
    let employee={};

    // Get Time and Date
    const today= new Date().toJSON().slice(0,10).replace(/-/g,'/');
    const time= new Date().toTimeString().split(" ")[0];

    // Get Requested Data
    if (temp.employeeID) {
        console.log(1);
        data={employeeID:temp.employeeID};
    }else{
        if (temp.name) {
            console.log(2);
            data={name: temp.name};
        }
    }
    console.log("### Requested Data: ",data);

    // Search Resquested Employee in Employee Data
    EmployeeData.findOne(data)
            .then((result)=>{
                console.log(3);
                console.log("### Available Employee Data: ");
                employee=result;

                // Employee Attendance
                employeeAttendance(employee,time,today);
            });
    console.log(9);
    res.redirect('/attendance/create')
};

const employeeAttendance=(employee,time,today)=>{
    AttendanceData.findOne({employeeID:employee.employeeID,day:today})
    .then((result)=>{
            console.log(4);
            data=result;
            console.log("### Available attendance: ",data);
            
            // Create New Attendence
            if (!result) {
                console.log(5);
                data={employeeID:employee.employeeID,name:employee.name,day:today,attendance:[{punchType: 'IN', punchTime: time}]}
                const newattendence=new AttendanceData(data);
                newattendence.save().then((result)=>{
                    console.log(6);
                    console.log("##SAVE",result);
                });
            } 

            // Update Attendance
            else {
                console.log(7);
                console.log("### Updating Data: ",data);
                const pushData={ attendance: {punchType: data.attendance.pop().punchType === 'OUT' ? 'IN': 'OUT', punchTime: time}};
                console.log("### Push Data: ",pushData);
                AttendanceData.updateMany(
                        {employeeID:data.employeeID,day:data.day},
                        { $push: pushData ,
                        $set : {punchType : !data.punchType}
                    }
                    ).then((result)=>{
                        console.log(8);
                        console.log("###UPDATE",result);
                    })
            }
    });
}




module.exports={
    attendance_create_get,
    attendance_create_post,
    attendance_details_get,
    attendance_details_post
};