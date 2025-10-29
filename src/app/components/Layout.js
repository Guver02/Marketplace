import React, { createContext, useContext, useState } from "react";
import { Navbar } from "../UI-components/Navbar";

const LayoutContext = createContext()

const useLayout = () => useContext(LayoutContext)

function Layout({ children }) {
    const [navBarColor, setNavBarColor] = useState('#fff')

    return (
        <LayoutContext.Provider value={{setNavBarColor}}>
            <div style={
                {display: 'flex',
                flexDirection: 'column',
                height: '100vh',
                width: '100vw' }}>
                <Navbar navBarColor={navBarColor} />
                {children}
            </div>
        </LayoutContext.Provider>
    )
}

export { Layout, useLayout }