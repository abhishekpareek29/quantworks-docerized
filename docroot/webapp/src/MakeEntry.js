import React, { Component } from "react";
import PropTypes from "prop-types";
// import { Link } from 'react-router';


class MakeEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      first_name: '',
      last_name: '',
      gender: 'None',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    alert('User details submitted for: ' + this.state.username);
    event.preventDefault();
    const conf = {
      method: "post",
      body: JSON.stringify(this.state),
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json"
      }
    };
    fetch(this.props.endpoint, conf);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Username:
          <input type="text" name="username" value={this.state.username} onChange={this.handleChange} />
        </label>
        <label>
          First Name:
          <input type="text" name="first_name" value={this.state.first_name} onChange={this.handleChange} />
        </label>
        <label>
          Last Name:
          <input type="text" name="last_name" value={this.state.last_name} onChange={this.handleChange} />
        </label>
        <label>
          Gender:
          <select name="gender" value={this.state.gender} onChange={this.handleChange}>
            <option selected value="None">Select</option>
            <option value="Female">Female</option>
            <option value="Male">Male</option>
          </select>
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
export default MakeEntry;
