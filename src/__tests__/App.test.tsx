import { create } from "react-test-renderer";
import App from '../App';

test('Given App component then should render', () => {
  const appRoot = create(<App />).root;
  // const linkElement = screen.getByText(/learn react/i);
  expect(appRoot).toBeDefined()
});
