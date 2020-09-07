import React, { useState, useEffect } from "react";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";
import axios from "axios";

const center = {
  margin: "auto",
  width: "50%",
  border: "3px",
  padding: "10px",
  paddingTop: "3rem",
};

function Search() {
  // Setting our component's initial state
  const [search, setSearch] = useState([]);
  const [data, setdata] = useState([]);

  // Loads all books and sets them to books
  const handleInputChange = (event) => {
    setSearch(event.target.value);
  };

  function getbook() {
    var query = search;
    axios
      .get(`https://www.googleapis.com/books/v1/volumes?q=${query}`)
      .then((response) => {
        setdata(response.data.items);
      });
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    getbook();
  }

  function saveBook(event) {
    const [filtered] = data.filter(
      (item) => item.id === event.target.dataset.id
    );
    console.log("filtered", filtered.volumeInfo.imageLinks.thumbnail);
    API.saveBook({
      title: filtered.volumeInfo.title,
      authors: filtered.volumeInfo.authors,
      link: filtered.volumeInfo.infoLink,
      description: filtered.volumeInfo.description,
      image: filtered.volumeInfo.imageLinks.thumbnail,
      // googleId: filtered.volumeInfo.id
    });
  }

  return (
    <Container >
      <Row>
        <Col size="md-12 sm-12" className="d-flex justify-content-center">
          <nav className="navbar navbar-light bg-light">
            <form className="form-inline " style={center}>
              <input
                className="form-control mr-sm-2"
                type="search"
                placeholder="Search"
                value={search}
                onChange={handleInputChange}
                name="title"
              />
              <FormBtn
                className="btn btn-outline-success my-2 my-sm-0"
                type="submit"
                onClick={handleFormSubmit}
              >
                Search
              </FormBtn>
            </form>
          </nav>

          {data.length ? (
            <List>
              {data.map((item) => (
                <ListItem key={item._id}>
               
                    <div>
                      <img
                        src={item.volumeInfo.imageLinks.thumbnail}
                        style={{ width: "20%" }}
                      />
                      <h4 style ={{color:"red"}}>Title: {item.volumeInfo.title} </h4>
                      <h4 style ={{color:"blue"}}>Autors: {item.volumeInfo.authors} </h4>
                      <p>{item.volumeInfo.description} </p>
                      <a
                        href={item.volumeInfo.infoLink}
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
                        data-id={item.id}
                        onClick={saveBook}
                        type="button"
                        className="btn btn-success"
                      >
                        Save
                      </button>
                    </div>
                
                </ListItem>
              ))}
            </List>
          ) : (
            <h3 style={center}>No Results to Display</h3>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default Search;
