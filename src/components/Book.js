import React, { Component } from 'react'

export class Book extends Component {
    render() {
        return (
            <div>
                <h3>{this.props.booksData.name}</h3>
                <p>{this.props.booksData.description}</p>
                <p>{this.props.booksData.status}</p>
            </div>
        )
    }
}

export default Book
