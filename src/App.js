import React, { useState, useEffect } from 'react'
import './App.css'

//Custom imports
import Poster from './Poster'
import ShowBounty from './ShowBounty'
import BountyForm from './BountyForm'

// API URL (Brandi's)
const API_URL = `https://bounty-api-brandi.herokuapp.com/v1/bounties/`

function App() {
  // State variables
  let [bounties, setBounties] = useState([])
  let [currentBounty, setCurrentBounty] = useState({})

  // Effect hook
  useEffect(() => {
    callAPI()
  }, [])

  // Function to call the API and retrieve the bounties
  const callAPI = () => {
    fetch(API_URL)
    .then(response => response.json())
    .then(data => {
      console.log(data)
      setBounties(data)
    })
    .catch(err => {
      console.log('Error!', err)
    })
  }

  let poster = bounties.map((b, i) => {
    return (
      <Poster 
        key={i}
        bounty={b}
        refresh={callAPI}
        currentId={currentBounty._id}
        changeCurrent={setCurrentBounty}
      />
    
      )
  })

  return (
    <div className="App">
      <header className="App-header">
        <h1>Wanted Poster Bulletin Board</h1>
        <p>Reduce crime in your neighborhood!</p>
      </header>
      <main>
        {poster}
        <ShowBounty currentBounty={currentBounty} />
        <BountyForm refresh={callAPI}/>
      </main>
    </div>
  );
}

export default App;
