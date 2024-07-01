import React from 'react';
import CartItems from '../Components/CartItems/CartItems';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1); // Navigates back to the previous page
    };

    return (
        <div style={styles.cover}>
            <CartItems />
        </div>
    );
};

const styles = {
    link: {
        textDecoration: 'none',
        color: 'inherit',
        display: 'flex',
        alignItems: 'center',
        marginLeft: '30px',
        marginTop: '10px',
        width: '12rem'
    },
    icon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '8px',
        border: '#228B22 1px solid',
        transition: 'box-shadow 0.3s ease',
        color: "#228B22",
        cursor: 'pointer',
    },
    iconSvg: {
        width: '20px',
        height: '20px',
    },
};

export default Cart;
