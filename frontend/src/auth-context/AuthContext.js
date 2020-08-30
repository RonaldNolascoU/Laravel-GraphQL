import React, { useState } from 'react';


const Context = React.createContext();

export function AuthContextProvider({ children }) {
    const [user, setUser] = useState([]);

    return <Context.Provider value={{ user, setUser }} >
        {children}
    </Context.Provider>
}
export default Context;
