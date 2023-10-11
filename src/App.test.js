import { cleanup, render, screen } from '@testing-library/react';
import renderer from "react-test-renderer";
import App from './App';
import axios, { mockResponse } from './components/__mocks__/axios';

describe('App', () => {

  afterEach(cleanup)

  beforeEach(async() => await axios.get.mockResolvedValue(mockResponse));

  it('renders books app', () => {
    render(<App />);
    const linkElement = screen.getByText(/books/i);
    expect(linkElement).toBeInTheDocument();
  });
  
  it("Matches DOM Snapshot", () => {
    const domTree = renderer.create(<App />).toJSON();
    expect(domTree).toMatchSnapshot();
  });
})
