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

const addTodo = (name) => {
  return {
    type: "ADD_TODO",
    name: name
  };
};

const toggleTodo = (todo_id) => {
  return {
    type: "TOGGLE_TODO",
    todo_id: todo_id
  };
};

describe("todoReducerのテスト", () => {

  it("ADD_TODO", () => {
    const newTodo = "reducerを勉強する";
    const result = todoReducer(initialState, addTodo(newTodo));

    // 期待する値はinitialStateにnewTodoをconcatしたもの
    const expected = [
      {id: 1, name: "react勉強する", done: true},
      {id: 2, name: "更にreactを勉強する", done: false},
      {id: 3, name: newTodo, done: false}
    ];
    expect(result).toEqual(expected);
  });

  it("TOGGLE_TODO", () => {
    const toggleTodoId = 2;
    const result = todoReducer(initialState, toggleTodo(toggleTodoId));
    const expected = [
      {id: 1, name: "react勉強する", done: true},
      {id: 2, name: "更にreactを勉強する", done: true}, // doneがtrue->false
    ];

    expect(result).toEqual(expected);
  });

});

  
