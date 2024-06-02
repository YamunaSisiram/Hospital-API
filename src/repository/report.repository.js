import {ObjectId} from 'mongodb'
import { reportModel } from "../schema/report.schema.js";

export const createNewReport= async(doctorID, patientID, date, status)=>{
    const newReport = reportModel({
        doctorID: new ObjectId(doctorID), 
        patientID: new ObjectId(patientID),
        date,
        status

    })

    console.log('new report , ',newReport);
    return await newReport.save();
}

export const getReportByPatientID = async(patientID) =>{
    return await reportModel.find({patientID: new ObjectId(patientID)});
}

export const findReportsByStatus = async(status) =>{
    return await reportModel.find({status});
}