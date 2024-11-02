import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { BrowserRouter,  Routes, Route } from 'react-router-dom'

import ProblemPage from './ProblemPage.jsx'
import Home from './Home.jsx'

createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Home/>}/>
        <Route path="problem/:problem_id" element={<ProblemPage/>}/>
      </Routes>
    </BrowserRouter>
  // </StrictMode>,
)
