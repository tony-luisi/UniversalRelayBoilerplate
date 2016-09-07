/* @flow weak */
/* eslint react/prop-types: 0 */

import React from 'react';
import Relay from 'react-relay';

import {List} from 'material-ui/List';

import Blog_Item from './Blog_Item';

class Blog_List extends React.Component
{
  renderBlogs( )
  {
    return this.props.Viewer.Blogs.edges.map(edge =>
      <Blog_Item
        key={edge.node.id}
        Blog={edge.node}
        Viewer={this.props.Viewer}
      />
    );
  }

  render( )
  {
    return (
      <div>
        <List>
          { this.renderBlogs( ) }
        </List>
      </div>
    );
  }
}

export default Relay.createContainer( Blog_List, {
  fragments: {
    Viewer: () => Relay.QL`
      fragment on Viewer {
        Blogs(first: 2147483647) {
          edges {
            node {
              id,
              ${Blog_Item.getFragment('Blog')},
            },
          },
        },
        ${Blog_Item.getFragment('Viewer')},
      }
    `,
  },
});
