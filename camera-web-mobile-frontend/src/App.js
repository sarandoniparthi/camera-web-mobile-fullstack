import React, { Component } from 'react';
import Camera from './Camera/Camera';
import './style.css';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';



class App extends Component {
  constructor() {
    super();
    this.state = {
      name: 'React'
     
    };
  }

  
  render() {
    return (
      <div>
        <div>
          <div className="jumbotron text-center">
            <h1>{this.state.name} Image Upload</h1>
            <p>Capture image from mobile or web</p>
          </div> 
          
          <div className="container">
            <div className="row">
                                       
              <Camera/>
              
            </div>
          </div>
        </div>
      </div>
    );
  }
}


export default App;