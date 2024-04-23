const email = localStorage.getItem("AASemail")
const password = localStorage.getItem("AASpassword")
const accountType = localStorage.getItem("AASaccounttype")

//will not be keeping this here, it's just here to make dummy objects for testing
const createAppointment= (appointmentcsv) =>{
    tokens=appointmentcsv.split(',')

    appt = {
        "startTime":new Date(tokens[0]),
        "endTime":new Date(tokens[1]),
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

dummyappointments.map((str) => {
    console.log(createAppointment(str))
})



const getAppointments = (advisorFirstName, advisorLastName) =>{

    //replace this with an API call
    davisappointments = [dummyappointments[0], dummyappointments[2]]
    return davisappointments.map((str) => {return createAppointment(str)})
}



const createTimeSlot = (timeslotcsv) => {
    tokens = timeslotcsv.split(',')
    timeSlot = {
        "startTime":new Date(tokens[0]),
        "endTime":new Date(tokens[1]),
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

const getTimeSlots = (advisorEmail) =>{

    //replace this with an API call
    davistimeslots = [dummytimeslots[0], dummytimeslots[2],dummytimeslots[3]]
    return davistimeslots.map((str) => {return createTimeSlot(str)})
}

//creates a list of upcoming time slots in the UI
const showUpcomingTimeSlots = ()=>{
    const timeSlotList = document.getElementById("time slots")

    const timeSlots=getTimeSlots(email)

    timeSlots.map( (tslot) => {
        slotDescription = document.createElement("div")
        slotDescription.textContent=`${tslot.startTime.toDateString()} ${tslot.startTime.getHours()}:${tslot.startTime.getMinutes()} - ${tslot.endTime.getHours()}:${tslot.endTime.getMinutes()}`
        slotDescription.classList.add("timeelement")
        timeSlotList.appendChild(slotDescription)
    })
}


const submitNewTimeSlot = () => {
    date=document.getElementById("date").value
    startTime=document.getElementById("startTime").value
    endTime=document.getElementById("endTime").value
    
    console.log(`${date} ${startTime} ${endTime}`)
    //make an api call here, wait for status code, then redirect

    window.location.replace(`./addtimeslot.html`)
}