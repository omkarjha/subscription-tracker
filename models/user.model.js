import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true, "Username is required"],
        unique : true,
        trim : true,
        minlength : [3, "Username must be at least 3 characters long"],
        maxlength : [50, "Username must be at most 20 characters long"],
    },
    email :{
        type : String,
        required : [true, "Email is required"],
        unique : true,
        trim : true,
        lowercase : true,
        match : [/.+\@.+\..+/, "Please fill a valid email address"],
    },
    password : {
        type : String,
        required : [true, "Password is required"],
        minlength : [6, "Password must be at least 6 characters long"],
    },
} , {timestamps : true});

const User = mongoose.model("User", UserSchema);

export default User;

// Users - > {name : John Doe, email : johndoe@gmail.com, password : password123}