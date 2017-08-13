#+title: react勉強会 1回目
#+STARTUP: indent
#+options: ^:nil \n:t

* react概要
- reactjs
  facebookが開発したライブラリ
  viewに特化している

- flux思想
  facebookが提案したフロントサイドにおける状態管理の思想
  reduxはflux思想を基に実装されておりreactとの組み合わせにおいては
  現在主流となっている。

  https://staltz.com/unidirectional-user-interface-architectures.html

- redux
  flux思想で実装されたライブラリ

* メリット
- UX
  push通知、ワインディングなどのアニメーション

- 高速なページ遷移
  SSRに比べて転送量が少ないので体感的に早い
  clientに処理を寄せることでサーバ負荷対策にも
  仮想DOM技術の発達

- サーバAPIの再利用性
  マルチプラットフォーム対応
  タブレット、スマホアプリ用のAPIにも使い回せる

- サーバ、フロントの分業化
  これ結構大事

* デメリット
- 実装コスト
  最初は結構難しい

- jsの初期ロード問題
  必要なモジュールのみロードするので
  現在は問題ないかと思われる(virtual domは早い)

- 開発者が少ない

- だから必ずしもSPAが必須というわけではない

* 開発環境の構築
- nodejsほぼ必須(nodebrew, nvmおすすめ)

- create-react-appをインストール & 起動

- 開発に必要なnpmモジュールは大体整っている
  - es6トランスパイラ(babel)
  - ホットデプロイ(webpack-dev-server)
  - テストフレームワーク(jest)
  - 構文チェック(eslint)

#+begin_src shell
$ npm install -g create-react-app
$ create-react-app react-sample-01
$ cd react-sample-01
$ npm start
#+end_src

* babel, es6, jsx

- hello react
#+begin_src js
const App = () => {
  const title = "hello react";
  return (
    <h1>{title}</h1>
  );
};
#+end_src

* babel repl
- babel replが分かり易い
  https://babeljs.io/repl/

- トランスパイル前

#+begin_src js
const App = () => {
  const title = "hello";
  return (
    <h1>{title}</h1>
  );
};
#+end_src

- トランスパイル後

#+begin_src js
var App = function App() {
  var title = "hello";
  return React.createElement("h1", null, title);
};
#+end_src

* react jsx

- { }の中にjsを記述する
- テンプレートエンジンのようなもの

#+begin_src js
return (
  <ul>
    { [...Array(10).keys()].map(i => <li>オラ</li>) }
  </ul>
);

#+end_src

* 条件分岐

- 最初のうちはキモいが慣れれば便利

#+begin_src js
const warn = true;

return (
  <p>
    {warn ? <strong>warning!!</strong> : "not worning" }
  </p>
);
#+end_src

* ここからチュートリアル

* タイトル

- todoアプリを作成する

#+begin_src js
const title = "todo app";

return (
  <div>
    <h2>{title}</h2>
  </div>
);
#+end_src

* データとイテレータ

#+begin_src js
  const todos = [
    {id: 1, name: "react勉強する", done: true},
    {id: 2, name: "更にreactを勉強する", done: false}
  ];

  const renderTodo = (todo) => {
    return (
      <ul>
        <li>{todo.id}: {todo.name}</li>
      </ul>
    );
  };

  return (
    <div>
      <h2>{title}</h2>
      {todos.map(todo => renderTodo(todo))}
    </div>
  );
#+end_src

* スタイル

#+begin_src js
  const renderTodo = (todo) => {
    const style = {
      textDecoration: todo.done ? "line-through" : "none"
    };
    
    return (
      <ul style={style}>
        <li>{todo.id}: {todo.name}</li>
      </ul>
    );
  };
#+end_src

* 静的なページが完成

* class(1)
- todoをトグルする機能が欲しい
- ゆえに状態を保持したい
- ReactのComponentを継承する

#+begin_src js
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [
        {id: 1, name: "react勉強する", done: true},
        {id: 2, name: "更にreactを勉強する", done: false}
      ]
    };
  }
...
#+end_src

* ちょっと脱線

react思想(thinking in react)によるとコンポーネントは最小の単位
よってstatelessにするのがオススメらしい。
componentはjs->domへの変換器であるべき。

- 理由
  テスト範囲(どう使うかを自由に決めることができる)
  羃等性(何回実行しても結果が同じ)
  再利用性
  責任が多いコンポーネントはあきらめる？ <= redux containerで頑張る?

* class(2)

- renderメソッド以下に処理を移動

