import { createContext } from 'react';


interface ContextPros {
sidemenuOpen :boolean,
openSideMenu: () => void;
closeSideMenu: () => void
}

export const UIContext = createContext({} as ContextPros);