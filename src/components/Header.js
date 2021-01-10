import React, { Component } from "react";
import logo from "../logo.svg";

export default class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      nameError: "",
      headerOpen: true,
    };
  }

  handleChange = (event) => {
    console.log(event.target.name);
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  validate = () => {
    let nameError = "";

    if (!this.state.name) {
      nameError = "enter name";
    }
    if (nameError) {
      this.setState({ nameError });
      return false;
    }
    return true;
  };

  handleFocusOut = (event) => {
    const isValid = this.validate();
    if (isValid) {
      this.setState({
        headerOpen: false,
      });
    }
  };

  render() {
    return (
      <div>
        <div>
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        Hello Guest!
        <div>
          <input
            name="name"
            placeholder="Enter your name"
            onChange={this.handleChange}
            className="normal-text-field"
            onBlur={this.handleFocusOut}
          ></input>
          <div style={{ fontSize: 12, color: "red" }}>
            {this.state.nameError}
          </div>
          <div>
            <button
              className="button"
              onClick={() =>
                this.props.triggerParentUpdate(
                  this.state.name,
                  this.state.headerOpen
                )
              }
            >
              Proceed
            </button>
          </div>
        </div>
      </div>
    );
  }
}
