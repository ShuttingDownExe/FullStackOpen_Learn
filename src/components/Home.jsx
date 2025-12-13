import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div>
            <nav>
                <Link to="/part1">
                    <button>Part 1</button>
                </Link>
                <Link to="/part2">
                    <button>Part 2</button>
                </Link>
            </nav>
            <h1>Full Stack Open Course</h1>
            <p>Welcome to the Full Stack Open Course!</p>
        </div>
    );
};

export default Home;
