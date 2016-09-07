/* @flow weak */
/* eslint react/prop-types: 0 */

import React from 'react';
import Relay from 'react-relay';

import {Card, CardHeader} from 'material-ui/Card';
import ContentAdd from 'material-ui/svg-icons/content/add';
import FloatingActionButton from 'material-ui/FloatingActionButton';

import Blog_addMutation from '../../relay/Blog_addMutation';

import Blog_Properties from './Blog_Properties';


class Blog_Screen extends React.Component
{
  static contextTypes = {
    relay: Relay.PropTypes.Environment,
  };

  _handle_updateHandler_Blog = ( Blog_properties ) =>
  {
    this.context.relay.commitUpdate(
      new Blog_addMutation( { ...Blog_properties, Viewer: this.props.Viewer } )
    );
  };

  _handle_onTouchTap_Add = ( ) =>
  {
    this.refs.Blog_Properties._handle_Open( );
  };

  render( )
  {
    return (
      <Card initiallyExpanded={true}>

        <CardHeader initiallyExpanded={true} title="Blog" subtitle="This means Essay in Spanish" />

        <div style={ {float: 'right', marginTop: -58, marginRight: 20 } }>
          <FloatingActionButton
            secondary={true}
            mini={true}
            onTouchTap={ this._handle_onTouchTap_Add }
          >
            <ContentAdd />
          </FloatingActionButton>
        </div>

        { this.props.children }

        <Blog_Properties
          ref="Blog_Properties"
          Blog_Content={ "" }
          Blog_Title={ "" }
          Blog_Description={ "" }
          updateHandler={ this._handle_updateHandler_Blog }
        />

      </Card>
    );
  }
}

export default Relay.createContainer( Blog_Screen, {
  fragments: {
    Viewer: () => Relay.QL`
      fragment on Viewer {
        ${Blog_addMutation.getFragment('Viewer')},
      }
    `,
  },
});
