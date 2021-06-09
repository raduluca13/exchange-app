import styles from './App.module.css';
import ExchangeContainer from './screens/exchange/ExchangeContainer';

const { app, appHeader, mainSection } = styles

const App = () => {
  const title = 'Exchange App';

  return (
    <div className={app}>
      <header className={appHeader}>
        {title}
      </header>
      <section className={mainSection}>
        <ExchangeContainer />
      </section>
    </div >
  );
}

export default App;
