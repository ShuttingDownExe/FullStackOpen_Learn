import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div>
            <h1>Full Stack Open Course</h1>
            <p>Welcome to the Full Stack Open Course!</p>
            <nav>
                <Link to="/part1">
                    <button>Part 1</button>
                </Link>
            </nav>
        </div>
    );
};

export default Home;
