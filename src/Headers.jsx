import React, { useState } from 'react'
import './header.css'
// import img from './netflix/netflix/src/netimg/netflix-logo(2).png'

function header(props) {

    const [menuOpen , setMenuOpen] =useState(false)
    return (
        <header >
            <div className="main">
                <div className="logo">
                    <img src="https://i.pcmag.com/imagery/reviews/05cItXL96l4LE9n02WfDR0h-5.fit_scale.size_1028x578.v1582751026.png" alt="Robin" />
                </div>
                <div className="option">
                    <button className='menu' onClick={()=>setStickySidebar (true)} >Menu</button>
                    <input type="text" />
                    <button className='serch'>search</button>
                    <select name="" id="">
                        <option value="">English</option>
                        <option value="">Hindi</option>
                        <option value="">Others</option>
                    </select>
                    <button>login</button>
                </div>
            </div>


        </header>
    )
}

export default header