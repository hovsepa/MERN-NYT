import React, { Component } from "react";
import DeleteBtn from "../../components/DeleteBtn";
// import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn, StartDate, EndDate } from "../../components/Form";

class Books extends Component {
  state = {
    books: [],
    articles: [],
    title: ""
  };

  componentDidMount() {
    this.loadArticles();
  }

  loadArticles = (res) => {
    // event.preventDefault();
    if (res) {
      // console.log(res.data.response.docs)
      this.setState({ articles: res.data.response.docs, title: "" })
      console.log(this.state.articles)
    }
  }

  saveArticle = (article) => {
    console.log("Title: " + article.title);
    console.log("url: " + article.url);
    API.saveArticle({ title: article.title, url: article.url })
      // then load saved books
      .catch(err => console.log(err));
  }

  // loadArticles = (res) => {
  //   res => this.setState({ articles: res.data.response.docs })

  //   console.log(res);
  //   console.log(this.state.articles)
  // };

  // deleteBook = id => {
  //   API.deleteBook(id)
  //     .then(res => this.loadArticles())
  //     .catch(err => console.log(err));
  // };

  searchForArticles = (query, event) => {
    event.preventDefault();
    if (this.state.title) {
      API.searchArticles(query)
        .then(
        res => this.setState({ articles: res.data.response.docs })
        )
        .catch(err => console.log(err));
    }
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.title) {
      API.searchArticles({
        query: this.state.title
      })
        .then(res => this.loadArticles(res))
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            {/* <Jumbotron> */}
            <h1>Search</h1>
            {/* </Jumbotron> */}

            <form>
              <div className="col-md-6">
                <Input
                  value={this.state.title}
                  onChange={this.handleInputChange}
                  name="title"
                  placeholder="Topic (required)"
                />
              </div>
              <div className="col-md-3">
                <StartDate />
              </div>
              <div className="col-md-3">
                <EndDate />
              </div>
              <div className="col-md-12">
                <FormBtn
                  disabled={!(this.state.title)}
                  onClick={this.handleFormSubmit}>
                  Search Articles
              </FormBtn>
              </div>


              {/* <Input
                value={this.state.author}
                onChange={this.handleInputChange}
                name="author"
                placeholder="Author (required)"
              />
              <TextArea
                value={this.state.synopsis}
                onChange={this.handleInputChange}
                name="synopsis"
                placeholder="Synopsis (Optional)"
              /> */}

            </form>
          </Col>
        </Row>
        <Row>
          <Col size="md-12">
            {/* <Jumbotron> */}
            <h1>Results</h1>
            {/* </Jumbotron> */}
            {this.state.books.length ? (
              <List>
                {this.state.books.map(book => (
                  <ListItem key={book._id}>
                    <Link to={"/books/" + book._id}>
                      <strong>
                        {book.title} by {book.author}
                      </strong>
                    </Link>
                    <DeleteBtn onClick={() => this.saveBook(book._id)} />
                  </ListItem>
                ))}
              </List>
            ) : (
                <h3>No Results to Display</h3>
              )}
          </Col>
        </Row>
        <Row>
          <Col size="md-12">
            {/* <Jumbotron> */}
            <h1>Saved</h1>
            {/* </Jumbotron> */}
            {this.state.books.length ? (
              <List>
                {this.state.books.map(book => (
                  <ListItem key={book._id}>
                    <Link to={"/books/" + book._id}>
                      <strong>
                        {book.title} by {book.author}
                      </strong>
                    </Link>
                    <DeleteBtn onClick={() => this.deleteBook(book._id)} />
                  </ListItem>
                ))}
              </List>
            ) : (
                <h3>No Results to Display</h3>
              )}
          </Col>
        </Row>
        <Row>

        </Row>
      </Container >
    );
  }
}

export default Books;
