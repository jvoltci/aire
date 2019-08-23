import React from 'react';

import {Centered} from  '../../Styles.jsx';

import {Block} from 'baseui/block';
import {Heading, HeadingLevel} from 'baseui/heading';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';



const Title = ({pseudonym}) => {
    const classes = useStyles();
    return(
        <Paper>
            <Centered>

                <Block paddingTop="100px" />

                <HeadingLevel>
                    <HeadingLevel>
                        <Heading>
                            <Typography className={classes.pseudonym}>
                                {pseudonym}
                            </Typography>
                        
                        </Heading>
                    </HeadingLevel>
                </HeadingLevel>

            </Centered>
        </Paper>
    )
}

const useStyles = makeStyles(theme => ({
  pseudonym: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    color: "teal",
    fontFamily: "Roboto",
    fontSize: "3.7rem"
  }
}));

export default Title;