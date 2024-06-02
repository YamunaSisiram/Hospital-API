
import mongoose, { Schema } from "mongoose";

const reportSchema = new Schema({
    doctorID: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    patientID: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    date: Date,
    status: {
        type: String,
        enum: ["Negative", 'Travelled-Quarantine', 'Symptoms-Quarantine',
            'Positive-Admit'],
        required: true
    }
})

export const reportModel = mongoose.model('Report', reportSchema);