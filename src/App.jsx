import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from 'react-router-dom';

import Home from './Components/Home';
import Login from './Components/Login';
import Signup from './Components/Signup';
import IdentificationPage from './Components/IdentificationPage';
// import EmergencyMapPage from './Components/EmergencyMapPage';
// import ResultsPage from './Components/ResultsPage';
import IdentificationResult from './Components/IdentificationResult';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/identify" element={<IdentificationPage />} />
        {/* <Route path="/emergency" element={<EmergencyMapPage />} />
        <Route path="/results" element={<ResultsPage />} /> */}
        {/* Add additional routes as needed */}
        <Route path="/results/:id" element={<IdentificationResult />} />
      </Routes>
    </Router>
  )
}

export default App