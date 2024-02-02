import { BrowserRouter, Routes, Route} from 'react-router-dom';
import LoginSignup from './Components/login-signup/LoginSignup';
import './App.css';
import Upload from './Components/upload/Upload';

function App() {
  return (
    <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="/" element={<LoginSignup />} />
            <Route path="/upload" element={<Upload />} />
          </Routes>
        </div>
      </BrowserRouter>
  );
}

export default App;
