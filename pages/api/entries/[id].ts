import mongoose from 'mongoose'
import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database'
import { Entry, IEntry } from '../../../models'

type Data = 
|{message: string}
|IEntry

export default function async (req: NextApiRequest, res: NextApiResponse<Data>) {
    const {id} = req.query

    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({message:'El id no es valido ' + id})
    }

    switch (req.method) {
        case 'PUT':
            return updateEntry(req,res)
        case 'GET':
            return getEntry(req,res)
        
    
        default:
            return res.status(400).json({message:'Metodo no existe'})
    }

}

const updateEntry = async(req:NextApiRequest,res:NextApiResponse<Data>)=>{
    const {id} = req.query
    await db.connect()
     
    try {

        const  entryToUpdate = await Entry.findById(id)
        if (!entryToUpdate) {
            await db.disconnect()
            return res.status(400).json({message:'No hay entrada con ese ID:' + id})
           
        }

        const {
            description = entryToUpdate.description,
            status = entryToUpdate.status
        } =req.body

        const updateEntry = await Entry.findByIdAndUpdate(id,{description,status},{runValidators:true,new:true})
         return res.status(200).json(updateEntry!)
    } catch (error:any) {
        console.log(error)
      await db.disconnect() 
      return res.status(400).json({message:error.errors.status.message}) 
    }
    
}

const getEntry = async(req:NextApiRequest,res:NextApiResponse)=>{
    const {id} = req.query
    await db.connect()
    const  entryInDB = await Entry.findById(id)
        if (!entryInDB) {
            await db.disconnect()
            return res.status(400).json({message:'No hay entrada con ese ID:' + id})
           
        }

        return res.status(200).json(entryInDB)
}     