import React, { Component } from "react";
import { DeleteBtn, SaveBtn } from "../../components/DeleteBtn";
// import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
// import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, FormBtn, StartDate, EndDate } from "../../components/Form";

class Books extends Component {
  state = {
    // books: [],
    articles: [],
    saved: [],
    title: "",
    url: ""
  };

  componentDidMount() {
    this.loadSavedArticles();
    // console.log(this.state.saved);
  }

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.title) {
      API.searchArticles(this.state.title)
        // .then(res => this.loadArticles(res))
        .then(res => this.setState({ articles: res.data.response.docs }))
        .catch(err => console.log(err))
        .then(res => console.log(this.state.articles));   
    }
  };

  loadSavedArticles = () => {
      API.getArticles()
      .then(res => this.setState({ saved: res.data, title: "", url: ""}))
      .catch(err => console.log(err))
      .then(res => console.log(this.state.saved));
  }

  saveArticle = (article) => {
    // console.log("kkjlkjlj")
    console.log(article.headline.main, article.web_url, article.pub_date);

    API.saveArticle({
      title: article.headline.main,
      url: article.web_url,
      date: article.pub_date
    })
    .then(res => console.log(res))
      // then load saved books
    .catch(err => console.log(err))
    .then(this.loadSavedArticles);
  }

  deleteArticle = id => {
    console.log(id);
    API.deleteArticle(id)
      .then(res => this.loadSavedArticles())
      .catch(err => console.log(err));
  };

  searchForArticles = (query, event) => {
    event.preventDefault();
    if (this.state.title) {
      API.searchArticles(this.state.title)
        .then(res => this.setState({ articles: res.data.response.docs }))
        .catch(err => console.log(err));
    }
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
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
          <Col size="md-6">
            {/* <Jumbotron> */}
            <h1>Results</h1>
            {/* </Jumbotron> */}
            {this.state.articles.length ? (
              <List>
                {this.state.articles.map(articles => (
                  <ListItem key={articles._id}>
                    {/* <Link to={articles.web_url}> */}
                    <a href={articles.web_url} target="_new" >
                      <strong>
                        {articles.headline.main}
                      </strong>
                    </a>
                    {/* </Link> */}
                    {/* <SaveBtn onClick={() => {console.log(this);}} /> */}
                    <SaveBtn onClick={() => this.saveArticle(articles)} />
                    <DeleteBtn onClick={() => this.saveArticle(articles)} />
                  </ListItem>
                ))}
              </List>
            ) : (
                <h3>No Results to Display</h3>
              )}
          </Col>
        </Row>
        <Row>
          <Col size="md-6">
            {/* <Jumbotron> */}
            <h1>Saved</h1>
            {/* </Jumbotron> */}
            {this.state.saved.length ? (
              <List>
                {this.state.saved.map(article => (
                  <ListItem key={article._id}>
                    {/* <Link to={"/books/" + article._id}> */}
                    <a href={article.url} target="_new" >
                    <strong>
                      {article.title}
                    </strong>
                  </a>
                    {/* </Link> */}
                    <DeleteBtn onClick={() => this.deleteArticle(article._id)} />
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
