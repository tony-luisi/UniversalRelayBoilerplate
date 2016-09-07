/* @flow weak */

import Relay from 'react-relay';

export default class Blog_updateMutation extends Relay.Mutation {
  static fragments = {
    Blog: () => Relay.QL`
      fragment on Blog {
        id,
      }
    `,
  };
  getMutation() {
    return Relay.QL`mutation{Blog_update}`;
  }
  getFatQuery() {
    return Relay.QL`
      fragment on Blog_updatePayload {
        Blog {
          Blog_Content,
          Blog_Title,
          Blog_Description,
        }
      }
    `;
  }
  getConfigs() {
    return [{
      type: 'FIELDS_CHANGE',
      fieldIDs: {
        Blog: this.props.Blog.id,
      },
    }];
  }
  getVariables() {
    return {
      id: this.props.Blog.id,
      Blog_Content: this.props.Blog_Content,
      Blog_Title: this.props.Blog_Title,
      Blog_Description: this.props.Blog_Description,
    };
  }
  getOptimisticResponse() {
    return {
      Ensayo: {
        id: this.props.Ensayo.id,
        Blog_Content: this.props.Blog_Content,
        Blog_Title: this.props.Blog_Title,
        Blog_Description: this.props.Blog_Description,
      },
    };
  }
}
