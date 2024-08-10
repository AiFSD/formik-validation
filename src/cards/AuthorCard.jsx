

const AuthorCard = ({ authors, loading, onEdit, onDelete }) => {
  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="author-cards">
      {authors.length === 0 ? (
        <p>No authors available.</p>
      ) : (
        authors.map((author) => (
          <div className="author-card" key={author.id}>
            <h3>{author.authorname}</h3>
            <p>
              <strong>D.O.B:</strong> {author.birthdate}
            </p>
            <p>
              <strong>Biography:</strong> {author.biography}
            </p>
            <button onClick={() => onEdit(author)}>Edit</button>
            <button onClick={() => onDelete(author.id)}>Delete</button>
          </div>
        ))
      )}
    </div>
  );
};

export default AuthorCard;
