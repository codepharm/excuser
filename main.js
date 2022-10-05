// a list of excuses
const excuseList = [
  'Family',
  'Office',
  'Children',
  'College',
  'Party',
]

// a button component that receives props
const Button = (props) => {
  return (
    <button style={{margin:'0.5rem'}} onClick={props.onClick}>{props.name}</button>
  )
}

// the main component
function App() {

  // state variables
  const [excuse, setExcuse] = React.useState(null);

  // a function that generates a random excuse
  const getExcuse = async (url) => {

    // fetch the data from the API
    await fetch(`https://excuser.herokuapp.com/v1/excuse/${url}`)

    // convert the response to json
    .then((res) => res.json())

    // set the excuse state variable
    .then((data) => {

      // set the excuse state variable
      setExcuse(data[0].excuse);
    })

    // catch any errors
    .catch((err) => console.log(err));
  }

  // return the JSX
  return (
    <div style={{textAlign: 'center'}}>
      <h1>Need an Excuse?</h1>

      {/* map the excuse list to buttons */}
      {excuseList.map((excuse, index) => {
        return <Button key={index} name={excuse} onClick={() => getExcuse(excuse.toLowerCase())} />
      })}

      {/* display the excuse */}
      {excuse && <>
        <h2>Here's a good excuse...</h2>
        <p id='excuse'>{excuse}</p>
      </>}

    </div>
  );
}

// render the app
const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<App />);