#+begin_src js
  render() {
    const title = "todo app";
    ...
#+end_src

* DOMへイベントリスナを登録

- onClick, onKeyDown, onFocusなど色々ある
  
https://facebook.github.io/react/docs/events.html

#+begin_src js
      return (
        <ul style={style}>
          <li>{todo.id}: {todo.name}</li>
          <button onClick={() => toggleTodo(todo.id)}>
            toggle todo
          </button>
        </ul>
      );
#+end_src

* トグルするメソッドを追加

- setStateでthis.stateを更新できる
  - setStateは基本イミュータブル
  - this.stateへ直接値を代入することはアンチパターン

- 更新した情報は画面に反映する

#+begin_src js
    const toggleTodo = (todo_id) => {
      this.setState({
        todos: this.state.todos.map(
          todo => todo.id === todo_id ?
            {...todo, done: !todo.done} : todo
        )
      });
    };
#+end_src

- {...x, y} シンタックスシュガー
  - Object.assing()と同等

#+begin_src js
// es6
{...todo, done: !todo.done}

// es5
Object.assign(todo, { done: !todo.done })
#+end_src

* イベントリスナ, DOM参照

- refで指定したDOMの値はthis.refs.xxx.valueで取得できる

#+begin_src js
        <input
          type="text"
          ref="todoText"
          onKeyPress={(e) => addTodo(e)} />
#+end_src

* todoを追加するメソッド

- sortはレシーバを変更する副作用があるので注意

#+begin_src js
    const addTodo = (e) => {
      if (e.key !== "Enter") return;

      const next_id = this.state.todos.slice()
            .sort( (a, b) => b.id - a.id )[0].id + 1;

      const newTodo = {
        id: next_id,
        name: this.refs.todoText.value,
        done: false
      };

      this.setState({ todos: [...this.state.todos, newTodo] });

      this.refs.todoText.value = "";
    };
#+end_src

- [...]シンタックスシュガー
  - Array.proptype.concatと同等

#+begin_src js
// es6
[...array, object]

// es5
array.concat(object)
#+end_src

* doneをフィルタする機能

- state
#+begin_src js
       todos: [
         {id: 1, name: "react勉強する", done: true},
         {id: 2, name: "更にreactを勉強する", done: false}
+      ],
+      hideDone: false
#+end_src

- handler, filter
#+begin_src js
    const hideDone = () => {
      this.setState({ hideDone: !this.state.hideDone });
    };

    const todos = this.state.hideDone
          ? this.state.todos.filter(todo => todo.done === false)
#+end_src

- view
#+begin_src js
-          {this.state.todos.map(todo => <Todo todo={todo} toggleTodo={toggleTodo} />)}
+          <button onClick={hideDone}>hide done</button>
#+end_src

* todoをrenderする機能をコンポーネント化

- renderTodoをコンポーネントに切り出す
- unit testや共通化のため

#+begin_src js
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

...

{this.state.todos.map(todo => <Todo todo={todo} toggleTodo={toggleTodo} />)}
#+end_src

* コンポーネント間のデータ、メソッド授受

- 定義したコンポーネントは<Todo />で利用できる
- 親コンポーネントからデータ、メソッドを渡せる

#+begin_src js
class Todo extends Component {
...
}

<Todo todo={todo} toggleTodo={toggleTodo}
#+end_src

- これで子が発火させたイベントを親が購読できる

eventを発火(child) -> データを更新(parent) -> 子に更新後のデータを渡す(parent)

* propsとstate

props: 外部から渡されたオブジェクト(read only)
state: 内部で利用するオブジェクト(read write)

* prop-types

- コンポーネントのpropsに型によるバリデーションを適用できる
- interface定義のようなもの
- 詳細は以下 array valueの型, object内のkey:型など色々できる

  https://github.com/facebook/prop-types

#+begin_src js
import PropTypes from "prop-types";
...
Todo.propTypes = {
  todo: PropTypes.number.isRequired,
  toggleTodo: PropTypes.func.isRequired
};
#+end_src

- typeに違反した場合、例外をスローしないのが微妙
- あくまでpropTypesは簡易機能なので掘り下げるならflowかtypescript

https://flow.org/en/docs/getting-started/



* unittest

- テスト用ディレクトリの作成
-  __tests__ディレクトリ配下、xxx.test.jsがテスト対象
- npm testで自動実行

#+begin_src shell
$ mkdir __tests__
$ touch __tests__/App.test.js
$ touch __tests__/Todo.test.js
$ npm test
#+end_src

* test テストのテスト

- __tests__/App.test.js

#+begin_src js
import React from "react";
import ReactDOM from "react-dom";

import Todo from "../Todo";

describe("Todo", () => {

  it("テストのテスト", () => {
    expect(true).toEqual(true);
  });

});
#+end_src

* コンポーネント毎にファイルを分割

- ユニットテストの準備
- コンポーネント毎にファイルを分割したほうがテストしやすい
  - index.js -> [Todo.js, App.js, index.js]

* コンポーネントが初期化できるかテスト

#+begin_src js
  it("without crashing", () => {
    const root = document.createElement("root");
    ReactDOM.render(
      <Todo todo={{}} toggleTodo={() => null} />,
      root
    );
  });
#+end_src

* propsとして渡したデータをrenderしているか

- 仮想DOMをシミュレートするライブラリ
#+begin_src shell
$ npm install --save enzyme react-test-renderer
#+end_src

#+begin_src js
  it("todo.nameが出力される", () => {
    const root = document.createElement("root");
    const wrapper = shallow(
      <Todo todo={{id: 1, name: "foobar", done: false}}
            toggleTodo={() => null} />
    );

    expect(wrapper.find("li").contains("foobar")).toEqual(true);
  });
#+end_src

* button clickで発火するか

- eventをシミュレートするライブラリ
#+begin_src shell
$ npm install --save sinon
#+end_src

#+begin_src js
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
#+end_src

* 終了
