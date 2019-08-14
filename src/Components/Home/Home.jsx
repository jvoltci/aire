import React from 'react';
import {Redirect} from 'react-router-dom';
import './Home.css';

//import {styled} from 'baseui';
import {FormControl} from 'baseui/form-control';
import { Input } from "baseui/input";
import { Button } from "baseui/button";


class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      pseudonym: ''
    }
  }
  changePseudonym = (event) => {
    this.setState({pseudonym: event.target.value});     
  }
  render() {
    if(this.props.redirect) return <Redirect to={'/unique'} />
    return (
      <div id="home" className="container">
      
        <h3 id="u1">
          <span id="u11">un</span>
          <span id="u12">s</span>
          <span id="u13">ka</span>
          <span id="u14">i</span>
        </h3>

        <FormControl>
          <div>
            <Input
              startEnhancer="#"
              onChange={(e) => this.changePseudonym(e)}
              placeholder="Pseudonym"
              positive
            />
            <br/>
            <Button onClick={() => this.props.handleRedirect(this.state.pseudonym, true)}>Lets Get Started</Button>
          </div>
        </FormControl>

      </div>
    );
  }
}

export default Home;

/*<div className="row">
          <div className="col-md-12" align="center">
            <form onSubmit={e => this.state.url.substring(0, 6)==="magnet"?this.handleMagnet(e):this.handleElse(e)} method="post" action="https://flai-api.herokuapp.com/download" >
              <div className="form-group">
                
                <input onChange={(e) => this.changeURL(e)}
                 type="text" name="user[url]" required className="form-control" placeholder="Pseudonym" id="u2" />
                <input onChange={(e) => this.changePassword(e)}
                 type="password" name="user[password]" required className="form-control" placeholder="Password" id="u3" />
                 <p/>
                <button id="buttonS" type="submit" className="btn btn-lg">POLL!</button>
              </div>
            </form>

          </div>
        </div>*/