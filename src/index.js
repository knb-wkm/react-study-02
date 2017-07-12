import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

const App = () => {
  return (
    <div>
      app
    </div>
  );
};

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

registerServiceWorker();
