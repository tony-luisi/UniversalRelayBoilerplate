/* @flow weak */

import { globalIdField } from 'graphql-relay';
import { GraphQLString, GraphQLObjectType } from "graphql";

import NodeInterface from "../../../../graphql/NodeInterface";

import Blog from '../model/Blog';

export default new GraphQLObjectType( {
  name: 'Blog',
  interfaces: [NodeInterface],
  isTypeOf: object => object instanceof Blog,
  fields: {
    id: globalIdField('Blog'),
    Blog_Title: { type: GraphQLString, resolve: (obj) => obj.Blog_Title },
    Blog_Description: { type: GraphQLString, resolve: (obj) => obj.Blog_Description },
    Blog_Content: { type: GraphQLString, resolve: (obj) => obj.Blog_Content },
  },
} );
