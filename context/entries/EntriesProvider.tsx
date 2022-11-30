import { EntriesContext, EntriesReducer} from './'
import { PropsWithChildren,FC,useReducer} from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Entry } from '../../interfaces';
import { type } from 'os';


export interface EntriesState {
   entries:Entry[
     
   ]
}

const Entries_INITIAL_STATE: EntriesState = {
   entries:[
    {
      _id:uuidv4(),
      description:'Pendiente Description',
      status:'pending',
      createAt:Date.now()
    },
    {
      _id:uuidv4(),
      description:'In-progreso Description',
      status:'in-progress',
      createAt:Date.now()-1000000
    },
    {
      _id:uuidv4(),
      description:'Termnada Description',
      status:'finished',
      createAt:Date.now()-100000
    },
   ],
}


export const EntriesProvider:FC<PropsWithChildren> = ({ children}) => {

  const [state, dispatch] = useReducer(EntriesReducer, Entries_INITIAL_STATE)

  const addNewEntry = (description:string)=>{
     const newEntry:Entry ={
       _id: uuidv4(),
       description,
       createAt: Date.now(),
       status: 'pending'
     }
     dispatch({type:'[Entry] Add-Entry',payload:newEntry})
  }
  
    const updateEntry = (entry:Entry) =>{
      dispatch({ type:'[Entry] Entry-Updated',payload:entry })
    }

  return (
    <EntriesContext.Provider value={{
        ...state,
        addNewEntry,
        updateEntry
    }}>
      {children}
    </EntriesContext.Provider>
  )
}