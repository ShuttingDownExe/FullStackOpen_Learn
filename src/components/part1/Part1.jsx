import { Link } from 'react-router-dom';
import DisplayHeader from "./DisplayHeader.jsx";
import DisplayBasicText from "./DisplayBasicText.jsx";
import ManualCounter from "./ManualCounter.jsx";
import TimedCounter from "./TimedCounter.jsx";
import RegExMatch from "./RegExMatch.jsx";
import LeftAndRightClicks from "./LeftAndRightClicks.jsx";
import Calculator from "./Calculator.jsx";
import ReturningFunctions from "./ReturningFunctions.jsx";

export default function Part1() {
    return (
        <>
            <Link to="/">
                <button>← Back to Home</button>
            </Link>
            <DisplayHeader text="Part 1" />
            <DisplayBasicText text="Hello There" />
            <ManualCounter />
            <TimedCounter />
            <RegExMatch />
            <LeftAndRightClicks />
            <Calculator />
            <ReturningFunctions />
        </>
    );
}