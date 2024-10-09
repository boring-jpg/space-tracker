import mongoose from "mongoose";
import Launch from "../models/launches.model.js";

export const readLaunches = async (req, res) => {
    try{
        const launches = await Launch.find({});
        res.status(200).json({
            success: true,
            data: launches
        });
    } catch (error){
        console.log("Error:", error);
        res.status(500).json({
            sucess: false,
            message: "Server Error"
        });
    };
};
export const createLaunches = async (req, res) => {
    const launch = req.body;

    if(!launch.name || !launch.agency || !launch.location || !launch.image) {
        return res.status(400).json({
            success:false,
            message: "please provide all fields",
        });
    };

    const newLaunch = new Launch(launch);

    try {
        await newLaunch.save();
        res.status(201).json({
            sucess: true,
            data: newLaunch
        });
    } catch (error){
        console.error("Error creating the product:", error.message);
        res.status(500).json({
            sucess: false,
            message: "Server Error"
        });
    };
    
};
export const updateLaunches = async (req, res) => {
    const {id} = req.params;
    const updateField = req.body;

    if(!Mongoose.Types.ObjectID.isValid(id)){
        return res.status(404).json({
            success: false,
            message: "Invalid ID"
        });
    };

    try {
       const updatedLaunch =  await Launch.findByIdAndUpdate(id,updateField, {new:true});
       res.status(200).json({
        success: true,
        data: updatedLaunch
       });
    } catch (error){
        res.status().json({
            success: false,
            message: "Server Error"
        });
    };
};
export const deleteLaunches = async (req, res) => {
    const {id} = req.params;

    if(!Mongoose.Types.ObjectID.isValid(id)){
        return res.status(404).json({
            success: false,
            message: "Invalid ID"
        });
    };
    
    try{
        await Launch.findByIdAndDelete(id);
        res.status(200).json({
            sucess: true,
            message: "Deleted object"
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    };
};