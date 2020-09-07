import React, { useState, useEffect } from "react";
import BookList from "../components/BookList";
import { List, ListItem } from "../components/List";
import API from "../utils/API";
import { Col, Row, Container } from "../components/Grid";

function Saved() {
  // Setting our component's initial state
  const [books, setBooks] = useState([]);

  // Load all books and store them with setBooks
  useEffect(() => {
    loadSavedBooks();
  }, []);

  // Loads all books and sets them to books
  function loadSavedBooks() {
    API.getBooks()
      .then((res) => setBooks(res.data))
      .catch((err) => console.log(err));
  }
  console.log("books", books);
  // Deletes a book from the database with a given id, then reloads books from the db
  function deleteBook(id) {
    API.deleteBook(id)
      .then((res) => loadSavedBooks())
      .catch((err) => console.log(err));
  }

  return (
    <Container fluid className="container">
      <Row>
        <Col size="12">
          <List>
            {books.map((item) => (
              <ListItem key={item._id}>
                <div>
                  <img src={item.image} style={{ width: "20%" }} />
                  <h4>Title: {item.title} </h4>
                  <h4>Autors: {item.authors} </h4>
                  <p>{item.description} </p>
                  <a
                    href={item.link}
                    className="button js-button"
                    role="button"
                  >
                    <button
                      style={{ margin: "1rem" }}
                      type="button"
                      className="btn btn-primary"
                    >
                      View
                    </button>
                  </a>
                  <button
                    onClick={() => deleteBook(item._id)}
                    type="button"
                    className="btn btn-success"
                  >
                    Delete
                  </button>
                 
                </div>
              </ListItem>
            ))}
          </List>
        </Col>
      </Row>
    </Container>
  );
}

export default Saved;
