import mongoose from "mongoose";

/**
 * 0 = disconnected
 * 1 = connected
 * 2 = connecting
 * 3 = disconnecting
 */

const mongoConnection = {
    isConnected:0
}

export const connect = async()=>{
  if (mongoConnection.isConnected) {
    console.log('conectado')
    return
  }

  if(mongoose.connect.length > 0){
    mongoConnection.isConnected = mongoose.connections[0].readyState

     if(mongoConnection.isConnected === 1){
        console.log('usando conection anterior') 
        return 
     }

     await mongoose.disconnect()
  }

  await mongoose.connect(process.env.MONGO_URL || "")
  mongoConnection.isConnected =1
  console.log('conectado a mongoDB:',process.env.MONGO_URL)
}

 export const  disconnect =async()=>{
  if(process.env.NODE_ENV === 'development') return
    if(mongoConnection.isConnected ===0 )return
    mongoose.disconnect()
    console.log('Desconectado de mongoDB')
 }