import React from 'react';
import { Redirect } from 'react-router-dom';
import './Poll.css'

import PositiveHead from '../Head/PositiveHead.jsx';
import Title from './Body/Title.jsx';
import Questions from './Body/Questions.jsx';
import ParticipantsTune from './Body/ParticipantsTune.jsx';

 
import {useStyletron} from 'baseui';

class Polle extends React.Component {
 
    constructor() {
        super();
        this.myRef = React.createRef();
    }
 
    componentDidMount() {
        window.scrollTo(0, this.myRef.offsetTop);
    }
    render() {
        const { 
                handleFinal,
                handleHomeClick,
                handleWarningClick,
                homeClick,
                isPrimaryOpen, 
                isSecondaryOpen,
                listQnP,
                onPage,
                participantNotify, 
                pseudonym,
                removeItem,
                secureState,
                space,
                switchPage,
                toggleDialog,
                toggleSwitch,
                totalParticipants,
                warning,
                updatePollQuestions,
            } = this.props;

        if(homeClick) {
            return (<Redirect to={'/'} />)
        }
        if(onPage === 0) return <Redirect to='/' />
        if(onPage === 6) return <Redirect to='/live' />

        return(
            <div>
                <PositiveHead
                participantNotify={participantNotify}
                toggleDialog={toggleDialog.bind(this)}
                handleHomeClick={handleHomeClick.bind(this)}
                handleWarningClick={handleWarningClick.bind(this)}
                warning={warning}
                onPage={onPage}
                switchPage={switchPage.bind(this)}
                />

                <Title pseudonym={pseudonym}/>

                <div>
                    {
                        onPage === 1 ?

                        <Questions
                        myref={this.myRef}
                        listQnP={listQnP}
                        removeItem={removeItem.bind(this)}
                        toggleDialog={toggleDialog.bind(this)}
                        space={space}
                        isPrimaryOpen={isPrimaryOpen}
                        isSecondaryOpen={isSecondaryOpen}
                        updatePollQuestions={updatePollQuestions.bind(this)}
                        listQnPLength={listQnP.length}
                        switchPage={switchPage.bind(this)}
                        /> :

                        <ParticipantsTune
                        handleFinal={handleFinal.bind(this)}
                        secureState={secureState}
                        toggleSwitch={toggleSwitch.bind(this)}
                        totalParticipants={totalParticipants}
                        />
                    }
                </div>
            </div>
        )
    }
}

 
const Poll = ({
    handleFinal,
    handleHomeClick,
    handleWarningClick,
    homeClick,
    isPrimaryOpen, 
    isSecondaryOpen,
    listQnP,
    onPage,
    participantNotify, 
    pseudonym,
    removeItem,
    secureState,
    switchPage,
    toggleDialog,
    totalParticipants,
    toggleSwitch,
    warning,
    updatePollQuestions,
    }) => 
        {
            const [useCss, theme] = useStyletron();
            const space = useCss({marginLeft: theme.sizing.scale1200});
            return(
                <Polle 
                handleFinal={handleFinal.bind(this)}
                handleHomeClick={handleHomeClick.bind(this)}
                handleWarningClick={handleWarningClick.bind(this)}
                homeClick={homeClick}
                isPrimaryOpen={isPrimaryOpen}
                isSecondaryOpen={isSecondaryOpen}
                listQnP={listQnP}
                onPage={onPage}
                participantNotify={participantNotify}
                pseudonym={pseudonym}
                removeItem={removeItem.bind(this)}
                secureState={secureState}
                space={space}
                switchPage={switchPage.bind(this)}
                toggleDialog={toggleDialog.bind(this)}
                totalParticipants={totalParticipants}
                toggleSwitch={toggleSwitch.bind(this)}
                warning={warning}
                updatePollQuestions={updatePollQuestions.bind(this)}
                />
            );
        }
 
export default Poll;