import { createContext } from 'react';


interface ContextPros {
sidemenuOpen :boolean,
isAddingEntry:boolean,
isDragging:boolean
openSideMenu: () => void;
closeSideMenu: () => void;
setAddingEntry: (isAdding: boolean) => void
startDragging: () => void
endDragging: () => void
}

export const UIContext = createContext({} as ContextPros);