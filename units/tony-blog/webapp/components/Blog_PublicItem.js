/* @flow weak */
/* eslint react/prop-types: 0 */

import Helmet from "react-helmet";
import React from 'react';
import Relay from 'react-relay';

import {Card, CardHeader, CardText} from 'material-ui/Card';

class Blog_PublicItem extends React.Component
{
  render( )
  {
    // In a fairly barbaric way, limit the length of headings so that they are not considered spam
    let contentH1 = this.props.Viewer.Blog.Blog_Title.substring( 0, 100 );
    let contentH2 = this.props.Viewer.Blog.Blog_Description.substring( 0, 100 );

    return (
      <div>
        <Helmet
          title={ this.props.Viewer.Blog.Blog_Title }
          meta={ [
            { name: "description", content: this.props.Viewer.Blog.Blog_Description },
          ] }
        />
        <Card>
          <CardHeader
            title={ <h1 style={ { fontSize: 15 } }>{ contentH1 }</h1> }
            subtitle={ <h2 style={ { fontSize: 14, fontWeight: 'normal' } }>{ contentH2 }</h2> }
          />
          <CardText>
            { this.props.Viewer.Blog.Blog_Content }
          </CardText>
        </Card>
      </div>
    );
  }
}

export default Relay.createContainer( Blog_PublicItem, {

  initialVariables:
  {
    id: null,
  },

  prepareVariables( { id } )
  {
    return { id };
  },

  fragments: {
    Viewer: () => Relay.QL`
      fragment on Viewer {
        Blog(id:$id){
          id,
          Blog_Title,
          Blog_Description,
          Blog_Content,
        }
        User_IsAnonymous,
      }
    `,
  },
});
