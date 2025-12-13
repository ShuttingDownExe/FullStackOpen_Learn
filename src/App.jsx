import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home.jsx';
import Part1 from './components/part1/Part1.jsx';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/part1" element={<Part1 />} />
      </Routes>
    </Router>
  )
}

export default App
