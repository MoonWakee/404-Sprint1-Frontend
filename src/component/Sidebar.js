import React, { useState } from 'react' 
import '../App.css';
import { SidebarData } from './SidebarData';



function Sidebar(){
    
    const routeChange = (p) =>{ 
        let isCur;
        if (p == window.location.pathname){
            isCur = "/"
        } else {
            isCur = p
        }
        window.location.pathname = isCur
    }
    
    return (
        <div className='Sidebar'>
            <ul className='SidebarList'>
                {SidebarData.map((val, key) => {
                    return (
                    <li 
                        key={key} 
                        className="row"
                        id={window.location.pathname == val.link ? "active" : "not"}
                        onClick={(event) => routeChange(val.link)}
                    >
                        <div id='icon'>{val.icon}</div>
                        <div id='name'>{val.name}</div>
                    </li>
                    );
                })}
            </ul>
        </div>
    )
}

export default Sidebar