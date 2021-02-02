const express=require('express');
const mongoose=require('mongoose');
const EmployeeData=require('./models/employeedata');
const morgan= require('morgan');

// Express app
const app=express();

// MongoDB Connection
const dbURL = 'mongodb://localhost:27017/employee'
mongoose.connect(dbURL,{ useNewUrlParser: true , useUnifiedTopology: true })
    .then(() => {
        console.log('Database connection successful');
        app.listen(3000);
        console.log('Listening at port 3000');
    })
    .catch(err => {
        console.error('Database connection error')
        
    });

//register view engine
app.set('view engine','ejs');

// 3rd party middleware
app.use(morgan('dev'));
app.use(express.urlencoded({extended: true}));

// Static Files
app.use(express.static('public'));





app.post('/employee',(req,res)=>{
    EmployeeData.count({},(err,count)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log('Employee '+ (count+1) + 'Created');
            const data=req.body;
            data['employeeID']=Number(count+1);
            const newData=new EmployeeData(data);
            newData.save().then((result)=>{
                res.send(result);
            });
        } 
    });
});

app.get('/employee/create',(req,res)=>{
    // res.send('<h1>About Page</h1>');
    res.render('create',{title:'Create'});
});

app.get('/employee/employees',(req,res)=>{
    EmployeeData.find()
        .then((result)=>{
            res.render('employees',{title:'Employees', employees:result});
        })
});

app.get('/employee/:id',(req,res)=>{
    const id=req.params.id;
    console.log(id);
    EmployeeData.findById(id)
        .then((result)=>{
            res.render('Details',{title:'Employees', employee:result});
        }).catch((err)=>{ res.render('404',{title: 'Data not Found'})});
});

app.delete('employee/:id',(req,res)=>{
    const id=req.params.id;
    Blog.findByIdAndDelete(id)
        .then((result)=>{
            res.json({redirect: '/employee/employees'});
        }).catch((err)=>{console.log(err);});
});

app.use((req,res)=>{
    res.render('404',{title:'404'});
})
