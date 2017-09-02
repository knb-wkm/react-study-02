import React, { Component } from "react";
import { connect } from "react-redux";
import { toggleTodo } from "./actions";
import PropTypes from "prop-types";

class Todo extends Component {
  render() {
    const { todo, toggleTodo } = this.props;

    const style = {
      textDecoration: todo.done ? "line-through" : "none"
    };
    
    return (
      <ul style={style}>
        <li>{todo.id}: {todo.name}</li>
        <button onClick={() => toggleTodo(todo.id)}>
          toggle todo
        </button>
      </ul>
    );
  }
}

Todo.propTypes = {
  todo: PropTypes.object.isRequired,
  toggleTodo: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return { };
};

const mapDispatchToProps = dispatch => {
  return {
    toggleTodo: todo_id => dispatch(toggleTodo(todo_id))
  };
};

Todo = connect(mapStateToProps, mapDispatchToProps)(Todo);

export default Todo;
