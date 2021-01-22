import React from "react";
import PropTypes from "prop-types";

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

Header.propTypes = {
  header: PropTypes.string.isRequired,
  headerHelper: PropTypes.string.isRequired,
};

export default Header;
