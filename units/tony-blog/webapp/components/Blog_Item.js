/* @flow weak */
/* eslint react/prop-types: 0 */

import React from 'react';
import Relay from 'react-relay';

import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import {ListItem} from 'material-ui/List';
import MenuItem from 'material-ui/MenuItem';
import NavigationMoreVert from 'material-ui/svg-icons/navigation/more-vert';


import Blog_deleteMutation from '../../relay/Blog_deleteMutation';
import Blog_updateMutation from '../../relay/Blog_updateMutation';

import Blog_Properties from './Blog_Properties';


class Blog_Item extends React.Component
{
  static contextTypes = {
    relay: Relay.PropTypes.Environment,
  };

  _handle_updateHandler_Blog = ( Blog_properties ) =>
  {
    this.context.relay.commitUpdate(
      new Blog_updateMutation( { Blog: this.props.Blog, ...Blog_properties } )
    );
  };

  _Blog_delete( )
  {
    this.context.relay.commitUpdate(
      new Blog_deleteMutation( { Blog: this.props.Blog, Viewer: this.props.Viewer } )
    );
  }

  _handle_onItemTouchTap = ( e, item ) =>
  {
    switch( item.ref )
    {
      case 'edit':
        console.log( 'edit' );
        this.refs.Blog_Properties._handle_Open( );
        break;
      case 'delete':
        console.log( 'delete' );
        this._Blog_delete( );
        break;
      default:
        break;
    }
  };

  render( )
  {
    const rightIconMenu = (
      <IconMenu
        iconButtonElement={<IconButton><NavigationMoreVert /></IconButton>}
        onItemTouchTap={ this._handle_onItemTouchTap }
      >
        <MenuItem ref="edit" index={0}>Edit</MenuItem>
        <MenuItem ref="delete" index={1}>Delete</MenuItem>
      </IconMenu>
    );

    return (
      <div>
        <ListItem
          primaryText={ this.props.Blog.Blog_Title }
          rightIconButton={ rightIconMenu }
        />
      <Blog_Properties
          ref="Blog_Properties"
          Blog_Content={ this.props.Blog.Blog_Content }
          Blog_Title={ this.props.Blog.Blog_Title }
          Blog_Description={ this.props.Blog.Blog_Description }
          updateHandler={ this._handle_updateHandler_Blog }
        />
      </div>
    );
  }
}

export default Relay.createContainer( Blog_Item, {
  fragments: {
    Blog: () => Relay.QL`
      fragment on Blog {
        id,
        Blog_Title,
        Blog_Description,
        Blog_Content,
        ${Blog_deleteMutation.getFragment('Blog')},
        ${Blog_updateMutation.getFragment('Blog')},
      }
    `,
    Viewer: () => Relay.QL`
      fragment on Viewer {
        ${Blog_deleteMutation.getFragment('Viewer')},
      }
    `,
  },
} );
