import mongoose from "mongoose";


//DB חיבור למונגו 
const connectToDB = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/newCollege👌", {   
        })
        console.log("connected to mongo db")
    } catch (err) {
        console.log(err);
    }
}

export {connectToDB}