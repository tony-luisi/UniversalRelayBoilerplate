/* @flow weak */

import { fromGlobalId, mutationWithClientMutationId } from 'graphql-relay';
import { GraphQLID, GraphQLNonNull } from "graphql";

import ViewerType from '../../../../graphql/type/ViewerType';


export default mutationWithClientMutationId( {
  name: 'Blog_delete',
  inputFields: {
    id: { type: new GraphQLNonNull( GraphQLID ) },
  },
  outputFields: {
    deletedBlogId: {
      type: GraphQLID,
      resolve: ( {id} ) => id,
    },
    Viewer: {
      type: ViewerType,
      resolve: ( parent, args, context, { rootValue: objectManager } ) => objectManager.getOneObject( 'User', { id: objectManager.getViewerUserId( ) } )
    },
  },
  mutateAndGetPayload: ( {id}, context, { rootValue: objectManager } ) =>
  {
    var local_id = fromGlobalId(id).id;
    return objectManager.remove( 'Blog', { id: local_id} )
    .then( ( ) => ( {id} ) )
    ;
  }
} );
