import { Component } from "react";
import "./App.css";
import Form from "./components/Form";
import Header from "./components/Header";

class App extends Component {
  constructor() {
    super();

    this.state = {
      name: "",
      headerOpen: true,
    };
  }

  updateNameAndHeader(name, headerOpen) {
    this.setState({
      name,
      headerOpen,
    });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <div>
            {this.state.headerOpen ? (
              <Header
                triggerParentUpdate={this.updateNameAndHeader.bind(this)}
              />
            ) : null}
          </div>
          {!this.state.headerOpen ? (
            <Form
              name={this.state.name}
              isHeaderOpen={this.updateNameAndHeader.bind(this)}
            />
          ) : null}
        </div>
      </div>
    );
  }
}

export default App;
