import React from "react";

class Header extends React.Component {
  render() {
    return (
      <h1 className="todo__header">
        <span className="todo__header-styling">{this.props.header}</span>
        {this.props.headerHelper}
      </h1>
    );
  }
}

export default Header;
