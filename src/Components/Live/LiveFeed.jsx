import React from 'react';

import {Centered} from '../Styles.jsx';
import LiveHead from '../Head/LiveHead.jsx';
import ListLiveQuestionsResult from './ListLiveQuestionsResult/ListLiveQuestionsResult.jsx'

import Paper from '@material-ui/core/Paper';




class LiveFeed extends React.Component {

    componentDidMount() {
        //if(this.props.onPage === 0) this.props.switchPage(this.props.pseudonym, 0)
        /*this.props.handleLiveFeed(this.props.pseudonym);*/
        this.handleLiveFeed(this.props.pseudonym)
    }

    handleLiveFeed(pseudonym) {
        if(!this.props.liveFeedUpdate) {
          fetch('https://n-ivehement.herokuapp.com/fetchlivefeed', {
          method: 'post',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            pseudonym: pseudonym
          })
        })
          .then(response => response.json())
          .then(data => {
            this.props.liveFeedUpdate(data);
          })
        }
    }

    render() {
        

        return (
          <Paper>

            <LiveHead
            handleHomeClick={this.props.handleHomeClick}
            warnClick={this.props.warnClick}
            isAdmin={this.props.isAdmin}
            onPage={this.props.onPage}
            participantNotify={this.props.participantNotify}
            pseudonym={this.props.pseudonym}
            switchPage={this.props.switchPage}
            toggleDialog={this.props.toggleDialog}
            warning={this.props.warning}
            />

            <Centered>
            	<h2>{this.props.pseudonym} | Live Poll</h2>
            </Centered>

            <ListLiveQuestionsResult 
            listQnP={this.props.listQnP}
            liveFeedUpdate={this.props.liveFeedUpdate}
            total={this.props.total}
            totalParticipants={this.props.totalParticipants}
            />
            
          </Paper>
        );
      }
}

export default LiveFeed;