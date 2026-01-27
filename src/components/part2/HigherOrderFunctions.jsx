const PrintArray =({array}) => {
    return(
        <ul>
            {array.map(a => (
                <li key={a.name}>
                    {a.name}
                </li>
            ))}
        </ul>
    )
}

const HigherOrderFunctions = () => {
    const triple = function (x) {
        return x * 3
    };
    const animals = [
        { name: "Lion", type: "Mammal", habitat: "Savanna", legs: 4 },
        { name: "Elephant", type: "Mammal", habitat: "Savanna", legs: 4 },
        { name: "Penguin", type: "Bird", habitat: "Antarctica", legs: 2 },
        { name: "Kangaroo", type: "Mammal", habitat: "Outback", legs: 2 },
        { name: "Crocodile", type: "Reptile", habitat: "Wetlands", legs: 4 },
        { name: "Eagle", type: "Bird", habitat: "Mountains", legs: 2 },
        { name: "Dolphin", type: "Mammal", habitat: "Ocean", legs: 0 },
        { name: "Frog", type: "Amphibian", habitat: "Swamp", legs: 4 },
        { name: "Octopus", type: "Mollusk", habitat: "Ocean", legs: 8 },
        { name: "Turtle", type: "Reptile", habitat: "Coast", legs: 4 }
    ];

    const complex = animals.filter((animal) => {
        return animal.legs >= 4;
    });



    return(
        <>
            <p>{triple(5)}</p>
            <PrintArray array={complex}/>
        </>
    )
}

export default HigherOrderFunctions;
