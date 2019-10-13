import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from "react-redux";
import { toggleDialog, handleHomeClick, warnClick, switchPage, removeItem, toggleSwitch, updateQ, updateAdmin} from '../../redux/actions';
import './Poll.css'

import PositiveHead from '../Head/PositiveHead.jsx';
import Title from './Body/Title.jsx';
import Questions from './Body/Questions.jsx';
import ParticipantsTune from './Body/ParticipantsTune.jsx';

 
import {useStyletron} from 'baseui';

class PollE extends React.Component {
 
    constructor() {
        super();
        this.myRef = React.createRef();
    }
 
    componentDidMount() {
        window.scrollTo(0, this.myRef.offsetTop);
    }

    updatePollQuestions(question) {
        const prevQ = this.props.listQnP;
        prevQ.push(question);
        this.props.updateQ(prevQ);
    }
    render() {
        if(this.props.isHomeClick) {
            return (<Redirect to={'/'} />)
        }
        if(this.props.onPage === 0) return <Redirect to='/' />
        if(this.props.onPage === 6) return <Redirect to='/live' />

        return(
            <div>
                <PositiveHead
                participantNotify={this.props.participantNotify}
                toggleDialog={this.props.toggleDialog}
                handleHomeClick={this.props.handleHomeClick}
                warnClick={this.props.warnClick}
                warning={this.props.warning}
                onPage={this.props.onPage}
                switchPage={this.props.switchPage}
                />

                <Title pseudonym={this.props.pseudonym}/>

                <div>
                    {
                        this.props.onPage === 1 ?

                        <Questions
                        myref={this.myRef}
                        listQnP={this.props.listQnP}
                        removeItem={this.props.removeItem}
                        toggleDialog={this.props.toggleDialog}
                        space={this.space}
                        isPrimaryOpen={this.props.isPrimaryOpen}
                        isSecondaryOpen={this.props.isSecondaryOpen}
                        updatePollQuestions={this.updatePollQuestions.bind(this)}
                        listQnPLength={this.props.listQnP.length}
                        switchPage={this.props.switchPage}
                        /> :

                        <ParticipantsTune
                        isSecure={this.props.isSecure}
                        pseudonym={this.props.pseudonym}
                        listQnP={this.props.listQnP}
                        secureState={this.props.secureState}
                        switchPage={this.props.switchPage}
                        toggleSwitch={this.props.toggleSwitch}
                        updateAdmin={this.props.updateAdmin}
                        totalParticipants={this.props.totalParticipants}
                        />
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  toggleDialog: (surface, dialogSwitch) => dispatch(toggleDialog(surface, dialogSwitch)),
  handleHomeClick: (payload) => dispatch(handleHomeClick(payload)),
  warnClick: (payload) => dispatch(warnClick(payload)),
  switchPage: (payload) => dispatch(switchPage(payload)),
  removeItem: (surface, index) => dispatch(removeItem(surface, index)),
  toggleSwitch: (payload) => dispatch(toggleSwitch(payload)),
  updateQ: (payload) => dispatch(updateQ(payload)),
  updateAdmin: (payload) => dispatch(updateAdmin(payload)),
});

const Poll = ({rootReducer, toggleDialog, handleHomeClick, warnClick, switchPage, removeItem, toggleSwitch, updateQ, updateAdmin}) => {
    const [useCss, theme] = useStyletron();
    const space = useCss({marginLeft: theme.sizing.scale1200});
    return(
        <PollE
        space={space}
        listQnP={rootReducer.listQnP}
        onPage={rootReducer.onPage}
        participantNotify={rootReducer.participantNotify}
        warning={rootReducer.warning}
        pseudonym={rootReducer.pseudonym}
        isPrimaryOpen={rootReducer.isPrimaryOpen}
        isSecondaryOpen={rootReducer.isSecondaryOpen}
        isSecure={rootReducer.isSecure}
        secureState={rootReducer.secureState}
        totalParticipants={rootReducer.totalParticipants}

        toggleDialog={toggleDialog}
        handleHomeClick={handleHomeClick}
        warnClick={warnClick}
        switchPage={switchPage}
        removeItem={removeItem}
        toggleSwitch={toggleSwitch}
        updateQ={updateQ}
        updateAdmin={updateAdmin}
        />
    )
}

const ConnectedLayer = connect(mapStateToProps, mapDispatchToProps)(Poll);

export default ConnectedLayer;