import mongoose,{Schema,model,Types} from "mongoose";

const categorySchema = new Schema({

    name:{
        type: String,
        required: [true, 'userName is required'],
        unique: true
    },
    image:{
        type:Object,
        required:true,
    },
},{
    timestamps:true
})

const categoryModel = mongoose.model.Category || model('Category',categorySchema)

export default categoryModel