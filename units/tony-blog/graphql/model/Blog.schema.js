/* @flow */

import defaultPersister from '../../../../configuration/graphql/defaultPersister'

defaultPersister.addTableSchema( 'Blog', {
  fields: {
      id: 'uuid',
      Blog_Author_id: 'uuid',
      Blog_Title: 'text',
      Blog_Description: 'text',
      Blog_Content: 'text',
  },
  key: [ 'id' ],
  indexes: [ 'Blog_Author_id' ]
} )

export default true
