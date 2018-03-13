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
            type="text"
            placeholder="Add an item to do..."
            value={this.props.newItem}
            onChange={this.props.handleNewItem}
            onKeyPress={this.props.handleNewItem}
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
        { value: "See mom" },
        { value: "Go get food" }
      ],
      newItem: ""
    };

    this.addHandler = this.addHandler.bind(this);
    this.delHandler = this.delHandler.bind(this);
    this.handleNewItem = this.handleNewItem.bind(this);
  }

  addHandler() {
    const newItemsArr = this.state.items;
    newItemsArr.push({value: this.state.newItem});
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

  handleNewItem(e) {
    if(e.key === 'Enter') {
      this.addHandler();
      return;
    }
    this.setState({ newItem: e.target.value });
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
      <div className="ToDoContainer">
        <table>
          <thead>
            <tr><th>
              <ToDoHeader />
            </th></tr>
          </thead>
          <tbody>
            <tr><td>
              {rows}
              <EntryBar
                addHandler={this.addHandler}
                items={this.state.items}
                newItem={this.state.newItem}
                handleNewItem={this.handleNewItem} />
            </td></tr>
          </tbody>
        </table>
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
