import mongoose from "mongoose";


export interface Imessage {
    name :string,
    email:string,
    subject:string,
    message:string,
}
const messageSchema=new mongoose.Schema<Imessage>({
    name:{
      type:String,
      required:true,
      unique:true
    },
    email:{
     type:String,
    },
    message: {
        type:String,
        required:false
    }
   
  },
  {timestamps:true}
  );
  export default    mongoose.model<Imessage>('Message',messageSchema)