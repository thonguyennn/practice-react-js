import './../App.css';
import React, { Component } from 'react';
import { app } from './firebaseConnect'
import Nav from './Nav';
import NoteList from './NoteList';
import NoteForm from './NoteForm';
import { connect } from 'react-redux';
import Alert from './AlertInfo';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  
  addData = (item) => {
    app.push(item)
  }

  displayForm = () => {
    if(this.props.isEdit) {
      return <NoteForm/>
    }
  }
  render() {
    return (
      <div>
        <Nav/>
        <Alert/>
        <div className="container">
          <div className="row">
            <NoteList/>
            {
              this.displayForm()
            }
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    isEdit: state.isEdit
  }
}

export default connect(mapStateToProps)(App)
