function timeConversion(s) {
    let hrs = s.slice(0,2)
    let AMPM = s.slice(-2);
    let mins = s.slice(2,8)
    if (AMPM == 'AM' && hrs == '12') {
        hrs = '00';
    }else if (AMPM == 'PM'){
        hrs = (hrs % 12) + 12
    }
    return hrs + mins
}

console.log(timeConversion('12:40:22AM'))




function gradingStudents(grades) {
    return grades.map((n) => {
        let diff = 5 - (n % 5);
        if(diff < 3 && n >= 38) {
            n += diff;
        }
        
        return n;
    })
 }

 console.log(gradingStudents([73,
    67,
    38,
    33]))