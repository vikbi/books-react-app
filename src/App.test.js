import { cleanup, render, screen, waitFor } from '@testing-library/react';
import renderer from "react-test-renderer";
import App from './App';
import axios, { mockResponse } from './components/__mocks__/axios';


describe('App', () => {

  afterEach(cleanup)

  it('renders books app', () => {
    axios.get.mockResolvedValue(mockResponse)
    render(<App />);
    const BookElement = screen.getByText(/Books/);
    expect(BookElement).toBeInTheDocument();
  });
  
  it("Matches DOM Snapshot", () => {
    const domTree = renderer.create(<App />).toJSON();
    expect(domTree).toMatchSnapshot();
  });
})
