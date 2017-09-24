import axios from "axios";

export default {
  // Gets all books
  getArticles: function() {
    return axios.get("/articles");
  },
  // Gets the book with the given id
  // getArticles: function(id) {
  //   return axios.get("/api/articles/" + id);
  // },
  // Deletes the book with the given id
  deleteArticle: function(id) {
    return axios.delete("/articles/" + id);
  },
  // Saves a book to the database
  saveArticle: function(articleData) {
    console.log(articleData)
    return axios.post("/articles/saved", articleData);
  },
  searchArticles: function(query) {
    return axios.get("https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=b9f91d369ff59547cd47b931d8cbc56b:0:74623931&q=" + query);
  }
};
