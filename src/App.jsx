const Hello = (props) => {
    const birthYear = () => {
        return new Date()   .getFullYear() - props.age
    }
    return (
        <h1>Hello {props.name}</h1>

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
