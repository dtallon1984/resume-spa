import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import About from './pages/About';
import Experience from './pages/Experience';
import Projects from './pages/Projects';
import Chat from './pages/Chat';
import Navigation from './components/Navi/Navigation';
import Footer from './components/Footer/Footer';

function App() {
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
              <Route path="/chat" element={<Chat />} />
            </Routes>
          </main>
            <Footer email="dtallon1984@gmail.com" github="github.com/dtallon1984" />
        </div>
      </div>
    </Router>
  );
}

export default App;
