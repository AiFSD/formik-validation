import { useFormik } from "formik";
import React, { useState, useEffect } from "react";
import axios from "axios";
import AuthorCard from "../cards/AuthorCard";

const AuthorBoard = () => {
  const [authorData, setAuthorData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingAuthor, setEditingAuthor] = useState(null);

  useEffect(() => {
    fetchAuthors();
  }, []);

  const fetchAuthors = () => {
    setLoading(true);
    axios
      .get("https://66adeb1cb18f3614e3b63854.mockapi.io/authors")
      .then((response) => {
        setAuthorData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching authors:", error);
        setLoading(false);
      });
  };

  const handleEdit = (author) => {
    setEditingAuthor(author);
    formik.setValues(author);
  };

  const handleDelete = (id) => {
    axios
      .delete(`https://66adeb1cb18f3614e3b63854.mockapi.io/Authors/${id}`)
      .then(() => {
        console.log(`Author deleted successfully: ${response.data}`);
        fetchAuthors();
      })
      .catch((error) => {
        console.error("Error deleting book:", error);
      });
  };

  const validate = (values) => {
    const errors = {};
    if (!values.authorname) {
      errors.authorname = "Author name is required";
    }
    if (!values.birthdate) {
      errors.birthdate = "Birthdate is required";
    }
    if (!values.biography) {
      errors.biography = "Biography is required";
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      authorname: "",
      birthdate: "",
      biography: "",
    },
    validate,
    onSubmit: (values, { resetForm }) => {
      if (editingAuthor) {
        axios
          .put(
            `https://66adeb1cb18f3614e3b63854.mockapi.io/authors/${editingAuthor.id}`,
            values
          )
          .then(() => {
            fetchAuthors();
            setEditingAuthor(null);
          })
          .catch((error) => {
            console.error("Error updating author:", error);
          });
      } else {
        axios
          .post("https://66adeb1cb18f3614e3b63854.mockapi.io/authors", values)
          .then(() => {
            fetchAuthors();
          })
          .catch((error) => {
            console.error("Error adding author:", error);
          });
      }
      resetForm();
    },
  });

  return (
    <>
      <div className="container1">
        <div className="main">
          <h1>Welcome to Your Author Management Hub!</h1>
          <div className="description">
            <h4>Discover What You Can Do:</h4>
            <ul>
              <li>
                Craft & Control: Build and manage detailed forms for both books
                and authors with ease.
              </li>
              <li>
                Seamless Additions: Quickly add new books and author profiles to
                keep your library up-to-date.
              </li>
              <li>
                Effortless Edits: Update existing records effortlessly to ensure
                accuracy and relevancy.
              </li>
              <li>
                Smart Clean-Up: Remove outdated or unnecessary entries with just
                a few clicks.
              </li>
              <li>
                Navigate Freely: Use the navigation links to explore and start
                managing your library efficiently.
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="table">
        <div className="authorcard">
          <form onSubmit={formik.handleSubmit}>
            <div className="inputs">
              <div>Name</div>
              <br />
              <input
                type="text"
                id="authorname"
                name="authorname"
                onChange={formik.handleChange}
                value={formik.values.authorname}
              />
              <div className="error-msg">{formik.errors.authorname}</div>
            </div>
            <div className="inputs">
              <div>D.O.B</div>
              <br />
              <input
                type="date"
                id="birthdate"
                name="birthdate"
                onChange={formik.handleChange}
                value={formik.values.birthdate}
              />
              <div className="error-msg">{formik.errors.birthdate}</div>
            </div>
            <div className="inputs">
              <div>Bio</div>
              <br />
              <textarea
                id="biography"
                name="biography"
                placeholder="Write a short biography"
                onChange={formik.handleChange}
                value={formik.values.biography}
              ></textarea>
              <div className="error-msg">{formik.errors.biography}</div>
            </div>
            <button className="btn" type="submit">
              {editingAuthor ? "Update" : "Add"}
            </button>
          </form>
        </div>
      </div>
      <div className="author-list-container">
        <br />
        <br />
        <h1 className="display">Explore the cards here :</h1>

        <AuthorCard
          authors={authorData}
          loading={loading}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </>
  );
};

export default AuthorBoard;
