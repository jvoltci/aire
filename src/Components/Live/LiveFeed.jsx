import React from 'react';

import {Centered} from '../Styles.jsx';
import LiveHead from '../Head/LiveHead.jsx';
import ListLiveQuestionsResult from './ListLiveQuestionsResult/ListLiveQuestionsResult.jsx'

import Paper from '@material-ui/core/Paper';




class LiveFeed extends React.Component {

    componentDidMount() {
        //if(this.props.onPage === 0) this.props.switchPage(this.props.pseudonym, 0)
        this.props.handleLiveFeed(this.props.pseudonym);
    }

    render() {
        

        return (
          <Paper>

            <LiveHead
            handleHomeClick={this.props.handleHomeClick.bind(this)}
            handleWarningClick={this.props.handleWarningClick.bind(this)}
            isAdmin={this.props.isAdmin}
            onPage={this.props.onPage}
            participantNotify={this.props.participantNotify}
            pseudonym={this.props.pseudonym}
            switchPage={this.props.switchPage.bind(this)}
            toggleDialog={this.props.toggleDialog.bind(this)}
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