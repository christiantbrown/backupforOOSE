
const email = localStorage.getItem("AASemail")
const password = localStorage.getItem("AASpassword")
const accountType = localStorage.getItem("AASaccounttype")
const api_url = "127.0.0.1"
const port=3000
//will not be keeping this here, it's just here to make dummy objects for testing
const createAppointment= (appointmentcsv) =>{
    tokens=appointmentcsv.split(',')

    appt = {
        "StartTime":new Date(tokens[0]),
        "EndTime":new Date(tokens[1]),
        "studentFirstName":tokens[2],
        "studentLastName":tokens[3],
        "advisorFirstName":tokens[4],
        "advisorLastName":tokens[5],
        "advisorEmail":tokens[6],
        "appointmentDescription":tokens[7],
    }
    return appt
}


// dummyappointments=[
// "2023-04-30T12:00,2023-04-30T13:00,Alexander,Hamilton,James,Davis,jdavis@uta.edu,Fall Advising",
// "2023-04-31T15:00,2023-04-30T16:00,Woodrow,Wilson,Emma,Moore,emoore@uta.edu,Fall Advising",
// "2023-04-31T11:00,2023-04-31T13:00,Thomas,Jefferson,James,Davis,jdavis@uta.edu,Graduation",
// ]




const getAppointments = async (advisorFirstName, advisorLastName) =>{

    appointments = await fetch(encodeURI(`http://${api_url}:${port}/api/appointments/${email}`), {
        mode: "cors"
    }).then((appointments) => appointments.json())
    appointments.map((appt) => {
        appt.StartTime = new Date(appt.StartTime)
        appt.EndTime = new Date(appt.EndTime)
    })
    //replace this with an API call
    return appointments
}



const createTimeSlot = (timeslotcsv) => {
    tokens = timeslotcsv.split(',')
    timeSlot = {
        "StartTime":new Date(tokens[0]),
        "EndTime":new Date(tokens[1]),
        "advisorFirstName":tokens[2],
        "advisorLastName":tokens[3],
        "advisorEmail":tokens[4],
    }
    return timeSlot
}


// dummytimeslots=[
//     "2023-04-30T12:00,2023-04-30T13:00,James,Davis,jdavis@uta.edu",
//     "2023-04-30T15:00,2023-04-30T16:00,Emma,Moore,emoore@uta.edu",
//     "2023-04-31T11:00,2023-04-31T13:00,James,Davis,jdavis@uta.edu",
//     "2023-04-31T16:00,2023-04-31T18:00,James,Davis,jdavis@uta.edu",
// ]


const getAdvisor = async(advisorEmail) =>{
    advisor = await fetch(encodeURI(`http://${api_url}:${port}/api/advisors/${email}`), {
        mode:"cors"
    }).then((advisor)=>advisor.json())
    return advisor
}

const getTimeSlots = async (advisorEmail) =>{

    //replace this with an API call


    tslots = await fetch(encodeURI(`http://${api_url}:${port}/api/timeslots/${email}`), {
        mode: "cors"
    }).then((tslots) => tslots.json())
    tslots.map((tslot) => {
        tslot.StartTime = new Date(tslot.StartTime)
        tslot.EndTime = new Date(tslot.EndTime)
    })

    return tslots
}

//creates a list of upcoming time slots in the UI
const showUpcomingTimeSlots = async ()=>{
    const timeSlotList = document.getElementById("time slots")
    timeSlotList.innerHTML=''
    const timeSlots= await getTimeSlots(email)


    timeSlots.map( (tslot) => {
        slotDescription = document.createElement("div")
        slotDescription.textContent=`${tslot.StartTime.toDateString()} ${tslot.StartTime.getHours()}:${tslot.StartTime.getMinutes()} - ${tslot.EndTime.getHours()}:${tslot.EndTime.getMinutes()}`
        slotDescription.classList.add("timeelement")
        timeSlotList.appendChild(slotDescription)
    })
}

//grabs information from UI, submits new time slot, remakes UI
const submitNewTimeSlot = async () => {
    date=document.getElementById("date").value
    StartTime=document.getElementById("startTime").value
    EndTime=document.getElementById("endTime").value
    


    console.log(`${date} ${StartTime} ${EndTime}`)
    //make an api call here, wait for status code, then redirect
    //start, end, fname, lname, email

    advisor = await(getAdvisor(email))

    res = await fetch(encodeURI(`http://${api_url}:${port}/api/timeslots`), {
        mode: "cors",
        method: "POST",
        "body":JSON.stringify({
            "startTime":`${date}T${StartTime}`,
            "endTime":`${date}T${EndTime}`,
            "advisorFirstName":advisor.FirstName,
            "advisorLastName":advisor.LastName,
            "email":email,
        }),
        headers:{
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    })

    console.log(res)
    
    showUpcomingTimeSlots()
}

const showUpcomingAppointments = async () => {

    const appointmentList = document.getElementById("appointments")

    const appointments = await getAppointments(email)

    appointments.map( (appt) => {
        console.log(appt)//DELETETHIS

        apptDescription=document.createElement("div")
        apptDescription.textContent=`${appt.StudentLastName}, ${appt.StudentFirstName}\n
        ${appt.StartTime.toDateString()} ${appt.StartTime.getHours()}:${appt.StartTime.getMinutes()} - ${appt.EndTime.getHours()}:${appt.EndTime.getMinutes()}`
        apptDescription.classList.add("timeelement")
        appointmentList.appendChild(apptDescription)
    })
}

const submitNewAppointment = () => {
    date=document.getElementById("date").value
    StartTime=document.getElementById("StartTime").value
    EndTime=document.getElementById("EndTime").value
    description=document.getElementById("description").value
    
    console.log(`${date} ${StartTime} ${EndTime}`)

    document.getElementById("appointments").innerHTML=''    //a cheap way of killing all children of this node

    showUpcomingAppointments()
}