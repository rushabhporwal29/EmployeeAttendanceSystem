const express=require('express');
const mongoose=require('mongoose');
const employeeRoutes=require('./routes/employeeRoutes');
const attendanceRoutes=require('./routes/attendanceRoutes');
const morgan= require('morgan');
const User=require('./models/User');
const bodyParser = require('body-parser');


// Express app
const app=express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// MongoDB Connection
const dbURL = 'mongodb://localhost:27017/employee'
mongoose.connect(dbURL,{ useNewUrlParser: true , useUnifiedTopology: true })
    .then(() => {
        console.log('Database connection successful');
        app.listen(3001);
        console.log('Listening at port 3001');
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

app.get('/',(req,res)=>{
    res.render('auth',{auth:{signUp:"hidden"}});
});

app.use('/employee',employeeRoutes);

app.use('/attendance',attendanceRoutes);

app.get('/:id',(req,res)=>{
    let auth={
        login:"hidden",
        signUp:"hidden"
    }
    auth[req.params.id]="";
    res.render('auth',{auth:auth});
});
app.post('/login',(req,res)=>{
    let data=req.body;
    User.findOne(data).then((result)=>{
        console.log(result);
    })
    res.redirect('/employee');
});

app.post('/signUp',(req,res)=>{
    let data=req.body;
    data['status']='Inactive';
    const newUser=new User(data);
    newUser.save().then((result)=>{
        console.log(result);
    })
    res.render('auth',{auth:{signUp:"hidden"}}); 
});






