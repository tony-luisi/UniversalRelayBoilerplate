/* @flow weak */

import {connectionDefinitions} from 'graphql-relay';

import BlogType from "./BlogType";

export default connectionDefinitions( {
  name: 'Blogs',
  nodeType: BlogType,
} );
