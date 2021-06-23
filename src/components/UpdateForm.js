import React, { Component } from "react";

export class UpdateForm extends Component {
  render() {
    return (
      <div>
        <form onSubmit={(e) => this.props.updateMyBook(e)}>
          <label>Update Cat Name</label>
          <input
            value={this.props.catNameUpdate}
            onChange={(e) => this.props.updateBookNameUpdateForm(e.target.value)}
          ></input>
          <input type="submit" value="update book" />
        </form>
      </div>
    );
  }
}

export default UpdateForm;
