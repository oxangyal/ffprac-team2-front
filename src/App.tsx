import './App.css';

import { Route, Routes } from 'react-router-dom';

import Layout from './components/Layout';
import ParentDashboardPage from './pages/ParentDashboardPage';
import AuthPage from './pages/AuthPage';
//import React from 'react';

// import { useEffect, useState } from 'react';

// import { getAllData } from './util/index';

// const URL = 'http://localhost:8000/api/v1/';

const App = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Layout />}>
                    {/* <Route index element={<HomePage />} /> */}
                    <Route path="/login" element={<AuthPage activeTab={'login'} />} />
                    <Route path="/parent-dashboard" element={<ParentDashboardPage />} />
                    {/* <Route path="*" element={<NotFoundPage />} /> */}
                </Route>
            </Routes>
        </>
    );

    // const [message, setMessage] = useState('');
    // useEffect(() => {
    //   (async () => {
    //     const myData = await getAllData(URL);
    //     setMessage(myData.data);
    //   })();
    //   return () => {
    //     console.log('unmounting');
    //   };
    // }, []);
    // return (
    //   <>
    //     <h1>{message}</h1>
    //   </>
    // );
};

export default App;
