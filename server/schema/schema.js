const graphql = require('graphql');

const _ = require('lodash');

const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
} = graphql;

var books = [
  {name: 'Deep Learning',genre:'Tech',id:'1',authorId:'1'},
  {name: 'Outliers',genre:'Fantasy',id:'2',authorId:'2'},
  {name: 'Blink',genre:'Fantasy',id:'2',authorId:'2'}

];

var authors = [
  {name: 'Ian Goodfellow',age:34,id:'1'},
  {name: 'Malcom Gladwell',age:44,id:'2'}
]

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: {type:  GraphQLID},
    name: {type:  GraphQLString},
    genre:  {type:  GraphQLString},
    author:{
      type: AuthorType,
      resolve(parent,args){
        // code to get data from db / other source
        return _.find(authors,{id: parent.authorId});
      }
    }
  })
});

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: {type:  GraphQLID},
    name: {type:  GraphQLString},
    age:  {type:  GraphQLInt},
    books: {
      type: new GraphQLList(BookType),
      resolve(parent,args){
        return _.filter(books,{authorId:parent.id})
      }
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields:{
    book: {
      type: BookType,
      args: {id:  {type: GraphQLID}},
      resolve(parent,args){
        // code to get data from db / other source
        return _.find(books,{id: args.id});
      }
    },
    author: {
      type: AuthorType,
      args: {id:  {type: GraphQLID}},
      resolve(parent,args){
        return _.find(authors,{id: args.id});
      }
    },
    books:{
      type: new GraphQLList(BookType),
      resolve(parent,args){
        return books
      }
    },
    authors:{
      type: new GraphQLList(AuthorType),
      resolve(parent,args){
        return authors
      }
    }
  }
});



module.exports = new GraphQLSchema({
  query:  RootQuery
})