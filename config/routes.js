module.exports.routes = {
  "/": { view: "pages/homepage" },
  "GET /articles": { action: "articles/list" },
  "GET /articles/list": { action: "articles/list" },
  "POST /articles/add": { action: "articles/add" },
  "GET /articles/edit/:id": { action: "articles/edit" },
  "DELETE /articles/delete/:id": { action: "articles/delete" },
  "POST /articles/update/:id": { action: "articles/update" },
  "GET /pages/login": { view: "pages/login" },
  "POST /users/login": { action: "users/login" },
  "POST /users/signup": { action: "users/signup" },
  "POST /users/welcome": { action: "users/welcome" },
  "GET /users/signup-from": { view: "pages/signUp" },
};
