import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage'; 
import { DemandDetail } from './pages/DemandDetail';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/demands/:id" element={<DemandDetail />} />
          </Routes>
        </header>
      </div>
    </BrowserRouter>
  );
}

export default App;