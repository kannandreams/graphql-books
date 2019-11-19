import { gql } from 'apollo-boost';

const getAuthorsQuery = gql`
  {
    authors{
      name
      id
    }
  }
`

const getBookQuery = gql`
  {
    books{
      name
      id
    }
  }
`

const getBookDetails = gql`
  query($id: ID){
    book(id: $id){
      id
      name
      genre
      author{
        id
        name
        age
        books{
          name
          id
        }
      }
    }
  }
`

const addBookMutation = gql`
  mutation($name: String!,$genre: String!,$authorId: ID!) {
    addBook(name:$name,genre:$genre,authorId:$authorId){
      name
      id
    }
  }
`

export {getAuthorsQuery,getBookQuery,addBookMutation,getBookDetails}