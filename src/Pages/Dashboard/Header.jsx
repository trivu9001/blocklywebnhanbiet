import React from 'react'
import 
 { BsPersonCircle, BsSearch, BsJustify}
 from 'react-icons/bs'
import './style1.css';

function Header({OpenSidebar}) {
  return (
    <header className='header'>
        <div className='menu-icon'>
            <BsJustify className='icon' onClick={OpenSidebar}/>
        </div>
        <div className='header-left'>
            <BsSearch  className='icon'/>
        </div>
        <div className='header-right'>
            <BsPersonCircle className='icon'/> Xin chào
        </div>
    </header>
  )
}

export default Header;