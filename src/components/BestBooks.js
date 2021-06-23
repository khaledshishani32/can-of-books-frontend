import React, { Component } from "react";
import axios from "axios";
import { withAuth0 } from "@auth0/auth0-react";
import Book from "./Book";
export class BestBooks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: this.props.auth0.user.name,
      userEmail: this.props.auth0.user.email,
      userPicture: this.props.auth0.user.picture,
      serverUrl: process.env.REACT_APP_SERVER_URL,
      booksData: [],
    };
  }

  componentDidMount = () => {
    axios
      .get(`http://localhost:8080/books?email=${this.state.userEmail}`)
      .then((response) => {
        console.log(response.data)
        this.setState({
            booksData: response.data.books,
        });
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  render() {
    return (
      <div>
      
       {
           this.state.booksData.length>0 && 
         
           this.state.booksData.map((obj , index)=><Book key={this.state.booksData[index].name} booksData={this.state.booksData[index]}/>)
        }
      </div>
    );
  }
}

export default withAuth0(BestBooks);
