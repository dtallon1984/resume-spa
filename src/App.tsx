import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useEffect } from 'react';
import About from './pages/About';
import Experience from './pages/Experience';
import Projects from './pages/Projects';
import Chat from './pages/Chat';
import Navigation from './components/Navi/Navigation';
import Footer from './components/Footer/Footer';
import { Toaster, toast } from "react-hot-toast";
import {profileData} from './data/profileData';

function App() {
   useEffect(() => {
    toast(
      t => (
        <div>
          👋 Welcome to my iResume & portfolio!  
          Feel free to browse around or{' '}
          <Link
            to="/chat"
            className="text-blue-600 underline hover:text-blue-800"
            onClick={() => toast.dismiss(t.id)} // close toast on click
          >
            chat
          </Link>{' '}
          with my digital assistant. It can answer questions about me and even help schedule a call.
        </div>
      ),
      { duration: 8000 }
    );
  }, []);
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto px-4 py-8">
          <Navigation />  {/* Updated to use Links */}

          <main className="max-w-6xl mx-auto mt-8">
            <Routes>
              <Route path="/" element={<About />} />
              <Route path="/experience" element={<Experience />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/chat" element={<Chat profileData={profileData} />} />
            </Routes>
          </main>
            <Footer email="dtallon1984@gmail.com" github="github.com/dtallon1984" />
        </div>
        <Toaster position="top-center" />
      </div>
    </Router>
  );
}

export default App;
