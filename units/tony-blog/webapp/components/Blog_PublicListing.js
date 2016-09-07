/* @flow weak */
/* eslint react/prop-types: 0 */

import React from 'react';
import Relay from 'react-relay';

import {Card, CardHeader, CardText} from 'material-ui/Card';


class Blog_PublicListing extends React.Component
{
  _handle_onClick( id )
  {
    this.context.router.push( '/blog/item/' + id );
  }

  renderBlogs( )
  {
    return this.props.Viewer.Blogs.edges.map(edge =>
      <Card key={ edge.node.id }>
        <CardHeader
          title={ edge.node.Blog_Title }
          subtitle={ edge.node.Blog_Description }
        />
        <CardText
          onClick={ ( ) => this._handle_onClick( edge.node.id ) }
        >
          { edge.node.Blog_Content }
        </CardText>
      </Card>
    );
  }

  render( )
  {
    return (
      <div>
        { this.renderBlogs( ) }
      </div>
    );
  }
}

Blog_PublicListing.contextTypes = {
  router: React.PropTypes.object.isRequired,
};


export default Relay.createContainer( Blog_PublicListing, {
  fragments: {
    Viewer: () => Relay.QL`
      fragment on Viewer {
        Blogs(first: 2147483647) {
          edges {
            node {
              id,
              Blog_Title,
              Blog_Description,
              Blog_Content,
            },
          },
        },
      }
    `,
  },
});
