const Hello = (props) => {
    const birthYear = () => {
        return new Date()   .getFullYear() - props.age
    }
    return (
        <p>Hello {props.name}</p>

    )
}

const App = () => {
  return (
    <>
        <h1>Hello There</h1>
        <Hello name="Rishith"/>
    </>
  )
}

export default App
