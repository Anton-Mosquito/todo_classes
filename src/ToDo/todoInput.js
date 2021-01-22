import React from "react";
import sprite from "../sprite.svg";
import PropTypes from "prop-types";

class InputField extends React.Component {
  constructor(props) {
    super(props);
    this.check = this.check.bind(this);
    this.inputValue = null;
    this.checkKeyBoard = this.checkKeyBoard.bind(this);
  }

  componentDidMount() {
    this.inputValue = document.querySelector('[data-list="input-data"]');
  }

  check() {
    if (this.inputValue.value !== "") {
      const name = this.inputValue.value;
      this.props.create(name);
      this.props.data.push(name);
      window.localStorage.setItem("todos", JSON.stringify(this.props.data));
      this.inputValue.value = "";
    }
  }

  checkKeyBoard(e) {
    if (e.key === "Enter") this.check();
  }

  render() {
    return (
      <div className="todo__input">
        <input
          className="todo__input-data"
          type="text"
          placeholder="What Do you Want to Do ... "
          data-list="input-data"
          onKeyDown={this.checkKeyBoard}
        />
        <button
          className="todo__input-button"
          data-list="input-button"
          onClick={this.check}
        >
          <svg width="25px" height="25px">
            <use href={sprite + "#add"}></use>
          </svg>
        </button>
      </div>
    );
  }
}

InputField.propTypes = {
  data: PropTypes.arrayOf(PropTypes.string).isRequired,
  create: PropTypes.func.isRequired,
};

export default InputField;
