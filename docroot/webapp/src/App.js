import React, { Component } from 'react';
import './App.css';
import { Bar, defaults } from 'react-chartjs-2';
import MakeEntry from "./MakeEntry.js";

const API = 'http://api.quantworks.lc:81';
const path = '/api/v1/gender-dist';
const endpoint = '/api/v1/store-details';
defaults.global.maintainAspectRatio = false;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      female: 1,
      male: 1,
    };
  }

  getGenderData(){
    fetch(API + path, {
      method: 'get',
      headers: {
        'Accept': 'application/json'
      }
    })
    .then(function(response) {
      if (response.status >= 400) {
        throw new Error("Bad response from server");
      }
      return response.json();
    })
    .then(data =>
      this.setState({
        female: data.items[0].Female,
        male: data.items[1].Male,
      })
    );
  }

  componentDidMount() {
    this.getGenderData();
  }

  render() {
    const { female, male, } = this.state;
    const data = {
      labels: ['Female', 'Male'],
      datasets: [
        {
          label: 'Gender Distribution',
          data: [female, male],
          fillColor: "rgba(220,220,220,0.5)",
          borderColor: 'green',
        }
      ]
    }

    return (
      <div className="App">
        <header className="App-header">
          <h1>Quantworks</h1>
        </header>
        <Bar
            data={data}
            width={50}
            height={50}
            options={{
              maintainAspectRatio: false,
              scaleBeginAtZero : true,
            }}
        />

        <MakeEntry state={this} path={path} API={API} endpoint={endpoint}/>
      </div>
    );
  }

}


export default App;
