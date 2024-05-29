import React from 'react';
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import Signup from './Pages/Signup';
import { Signin } from './Pages/Signin';
import Dashboard  from './Pages/Dashboard';
import { SendMoney } from './Components/SendMoney';


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/signin' element={<Signin/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/send' element={<SendMoney/>} />
         </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
