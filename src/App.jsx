import { Outlet } from 'react-router-dom'
import './App.css'
import { ToastContainer} from 'react-toastify';
import Footer from './components/Footer'
import Header from './components/Header'

function App() {

  return (
    <>
      <ToastContainer/>
      <Header />
      <main className='min-h-[calc(100vh-125px)] '>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default App
