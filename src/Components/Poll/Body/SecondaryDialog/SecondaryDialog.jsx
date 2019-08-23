import React from 'react';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

class SecondaryDialog extends React.Component {
	constructor() {
		super();
		this.state = {
			ask: ''
		}
	}
	changeAsk = (event) => {
		this.setState({ask: event.target.value})
	}
	render() {
		return(
			

		    <Dialog fullWidth open={this.props.isSecondaryOpen} onClose={() => {
		          this.props.toggleDialog("secondary", false);
		        }} 
		        aria-labelledby="form-dialog-title">
		        <DialogContent>
		          <TextField
			        id="outlined-multiline-flexible"
			        label="Questionnaire"
			        multiline
			        rowsMax="4"
			        onChange={(e) => this.changeAsk(e)}
			        margin="normal"
			        variant="outlined"
			        autoFocus
			      />
		        </DialogContent>
		        <DialogActions>
		          <Button onClick={() => this.props.toggleDialog("secondary", false)} color="primary">
		            Cancel
		          </Button>
		          <Button onClick={() => 
		          			{
		          				this.props.toggleDialog("secondary", false);
		          				this.props.updatePollQuestions(this.state.ask);
		          			}}
		          			color="primary"
		          			variant="contained"
		          			>
		            Confirm
		          </Button>
		        </DialogActions>
		      </Dialog>
		);
	}
}

export default SecondaryDialog;