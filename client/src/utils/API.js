import axios from "axios";

export default {
  // Gets all articles
  getArticles: function() {
    return axios.get("/articles/articles");
  },
  // Deletes article with the given id
  deleteArticle: function(id) {
    return axios.delete("/articles/" + id);
  },
  // Saves article from the database
  saveArticle: function(articleData) {
    console.log(articleData)
    return axios.post("/articles/saved", articleData);
  },
  searchArticles: function(query, start, end) {
    return axios.get("https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=b9f91d369ff59547cd47b931d8cbc56b:0:74623931&q=" + query + "&begin_date=" + start + "&end_date=" + end);
  }
};
