const express=require('express');
const router=express.Router();
const Attendance=require('../controllers/attendanceController');

const AttendanceData=require('../models/employeeAttendance');
const EmployeeData=require('../models/employeedata');

router.get('/',(req,res)=>{
    res.redirect('create')
});

router.get('/mark',(req,res)=>{
    EmployeeData.find().then((result)=>{
        // console.log(result);
        res.render('./create',{title:'Create', employees: result});
    });
});

router.post('/mark/',Attendance.attendance_mark_post);

router.get('/create',Attendance.attendance_create_get);

router.post('/',Attendance.attendance_create_post);

router.get('/details',Attendance.attendance_details_get);

router.post('/details',Attendance.attendance_details_post);

router.use((req,res)=>{
    console.log('Page Not Found');
    res.render('./attendances/404',{title:'404'});
});

module.exports=router;