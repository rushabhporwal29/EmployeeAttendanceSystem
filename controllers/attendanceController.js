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

const attendance_mark_post=(req,res)=>{
    let temp=req.body;
    let data={};
    let employee={};

    // Get Time and Date
    const today= new Date().toJSON().slice(0,10).replace(/-/g,'/');
    const time= new Date().toTimeString().split(" ")[0];

    // Get Requested Data
    temp.employeeID?data[employeeID]=temp.employeeID:null;
    temp.name?data['name']=temp.name:null;
    console.log("### Requested Data: ",data);
    

    // Search Resquested Employee in Employee Data
    EmployeeData.findOne(data)
            .then((result)=>{
                // console.log(3);
                // console.log("### Available Employee Data: ");
                employee=result;

                // Employee Attendance
                Extensions.employeeAttendance(employee,time,today);
            });
    // console.log(9);
    res.redirect('/attendance/mark')
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
    console.log(temp);

    // Get Time and Date
    let today= new Date().toJSON().slice(0,10).replace(/-/g,'/');
    let time= new Date().toTimeString().split(" ")[0];

    

    // Get Requested Data
    temp.employeeID?data[employeeID]=temp.employeeID:null;
    temp.name?data['name']=temp.name:null;
    temp.day?today=temp.day.split('-').join('/'):today;
    temp.time?time=temp.time:time;
    console.log("### Requested Data: ",data);

    // Search Resquested Employee in Employee Data
    EmployeeData.findOne(data)
            .then((result)=>{
                // console.log(3);
                // console.log("### Available Employee Data: ");
                employee=result;

                // Employee Attendance
                Extensions.employeeAttendance(employee,time,today);
            });
    // console.log(9);
    res.redirect('/attendance/create')
};






module.exports={
    attendance_create_get,
    attendance_create_post,
    attendance_details_get,
    attendance_details_post,
    attendance_mark_post
};