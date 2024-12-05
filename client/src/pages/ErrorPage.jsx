import React from 'react';
import { useNavigate } from 'react-router-dom'; // Assuming you use React Router for navigation

const ErrorPage = () => {
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate('/'); // Redirect to the homepage
    };

    return (
        <div style={styles.container}>
            <div style={styles.errorBox}>
                <h1 style={styles.heading}>Oops!</h1>
                <p style={styles.message}>
                    Something went wrong. The page you are looking for does not exist or an unexpected error has occurred.
                </p>
                <button style={styles.button} onClick={handleGoHome}>
                    Go to Homepage
                </button>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f9f9f9',
    },
    errorBox: {
        textAlign: 'center',
        backgroundColor: '#fff',
        padding: '30px',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    heading: {
        fontSize: '48px',
        margin: '0 0 10px 0',
        color: '#ff4d4f',
    },
    message: {
        fontSize: '18px',
        color: '#666',
        margin: '10px 0 20px 0',
    },
    button: {
        backgroundColor: '#007bff',
        color: '#fff',
        padding: '10px 20px',
        borderRadius: '5px',
        border: 'none',
        cursor: 'pointer',
        fontSize: '16px',
    },
    buttonHover: {
        backgroundColor: '#0056b3',
    },
};

export default ErrorPage;
