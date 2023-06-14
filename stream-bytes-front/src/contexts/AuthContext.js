import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();



export const AuthContextProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState({isAuthenticated:false, UID:''});

    console.log("AuthCOntext", AuthContext);
    // useEffect(() => {
    //     console.log("isAuthenticated value:", isAuthenticated);
    // }, [isAuthenticated]);

    // const updateIsAuthenticated = (value) => {
    //     if (value !== isAuthenticated) {
    //         console.log("updating isAuthenticated to", value);
    //         setIsAuthenticated(value);
    //         console.log("after updating isAuthenticated value", isAuthenticated)
    //     }
    // };

    // useEffect(() => {
    //     console.log("Updated isAuthenticated value:", isAuthenticated);
    // }, [isAuthenticated]);

    const contextValue = {
        isAuthenticated,
        // updateIsAuthenticated,
        setIsAuthenticated
    };

    return (
        <AuthContext.Provider value={[isAuthenticated, setIsAuthenticated]}>
            {children}
        </AuthContext.Provider>
    );
};


