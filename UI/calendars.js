

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
        "appointmentDescription":tokens[6],
    }
    return appt
}


dummycsv=[
"2023-04-30T12:00,2023-04-30T13:00,Alexander,Hamilton,James,Davis,Fall Advising",
"2023-04-30T15:00,2023-04-30T16:00,Woodrow,Wilson,Emma,Moore,Fall Advising",
"2023-04-30T11:00,2023-04-30T13:00,Thomas,Jefferson,James,Davis,Graduation",
]

dummycsv.map((str) => {
    console.log(createAppointment(str))
})