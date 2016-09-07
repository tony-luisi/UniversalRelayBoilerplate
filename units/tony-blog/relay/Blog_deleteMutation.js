/* @flow weak */

import Relay from 'react-relay';

export default class Blog_deleteMutation extends Relay.Mutation {
  static fragments = {
    Blog: () => Relay.QL`
      fragment on Blog {
        id,
      }
    `,
    Viewer: () => Relay.QL`
      fragment on Viewer {
        id,
      }
    `,
  };
  getMutation() {
    return Relay.QL`mutation{Blog_delete}`;
  }
  getFatQuery() {
    return Relay.QL`
      fragment on Blog_deletePayload {
        deletedBlogId,
        Viewer {
          id
        },
      }
    `;
  }
  getConfigs() {
    return [{
      type: 'NODE_DELETE',
      parentName: 'Viewer',
      parentID: this.props.Viewer.id,
      connectionName: 'Blogs',
      deletedIDFieldName: 'deletedBlogId',
    }];
  }
  getVariables() {
    return {
      id: this.props.Blog.id,
    };
  }
  getOptimisticResponse() {
    return {
      deletedBlogId: this.props.Blog.id,
    };
  }
}
