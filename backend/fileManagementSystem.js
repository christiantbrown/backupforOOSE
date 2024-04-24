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
        //delete this

        res.json(data.filter((tslot)=>tslot.AdvisorEmail==req.params.email));
    });
});

// Endpoint to create an appointment
app.post('/api/appointments', (req, res) => {
  const { studentId, startTime, endTime, advisorEmail, appointmentDescription } = req.body;

  // Validate input to ensure all required fields are present
  if (!studentId || !startTime || !endTime || !advisorEmail || !appointmentDescription) {
      return res.status(400).json({ message: "Missing required fields: studentId, startTime, endTime, advisorEmail, and appointmentDescription are all required." });
  }

  // Functions to find entities by identifiers
  const student = findStudentById(studentId);
  const timeSlot = findTimeSlotByTimeAndAdvisor(startTime, endTime, advisorEmail);  // This needs to be implemented
  const advisor = findAdvisorByEmail(advisorEmail);

  // Validate that all entities were found
  if (!student || !timeSlot || !advisor) {
      return res.status(404).json({ message: "One or more entities not found based on the provided identifiers." });
  }

  const appointment = {
      StartTime: timeSlot.startTime,
      EndTime: timeSlot.endTime,
      StudentFirstName: student.firstName,
      StudentLastName: student.lastName,
      AdvisorFirstName: advisor.firstName,
      AdvisorLastName: advisor.lastName,
      AdvisorEmail: advisor.email,
      AppointmentDescription: appointmentDescription
  };

  try {
      writeAppointments(appointment);
      res.json({ message: "Appointment scheduled successfully!", appointment });
  } catch (error) {
      res.status(500).json({ message: "Failed to create appointment due to server error.", details: error.message });
  }
});
app.post('/api/timeslots', (req, res) => {
    //DELETE
    console.log("received post for timeslots")
    console.log(req)
  const { startTime, endTime, advisorFirstName, advisorLastName, email } = req.body;
  console.log(`${email}, ${startTime}`)

  // Validate the required fields
  if (!startTime || !endTime || !advisorFirstName || !advisorLastName || !email) {
      console.log("got request with invalid fields")
      return res.status(400).json({ message: "All fields are required: startTime, endTime, advisorFirstName, advisorLastName, email." });
  }

  // Construct the CSV row
  const newTimeSlot = `${startTime},${endTime},${advisorFirstName},${advisorLastName},${email}\n`;

  // Append to the CSV file
  fs.appendFile('timeSlots.csv', newTimeSlot, (err) => {
      if (err) {
          console.error('Error writing to CSV file:', err);
          return res.status(500).json({ message: "Failed to add time slot due to server error." });
      }
      console.log("appointment added")
      res.json({ message: "Time slot added successfully!", data: req.body });
  });
});


// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});