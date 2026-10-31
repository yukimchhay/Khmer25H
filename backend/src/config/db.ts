import mongoose from 'mongoose'
const connectDB = async ()=>{
    try{    
        const connUri = process.env.MONGO_URI
        if(!connUri){
            console.error("err : connection ")
            process.exit(1)
        }
        await mongoose.connect(connUri) ;
        console.log("mongodb connected successful ")
    }catch(err ){
        if(err instanceof Error){
            console.log(`connected fail : ${err.message}`)
        }
        else{
            console.log("connected fail : Unknown error")
        }
        process.exit(1)
    }
}