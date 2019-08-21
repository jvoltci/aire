import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
//import { createHashHistory } from 'history'

import './App.css';
import Home from './Components/Home/Home.jsx'
import Poll from './Components/Poll/Poll.jsx'
import LivePoll from './Components/Live/LivePoll.jsx'

//import {styled} from 'baseui';

const initialState = {
      pseudonym: 'flai',
      password: '',
      onPage: 0,
    }

class App extends React.Component {

  constructor() {
    super();
    if(!localStorage.getItem('pseudonym')) {
      localStorage.setItem('pseudonym', JSON.stringify(initialState))
      this.state = initialState;
    }
    else {
      this.state = JSON.parse(localStorage.getItem('pseudonym'));
    }
  }


  changePassword = (event) => {
    this.setState({password: event.target.value});     
  }
  switchPage(pseudonym, pageSerial) {
    if(pageSerial >= -1) {
      this.setState({onPage: pageSerial}, 
        () => localStorage.setItem('pseudonym', JSON.stringify(this.state)))
    }
  }

  handleRedirect(pseudonym, redirectSwitch) {
    this.setState({pseudonym: pseudonym}, () => {
    this.setState({redirect: redirectSwitch}, () => {
      if(redirectSwitch !== -1)
        localStorage.setItem('pseudonym', JSON.stringify(this.state));
    });
    });
  }
  render() {
    return (
      <HashRouter>
        <Switch>
          <Route path='/' component={() => <Home 
            pseudonym={this.state.pseudonym}
            onPage={this.state.onPage}
            switchPage={this.switchPage.bind(this)}/>
          } exact/>
          <Route path='/unique' component={() => 
            <Poll 
            switchPage={this.switchPage.bind(this)}
            onPage={this.state.onPage}
            initialState={initialState} 
            pseudonym={this.state.pseudonym} 
            />
          } />
          <Route path='/livepoll' component={
            () => 
            <LivePoll
            switchPage={this.switchPage.bind(this)}
            onPage={this.state.onPage}
            />
          } 
          />
          <Route component={() => { return (<h1 style={{ color: 'red', textAlign: 'center', paddingTop: '40vh' }}>Error 404: Not Found!</h1>) }} />
        </Switch>
      </HashRouter>
    );
  }
}

export default App;