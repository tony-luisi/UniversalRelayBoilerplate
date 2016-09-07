/* @flow weak */

import { fromGlobalId, mutationWithClientMutationId } from 'graphql-relay';
import { GraphQLString, GraphQLID, GraphQLNonNull } from "graphql";

import BlogType from '../type/BlogType';

export default mutationWithClientMutationId( {
  name: 'Blog_update',
  inputFields: {
    id:                 { type: new GraphQLNonNull( GraphQLID ) },
    Blog_Content:     { type: new GraphQLNonNull( GraphQLString ) },
    Blog_Title:       { type: new GraphQLNonNull( GraphQLString ) },
    Blog_Description: { type: new GraphQLNonNull( GraphQLString ) },
  },
  outputFields: {
    Blog: {
      type: BlogType,
      resolve: ( {local_id}, { ...args }, context, { rootValue: objectManager } ) => objectManager.getOneObject( 'Blog', { id: local_id } ),
    }
  },
  mutateAndGetPayload: ( {id, Blog_Content, Blog_Title, Blog_Description }, context, { rootValue: objectManager } ) => {
    var local_id = fromGlobalId(id).id;
    return objectManager.update( 'Blog', {
      id: local_id,
      Blog_Content,
      Blog_Title,
      Blog_Description,
    } )
    .then( ( ) => ( {local_id} ) )
    ;
  },
} );
