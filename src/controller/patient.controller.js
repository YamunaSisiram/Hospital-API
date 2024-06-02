import { createNewReport, findReportsByStatus, getReportByPatientID } from "../repository/report.repository.js";
import { findByPhoneNumber, registerUser } from "../repository/user.repository.js"

export const registerPatient = async (req, res, next) => {

    try {
        const { name, phoneNumber } = req.body;

        const existingUser = await findByPhoneNumber(phoneNumber);
        console.log('are you here', existingUser)
        if (existingUser) {
            return res.status(200).send(existingUser);
        }

        const newPatient = await registerUser({ name, phoneNumber, role: 'Patient' });

        return res.status(201).send(newPatient);

    } catch (error) {
        console.log(error)
        return res.status(500).json('Error');
    }
}

export const createReportForPatient = async (req, res, next) => {
    try {
        const { date, status} = req.body;
        const report = await createNewReport(req._id, req.params.id, date, status);
        if(report){
            return res.status(201).send(report);
        }

    } catch (error) {
        console.log(error)
        return res.status(500).json('Error');
    }
}

export const getReportsByPatient = async(req, res, next) => {
    try{
        const result = await getReportByPatientID(req.params.id);
        if(result){
            return res.status(201).send(result);
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json('Error');
    }
}

export const getReportByStatus = async(req, res, next) => {
    try{
        const result = await findReportsByStatus(req.params.status);
        if(result){
            return res.status(201).send(result);
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json('Error');
    }
}