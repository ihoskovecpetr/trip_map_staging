/** @jsx jsx */
import { jsx } from 'theme-ui'
import React from 'react'
import Header from './header/header'
import Footer from './footer/footer'

export default function Layout({ children, withFooter = false, isRelative }) {
    return (
        <React.Fragment>
            <Header isRelative={isRelative} />
            {children}
            {withFooter && <Footer />}
        </React.Fragment>
    )
}
