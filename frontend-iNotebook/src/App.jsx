import Navbar from './components/Navbar';
import logo from './assets/images/logo.png';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import dark from './assets/images/darkMode.png';
import NoteState from './context/notes/noteState';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';
import { useState } from 'react';


const App = () => {

  const [alert, setAlert] = useState(null)

  const showAlert = (message) => {
    setAlert(message)
    setTimeout(() => {
      setAlert(null)
    }, 1500);
  }

  return (
    <>
      <NoteState>
        <Router>
          <Navbar logo={logo} dark={dark} showAlert={showAlert}/>
          <Alert message={alert} />
          <Routes>
            <Route exact path="/" element={<Home showAlert={showAlert}/>} />
            <Route exact path="/login" element={<Login showAlert={showAlert} />} />
            <Route exact path="/signup" element={<Signup showAlert={showAlert} />} />
            {/* <Route exact path="/about" element={<About />} /> */}
          </Routes>
        </Router>
      </NoteState>
    </>
  )
}

export default App