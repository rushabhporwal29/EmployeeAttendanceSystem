const EmployeeData=require('../models/employeedata');

const employees=(req,res)=>{
    EmployeeData.find()
        .then((result)=>{
            res.render('./employees/employees',{title:'Employees', employees:result});
        })
}

const employee_details=(req,res)=>{
    const id=req.params.id;
    console.log(id);
    EmployeeData.findById(id)
        .then((result)=>{
            res.render('./employees/details',{title:'Employees', employee:result});
        }).catch((err)=>{ res.render('./employees/404',{title: 'Data not Found'})});

};

const employee_create_get=(req,res)=>{
    // res.send('<h1>About Page</h1>');
    res.render('./employees/create',{title:'Create'});
};

const employee_create_post=(req,res)=>{
    EmployeeData.findOne().sort({createdAt:-1})
        .then((result)=>{
            let employeeID=1;
            if(result){ employeeID=result.employeeID+1;}
            const data=req.body;
            console.log(data);
            data['employeeID']=employeeID;
            const newData=new EmployeeData(data);
            newData.save().then((result)=>{
                console.log('Employee '+ (employeeID) + ' Created');
                console.log(result);
                res.redirect('/employee/employees');
            });
        });
};

const employee_update_get=(req,res)=>{
    const id=req.params.id;
    console.log(id);
    EmployeeData.findById(id)
        .then((result)=>{
            res.render('./employees/update',{title:'Employees', employee:result});
        }).catch((err)=>{ res.render('./employees/404',{title: 'Data not Found'})});
    
};

const employee_update_post=(req,res)=>{
    const id=req.params.id;
    console.log(req.body);
    EmployeeData.findByIdAndUpdate(id,req.body)
        .then((result)=>{
            res.redirect('/employee/employees')
        })
};

const employee_delete=(req,res)=>{
    const id=req.params.id;
    console.log('hi'+id);
    EmployeeData.findByIdAndDelete(id)
        .then((result)=>{
            console.log('Deleted '+id+' Successfully');
            res.json({redirect: '/employee/employees'});
        }).catch((err)=>{console.log(err);});
};

module.exports={
    employees,
    employee_details,
    employee_create_get,
    employee_create_post,
    employee_update_get,
    employee_update_post,
    employee_delete
}