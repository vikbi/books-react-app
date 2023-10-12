import React, { useEffect, useState } from 'react'
import BookDetail from './BookDetail';
import axios from 'axios'

const BookList = () => {

    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [selectedBooks, setSelectedBooks] = useState([]);

    useEffect(() => {
        setLoading(true);
        loadData();

        return () => {
          setLoading(false);
        }
    }, [page]);

    const loadData = async () => {
      await axios.get("https://gutendex.com/books/?page="+page)
        .then((res) => { //console.log(res.data, res.data.results)
          const data = res.data.results.map(book => {
                      //restructure with required data
                      return {
                        'id':book.id, // keeping id for unique identifier
                        'title':book.title,
                        'image': book.formats['image/jpeg'],
                        'authors': book.authors.map(a => a.name),
                        'is_checked': false
                      }
                  });
                  // console.log(data);
              const allBooks = books.concat(data);
              setBooks(allBooks);
              
        })
        .finally(() => {
          setLoading(false);
        })
      }

    const clearSelection = () => {
        setSelectedBooks([]);
        const updatedList = books.map(b=>  {return {...b, is_checked: false}});
        setBooks(updatedList);
    }

    const handleSelection = (id, status) => {
        const newSelection = selectedBooks;
        if(status) {
            newSelection.push(id);
        } else{
            newSelection.pop(id);
        }
        setSelectedBooks(newSelection);
        const updatedList = books.map(b=> b.id===id? {...b, is_checked: status} : b);
        setBooks(updatedList);
    }

  const getNextPage = (e) => { e.preventDefault();
    const bottom = e.target.scrollHeight - e.target.scrollTop - 5 >= e.target.clientHeight
    //scrolled to bottom of the list, request with next page
    if(!bottom) {
      setPage(page+1)
    }
  }

  return (
    <>
    <div className="header">Books</div>
    {/* this subheader can be created as another component */}
    <div className="sub-header">
      <span>{books && books.length} books <strong>({selectedBooks.length} selected)</strong></span>
      <button className='button-clear' onClick={() => clearSelection()}>clear selection</button>
    </div>

    <div className="book-list" onScroll={(e) => getNextPage(e)}>
    <div>{ books && books.map(b =>{ 
        return <BookDetail key={b.id} book={b} toggleSelection={(id, status) => handleSelection(id, status) } />
    })}
    </div>
    {loading && <div className="loader">Loading...</div>}
    </div>
    
  </>
  )
}

export default BookList
