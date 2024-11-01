import mongoose from "mongoose";

const stopSchema = new mongoose.Schema({
    stopId: {type: String,required: true},
    stopName: {type:String,required:true},
    arrivalTime: {type: String,required: true},
    departureTime: {type: String,required: true},
  });
  
const scheduleSchema = new mongoose.Schema({
    ScheduleID: {type:String,required:true},
    RouteID: {type:String,required:true},
    BusID: {type:String,required:true},
    stops: [stopSchema],
    STATUS: {type: String, default: "On time"},
})

const scheduleModel = mongoose.models.schedule || mongoose.model("schedules",scheduleSchema)
export default scheduleModel;