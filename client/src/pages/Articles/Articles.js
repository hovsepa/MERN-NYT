import React, { Component } from "react";
import { DeleteBtn, SaveBtn } from "../../components/DeleteBtn";
// import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
// import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, FormBtn, StartDate, EndDate } from "../../components/Form";

class Articles extends Component {
  state = {
    articles: [],
    saved: [],
    title: "",
    url: "",
    start: "",
    end: ""
  };

  componentDidMount() {
    this.loadSavedArticles();
  }

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.title) {
      API.searchArticles(this.state.title, (this.state.start).split("-").join(""), (this.state.end).split("-").join(""))
        .then(res => this.setState({ articles: res.data.response.docs }))
        .catch(err => console.log(err))
        .then(res => console.log(this.state.articles));
    }
  };

  loadSavedArticles = () => {
    API.getArticles()
      .then(res => this.setState({ saved: res.data, title: "", url: "" }))
      .catch(err => console.log(err))
      .then(res => console.log(this.state.saved));
  }

  saveArticle = (article) => {
    console.log(article.headline.main, article.web_url, article.pub_date);
    // disabled={!(this.state.title) || !(this.state.start) || !(this.state.end)}
    API.saveArticle({
      title: article.headline.main,
      url: article.web_url,
      date: article.pub_date
    })
      .then(res => console.log(res))
      .catch(err => console.log(err))
      .then(this.loadSavedArticles);
  }

  deleteArticle = id => {
    console.log(id);
    API.deleteArticle(id)
      .then(res => this.loadSavedArticles())
      .catch(err => console.log(err));
  };

  // searchForArticles = (query, start, end, event) => {
  //   event.preventDefault();
  //   if (this.state.title) {
  //     console.log(this.state.title, this.state.start, this.state.end);
  //     API.searchArticles(this.state.title, this.state.start, this.state.end)
  //       .then(res => this.setState({ articles: res.data.response.docs }))
  //       .catch(err => console.log(err));
  //   }
  // };

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
            <h1>Search</h1>
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
                <StartDate
                  value={this.state.start}
                  onChange={this.handleInputChange}
                  name="start" />
              </div>
              <div className="col-md-3">
                <EndDate
                  value={this.state.end}
                  onChange={this.handleInputChange}
                  name="end" />
              </div>
              <div className="col-md-12">
                <FormBtn
                  disabled={!(this.state.title) || !(this.state.start) || !(this.state.end)}
                  onClick={this.handleFormSubmit}>
                  Search Articles
              </FormBtn>
              </div>
            </form>
          </Col>
        </Row>
        <Row>
          <Col size="md-12">
            <h1>Results</h1>
            {this.state.articles.length ? (
              <List>
                {this.state.articles.map(articles => (
                  <ListItem key={articles._id}>
                    <a href={articles.web_url} target="_new" >
                      <strong>
                        {articles.headline.main}
                      </strong>
                    </a>
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
          <Col size="md-12">
            <h1>Saved</h1>
            {this.state.saved.length ? (
              <List>
                {this.state.saved.map(article => (
                  <ListItem key={article._id}>
                    <a href={article.url} target="_new" >
                      <strong>
                        {article.title}
                      </strong>
                    </a>
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

export default Articles;
