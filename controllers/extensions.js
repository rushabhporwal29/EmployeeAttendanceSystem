const AttendanceData=require('../models/employeeAttendance');


const timeMath=(time1='',op='+',time2='')=>{
    // console.log(time1,time2);
    let t1=time1.split(':').map(Number);
    let t2=time2.split(':').map(Number);
    // console.log(t1,t2);
    const min1=(t1[0]*60)+t1[1];
    const min2=(t2[0]*60)+t2[1];
    // console.log(min1,min2);
    const res=Math.abs(op==='+'?min1+min2:min1-min2);
    // console.log(res);
    return [parseInt(res/60),res%60].map(String).join(':')
}

const hrsCalculate=(arr=[])=>{
    const len=arr.length%2===0?arr.length:arr.length-1;
    let hrs='0:0';
    for (let i = 0; i < len; i++) {
        console.log(arr[i].punchTime,'-',arr[i+1].punchTime);
        hrs=timeMath(hrs,'+',timeMath(arr[i].punchTime,'-',arr[++i].punchTime))
        console.log(hrs);
    }
    console.log(hrs);
    return hrs;
}

// const insertPunch=(attendance=[],newInput={})=>{

//     let time=[];
//     let ip=newInput.punchTime.split[':'].map(Number);
//     let pos=attendance.length
//     let punchType="";
//     for (let i = 0; i < attendance.length; i++) {
//         time[i]=attendance[i].punchTime.split[':'].map(Number);
//     }
    
//     for (i = 0; i < attendance.length; i++){
//         if(time[i][0]>ip[0]){
//             pos=i;
//             break;
//         }
//         if(time[i][0]===ip[0]){
//             if (time[i][1]>ip[i]) {
//                 pos=i;
//                 break; 
//             }
//         }
//     }
//     attendance.splice(pos,0,newInput);
//     return attendance
       
// }

const employeeAttendance=(employee,time,today)=>{
    AttendanceData.findOne({employeeID:employee.employeeID,day:today})
    .then((result)=>{
            // console.log(4);
            data=result;
            console.log("### Available attendance: ",data);
            
            // Create New Attendence
            if (!result) {
                // console.log(5);
                data={employeeID:employee.employeeID,name:employee.name,day:today,attendance:[{punchType: 'IN', punchTime: time}]}
                const newattendence=new AttendanceData(data);
                newattendence.save().then((result)=>{
                    // console.log(6);
                    console.log("##SAVE",result);
                });
            } 

            // Update Attendance
            else {
                // console.log(7);
                console.log("### Updating Data: ",data);
                const pushData={ attendance: {punchType: data.attendance.pop().punchType === 'OUT' ? 'IN': 'OUT', punchTime: time}};
                console.log("### Push Data: ",pushData);
                AttendanceData.updateMany(
                        {employeeID:data.employeeID,day:data.day},
                        { $push: pushData ,
                        $set : {punchType : !data.punchType}
                    }
                    ).then((result)=>{
                        // console.log(8);
                        console.log("###UPDATE",result);
                    })
            }
    });
}

module.exports={
    hrsCalculate,
    timeMath,
    employeeAttendance
}

// let inputArr=[1,5,9,4,6,3,7,2];
// let len = inputArr.length;
// for (let i = 0; i < len; i++) {
//     for (let j = 0; j < len; j++) {
//         if (inputArr[j] > inputArr[j + 1]) {
//             let tmp = inputArr[j];
//             inputArr[j] = inputArr[j + 1];
//             inputArr[j + 1] = tmp;
//         }
//     }
// }     
    
// console.log(inputArr);
