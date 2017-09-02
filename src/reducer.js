import { createStore } from "redux";

const initialState = [
  {id: 1, name: "react勉強する", done: true},
  {id: 2, name: "更にreactを勉強する", done: false}
];

const todoReducer = (state = initialState, action) => {
  switch ( action.type ) {
  case "ADD_TODO":
    // [ ...ary, obj ] は ary.dconcat(obj)のシンタックスシュガー
    const newTodo = {
      id: state.slice().sort( (a, b) => b.id - a.id )[0].id + 1,
      name: action.name,
      done: false
    };

    return [...state, newTodo];
  case "TOGGLE_TODO":
    return state.map(todo => {
      return todo.id === action.todo_id
      ? { ...todo, done: !todo.done }
      : todo;
    });
  default:
    return state;
  }
};

const store = createStore(todoReducer);

export default store;
