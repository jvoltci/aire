import React from 'react';

import {Centered} from  '../../../useStyles.jsx';

import {Block} from 'baseui/block';
import {Heading, HeadingLevel} from 'baseui/heading';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';



const Title = ({pseudonym, stylePseudonym}) => {
    return(
        <Paper>
            <Centered>

                <Block paddingTop="100px" />

                <HeadingLevel>
                    <HeadingLevel>
                        <Heading>
                            <Typography className={stylePseudonym}>
                                {pseudonym}
                            </Typography>
                        
                        </Heading>
                    </HeadingLevel>
                </HeadingLevel>

            </Centered>
        </Paper>
    )
}

export default Title;