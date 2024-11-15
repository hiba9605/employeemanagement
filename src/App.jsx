
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import './App.css'
import Add from './components/Add'
import Edit from './components/Edit'
import Home from './components/Home'

function App() {

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path={'/'} element={<Home/>}/>
        <Route path={'/add'} element={<Add/>}/>
        <Route path={'/edit/:id'} element={<Edit/>}/>


      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
