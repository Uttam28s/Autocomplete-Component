import React, { useEffect, useState } from 'react';
import './App.css';
import { AutoComplete } from './AutoComplete';

function App() {
  const [countryData, setCountryData] = useState<any>([])

  useEffect(() => {
    //Call api for get country data from https://www.universal-tutorial.com/rest-apis/free-rest-api-for-country-state-city
      // first call for get auth-token for api
    fetch('https://www.universal-tutorial.com/api/getaccesstoken', {
      method: 'GET',
      headers: {
      "Accept": "application/json",
      "api-token": `${process.env.REACT_APP_API_AUTH_TOKEN}`,
      "user-email": `${process.env.REACT_APP_API_EMAIL}`
    }
    })
      .then(response => response.json())
      .then(response => {
        //this api call for get country data
        fetch('https://www.universal-tutorial.com/api/countries/', {
          method: 'GET',
          headers: {
          "Accept": "application/json",
          "Authorization": `Bearer ${response.auth_token}`
        }
        })
        .then(res => res.json())
        .then(data => {
          if (data && data.length) {
            //set api data in state
            setCountryData(data)
          }
        })
        .catch(error => {
          alert(error)
        });
      })
      .catch(error => {
        alert(error)
      });
  }, [])
  
  return (
    <div className="App">
      <header className="App-header">
        <AutoComplete 
          data={countryData}
        />
      </header>
    </div>
  );
}

export default App;
