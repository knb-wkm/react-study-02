import React from "react";
import ReactDOM from "react-dom";
import { shallow, mount } from "enzyme";
import sinon from "sinon";

import Todo from "../Todo";

describe("Todo", () => {

  it("テストのテスト", () => {
    expect(true).toEqual(true);
  });

  it("without crashing", () => {
    const root = document.createElement("root");
    ReactDOM.render(
      <Todo todo={{}} toggleTodo={() => null} />,
      root
    );
  });

  it("todo.nameが出力される", () => {
    const root = document.createElement("root");
    const wrapper = shallow((
      <Todo todo={{id: 1, name: "foobar", done: false}}
            toggleTodo={() => null} />
    ));

    expect(wrapper.find("li").contains("foobar")).toEqual(true);
  });

  it("toggleボタンでイベントが発火する", () => {
    const root = document.createElement("root");

    const toggleTodo = sinon.spy();

    const wrapper = mount((
      <Todo todo={{id: 1, name: "foobar", done: false}}
            toggleTodo={toggleTodo} />
    ));

    wrapper.find("button").simulate("click");

    expect(toggleTodo.calledOnce).toEqual(true);
  });

});
