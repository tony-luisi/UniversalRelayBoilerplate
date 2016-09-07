/* @flow weak */

import { mutationWithClientMutationId } from 'graphql-relay';
import { GraphQLString, GraphQLNonNull } from "graphql";

import BlogsConnection from '../type/BlogsConnection';
import ViewerType from '../../../../graphql/type/ViewerType';


export default mutationWithClientMutationId( {
  name: 'Blog_add',
  inputFields: {
    Blog_Content:     { type: new GraphQLNonNull( GraphQLString ) },
    Blog_Title:       { type: new GraphQLNonNull( GraphQLString ) },
    Blog_Description: { type: new GraphQLNonNull( GraphQLString ) },
  },
  outputFields: {
    BlogsEdge: {
      type: BlogsConnection.edgeType,
      resolve: ( {local_id}, { ...args }, context, { rootValue: objectManager } ) =>
      {
        let an_Object;
        return objectManager.getOneObject( 'Blog', { id: local_id } )
        .then( ( retrieved_Object ) => {
          an_Object = retrieved_Object;
        } )
        .then( ( ) => objectManager.getObjectList( 'Blog', { Blog_Author_id: objectManager.getViewerUserId( ) } ) )
        .then( ( arr ) => ( {
          cursor: objectManager.cursorForObjectInConnection( 'Blog', arr, an_Object ),
          node: an_Object,
        } ) )
        ;
      }
    },
    Viewer: {
      type: ViewerType,
      resolve: ( parent, args, context, { rootValue: objectManager } ) => objectManager.getOneObject( 'User', { id: objectManager.getViewerUserId( ) } )
    },
  },
  mutateAndGetPayload: ( { Blog_Content, Blog_Title, Blog_Description }, context, { rootValue: objectManager } ) =>
    objectManager.add( 'Blog', {
      Blog_Author_id: objectManager.getViewerUserId( ),
      Blog_Content,
      Blog_Title,
      Blog_Description,
    } )
    .then( ( local_id ) => ( {local_id} ) )
} );
