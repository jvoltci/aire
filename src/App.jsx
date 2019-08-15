import React from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
//import { createHashHistory } from 'history'

import './App.css';
import Home from './Components/Home/Home.jsx'
import Poll from './Components/Poll/Poll.jsx'

//import {styled} from 'baseui';

const initialState = {
      pseudonym: 'flai',
      password: '',
      redirect: false
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

  handleRedirect(pseudonym, redirectSwitch) {
    this.setState({pseudonym: pseudonym}, () => {
    this.setState({redirect: redirectSwitch}, () => localStorage.setItem('pseudonym', JSON.stringify(this.state)));
    });
  }

  render() {
    return (
      <HashRouter>
        <Switch>
          <Route path='/' component={() => <Home 
            pseudonym={this.state.pseudonym}
            redirect={this.state.redirect}
            handleRedirect={this.handleRedirect.bind(this)}/>
          } exact/>
          <Route path='/unique' component={() => {
            if(this.state.redirect)
              return <Poll initialState={initialState} pseudonym={this.state.pseudonym} handleRedirect={this.handleRedirect.bind(this)}/>
            else
              return <Redirect to={'/'} />
          }} />
          <Route component={() => { return (<h1 style={{ color: 'red', textAlign: 'center', paddingTop: '40vh' }}>Error 404: Not Found!</h1>) }} />
        </Switch>
      </HashRouter>
    );
  }
}

export default App;