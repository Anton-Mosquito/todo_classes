import React from "react";
import Header from "./todoHeader";
import InputField from "./todoInput";
import TaskList from "./todoTaskList";

class ToDoList extends React.Component {
  constructor(props) {
    super(props);
    this.containerNode = null;
    this.inputFieldNode = null;
    this.editButtonNode = null;
    this.removeButtonNode = null;
    this.header = "TODO";
    this.headerHelper = "List";
    this.mas = [];
    this.state = {
      todos: JSON.parse(window.localStorage.getItem("todos")),
    };
    this.createItem = this.createItem.bind(this);
  }

  componentDidMount() {
    this.createNode();
    this.checkStorage();
  }

  checkStorage() {
    if (this.state.todos === null) {
      this.setState({ todos: [] });
      const array = [];
      window.localStorage.setItem("todos", JSON.stringify(array));
    } else {
      this.loadElementsOfTodoList();
    }
  }

  loadElementsOfTodoList() {
    this.state.todos.forEach((element) => {
      this.createItem(element);
    });
  }

  createNode() {
    const itemBox = document.createElement("div");
    itemBox.classList.add("todo__container-item");

    const input = document.createElement("input");
    input.type = "text";
    input.disabled = true;
    input.classList.add("todo__container-item-input");

    const edit = document.createElement("button");
    edit.classList.add("todo__container-item-editButton");
    edit.innerHTML = "EDIT";
    edit.dataset.list = "edit";

    const remove = document.createElement("button");
    remove.classList.add("todo__container-item-removeButton");
    remove.innerHTML = "REMOVE";
    remove.dataset.list = "remove";

    this.containerNode = itemBox;
    this.inputFieldNode = input;
    this.editButtonNode = edit;
    this.removeButtonNode = remove;
  }

  get getContainerNode() {
    return this.containerNode.cloneNode(true);
  }

  get getInputFieldNode() {
    return this.inputFieldNode.cloneNode(true);
  }

  get getEditButtonNode() {
    return this.editButtonNode.cloneNode(true);
  }

  get getRemoveButtonNode() {
    return this.removeButtonNode.cloneNode(true);
  }

  createItem(name) {
    const container = this.getContainerNode;
    const input = this.getInputFieldNode;
    const editBtn = this.getEditButtonNode;
    const removeBtn = this.getRemoveButtonNode;

    container.dataset.list = name;
    input.value = name;
    container.append(input, editBtn, removeBtn);

    this.mas.push(container);

    this.setState({ elements: this.mas });
  }

  render() {
    return (
      <div className="todo">
        <Header header={this.header} headerHelper={this.headerHelper} />
        <InputField data={this.state.todos} create={this.createItem} />
        <TaskList data={this.state.todos} append={this.state.elements} />
      </div>
    );
  }
}

export default ToDoList;
