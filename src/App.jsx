import { ToastContainer } from 'react-toastify'
import './App.css'
import CustumePizzaMaker from './pizza/CustumePizzaMaker'

function App() {

  return (
    <>
      <CustumePizzaMaker />
      <ToastContainer
        position="top-center"
        autoClose={5000}
        limit={5}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      // transition={"Bounce"}
      />
    </>
  )
}

export default App