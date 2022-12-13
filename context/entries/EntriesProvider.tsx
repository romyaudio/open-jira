import { EntriesContext, EntriesReducer} from './'
import { PropsWithChildren,FC,useReducer, useEffect} from 'react';
import { Entry } from '../../interfaces';
import { entriesApi } from '../../apis';
import async from '../../pages/api/entries/[id]';


export interface EntriesState {
   entries:Entry[
     
   ]
}

const Entries_INITIAL_STATE: EntriesState = {
   entries:[]
   
}


export const EntriesProvider:FC<PropsWithChildren> = ({ children}) => {

  const [state, dispatch] = useReducer(EntriesReducer, Entries_INITIAL_STATE)

  const addNewEntry = async (description:string)=>{

    const {data} = await entriesApi.post<Entry>('/entries',{description})
    
    
     dispatch({type:'[Entry] Add-Entry',payload:data})
  }
  
    const updateEntry = async ({_id,description,status}:Entry) =>{
      try {
        
        const {data} = await entriesApi.put<Entry>(`/entries/${_id}`,{description,status})
        dispatch({ type:'[Entry] Entry-Updated',payload:data })
      } catch (error) {
        console.log({error})
        
      }
      
    }

    const refreshEntries = async()=>{
      const {data} = await entriesApi.get<Entry[]>('/entries')
      dispatch({type:'[Entry] Refresh-Data',payload:data})
     
    }

    useEffect(()=>{
       refreshEntries()
    },[])

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