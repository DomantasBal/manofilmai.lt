// ################### Router.js ###################

class Router {
  getRoute() {
    const path = window.location.pathname;
    console.log('DEBUG ROUTE:', path);
    return path;
  }
}

export default Router;
