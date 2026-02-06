import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home.jsx';
import Part1 from './components/part1/Part1.jsx';
import Part2 from './components/part2/Part2.jsx';
import Axios from './components/part2/Axios.jsx';

const App = () => {
  return (
    <Router>
      <Routes>
          <Route path="/part1" element={<Part1 />} />
          <Route path="/part2" element={<Part2/>}/>
          <Route path="/" element={<Home />} />
           <Route path="/Axios" element={<Axios/>}/>
      </Routes>
    </Router>
  )
}

export default App
