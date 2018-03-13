import React, { Component } from 'react';
import './App.css';

class ToDoHeader extends Component {
  render() {
    return (
      <div className="ToDoHeader">
        To Do List
      </div>
    );
  }
}

class EntryBar extends Component {

  render() {
    return (
      <div className="EntryBar">
        <form>
          <input
            className="Input"
            type="text"
            placeholder="Add an item to do..."
            value={this.props.newItem}
            onChange={this.props.newItemHandler}
            onKeyPress={this.props.newItemHandler}
            maxLength="50"
          />
          <div className="AddButton">
            <button type="button"
              onClick={this.props.addHandler}>Add</button>
          </div>
        </form>
      </div>
    );
  }
}

class ToDoRow extends Component {

  render() {
    const value = this.props.value;
    return (
      <div className="ToDoRow">
        {value}
        <div className="DeleteButton">
          <button type="button"
            onClick={() =>
              this.props.delHandler(this.props.index)}>X</button>
        </div>
      </div>
    );
  }
}

class ToDoContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [
        { value: "Example Item 1" },
        { value: "Example Item 2" }
      ],
      newItem: ""
    };

    this.addHandler = this.addHandler.bind(this);
    this.delHandler = this.delHandler.bind(this);
    this.newItemHandler = this.newItemHandler.bind(this);
  }

  addHandler() {
    const newItemsArr = this.state.items;
    newItemsArr.push({ value: this.state.newItem });
    this.setState({
      newItemsArr, newItem: ""
    });
  }

  delHandler(index) {
    let items = this.state.items;
    items.splice(index, 1);
    this.setState({
      items
    });
  }

  newItemHandler(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      this.addHandler();
      return;
    }
    this.setState({ newItem: e.target.value });
  }

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  scrollToBottom = () => {
    this.containerEnd.scrollIntoView({ behavior: "smooth" });
  }

  render() {
    const rows = [];
    this.state.items.forEach((item) => {
      rows.push(
        <ToDoRow
          value={item.value}
          key={this.state.items.indexOf(item)}
          delHandler={this.delHandler}
          items={this.state.items}
          index={this.state.items.indexOf(item)} />
      );
    });
    return (
      <div className="ToDo">
        <ToDoHeader />
        <div className="ToDoContainer">
          {rows}
          <div ref={(el) => { this.containerEnd = el; }}></div>
        </div>
        <EntryBar
          addHandler={this.addHandler}
          items={this.state.items}
          newItem={this.state.newItem}
          newItemHandler={this.newItemHandler} />
      </div>
    );
  }
}

class App extends Component {

  render() {
    return (
      <ToDoContainer />
    );
  }
}

export default App;
