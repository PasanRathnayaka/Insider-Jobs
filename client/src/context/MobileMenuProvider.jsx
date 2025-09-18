import { createContext, useContext, useState } from "react";


const MobileMenuContext = createContext();

export const MobileMenuProvider = ({children}) => {

    const [isMobileMenuOpend, setIsMobileMenuOpend] = useState(false);

    const handleToggleMobileMenu = () => {
        setIsMobileMenuOpend(!isMobileMenuOpend);
    }



    return (
        <MobileMenuContext.Provider value={
            {
                isMobileMenuOpend, handleToggleMobileMenu,
            }
        }>
            {children}
        </MobileMenuContext.Provider>
    )
}

export const useMobileMenu = () => useContext(MobileMenuContext);