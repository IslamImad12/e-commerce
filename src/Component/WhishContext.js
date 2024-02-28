import { createContext } from "react"
import { addToWhish } from "./useWishlest";

export let whishContext = createContext();

export function WhishContextProvider(props) {
    return <whishContext.Provider value={{addToWhish}}>
        {props.children}
    </whishContext.Provider>
}
