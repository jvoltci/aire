import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { connect } from "react-redux";
import { updateParticipants, updatePollResult, updateLivePolls, updateLiveFeed,  switchPage, handleLiveFeedUpdate } from './redux/actions'

import './App.css';
import Home from './components/Home/Home.jsx';
import Poll from './components/Poll/Poll.jsx';
import LivePoll from './components/Live/LivePoll.jsx';
import Socket from './redux/Socket';

class App extends React.Component {
  componentDidMount() {
    Socket.connect();
    this.attachSocketListeners();
    Socket.emit('add user', '');
    //this.EventEmitter.emit('add user', Math.random().toString(36).substring(7));
  }
  componentWillUnmount() {
    //Socket.emit('forceDisconnect', "dis");
  }

  attachSocketListeners() {
    Socket.on('update live feed', data => this.props.handleLiveFeedUpdate(data));
    Socket.on('live polls', (polls) => this.handleNewPolls(polls));
    Socket.on('update clientListParticipants', list => this.props.updateParticipants(list))
  }

  handleNewPolls(polls) {
    const newPolls = Object.keys(polls);
    const idx = newPolls.indexOf(this.props.pseudonym);
    let page = this.props.onPage;
    if(idx===-1 && (page===4 || page===5 || page===6)) {
      page = 0;
    }
    this.props.updateLivePolls(polls);
    this.props.switchPage(page);

    if(page === 0) {
      this.props.updatePollResult({});
      this.props.updateLiveFeed({});
    }
  }

  render() {
    return (
      <HashRouter>
        <Switch>
          <Route path='/' component={() => <Home /> } exact/>

          <Route path='/unique' component={() => <Poll/> } />

          <Route path='/live' component={() => <LivePoll/> } />

          <Route component={() => { return (<h1 style={{ color: 'red', textAlign: 'center', paddingTop: '40vh' }}>Error 404: Not Found!</h1>) }} />
        </Switch>
      </HashRouter>
    );
  }
}

const mapStateToProps = state => ({
  pseudonym: state.rootReducer.pseudonym,
  onPage: state.rootReducer.onPage,
});

const mapDispatchToProps = dispatch => ({
  updateParticipants: (payload) => dispatch(updateParticipants(payload)),
  updateLivePolls: (payload) => dispatch(updateLivePolls(payload)),
  handleLiveFeedUpdate: (payload) => dispatch(handleLiveFeedUpdate(payload)),
  switchPage: (payload) => dispatch(switchPage(payload)),
  updatePollResult: (payload) => dispatch(updatePollResult(payload)),
  updateLiveFeed: (payload) => dispatch(updateLiveFeed(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(App);