const email = localStorage.getItem("AASemail")
const password = localStorage.getItem("AASpassword")
const accountType = localStorage.getItem("AASaccounttype")


//currently using dummy data
const students = [
    {
        FirstName:"John",
        LastName:"Smith",
        AdvisorName:email,
        Cell:2132132134
    },
    {
        FirstName:"Jake",
        LastName:"Paul",
        AdvisorName:email,
        Cell:2223334444
    }

]//replace this with an API request

studentList=document.getElementById("studentList")

students.map((student)=>{
    const studentElem=document.createElement("div")
    studentElem.classList.add("studententry")
    studentElem.classList.add("center")
    studentElem.style.alignContent="center"
    studentElem.innerHTML=
    `
    ${student.FirstName}, ${student.LastName}
    `



    studentButton=document.createElement("button")
    studentButton.classList.add("orangebutton")
    studentButton.innerHTML="Select"
    studentButton.addEventListener("click", ()=>{
        console.log(`${student.FirstName}, ${student.LastName}`)
    })
    studentElem.appendChild(studentButton)

    studentList.appendChild(studentElem)
})