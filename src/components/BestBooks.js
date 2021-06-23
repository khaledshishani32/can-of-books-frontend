import React, { Component } from "react";
import axios from "axios";
import { withAuth0 } from "@auth0/auth0-react";
import Book from "./Book";
import BookFormModal from "./BookFormModal";
export class BestBooks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: this.props.auth0.user.name,
      email: this.props.auth0.user.email,
      userPicture: this.props.auth0.user.picture,
      serverUrl: process.env.REACT_APP_SERVER_URL,
      booksData: [],
      showForm: false,
    };
  }

  showAddForm = (boolean) => {
    this.setState({
      showForm: boolean,
    });
  };

  handleAddBook = async (e) => {
    e.preventDefault();
    let avilable = "Not avaialble!";
    if (e.target.status.checked) {
      avilable = "Avalible";
    }

    let resBody = {
      email: "khaled.shishani32@gmail.com",
      books: {
        name: e.target.bookName.value,
        description: e.target.description.value,
        status: avilable,
      },
    };

    await axios
      .post(`http://localhost:8080/book`, resBody)
      .then((response) => {
        this.setState({
          booksData: response.data.books,
        });
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  componentDidMount = () => {
    axios
      .get(`http://localhost:8080/books?email=${this.state.email}`)
      .then((response) => {
        console.log(response.data);
        this.setState({
          booksData: response.data.books,
        });
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  handleDelete = async (index, event) => {
    event.preventDefault();
    console.log(index);
    await axios
      .delete(`${process.env.REACT_APP_SERVER_URL}/book/${index}?email=${this.state.email}`)
      .then((response) => {
        this.setState({
          booksData: response.data.books,
        });
      })
      .catch((error) => alert(error.message));
  };

  handleUpdate = async (index, e) => {
    e.preventDefault();
    console.log(index);
    let avilable = "Not avaialble!";
    if (e.target.status.checked) {
      avilable = "Avalible";
    }

    let resBody = {
      email: "khaled.shishani32@gmail.com",
      books: {
        name: e.target.bookName.value,
        description: e.target.description.value,
        status: avilable,
      },
    };
    
    //console.log(reqBody);
    await axios
      .put(`http://localhost:8080/book/${index}`, resBody)
      .then((response) => {
        this.setState({
          booksData: response.data.books,
        });
      })
      .catch((error) => alert(error.message));
  };

  render() {
    return (
      <div>
        <button onClick={this.showAddForm}>add</button>
        {
          <BookFormModal
            show={this.state.showForm}
            onHide={() => this.showAddForm(false)}
            handleAddBook={this.handleAddBook}
          />
        }
        {this.state.booksData.length > 0 &&
          this.state.booksData.map((obj, idx) => (
            <Book
              key={this.state.booksData[idx].name}
              booksData={this.state.booksData[idx]}
              index={idx}
              handleDelete={this.handleDelete} handleUpdate={this.handleUpdate}
            />
          ))}
      </div>
    );
  }
}

export default withAuth0(BestBooks);
