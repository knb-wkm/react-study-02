const initialState = [
  {id: 1, name: "react勉強する", done: true},
  {id: 2, name: "更にreactを勉強する", done: false}
];

const todoReducer = (state = initialState, action) => {
  switch ( action.type ) {
  case "ADD_TODO":
    // [ ...ary, obj ] は ary.dconcat(obj)のシンタックスシュガー
    return [...state, action.todo];
  default:
    return state;
  }
};

const addTodo = (todo) => {
  return {
    type: "ADD_TODO",
    todo: todo
  };
};

describe("todoReducerのテスト", () => {

  it("ADD_TODO", () => {
    const newTodo = { id: 3, name: "reducerを勉強する", done: false };
    const result = todoReducer(initialState, addTodo(newTodo));

    // 期待する値はinitialStateにnewTodoをconcatしたもの
    const expected = [
      {id: 1, name: "react勉強する", done: true},
      {id: 2, name: "更にreactを勉強する", done: false},
      newTodo
    ];
    expect(result).toEqual(expected);
  });
});

  
