import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
//import { createHashHistory } from 'history'

import './App.css';
import Home from './Components/Home/Home.jsx';
import Poll from './Components/Poll/Poll.jsx';
import LivePoll from './Components/Live/LivePoll.jsx';

//import {styled} from 'baseui';

const initialState = {
      currentParticipantClickSerial: -1,
      disabledParticipants: {},
      homeClick: false,
      isAdmin: 1,
      isPrimaryOpen: false,
      isSecondaryOpen: false,
      listParticipants: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 
      listQnP: ["Do you like the name?", 
        "Have you ever taken a survey?",
        "Do you believe in Entanglement?", 
        "Are you a god?"],
      onPage: 0,
      participantName: '',
      participantNotify: false,
      password: '',
      pseudonym: 'flai',
      secureState: false,
      totalParticipants: 11,
      wantParticipant: false,
      warning: false,
    }

class App extends React.Component {

  constructor() {
    super();
    if(!localStorage.getItem('airePoll')) {
      localStorage.setItem('airePoll', JSON.stringify(initialState))
      this.state = initialState;
    }
    else {
      this.state = JSON.parse(localStorage.getItem('airePoll'));
    }
  }

  changePassword(event) {
    this.setState({password: event.target.value});     
  }

  disableCurrentParticipant(index, name) {
      const listSerials = this.state.listParticipants;
      const disabledParticipants = this.state.disabledParticipants;
      disabledParticipants[index] = name;
      for(let i = 0; i < this.state.totalParticipants; ++i)
          if(index === i)
            listSerials[i] =  -1;
      this.setState({listParticipants: listSerials, 
          disabledParticipants: disabledParticipants}, () => localStorage.setItem('airePoll', JSON.stringify(this.state)));
  }
  handleFinal(totalParticipants) {
      
      const listSerials = [];
      for(let i = 0; i < totalParticipants; ++i) {
          listSerials.push(i)
      }
      this.setState({listParticipants: listSerials}, 
          () => {
              this.switchPage('', 6);
              localStorage.setItem('airePoll', JSON.stringify(this.state));
      });
  }
  handleHomeClick() {
      this.setState({warning: true}, () => {
          localStorage.setItem('airePoll', JSON.stringify(this.state));
      })
  }
  handleInvite(inviteSwitch, index) {
      if(index >= 0)
          this.setState({wantParticipant: inviteSwitch,
            currentParticipantClickSerial: index}, () =>  localStorage.setItem('airePoll', JSON.stringify(this.state)))
      else
          this.setState({wantParticipant: inviteSwitch, participantName: ''}, () => localStorage.setItem('airePoll', JSON.stringify(this.state)))
  }
  handleRedirect(pseudonym, redirectSwitch) {
    this.setState({pseudonym: pseudonym}, () => {
    this.setState({redirect: redirectSwitch}, () => {
      if(redirectSwitch !== -1)
        localStorage.setItem('pseudonym', JSON.stringify(this.state));
    });
    });
  }
  handleWarningClick() {
      this.switchPage('flai', 0);
      this.setState({warning: false}, () => localStorage.setItem('airePoll', JSON.stringify(this.state)));
  }
  removeItem(surface, index) {
      console.log(index);
      if(surface === "questionPolling") {
          let temp = this.state.listQnP;
          temp.splice(Number(index), 1);
          this.setState({listQnP: temp}, () => localStorage.setItem('airePoll', JSON.stringify(this.state)))
      }
  }

  switchPage(pseudonym, pageSerial) {
    if(pageSerial >= -1) {
      this.setState({pseudonym: (pseudonym?pseudonym:this.state.pseudonym), onPage: pageSerial}, 
        () => localStorage.setItem('airePoll', JSON.stringify(this.state)))
    }
  }
  toggleDialog(surface, dialogSwitch) {
      if(surface === "primary") {
          this.setState({isPrimaryOpen: dialogSwitch}, () => {
              localStorage.setItem('airePoll', JSON.stringify(this.state));
          })
      }
      if(surface === "secondary") {
          this.setState({isSecondaryOpen: dialogSwitch}, () => {
              localStorage.setItem('airePoll', JSON.stringify(this.state));
          })
      }
      if(surface === "warn")  {
          this.setState({warning: dialogSwitch}, () => {
              localStorage.setItem('airePoll', JSON.stringify(this.state));
          })
      }
  }
  toggleSwitch(totalParticipants) {
      this.setState({totalParticipants: totalParticipants, secureState: !this.state.secureState}, () => {
          localStorage.setItem('airePoll', JSON.stringify(this.state));
      })
  }
  updatePollQuestions(question) {
      const prevQ = this.state.listQnP;
      prevQ.push(question);
      this.setState({listQnP: prevQ}, () => {
          localStorage.setItem('airePoll', JSON.stringify(this.state))
      });
  }



  render() {
    return (
      <HashRouter>
        <Switch>

          <Route path='/' component={() => 
            <Home 
            pseudonym={this.state.pseudonym}
            onPage={this.state.onPage}
            switchPage={this.switchPage.bind(this)}/>
          } exact/>

          <Route path='/unique' component={() => 
            <Poll
            handleFinal={this.handleFinal.bind(this)}
            handleHomeClick={this.handleHomeClick.bind(this)}
            handleWarningClick={this.handleWarningClick.bind(this)}
            homeClick={this.state.homeClick}
            isPrimaryOpen={this.state.isPrimaryOpen}
            isSecondaryOpen={this.state.isSecondaryOpen}
            listQnP={this.state.listQnP}
            onPage={this.state.onPage}
            participantNotify={this.state.participantNotify}
            pseudonym={this.state.pseudonym}
            removeItem={this.removeItem.bind(this)}
            secureState={this.state.secureState}
            switchPage={this.switchPage.bind(this)}
            toggleDialog={this.toggleDialog.bind(this)}
            totalParticipants={this.state.totalParticipants}
            toggleSwitch={this.toggleSwitch.bind(this)}
            warning={this.state.warning}
            updatePollQuestions={this.updatePollQuestions.bind(this)}
            />
          } />

          <Route path='/live' component={
            () => 
            <LivePoll
            currentParticipantClickSerial={this.state.currentParticipantClickSerial}
            disableCurrentParticipant={this.disableCurrentParticipant.bind(this)}
            disabledParticipants={this.state.disabledParticipants}
            handleHomeClick={this.handleHomeClick.bind(this)}
            handleInvite={this.handleInvite.bind(this)}
            handleWarningClick={this.handleWarningClick.bind(this)}
            isAdmin={this.state.isAdmin}
            listParticipants={this.state.listParticipants}
            onPage={this.state.onPage}
            listQnP={this.state.listQnP}
            participantNotify={this.state.participantNotify}
            pseudonym={this.state.pseudonym}
            switchPage={this.switchPage.bind(this)}
            toggleDialog={this.toggleDialog.bind(this)}
            wantParticipant={this.state.wantParticipant}
            warning={this.state.warning}
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