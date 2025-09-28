import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useRef,useEffect } from 'react';
import About from './pages/About';
import Experience from './pages/Experience';
import Projects from './pages/Projects';
import Chat from './pages/Chat';
import Navigation from './components/Navi/Navigation';
import Footer from './components/Footer/Footer';
import { Toaster, toast } from "react-hot-toast";
import {profileData} from './data/profileData';

function App() {
   const toastShown = useRef(false);

  useEffect(() => {
    if (toastShown.current) return;
    toastShown.current = true;

    toast(
      t => (
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 p-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-2xl shadow-xl w-[85vw] max-w-[1200px] mx-auto">
          <span className="text-lg font-semibold">👋 Welcome to my iResume & portfolio!</span>
          <span>
            Feel free to browse around or{' '}
            <Link
              to="/chat"
              className="underline hover:text-blue-200 font-semibold"
              onClick={() => toast.dismiss(t.id)}
            >
              chat
            </Link>{' '}
            with my digital assistant. It can answer questions about me and even help schedule a call.
          </span>
        </div>
      ),
      {
        duration: 10000,
        style: { background: "transparent", padding: 0 },
        position: "top-center",
      }
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
         <Toaster
        toastOptions={{
          className: "w-full flex justify-center", // centers the inner toast
          duration: 10000,
          position: "top-center",
        }}
      />

      </div>
    </Router>
  );
}

export default App;
