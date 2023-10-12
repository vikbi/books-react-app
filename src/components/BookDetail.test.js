import BookDetail from './BookDetail';
import userEvent from '@testing-library/user-event';
import { cleanup, render, screen, act } from '@testing-library/react';
import renderer from "react-test-renderer";

const mockBook = {
    id: '1',
    title: 'test book',
    image: 'image-link',
    authors: ['author1', 'author2'],
    is_checked: false
}
const toggleFn = jest.fn();

describe('Book Detail tests', () => {

  afterEach(cleanup);

  it('Should render Book Details correctly', () => {
    render(<BookDetail book={mockBook} toggleSelection={toggleFn} />)
    const element = screen.getByTestId('book-detail');
    expect(element).toBeInTheDocument();
  });

  it('Should toggleSelection on checkbox : checked', async () => {
    render(<BookDetail book={mockBook} toggleSelection={toggleFn} />);
    const checkboxElement = screen.getByRole("checkbox");
    await userEvent.click(checkboxElement);
    
    expect(toggleFn).toHaveBeenCalledWith(mockBook.id,true);
  })

  it('Should toggleSelection on checkbox : unchecked',async () => {
    const mockBook = {
        id: '1',
        title: 'test book',
        image: 'image-link',
        authors: ['author1', 'author2'],
        is_checked: true
    }
    
    render(<BookDetail book={mockBook} toggleSelection={toggleFn} />);
    const checkboxElement = screen.getByRole("checkbox");

    await userEvent.click(checkboxElement);
    expect(toggleFn).toHaveBeenCalledWith(mockBook.id,false);
  })

  it('Should list authors correctly', () => {
    render(<BookDetail book={mockBook} toggleSelection={toggleFn} />);
    const authorList = screen.getAllByTestId('book-author');
    expect(authorList.length).toEqual(2)
  })

  it('Should have the correct book title', async () => {
    render(<BookDetail book={mockBook} toggleSelection={toggleFn} />);
    expect(await screen.getByText(mockBook.title)).toBeTruthy();
  });

  it('Should have default checkbox unchecked for given book', async () => {
    render(<BookDetail book={mockBook} toggleSelection={toggleFn} />);
    expect(await screen.getByRole('checkbox')).toBeTruthy();
    expect(await screen.getByRole('checkbox')).not.toBeChecked();
  });

  it("Matches DOM Snapshot", () => {
    const domTree = renderer.create(<BookDetail book={mockBook} toggleSelection={toggleFn} />).toJSON();
    expect(domTree).toMatchSnapshot();
  });
});