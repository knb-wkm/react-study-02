import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

const App = () => {
  const title = "react sample";
  const books = [
    {name: "react tutorial", price: 3000, stock: 10},
    {name: "redux tutorial", price: 6000, stock: 0},
  ];

  const renderBook = (book) => {
    const style = {
      textDecoration: book.stock === 0 ? "line-through" : "none"
    };
    
    return (
      <ul style={style}>
        <li>{book.stock}</li>
        <li>{book.name}</li>
        <li>{book.price}</li>
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
