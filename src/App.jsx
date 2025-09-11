import { Outlet } from 'react-router-dom';
import './App.css';
import { ToastContainer } from 'react-toastify';
import Footer from './components/Footer';
import Header from './components/Header';
import { useEffect } from 'react';
import summaryApi from './common/common';
import Context from './context/context';

function App() {

  const fetchUserDetails = async () => {

    const response = await fetch(summaryApi.currentUser.url, {
      method: summaryApi.currentUser.method,
      credentials: 'include', // Include cookies in the request
    });

    const dataApi = await response.json();
    console.log("Current User Data:", dataApi);

  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  return (
    <>
      <Context.Provider value={{
        fetchUserDetails
      }}>
        <ToastContainer />
        <Header />
        <main className="min-h-[calc(100vh-125px)]">
          <Outlet />
        </main>
        <Footer />
      </Context.Provider>
    </>
  );
}

export default App;
