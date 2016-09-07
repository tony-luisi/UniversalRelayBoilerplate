import ObjectManager from '../../../../graphql/ObjectManager'

// Class used by GraphQL Server
export default class Blog
{
  constructor( fields )
  {
    this.id = fields.id;
    this.Blog_Author_id = fields.Blog_Author_id;
    this.Blog_Title = fields.Blog_Title;
    this.Blog_Description = fields.Blog_Description;
    this.Blog_Content = fields.Blog_Content;
  }
}

ObjectManager.registerEntity( 'Blog', Blog )
