import { Outlet } from 'react-router-dom';
import './App.css';
import { ToastContainer } from 'react-toastify';
import Footer from './components/Footer';
import Header from './components/Header';
import { useEffect, useRef } from 'react';
import summaryApi from './common/common';
import Context from './context/context';
import {useDispatch} from 'react-redux'
import { setUserDetails } from './store/userSlice';


function App() {
  const hasFetched = useRef(false); // Prevent double fetch in Strict Mode

  const dispatch =  useDispatch();

  const fetchUserDetails = async () => {
    try {
      const response = await fetch(summaryApi.currentUser.url, {
        method: summaryApi.currentUser.method,
        credentials: 'include', // Include cookies
      });

      if (!response.ok) {
        console.error('Failed to fetch user details:', response.status);
        return;
      }

      const dataApi = await response.json();

      if(dataApi.success){
        dispatch(setUserDetails(dataApi.data))
      }
      console.log("Current User Data:", dataApi);
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  useEffect(() => {
    if (!hasFetched.current) {
      fetchUserDetails();
      hasFetched.current = true;
    }
  }, []);

  return (
    <Context.Provider value={{ fetchUserDetails }}>
      <ToastContainer />
      <Header />
      <main className="min-h-[calc(100vh-125px)]">
        <Outlet />
      </main>
      <Footer />
    </Context.Provider>
  );
}

export default App;
