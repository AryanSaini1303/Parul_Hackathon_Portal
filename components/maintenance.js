import React from 'react';
import Head from 'next/head';

const Maintenance = () => {
  return (
    <>
      <Head>
        <title>Maintenance Mode</title>
        <meta name="description" content="Our site is currently under maintenance." />
      </Head>
      <div className="maintenance-container">
        <h1>We'll Be Back Soon!</h1>
        <p>Our website is currently undergoing scheduled maintenance.</p>
        <p>We apologize for any inconvenience caused.</p>
        <div className="spinner"></div>
      </div>

      <style jsx>{`
        .maintenance-container {
          height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background-color: #121212;
          color: #f1f1f1;
          text-align: center;
          padding: 20px;
        }

        h1 {
          font-size: 3rem;
          margin-bottom: 20px;
          color: #ff6f61;
        }

        p {
          font-size: 1.2rem;
          margin-bottom: 15px;
        }

        .spinner {
          margin-top: 20px;
          border: 8px solid rgba(255, 255, 255, 0.3);
          border-top: 8px solid #ff6f61;
          border-radius: 50%;
          width: 80px;
          height: 80px;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </>
  );
};

export default Maintenance;