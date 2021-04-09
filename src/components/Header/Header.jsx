import React from 'react';
import { Button } from "@material-ui/core";
import './styles.css';

const Header = () => {
    return (
        <header>
            <div className="slideshow-container">
                <div className="outer">
                    <div className="details">
                        <h1>Affordable fast meals.</h1>
                        <h2>super fast delivery!!!</h2>
                        <Button type="button" className="header-btn"><a href="#categories">order now</a></Button>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header
