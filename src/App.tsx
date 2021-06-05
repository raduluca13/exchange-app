import React from 'react';
import './App.css';
import ExchangeContainer from './screens/exchange/ExchangeContainer';

const App = () => {
  const title = 'Exchange App';

  return (
    <div className="App" >
      <header className="App-header">
        {title}
      </header>
      <section className="main-section">
        <ExchangeContainer/>
      </section>
    </div >
  );
}

export default App;
