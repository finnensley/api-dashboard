import React, { useState, useEffect } from 'react';


const ToggleTheme = ({ theme, setTheme}) => {

    const handleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    }


    return(
        <>
        <button type="button" onClick={(handleTheme)}>
            {theme === "dark" ? "🌙" : "☀️" }   
        </button>
        </>
    );
};

export default ToggleTheme;