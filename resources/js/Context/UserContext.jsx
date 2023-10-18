import React, { createContext, useState } from 'react';

export const userContext = createContext({});

const UserContext = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const user = {
        loginState: [isLoggedIn, setIsLoggedIn]
    }
    return (
        <userContext.Provider value={user}>
            {children}
        </userContext.Provider>
    );
};

export default UserContext;