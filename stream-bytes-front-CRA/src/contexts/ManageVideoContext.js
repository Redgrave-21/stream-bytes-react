import { createContext, useState, useEffect } from 'react';

export const ManageVideoContext = createContext();



export const ManageVideoContextProvider = ({ children }) => {
    const [existingVideoData, setExistingVideoData] = useState({title:'', description:''});

    console.log("Manage video context", ManageVideoContext);


    return (
        <ManageVideoContext.Provider value={[existingVideoData, setExistingVideoData]}>
            {children}
        </ManageVideoContext.Provider>
    );
};


