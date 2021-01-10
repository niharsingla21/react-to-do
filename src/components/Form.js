import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();
const blankState = {
  name: "",
  email: "",
  title: "Mr.",
  emailError: "",
  isTextAreaHidden: true,
  selectedDate: null,
  dateError: "",
};

export default class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: props.name,
      email: "",
      title: "Mr.",
      emailError: "",
      isTextAreaHidden: true,
      selectedDate: null,
      dateError: "",
    };
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]:
        event.target.type === "checkbox"
          ? event.target.checked
          : event.target.value,
    });
  };

  handleDateChange = (date) => this.setState({ selectedDate: date });

  validate = () => {
    let emailError = "";
    let dateError = "";
    if (!this.state.email.includes("@")) {
      emailError = "Invalid email";
    }
    if (!this.state.selectedDate) {
      dateError = "Enter your DOB";
    }
    console.log(emailError + dateError);
    if (emailError || dateError) {
      this.setState({ emailError, dateError });
      return false;
    }
    return true;
  };

  toast = (isSuccess) => {
    if (isSuccess) {
      toast.success("Registration successful!!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      toast.error("Please enter correct information", {
        position: toast.POSITION.BOTTOM_LEFT,
      });
    }
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const isValid = this.validate();
    if (isValid) {
      console.log(this.state);
      // clear form
      this.setState({
        isTextAreaHidden: false,
        dateError: "",
        emailError: "",
      });
    }
    this.toast(isValid);
  };

  goToSignUp = () => {
    this.setState(blankState);
    this.props.isHeaderOpen("", true);
  };

  render() {
    return (
      <div>
        <form
          hidden={!this.state.isTextAreaHidden}
          className="form-style"
          onSubmit={this.handleSubmit}
        >
          <div>
            <select
              name="title"
              value={this.state.title}
              onChange={this.handleChange}
            >
              <option>Mr.</option>
              <option>Ms.</option>
              <option>Mrs.</option>
            </select>
          </div>
          <div>
            <input
              name="name"
              className="normal-text-field"
              disabled
              value={this.props.name}
            ></input>
          </div>
          <div>
            <input
              name="email"
              className="normal-text-field"
              placeholder="Enter your email"
              onChange={this.handleChange}
            ></input>
          </div>
          <div>
            <i className="error">{this.state.emailError}</i>
          </div>
          <div>
            <DatePicker
              className="date-picker"
              name="selectedDate"
              selected={this.state.selectedDate}
              showYearDropdown
              showMonthDropdown
              isClearable
              maxDate={new Date()}
              dateFormat={"dd MMM yyyy"}
              onChange={this.handleDateChange}
              placeholderText="Date of Birth"
            />
          </div>
          <div>
            <i className="error">{this.state.dateError}</i>
          </div>
          <button onSubmit={this.handleSubmit}>Submit</button>
        </form>
        <div
          hidden={this.state.isTextAreaHidden}
          className="form-style"
          onSubmit={() => this.props.isHeaderOpen("", true)}
        >
          <div>
            <textarea
              className="text-area-field"
              value={
                this.state.title +
                this.state.name +
                ", " +
                "\nYour registration is successful. Registered details are mentioned below: " +
                "\nEmail: " +
                this.state.email +
                "\nDate of Birth: " +
                this.state.selectedDate
              }
              disabled
            ></textarea>
          </div>
          <div>
            <button onClick={this.goToSignUp}>Go back to Sign up</button>
          </div>
        </div>
      </div>
    );
  }
}
