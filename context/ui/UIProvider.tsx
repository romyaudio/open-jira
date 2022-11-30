import { UIContext, UIReducer} from './'
import { PropsWithChildren,FC,useReducer} from 'react';
import { type } from 'os';


export interface UIState {
   sidemenuOpen:boolean,
   isAddingEntry:boolean
   isDragging:boolean
}

const UI_INITIAL_STATE: UIState = {
   sidemenuOpen:false,
   isAddingEntry:false,
   isDragging:false
}


export const UIProvider:FC<PropsWithChildren> = ({ children}) => {

  const [state, dispatch] = useReducer(UIReducer, UI_INITIAL_STATE)

  const openSideMenu =()=>{
    dispatch({type:'UI - Open Sidebar'})
  }

  const closeSideMenu =()=>{
    dispatch({type:'UI - Close Sidebar'})
  }

  const setAddingEntry = (isAdding:boolean)=>{
     dispatch({type:'UI - Set isAddingEntry',payload:isAdding})
  }

  const startDragging =()=>{
    dispatch({type:'UI - Start Dragging'})
  }

  const endDragging =()=>{
    dispatch({type:'UI - End Dragging'})
  }

  return (
    <UIContext.Provider value={{
        ...state,

        //funciones
        openSideMenu,
        closeSideMenu,
        setAddingEntry,
        startDragging,
        endDragging
    }}>
      {children}
    </UIContext.Provider>
  )
}
