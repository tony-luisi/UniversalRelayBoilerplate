/* @flow weak */

import { GraphQLID } from "graphql";
import { fromGlobalId, connectionArgs, connectionFromArray } from 'graphql-relay';

import BlogsConnection from "./BlogsConnection";
import BlogType from "./BlogType";


export default {
  Blogs: {
    type: BlogsConnection.connectionType,
    args: { ...connectionArgs },
    resolve: ( obj, { ...args }, context, { rootValue: objectManager } ) => objectManager.getObjectList( 'Blog', { Blog_Author_id: objectManager.getViewerUserId( ) } ).then( ( arr ) => connectionFromArray( arr, args ) )
  },
  Blog: {
    type: BlogType,
    args: { ...{ id: { type: GraphQLID } } },
    resolve: ( parent, { id }, context, { rootValue: objectManager } ) => objectManager.getOneObject( 'Blog', { id: fromGlobalId( id ).id } ),
  },
}
