// --------------  Sample Example for Chaining ---------------------
function getStudents(){
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            resolve({id:101})
        }, 1000)
    })
};

function getMarks(studentId){
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            resolve({marks:95})
        }, 1000)
    })
};

getStudents()
   .then((student)=>{
    console.log("Student found");
    console.log(student);
    return getMarks(student);
   })
   .then((marks)=>{
    console.log("Marks found");
    console.log(marks);
   })
   .catch((err)=>{
    console.log(err.message);
   })
   .finally(()=>{
    console.log("Data Retrived");
   });