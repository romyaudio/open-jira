import { UIContext, UIReducer} from './'
import { PropsWithChildren,FC,useReducer} from 'react';
import { type } from 'os';


export interface UIState {
   sidemenuOpen:boolean
}

const UI_INITIAL_STATE: UIState = {
   sidemenuOpen:false,
}


export const UIProvider:FC<PropsWithChildren> = ({ children}) => {

  const [state, dispatch] = useReducer(UIReducer, UI_INITIAL_STATE)

  const openSideMenu =()=>{
    dispatch({type:'UI - Open Sidebar'})
  }

  const closeSideMenu =()=>{
    dispatch({type:'UI - Close Sidebar'})
  }
  return (
    <UIContext.Provider value={{
        ...state,

        //funciones
        openSideMenu,
        closeSideMenu,
    }}>
      {children}
    </UIContext.Provider>
  )
}
