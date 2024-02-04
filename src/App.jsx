import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import { ClerkProvider, SignedIn, SignedOut } from '@clerk/clerk-react'
import Login from './pages/Login';
import DashBoard from './pages/DashBoard';
import TaskManager from './pages/TaskManager';
import VideoConferencing from './pages/VideoConferencing';


export default function App() {

  return (
    <ClerkProvider publishableKey='pk_test_Y3VkZGx5LWJlYXItMzEuY2xlcmsuYWNjb3VudHMuZGV2JA'>

      <BrowserRouter>
        <SignedIn>
          <Routes>
            <Route path="/" element={<DashBoard />} />
            <Route path="/taskManager" element={<TaskManager />} />
            <Route path='/videoConferencing' element={<VideoConferencing />} />
          </Routes>
        </SignedIn>

        <SignedOut>
          <Routes>
            {/* <Route path="/" element={<Home />} /> */}
            <Route path="/" element={<Login />} />
          </Routes>
        </SignedOut>
    </BrowserRouter>
    </ClerkProvider>


  )
}
