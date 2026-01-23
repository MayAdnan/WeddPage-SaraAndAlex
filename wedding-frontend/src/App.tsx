import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/public/HomePage';

function App() {
  return (
    <BrowserRouter basename="/Wedd-Page-SaraAndAlex">
      <Routes>
        {/* Public Wedding Page */}
        <Route path="/" element={<HomePage />} />
        
        {/* Redirect any other route to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
