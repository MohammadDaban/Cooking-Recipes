import mongoose,{Schema,model} from "mongoose";

const UserSchema = new Schema({

    userName:{
        type: String,
        required: [true, 'userName is required'],
        min: [4 ,'userName minimum 4 letters']
    },
    email:{
        type:String,
        required: [true, 'email is required'],
        unique: true
    },
    password:{
        type:String,
        required: [true, 'password is required'],
    },
    gender:{
        type:String,
        default: 'Female',
        enum: ['Male', 'Female'],
    },
    birthdate: {
        type: Date,
        required:true,
    },
    adress:{
        type:String,
        required:true,
    },
    phone:{
        type:Number,
    },
    confirmEmail:{
        type:Boolean,
        default:false,
    },
    status:{
        type:String,
        default:'Active',
        enum:['Active','Inactive'],
    },
    role:{
        type:String,
        default:'User',
        enum:['User','Admin']
    },
    code:{
        type:String,
        default:null
    },
    changePasswordTime:{
        type:Date,
    },
},{
    timestamps:true
})

const userModel = mongoose.model.User || model('User',UserSchema)

export default userModel