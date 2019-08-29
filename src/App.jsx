import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import io from 'socket.io-client';
//import EventEmitter from 'eventemitter3';

import './App.css';
import Home from './Components/Home/Home.jsx';
import Poll from './Components/Poll/Poll.jsx';
import LivePoll from './Components/Live/LivePoll.jsx';


const initialState = {
      currentParticipantClickSerial: -1,
      homeClick: false,
      isAdmin: 0,
      isPrimaryOpen: false,
      isSecondaryOpen: false,
      listParticipants: {}, 
      listQnP: [],
      liveFeedUpdate: {},
      onPage: 0,
      participantName: '',
      participantNotify: false,
      password: '',
      polls: [],
      pollResult: {},
      pseudonym: 'flai',
      secureState: false,
      totalParticipants: 0,
      total: 0,
      wantParticipant: false,
      warning: false,
    }

class App extends React.Component {

  constructor() {
    super();
    //this.EventEmitter = new EventEmitter();

    if(!localStorage.getItem('airePoll')) {
      localStorage.setItem('airePoll', JSON.stringify(initialState))
      this.state = initialState;
    }
    else {
      this.state = JSON.parse(localStorage.getItem('airePoll'));
    }
  }

  componentDidMount() {
    this.socket = io('https://n-ivehement.herokuapp.com');
    this.attachSocketListeners();
    this.socket.emit('add user', 'flai');
    //this.EventEmitter.emit('add user', Math.random().toString(36).substring(7));
  }
  componentWillUnmount() {
    this.socket.emit('forceDisconnect');
  }
  attachViewListeners() {
    //this.EventEmitter.on('add user', username => this.handleAddUser(username));
  }

  attachSocketListeners() {

    this.socket.on('fill live feed', data => {
      this.setState({liveFeedUpdate: data.update, total: data.total})
    })
    this.socket.on('live polls', (polls) => {
      const newPolls = Object.keys(polls);
      const idx = newPolls.indexOf(this.state.pseudonym);
      this.setState({ polls: polls, onPage: (idx===-1 && (this.state.onPage===4 || this.state.onPage===5 || this.state.onPage===6))?0:this.state.onPage }, () => {
        if(this.state.onPage === 0) {
          this.setState({pollResult: {}})
        }
        localStorage.setItem('airePoll', JSON.stringify(this.state));
        //
      });
    })

    this.socket.on('update clientListParticipants', listParticipants => {
      this.setState({listParticipants: listParticipants}, () => localStorage.setItem('airePoll', JSON.stringify(this.state)))
    })

  }

  changePassword(event) {
    this.setState({password: event.target.value});     
  }

  disableCurrentParticipant(index, name) {
      const listParticipants = this.state.listParticipants;
      listParticipants[index] = name;
      this.socket.emit('update serverListParticipants', {pseudonym: this.state.pseudonym, index: index, name: name})

      this.setState({listParticipants: listParticipants}, () => localStorage.setItem('airePoll', JSON.stringify(this.state)));
      if(true) {
        fetch('https://n-ivehement.herokuapp.com/fetchq', {
          method: 'post',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            pseudonym: this.state.pseudonym
          })
        })
          .then(response => response.json())
          .then(list => {
            this.setState({listQnP: list})
          })
        this.switchPage(this.state.pseudonym, 5);
      }
      else
        this.switchPage(this.state.pseudonym, 5);
  }
  handleFinal(totalParticipants) {
    this.setState({isAdmin: 1, totalParticipants: totalParticipants}, () => {
          localStorage.setItem('airePoll', JSON.stringify(this.state));
          this.switchPage('', 6);
          this.socket.emit('le poll', {
            isSecure: this.state.secureState,
            pseudonym: this.state.pseudonym,
            questions: this.state.listQnP,
            totalParticipants: totalParticipants,
          })
        })
  }
  handleHomeClick() {
      this.setState({warning: true}, () => {
          localStorage.setItem('airePoll', JSON.stringify(this.state));
      })
  }
  handleInvite(inviteSwitch, index) {
      if(true) {
        if(index >= 0)
          this.setState({wantParticipant: inviteSwitch,
              currentParticipantClickSerial: index}, () =>  localStorage.setItem('airePoll', JSON.stringify(this.state)))
        else
            this.setState({wantParticipant: inviteSwitch, participantName: ''}, () => localStorage.setItem('airePoll', JSON.stringify(this.state)))
      }
  }
  handleLiveFeed(pseudonym) {
    if(!this.state.liveFeedUpdate) {
      fetch('https://n-ivehement.herokuapp.com/fetchlivefeed', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        pseudonym: pseudonym
      })
    })
      .then(response => response.json())
      .then(data => {
        this.setState({liveFeedUpdate: data.update, total: data.total}, () => localStorage.setItem('airePoll', JSON.stringify(this.state)))
      })
    }
  }
  handleSubmit(pollResult) {
    this.socket.emit('update pollResult', {
      pollResult: pollResult,
      pseudonym: this.state.pseudonym
    });
    this.switchPage('', 6);
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
    this.setState({warning: false, isAdmin: 0, liveFeedUpdate: {}}, () => {
        localStorage.setItem('airePoll', JSON.stringify(this.state));
    })
    if(this.state.isAdmin) {
      this.socket.emit('unpoll', this.state.pseudonym);
    }
  }
  removeItem(surface, index) {
      if(surface === "questionPolling") {
          let temp = this.state.listQnP;
          temp.splice(Number(index), 1);
          this.setState({listQnP: temp}, () => localStorage.setItem('airePoll', JSON.stringify(this.state)))
      }
  }

  switchPage(pseudonym, pageSerial, isSecure=false) {
    if(pageSerial === 0) {
      this.setState({liveFeedUpdate: {}}, () => {
        localStorage.setItem('airePoll', JSON.stringify(this.state));
      })
    }
    if(pageSerial === 4) {
      //this.socket.emit('list participants', pseudonym);
      fetch('https://n-ivehement.herokuapp.com/listparticipants', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          pseudonym: pseudonym
        })
      })
        .then(response => response.json())
        .then(list => {
          this.setState({listParticipants: list, pseudonym: pseudonym}, () => {
            localStorage.setItem('airePoll', JSON.stringify(this.state));
          })
        })
    }
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
            handleLiveFeed={this.handleLiveFeed.bind(this)}
            handleSubmit={this.handleSubmit.bind(this)}
            handleWarningClick={this.handleWarningClick.bind(this)}
            isAdmin={this.state.isAdmin}
            listParticipants={this.state.listParticipants}
            onPage={this.state.onPage}
            listQnP={this.state.listQnP}
            liveFeedUpdate={this.state.liveFeedUpdate}
            participantNotify={this.state.participantNotify}
            polls={this.state.polls}
            pseudonym={this.state.pseudonym}
            switchPage={this.switchPage.bind(this)}
            toggleDialog={this.toggleDialog.bind(this)}
            total={this.state.total}
            totalParticipants={this.state.totalParticipants}
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