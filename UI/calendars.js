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


dummyappointments=[
"2023-04-30T12:00,2023-04-30T13:00,Alexander,Hamilton,James,Davis,jdavis@uta.edu,Fall Advising",
"2023-04-31T15:00,2023-04-30T16:00,Woodrow,Wilson,Emma,Moore,emoore@uta.edu,Fall Advising",
"2023-04-31T11:00,2023-04-31T13:00,Thomas,Jefferson,James,Davis,jdavis@uta.edu,Graduation",
]

// dummyappointments.map((str) => {
//     console.log(createAppointment(str))
// })



const getAppointments = (advisorFirstName, advisorLastName) =>{

    //replace this with an API call
    davisappointments = [dummyappointments[0], dummyappointments[2]]
    return davisappointments.map((str) => {return createAppointment(str)})
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


dummytimeslots=[
    "2023-04-30T12:00,2023-04-30T13:00,James,Davis,jdavis@uta.edu",
    "2023-04-30T15:00,2023-04-30T16:00,Emma,Moore,emoore@uta.edu",
    "2023-04-31T11:00,2023-04-31T13:00,James,Davis,jdavis@uta.edu",
    "2023-04-31T16:00,2023-04-31T18:00,James,Davis,jdavis@uta.edu",
]

const getTimeSlots = async (advisorEmail) =>{

    //replace this with an API call


    tslots = await fetch(encodeURI(`http://${api_url}:${port}/api/timeslots/${email}`), {
        mode: "cors"
    }).then((tslots) => tslots.json())
    tslots.map((tslot) => {
        tslot.StartTime = new Date(tslot.StartTime)
        tslot.EndTime = new Date(tslot.EndTime)
    })
    console.log(tslots)
    return tslots
}

//creates a list of upcoming time slots in the UI
const showUpcomingTimeSlots = async ()=>{
    const timeSlotList = document.getElementById("time slots")

    const timeSlots= await getTimeSlots(email)
    console.log(timeSlots)

    timeSlots.map( (tslot) => {
        slotDescription = document.createElement("div")
        slotDescription.textContent=`${tslot.StartTime.toDateString()} ${tslot.StartTime.getHours()}:${tslot.StartTime.getMinutes()} - ${tslot.EndTime.getHours()}:${tslot.EndTime.getMinutes()}`
        slotDescription.classList.add("timeelement")
        timeSlotList.appendChild(slotDescription)
    })
}


const submitNewTimeSlot = () => {
    date=document.getElementById("date").value
    StartTime=document.getElementById("StartTime").value
    EndTime=document.getElementById("EndTime").value
    
    console.log(`${date} ${StartTime} ${EndTime}`)
    //make an api call here, wait for status code, then redirect

    window.location.replace(`./addtimeslot.html`)
}

const showUpcomingAppointments = () => {

    const appointmentList = document.getElementById("appointments")

    const appointments = getAppointments(email)

    appointments.map( (appt) => {
        apptDescription=document.createElement("div")
        apptDescription.textContent=`${appt.studentLastName}, ${appt.studentFirstName}\n
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