const express=require('express');
const router=express.Router();
const Employees=require('../controllers/employeeController');

router.post('/',Employees.employee_create_post);

router.get('/create',Employees.employee_create_get);

router.get('/employees',Employees.employees);

router.get('/:id',Employees.employee_details);

router.get('/update/:id',Employees.employee_update_get);

router.post('/update/:id',Employees.employee_update_post);

router.delete('/:id',Employees.employee_delete);

// Page Not Found
router.use((req,res)=>{
    console.log('Page Not Found');
    res.render('employee/404',{title:'404'});
});

module.exports=router;