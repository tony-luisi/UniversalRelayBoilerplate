/* @flow weak */

import React from 'react';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';


export default class Blog_Properties extends React.Component
{
  constructor( props : any )
  {
    super( props );

    this.state = {
      Dialog_IsOpen: false,
    };
  }

  _handle_Open = ( ) =>
  {
    this.setState( {
      Dialog_IsOpen: true
    } );
  };

  _handle_onTouchTap_Cancel = ( ) =>
  {
    this.setState( {
      Dialog_IsOpen: false
    } );
  };

  _handle_onTouchTap_OK = ( ) =>
  {
    this.props.updateHandler( {
      Blog_Content: this.refs.Blog_Content.getValue( ),
      Blog_Title: this.refs.Blog_Title.getValue( ),
      Blog_Description: this.refs.Blog_Description.getValue( ),
    } );

    this.setState( {
      Dialog_IsOpen: false
    } );
  };

  render( )
  {
    return(
      <div>
        <Dialog
          open={ this.state.Dialog_IsOpen }
          title="Blog"
          actions={ [
            <FlatButton key="Cancel" label="Cancel" onTouchTap={ this._handle_onTouchTap_Cancel } />,
            <FlatButton key="OK" label="OK" primary={true} onTouchTap={ this._handle_onTouchTap_OK } />,
          ] }
        >
          <TextField
            ref="Blog_Title"
            defaultValue={ this.props.Blog_Title }
            floatingLabelText="Title"
            fullWidth={ true }
          />
          <TextField
            ref="Blog_Description"
            defaultValue={ this.props.Blog_Description }
            floatingLabelText="Description"
            fullWidth={ true }
          />
          <TextField
            ref="Blog_Content"
            defaultValue={ this.props.Blog_Content }
            floatingLabelText="Content"
            fullWidth={ true }
          />
        </Dialog>
      </div>
    );
  }
}

Blog_Properties.propTypes = {
  Blog_Title: React.PropTypes.string.isRequired,
  Blog_Description: React.PropTypes.string.isRequired,
  Blog_Content: React.PropTypes.string.isRequired,
  updateHandler: React.PropTypes.func.isRequired,
};
