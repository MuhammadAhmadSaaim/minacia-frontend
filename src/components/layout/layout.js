import React from 'react'
import Footer from "../footer"
import Navbar from "../navbar"

export const Layout = (props) => {
    return (
        <div className={props.class}>
            <Navbar />
            {props.children}
            <Footer />
        </div>
    )
}
