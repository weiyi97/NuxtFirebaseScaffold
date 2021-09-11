/*
* Add `middleware: "authentication" in Vue pages that require authentication
* */

export default function ({ store, route, redirect }) {
  if (
    !store.getters["user/isAuthenticated"] && route.name !== "login"
  ) {
    // If not authenticated and route is not login
    redirect("/login");
  }

  if (store.getters["user/isAuthenticated"] && route.name === "login") {
    // if _user is authenticated and route is login
    redirect("/");
  }
}
