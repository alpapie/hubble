// @ts-check

/** @typedef {{
 *      name: string,
 *      path: string,
 *      title: string,
 *      regExp: RegExp,
 *      component?: HTMLElement
 *    }} Route
 */

/**
 * As a controller, this component becomes a router
 *
 * @export
 * @class Router
 */
export default class Router {
  constructor() {
    /** @type {Route[]} */
    this.routes = [];

    this.previousRoute = null;

    this.hashChangeListener = this.hashChangeListener.bind(this);
  }

  /**
   * Initialize the router with provided routes and start listening to hash changes
   *
   * @param {Route[]} routes
   * @memberof Router
   */
  init(routes) {
    this.routes = routes;
    window.addEventListener('hashchange', this.hashChangeListener);
    this.route(location.hash, true);
  }

  /**
   * Cleanup when router is no longer needed
   *
   * @memberof Router
   */
  destroy() {
    window.removeEventListener('hashchange', this.hashChangeListener);
  }

  /**
   * Listens to hash changes and forwards the new hash to route
   *
   * @param {HashChangeEvent} event
   * @memberof Router
   */
  hashChangeListener(event) {
    this.route(location.hash);
  }

  /**
   * Route to the desired hash/domain
   *
   * @param {string} hash
   * @param {boolean} [replace = false]
   * @return {Route}
   * @memberof Router
   */
  route(hash, replace = false) {
    // Escape if the hash is already routed
    if (this.previousRoute && this.previousRoute.regExp.test(hash)) {
      return this.previousRoute;
    }

    let route = this.routes.find(route => route.regExp.test(hash));

    if (!route) {
      console.log("Not Found");
      window.location.hash = '#/404';
      return this.previousRoute;
    }

    this.previousRoute = route;

    // Reuse route.component, if already set, otherwise import and define custom element
    (route.component ? Promise.resolve(route.component) : import(route.path).then(module => {
      if (!customElements.get(route.name)) {
        customElements.define(route.name, module.default);
      }
      return (route.component = document.createElement(route.name));
    })).then(component => {
      if (this.shouldComponentRender(route.name)) {
        document.title = route.title;
        this.render(component);
      }
    }).catch(error => console.warn('Router did not find:', route) || error);

    return route as Route;
  }

  /**
   * Evaluates if a render is necessary
   *
   * @param {string} name
   * @return {boolean}
   * @memberof Router
   */
  shouldComponentRender(name) {
    return !this.previousRoute || !this.previousRoute.component || this.previousRoute.component.tagName !== name.toUpperCase();
  }

  /**
   * Renders the page
   *
   * @param {HTMLElement} component
   * @memberof Router
   */
  render(component) {
    // Clear previous content
    document.body.innerHTML = '';
    document.body.appendChild(component);
  }
}
