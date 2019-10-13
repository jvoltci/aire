import React from 'react';
import {Redirect} from 'react-router-dom';
import { connect } from "react-redux";
import Socket from '../../redux/Socket';
import {submit, switchPage, handleHomeClick, warnClick, toggleDialog, updateInvite, updateQ, updatePseudonym, updateParticipants} from '../../redux/actions';

import {Block} from 'baseui/block';

import LivePollHead from '../Head/LivePollHead.jsx';
import LiveHead from '../Head/LiveHead.jsx';
import ListPoll from './ListPoll/ListPoll.jsx';
import LiveFeed from './LiveFeed.jsx';
import MainSurvey from './MainSurvey/MainSurvey.jsx'
import ParticipantsPortal from './ParticipantsPortal/ParticipantsPortal.jsx';
import ParticipantsInvitation from './ParticipantsInvitation/ParticipantsInvitation.jsx'

import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(3),
  },
  group: {
    margin: theme.spacing(1, 0),
  },
  message: {
    display: 'flex',
  },
  snacker: {
    backgroundColor: theme.palette.primary.main,
  },
  button: {
    margin: theme.spacing(1),
  },
}));


class LivePollE extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			pollResult: {},
		}
	}

	handleApproval(isAdded, index) {
		Socket.emit('update serverListParticipants', {
            pseudonym: this.props.pseudonym,
            index: index,
            isAddedAs: isAdded
        });
	}
	handleInitialSubmit() {
		if(Object.keys(this.state.pollResult).length === this.props.listQnP.length) {
			Socket.emit('update pollResult', {
		      pollResult: this.state.pollResult,
		      pseudonym: this.props.pseudonym
		    });
			this.props.submit(this.state.pollResult);
			this.props.switchPage(6);
		}
	}
	handleRadio(e, i) {
		const tempResult = this.state.pollResult;
		tempResult[i] = e.target.value;
		this.setState({pollResult: tempResult});
	}
	render() {
		if(this.props.onPage === 0) return <Redirect to={'/'} />
		return(
			<div>
				{
					this.props.onPage === -1 ?

					<div>
						<LivePollHead
						onPage={this.props.onPage}
						switchPage={this.props.switchPage}
						/> 
						
			            <React.Fragment>
			              <CssBaseline />
			              <Container maxWidth="sm">
			                <List component="nav" aria-label="main mailbox folders">
			                    <Block paddingTop="50px" />

			                        <ListPoll
			                        polls={this.props.polls}
			                        switchPage={this.props.switchPage}
			                        updatePseudonym={this.props.updatePseudonym}
			                        updateParticipants={this.props.updateParticipants}
			                        />

			                    <Block paddingTop="50px" />
			                </List>
			              </Container>
			            </React.Fragment>

					</div> :

					<div>
						{
							this.props.onPage === 3 ?

							<div>

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

					            <ParticipantsInvitation
					            handleApproval={this.handleApproval.bind(this)}
					            listParticipants={this.props.listParticipants}
					            pseudonym={this.props.pseudonym}
					            />

							</div> :

							<div>
							{
								this.props.onPage === 4 ?

								<div>
									<LivePollHead
									onPage={this.props.onPage}
									switchPage={this.props.switchPage}
									/> 

			                        <ParticipantsPortal
			                        currentParticipantClickSerial={this.props.currentParticipantClickSerial}
			                        listParticipants={this.props.listParticipants}
			                        polls={this.props.polls}
			                        pseudonym={this.props.pseudonym}
			                        wantParticipant={this.props.wantParticipant}
			                        switchPage={this.props.switchPage}
			                        updateQ={this.props.updateQ}
			                        updateInvite={this.props.updateInvite}
			                        updateParticipants={this.props.updateParticipants}
			                        />
								</div> :

								<div>


									{
										this.props.onPage === 5 ?

										<MainSurvey 
										handleRadio={this.handleRadio.bind(this)}
										handleInitialSubmit={this.handleInitialSubmit.bind(this)}
										listQnP={this.props.listQnP}
										onPage={this.props.onPage}
										pseudonym={this.props.pseudonym}
										switchPage={this.props.switchPage}
										/> :

										<LiveFeed 
										classes={this.props.classes}
							            warnClick={this.props.warnClick}
							            handleHomeClick={this.props.handleHomeClick}
							            isAdmin={this.props.isAdmin}
							            listQnP={this.props.listQnP}
							            liveFeedUpdate={this.props.liveFeedUpdate}
							            onPage={this.props.onPage}
							            participantNotify={this.props.participantNotify}
							            pseudonym={this.props.pseudonym}
							            switchPage={this.props.switchPage}
							            toggleDialog={this.props.toggleDialog}
							            total={this.props.total}
							            totalParticipants={this.props.totalParticipants}
							            warning={this.props.warning}
										/>									
									}

								</div>
							}
							</div>
						}
					</div>
				}
			</div>
		)
	}
}

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  submit: (payload) => dispatch(submit(payload)),
  switchPage: (payload) => dispatch(switchPage(payload)),
  handleHomeClick: () => dispatch(handleHomeClick()),
  warnClick: (payload) => dispatch(warnClick(payload)),
  toggleDialog: (payload) => dispatch(toggleDialog(payload)),
  updateQ: (payload) => dispatch(updateQ(payload)),
  updateInvite: (want, idx) => dispatch(updateInvite(want, idx)),
  updatePseudonym: (payload) => dispatch(updatePseudonym(payload)),
  updateParticipants: (payload) => dispatch(updateParticipants(payload)),
});

const LivePoll = ({rootReducer, submit, switchPage, handleHomeClick, warnClick, toggleDialog, updateInvite, updateQ, updatePseudonym, updateParticipants}) => {
	const classes = useStyles();
	return(
		<LivePollE
		classes={classes}
		currentParticipantClickSerial={rootReducer.currentParticipantClickSerial}
		pseudonym={rootReducer.pseudonym}
		onPage={rootReducer.onPage}
		isAdmin={rootReducer.isAdmin}
		listParticipants={rootReducer.listParticipants}
		liveFeedUpdate={rootReducer.liveFeedUpdate}
		participantNotify={rootReducer.participantNotify}
		polls={rootReducer.polls}
		warning={rootReducer.warning}
		listQnP={rootReducer.listQnP}
		total={rootReducer.total}
		totalParticipants={rootReducer.totalParticipants}
		wantParticipant={rootReducer.wantParticipant}

		submit={submit}
		switchPage={switchPage}
		handleHomeClick={handleHomeClick}
		warnClick={warnClick}
		toggleDialog={toggleDialog}
		updateInvite={updateInvite}
		updateQ={updateQ}
		updatePseudonym={updatePseudonym}
		updateParticipants={updateParticipants}
		/>
	)
}

export default connect(mapStateToProps, mapDispatchToProps)(LivePoll);