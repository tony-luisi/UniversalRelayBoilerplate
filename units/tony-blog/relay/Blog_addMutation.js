/* @flow weak */

import Relay from 'react-relay';

export default class Blog_addMutation extends Relay.Mutation {
  static fragments = {
    Viewer: () => Relay.QL`
      fragment on Viewer {
        id,
      }
    `,
  };
  getMutation() {
    return Relay.QL`mutation{Blog_add}`;
  }
  getFatQuery() {
    return Relay.QL`
      fragment on Blog_addPayload {
        BlogsEdge,
        Viewer {
          Blogs,
        },
      }
    `;
  }
  getConfigs() {
    return [{
      type: 'RANGE_ADD',
      parentName: 'Viewer',
      parentID: this.props.Viewer.id,
      connectionName: 'Blogs',
      edgeName: 'BlogsEdge',
      rangeBehaviors: {
        '': 'append',
      },
    }];
  }
  getVariables() {
    return {
      Blog_Content: this.props.Blog_Content,
      Blog_Title: this.props.Blog_Title,
      Blog_Description: this.props.Blog_Description,
    };
  }
  getOptimisticResponse() {
    return {
      BlogsEdge: {
        node: {
          Blog_Content: this.props.Blog_Content,
          Blog_Title: this.props.Blog_Title,
          Blog_Description: this.props.Blog_Description,
        },
      },
      Viewer: {
        id: this.props.Viewer.id,
      },
    };
  }
}
