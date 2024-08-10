import { useFormik } from "formik";
import React, { useState, useEffect } from "react";
import axios from "axios";
import BookCard from "../cards/BookCard"; 

const BookBoard = () => {
  const [bookData, setBookData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingBook, setEditingBook] = useState(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = () => {
    setLoading(true);
    axios
      .get("https://66adeb1cb18f3614e3b63854.mockapi.io/Books") 
      .then((response) => {
        setBookData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching books:", error);
        setLoading(false);
      });
  };

  const handleEdit = (book) => {
    setEditingBook(book);
    formik.setValues(book);
  };

  const handleDelete = (id) => {
    axios
      .delete(`https://66adeb1cb18f3614e3b63854.mockapi.io/Books/${id}`) 
      .then(() => {
        fetchBooks();
      })
      .catch((error) => {
        console.error("Error deleting book:", error);
      });
  };

const validate = (values) => {
  const errors = {};

  if (!values.title) {
    errors.title = "Book title is required";
  }
  if (!values.author) {
    errors.author = "Author name is required";
  }
  if (!values.isbn) {
    errors.isbn = "ISBN number is required";
  } else if (!/^\d+$/.test(values.isbn)) {
    errors.isbn = "ISBN number must be numeric";
  }
  if (!values.publicationDate) {
    errors.publicationDate = "Publication date is required";
  }

  return errors;
};


  const formik = useFormik({
    initialValues: {
      title: "",
      author: "",
      isbn: "",
      publicationDate: "",
    },
    validate,
    onSubmit: (values, { resetForm }) => {
      if (editingBook) {
        axios
          .put(
            `https://66adeb1cb18f3614e3b63854.mockapi.io/Books/${editingBook.id}`,
            values
          ) 
          .then(() => {
            fetchBooks();
            setEditingBook(null);
          })
          .catch((error) => {
            console.error("Error updating book:", error);
          });
      } else {
        axios
          .post("https://66adeb1cb18f3614e3b63854.mockapi.io/Books", values)
          .then(() => {
            fetchBooks();
          })
          .catch((error) => {
            console.error("Error adding book:", error);
          });
      }
      resetForm();
    },
  });

  return (
    <>
      <div className="container1">
        <div className="main">
          <h1>Welcome to the Books Management Dashboard!</h1>
          <div className="description">
            <h4>Here’s How You Can Manage Your Collection:</h4>
            <ul>
              <li>
                Design & Organize: Create and customize forms to manage your
                book entries seamlessly.
              </li>
              <li>
                Effortless Additions: Quickly add new books to enrich your
                library with fresh titles.
              </li>
              <li>
                Update with Ease: Modify existing book records effortlessly to
                keep your collection accurate.
              </li>
              <li>
                Smart Deletions: Remove outdated or duplicate entries with a
                simple click.
              </li>
              <li>
                Navigate Smoothly: Use the navigation links to jumpstart your
                book management tasks.
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="bookcard">
        <form onSubmit={formik.handleSubmit}>
          <div className="input">
            <label>Book Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Book Title"
              onChange={formik.handleChange}
              value={formik.values.title}
            />
            <div className="error-msg">{formik.errors.title}</div>
          </div>
          <div className="input">
            <label>Author Name:</label>
            <input
              type="text"
              id="author"
              name="author"
              placeholder="Author Name"
              onChange={formik.handleChange}
              value={formik.values.author}
            />
            <div className="error-msg">{formik.errors.author}</div>
          </div>
          <div className="input">
            <label>ISBN Number:</label>
            <input
              type="text"
              id="isbn"
              name="isbn"
              placeholder="ISBN Number"
              onChange={formik.handleChange}
              value={formik.values.isbn}
            />
            <div className="error-msg">{formik.errors.isbn}</div>
          </div>
          <div className="input">
            <label>Publication Date:</label>
            <input
              type="date"
              id="publicationDate"
              name="publicationDate"
              onChange={formik.handleChange}
              value={formik.values.publicationDate}
            />
            <div className="error-msg">{formik.errors.publicationDate}</div>
          </div>
          <button type="submit">{editingBook ? "Update" : "Add"}</button>
        </form>
      </div>
      <div className="book-list-container">
        <br />
        <br />
        <h1 className="display">Explore the cards here :</h1>
        <BookCard
          books={bookData}
          loading={loading}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </>
  );
};

export default BookBoard;
