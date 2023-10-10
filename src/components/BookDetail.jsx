import React from 'react'

const BookDetail = ({book, toggleSelection}) => {

    const toggleCheck = (status) => {
        toggleSelection(book.id, status)
      }
    
      return (
        <div key={book.id} className="book-detail" data-testid="book-detail">
          <input key={book.id} checked={book.is_checked} type="checkbox" onChange={(e) => toggleCheck(e.target.checked)}/>
          <img className="book-logo" src={book.image} data-testid="book-logo"/>
          <div className="book-header">
            <label data-testid="book-title">{book.title}</label>
            <div>{book.authors.map((a,i) => <span data-testid="book-author" key={i}>{a}</span>)}</div>
          </div>
        </div>
      )
}

export default BookDetail
