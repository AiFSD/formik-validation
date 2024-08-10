

const BookCard = ({ books, loading, onEdit, onDelete }) => {
  if (loading) {
    return <div>Loading...</div>; 
  }

  return (
    <div className="book-card-container">
      {books.length === 0 ? (
        <p>No books available.</p>
      ) : (
        books.map((book) => (
          <div key={book.id} className="book-card">
            <h2>{book.title}</h2>
            <p>
              <strong>Author:</strong> {book.author}
            </p>
            <p>
              <strong>ISBN:</strong> {book.isbn}
            </p>
            <p>
              <strong>Publication Date:</strong> {book.publicationDate}
            </p>
            <button onClick={() => onEdit(book)}>Edit</button>
            <button onClick={() => onDelete(book.id)}>Delete</button>
          </div>
        ))
      )}
    </div>
  );
};

export default BookCard;
