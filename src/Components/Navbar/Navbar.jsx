import React, { useContext, useEffect, useRef, useState } from 'react';
import './Navbar.css';
import logo from '../Assets/logo.png';
import cart_icon from '../Assets/cart_icon.png';
import { Link, useLocation } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext'; // Adjust the import path if necessary
import nav_dropdown from '../Assets/nav_dropdown_icon.png';


const Navbar = () => {
    const shopContext = useContext(ShopContext);
    const getTotalCartItems = shopContext ? shopContext.getTotalCartItems : () => 0;

    const menuRef = useRef();
    const location = useLocation();

    const getInitialMenu = () => {
        const savedMenu = localStorage.getItem('selectedMenu');
        return savedMenu ? savedMenu : "shop";
    };

    const [menu, setMenu] = useState(getInitialMenu);

    useEffect(() => {
        localStorage.setItem('selectedMenu', menu);
    }, [menu]);

    useEffect(() => {
        const path = location.pathname;
        if (path.includes('/mens')) setMenu('mens');
        else if (path.includes('/womens')) setMenu('womens');
        else if (path.includes('/kids')) setMenu('kids');
        else setMenu('shop');
    }, [location.pathname]);

    const dropdown_toggle = (e) => {
        menuRef.current.classList.toggle('nav-menu-visible');
        e.target.classList.toggle('open');
    };

    return (
        <div className='navbar'>
            <Link to='/' className="nav-logo">
                <img src={logo} alt="" />
                <p>MEECH</p>
            </Link>
            <img className='nav-dropdown' onClick={dropdown_toggle} src={nav_dropdown} alt="" />
            <ul ref={menuRef} className="nav-menu">
                <li onClick={() => { setMenu("shop") }}><Link style={{ textDecoration: 'none' }} to='/'>Shop</Link>{menu === "shop" ? <hr /> : <></>}</li>
                <li onClick={() => { setMenu("mens") }}><Link style={{ textDecoration: 'none' }} to='/mens'>Men</Link>{menu === "mens" ? <hr /> : <></>}</li>
                <li onClick={() => { setMenu("womens") }}><Link style={{ textDecoration: 'none' }} to='/womens'>Women</Link>{menu === "womens" ? <hr /> : <></>}</li>
                <li onClick={() => { setMenu("kids") }}><Link style={{ textDecoration: 'none' }} to='/kids'>Kids</Link>{menu === "kids" ? <hr /> : <></>}</li>
            </ul>
          
            <div className="nav-login-cart">
            {localStorage.getItem('auth-token')
                ? <button onClick={() => { localStorage.removeItem('auth-token'); window.location.replace('/') }}>Logout</button>
            :  <Link to='/login'><button>Login</button></Link>}
               <Link to='/cart'><img src={cart_icon} alt="" /></Link>
                <div className="nav-cart-count">{getTotalCartItems()}</div>
            </div>
        </div>
    );
};

export default Navbar;
