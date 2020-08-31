import React, { useState } from 'react';


const Context = React.createContext();

export function AuthContextProvider({ children }) {
    const [user, setUser] = useState([]);
    const [authenticated, setAuthenticated] = useState(false);

    return <Context.Provider value={{ user, setUser, authenticated, setAuthenticated }} >
        {children}
    </Context.Provider>
}
export default Context;
