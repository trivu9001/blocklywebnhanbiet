import React from 'react'
import 
{BsCart3, BsGrid1X2Fill, BsFillArchiveFill, BsPeopleFill, BsPersonCircle, BsFillMortarboardFill, BsBoxArrowLeft, BsFillPersonCheckFill}
 from 'react-icons/bs'
import './style1.css';
import { Link } from 'react-router-dom';

function Sidebar({openSidebarToggle, OpenSidebar}) {
  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive": ""}>
        <div className='sidebar-title'>
            <div className='sidebar-brand'>
                <BsFillMortarboardFill className='icon_header'/> Web nhận biết
            </div>
            <span className='icon close_icon' onClick={OpenSidebar}>X</span>
        </div>

        <ul className='sidebar-list'>
            <li className='sidebar-list-item'>
              <Link to={'/dashboard'}>
                <BsGrid1X2Fill className='icon'/> Tổng quan
              </Link>
            </li>
            <li className='sidebar-list-item'>
              <Link to={'/user-management'}>
                <BsFillPersonCheckFill className='icon'/> Quản lý người dùng
              </Link>
            </li>
            <li className='sidebar-list-item'>
              <Link to={'/admin-profile'}>
                <BsPersonCircle className='icon'/> Trang cá nhân
              </Link>
            </li>
            <li className='sidebar-list-item'>
              <Link to={'/login'}>
                <BsBoxArrowLeft className='icon'/> Đăng xuất
              </Link>
            </li>
        </ul>
    </aside>
  )
}

export default Sidebar;