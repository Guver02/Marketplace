import React from "react";
import { Navbar } from "../UI-components/Navbar";

function Layout({ children }) {

    return <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', width: '100vw' }}>
        <Navbar />
        {children}
    </div>
}

export { Layout }