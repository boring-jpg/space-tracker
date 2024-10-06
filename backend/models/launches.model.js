import mongoose from "mongoose";

const launchSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    agency:{
        type: String,
        required: true
    },
    location:{
        type: String,
        required: true
    },
    image:{
        type: String,
        required: true
    },
}, {
    timestamps: true,
});

const Launch = mongoose.model('Launch', launchSchema);

export default Launch;