import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getBookQuery } from '../queries/queries';
import BookDetails from '../components/BookDetails';

class BookList extends Component{
  constructor(props){
    super(props)
    this.state = {
      selected: null
    }
  }
  displayBooks(){
    var data = this.props.data;
    if(data.loading){
      return ( <div>Loading Books...</div> );
    } else {
      console.log(data)
      return data.books.map(book => {
      return (
      <li key={book.id} onClick={(e) => {this.setState({selected: book.id})}}>{book.name } </li>
      );
      })
    }
  }
  render(){
    return(
      <div>
      <ul id="book-list">
      {this.displayBooks()}
      </ul>
      <div>
        <BookDetails bookId={this.state.selected}/>
      </div>
    </div>
    )
  }
}

export default graphql(getBookQuery)(BookList);
