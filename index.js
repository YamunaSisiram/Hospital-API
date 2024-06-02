import express from 'express';
import bodyParser from 'body-parser';
import { registerDoctor, loginDoctor } from './src/controller/user.controller.js';
import { connectToDb } from './src/db.config.js';
import { auth } from './src/middleware/jwtAuth.js';
import { createReportForPatient, getReportByStatus, getReportsByPatient, registerPatient } from './src/controller/patient.controller.js';

const app = express();
app.use(bodyParser.json())

app.post('/api/doctor/register',registerDoctor);
app.post('/api/doctor/login',loginDoctor);
app.post('/api/patients/register', auth, registerPatient);

app.post('/api/patients/:id/create_report', auth,createReportForPatient);
app.get('/api/patients/:id/all_reports',auth, getReportsByPatient)
app.get('/api/reports/:status', auth, getReportByStatus)

app.listen(3000, ()=> {
    console.log('Server listening at port 3000');
    connectToDb();
})

// app.use(appLevelErrorHandlerMiddleware);