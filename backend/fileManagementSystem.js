const fs = require('fs');
const Papa = require('papaparse');
const express = require('express');
const path = require('path');
const cors = require('cors')
const app = express();
app.use(cors())
const port = 3000;

app.use(express.json()); // Middleware to parse JSON bodies

// Function to read and parse the CSV file
function readAndParseCSV(filePath, callback) {
    fs.readFile(filePath, 'utf8', (err, csvData) => {
        if (err) {
            console.error('Error reading CSV file:', err);
            callback(err, null);
            return;
        }
        const parsedData = Papa.parse(csvData, { header: true, skipEmptyLines: true });
        callback(null, parsedData.data);
    });
}

// Serve the HTML file at the root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'test.html'));
});

// Endpoint to get advisors data
app.get('/api/advisors/:email', (req, res) => {
    readAndParseCSV('advisors.csv', (err, data) => {
        if (err) {
            res.status(500).json({ error: 'Error reading CSV file' });
            return;
        }
        res.json(data.filter((advisor)=>advisor.email == req.params.email)[0]);
    });
});

app.get('/api/getstudent/:studentid', (req, res) => {
    readAndParseCSV('students.csv', (err, data) => {
        if (err) {
            res.status(500).json({ error: 'Error reading CSV file' });
            return;
        }
        res.json(data.filter((student)=>student.IDnumber == req.params.studentid)[0]);
    });
});




// Endpoint to get appointments data
app.get('/api/appointments/:email', (req, res) => {
    readAndParseCSV('appointments.csv', (err, data) => {
        if (err) {
            res.status(500).json({ error: 'Error reading CSV file' });
            return;
        }
        res.json(data.filter((appt)=>appt.AdvisorEmail==req.params.email));
    });
});

// Endpoint to get students data
app.get('/api/students/:email', (req, res) => {
    readAndParseCSV('students.csv', (err, data) => {
        if (err) {
            res.status(500).json({ error: 'Error reading CSV file' });
            return;
        }
        res.json(data.filter((student)=>student.AdvisorEmail==req.params.email));
    });
});

// Endpoint to get time slots data
app.get('/api/timeslots/:email', (req, res) => {


    readAndParseCSV('timeSlots.csv', (err, data) => {
        if (err) {
            res.status(500).json({ error: 'Error reading CSV file' });
            return;
        }


        res.json(data.filter((tslot)=>tslot.AdvisorEmail==req.params.email));
    });
});



//endpoint to create an appointment

app.post('/api/appointments', (req, res)=>{
    //DELETE
    console.log("received post for appointment")
    const {StartTime,EndTime,StudentFirstName,StudentLastName,AdvisorFirstName,AdvisorLastName,AdvisorEmail,AppointmentDescription} = req.body
    console.log(`${StudentFirstName},${AdvisorFirstName},${StartTime}`)

    //Validate required fields
    if (!StartTime || !EndTime || !StudentFirstName || !StudentLastName ||!AdvisorFirstName || !AdvisorLastName || !AdvisorEmail || !AppointmentDescription) {
        console.log("got request with invalid fields")
        return res.status(400).json({ message: "All fields are required: StartTime, EndTime, StudentFirstName, StudentLastName, AdvisorFirstName, AdvisorLastName, AdvisorEmail," });
    }
    //make csv row
    const newAppointment=`${StartTime},${EndTime},${StudentFirstName},${StudentLastName},${AdvisorFirstName},${AdvisorLastName},${AdvisorEmail},${AppointmentDescription}\r\n`
    console.log(newAppointment)//delete

    fs.appendFile('appointments.csv', newAppointment, (err)=>{
        if(err){
            console.error('Error writing to CSV file:', err)
            return res.status(500).json({ message: "Failed to add appointment due to server error." })
        } else
        console.log("appointment added")

        res.json({ message: "Appointment added successfully!", data: req.body });
    })
})



//endpoint to create a timeslot
app.post('/api/timeslots', (req, res) => {
    //DELETE
    console.log("received post for timeslots")
    // console.log(req)
  const { startTime, endTime, advisorFirstName, advisorLastName, email } = req.body;
  console.log(`${email}, ${startTime}`)

  // Validate the required fields
  if (!startTime || !endTime || !advisorFirstName || !advisorLastName || !email) {
      console.log("got request with invalid fields")
      return res.status(400).json({ message: "All fields are required: startTime, endTime, advisorFirstName, advisorLastName, email." });
  }

  // Construct the CSV row
  const newTimeSlot = `${startTime},${endTime},${advisorFirstName},${advisorLastName},${email}\r\n`;

  // Append to the CSV file
  fs.appendFile('timeSlots.csv', newTimeSlot, (err) => {
      if (err) {
          console.error('Error writing to CSV file:', err);
          return res.status(500).json({ message: "Failed to add time slot due to server error." });
      } else
      console.log("time slot added")

      res.json({ message: "Time slot added successfully!", data: req.body });
  });
});


// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});