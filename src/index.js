import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

const App = () => {
  const title = "react sample";
  const books = [
    {name: "react tutorial", price: 3000},
    {name: "redux tutorial", price: 6000},
  ];

  const renderBook = (book) => {
    const expensive = book.price > 5000 ? "!!!" : "";

    return (
      <ul>
        <li>{book.name}</li>
        <li>{book.price}{expensive}</li>
      </ul>
    );
  };

  return (
    <div>
      <h2>{title}</h2>
      {books.map(book => renderBook(book))}
    </div>
  );
};

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

registerServiceWorker();
