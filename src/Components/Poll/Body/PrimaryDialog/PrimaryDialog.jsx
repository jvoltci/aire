import React from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import Slide from '@material-ui/core/Slide';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';


const theme = createMuiTheme({
  overrides: {
    MuiButton: {
      root: {
        fontSize: '1rem',
      },
    },
  },
});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

class PrimaryDialog extends React.Component {
	render() {
		return(
			<Dialog
		        open={this.props.isPrimaryOpen}
		        TransitionComponent={Transition}
		        keepMounted
		        onClose={() => {
		          this.props.toggleDialog("primary", false);
		        }}
		        aria-labelledby="alert-dialog-slide-title"
		    >
		    	<DialogActions>
		    		<MuiThemeProvider theme={theme}>
		    			<Button 
			          	color="primary"
			          	variant="contained"
			          	>
			            Question
			          	</Button>
			          	<Button
			          	onClick={() => {
			              this.props.toggleDialog("primary", false);
			              this.props.toggleDialog("secondary", true);
			            }}
			            color="primary"
			            variant="contained"
			            >
			            Poll
			          	</Button>
    				</MuiThemeProvider>
		        </DialogActions>
		    </Dialog>
		)
	}
}

export default PrimaryDialog;