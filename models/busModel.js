import mongoose from "mongoose";

const busSchema = new mongoose.Schema({
    busID: {type:String,required:true},
    capacity: {type: Number, required: true}
})

const busModel = mongoose.models.bus || mongoose.model("buses",busSchema)
export default busModel;