import { useState } from "react"

const Hello = (props) => {
    const birthYear = () => {
        return new Date().getFullYear() - props.age
    }
    return (
        <div>
        <p>Hello {props.name}</p>
        <p>You were born in {birthYear()}</p>
        </div>
    )
}

const Counter = () => {
  const [count, setCount] = useState(0)
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>{count}</button>
    </div>
  )
}

const Arrays = () => {
  const t = [1,2,3,4,5]
  t.push(6)
  console.log(t.length)
  t.forEach(value => console.log(value))
  return (
    <div>
      {t.map(value => <span key={value}> {value} </span>)}
    </div>
  )
}

const Objects = () => {
  const person1 = {
    name: "Rishith",
    age: 21,
    gender: "male",
    education: {
      degree: "B.Tech",
      year: 2024
    }
  }
  const person2 = {
    name: "Alice",
    age: 25,
    gender: "female",
    iq: 130
  }

  return(
    <div>
      <p>{person1.name} is {person1.age} years old.</p>
      <p>{person2.name} is {person2.age} years old.</p>
    </div>
  )
}

const App = () => {
  return (
    <>
        <h1>Hello There</h1>
        <Hello name="Rishith"/>
        <Counter/>
        <Arrays/>
        <Objects/>
    </>
  )
}

export default App
