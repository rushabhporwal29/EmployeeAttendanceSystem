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

module.exports={
    hrsCalculate,
    timeMath
}

