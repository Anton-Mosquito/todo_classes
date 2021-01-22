import React from "react";
import PropTypes from "prop-types";

class TaskList extends React.Component {
  constructor(props) {
    super(props);
    this.container = null;
    this.edit = this.edit.bind(this);
    this.remove = this.remove.bind(this);
  }

  componentDidMount() {
    this.container = document.querySelector('[data-list="container"]');
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.append.length > 0) {
      nextProps.append.forEach((element) => {
        this.container.append(element);
        element.children[1].onclick = this.edit;
        element.children[2].onclick = this.remove;
      });
      return true;
    } else {
      return false;
    }
  }

  edit(event) {
    const element = event.target;
    const name = element.parentNode.dataset.list;
    const condition = element.previousElementSibling.disabled;
    const value = element.previousElementSibling.value;
    if (condition === true) {
      element.previousElementSibling.disabled = !element.previousElementSibling
        .disabled;
    } else {
      element.previousElementSibling.disabled = !element.previousElementSibling
        .disabled;
      let indexof = this.props.data.indexOf(name);
      this.props.data[indexof] = value;
      element.parentNode.dataset.list = value;
      window.localStorage.setItem("todos", JSON.stringify(this.props.data));
    }
  }

  remove(event) {
    const element = event.target;
    element.parentNode.remove();
    const index = this.props.data.indexOf(element.parentNode.dataset.list);
    this.props.data.splice(index, 1);
    this.props.append.splice(index, 1);
    window.localStorage.setItem("todos", JSON.stringify(this.props.data));
  }

  render() {
    return (
      <React.Fragment>
        <div className="todo__container" data-list="container"></div>;
      </React.Fragment>
    );
  }
}

TaskList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.string).isRequired,
  append: PropTypes.arrayOf(PropTypes.node),
};

export default TaskList;
