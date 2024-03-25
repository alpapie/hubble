
class Activepage extends HTMLElement {
    constructor() {
        super();
        //this.attachShadow({ mode: 'open' });
        function Getdata(data) {
      return data;
    }
    }
    connectedCallback(){
        this.render()
    }
    render(){
        let content= `
        <section class="todoapp" id="root">
    <header class="header" data-testid="header">
      <h1>todos</h1>
      <div class="input-container">
        <input
          class="new-todo"
          id="todo-input"
          type="text"
          data-testid="text-input"
          placeholder="What needs to be done?"
          value=""
        />
      </div>
    </header>
    <main class="main" data-testid="main">
      <div class="toggle-all-container">
        <input
          class="toggle-all"
          type="checkbox"
          data-testid="toggle-all"
        /><label class="toggle-all-label" for="toggle-all"
          >Toggle All Input</label
        >
      </div>
      <ul class="todo-list" data-testid="todo-list">
          <hub-item>  <hub-item/>
      </ul>
    </main>
    <hub-footer></hub-footer>
  </section>
                `;
        this.innerHTML=content
    }
}
customElements.define('hub-activepage', Activepage);
    
class Completedpage extends HTMLElement {
    constructor() {
        super();
        //this.attachShadow({ mode: 'open' });
        function Getdata(data) {
      return data;
    }
    }
    connectedCallback(){
        this.render()
    }
    render(){
        let content= `
        <section class="todoapp" id="root">
    <header class="header" data-testid="header">
      <h1>todos</h1>
      <div class="input-container">
        <input
          class="new-todo"
          id="todo-input"
          type="text"
          data-testid="text-input"
          placeholder="What needs to be done?"
          value=""
        />
      </div>
    </header>
    <main class="main" data-testid="main">
      <div class="toggle-all-container">
        <input
          class="toggle-all"
          type="checkbox"
          data-testid="toggle-all"
        /><label class="toggle-all-label" for="toggle-all"
          >Toggle All Input</label
        >
      </div>
      <ul class="todo-list" data-testid="todo-list">
        <hub-item>  <hub-item/>
      </ul>
    </main>
    <hub-footer></hub-footer>
  </section>
                `;
        this.innerHTML=content
    }
}
customElements.define('hub-completedpage', Completedpage);
    
class page extends HTMLElement {
    constructor() {
        super();
        //this.attachShadow({ mode: 'open' });
        function Getdata(data) {
    return data;
  }
    }
    connectedCallback(){
        this.render()
    }
    render(){
        let content= `
        <section class="todoapp" id="root">
  <header class="header" data-testid="header">
    <h1>todos</h1>
    <div class="input-container">
      <input
        class="new-todo"
        id="todo-input"
        type="text"
        data-testid="text-input"
        placeholder="What needs to be done?"
        value=""
      />
    </div>
  </header>
  <main class="main" data-testid="main">
    <div class="toggle-all-container">
      <input
        class="toggle-all"
        type="checkbox"
        data-testid="toggle-all"
      /><label class="toggle-all-label" for="toggle-all"
        >Toggle All Input</label
      >
    </div>
    <ul class="todo-list" data-testid="todo-list">
        <hub-item>  <hub-item/>
    </ul>
  </main>
  <hub-footer></hub-footer>
</section>
                `;
        this.innerHTML=content
    }
}
customElements.define('hub-page', page);
    
class footer extends HTMLElement {
    constructor() {
        super();
        //this.attachShadow({ mode: 'open' });
        
    }
    connectedCallback(){
        this.render()
    }
    render(){
        let content= `
        <footer class="footer" data-testid="footer">
    <span class="todo-count">1 item left!</span>
    <ul class="filters" data-testid="footer-navigation">
      <li><a class="selected" href="#/">All</a></li>
      <li><a class="" href="#/active">Active</a></li>
      <li><a class="" href="#/completed">Completed</a></li>
    </ul>
    <button class="clear-completed" disabled="">Clear completed</button>
  </footer>
                `;
        this.innerHTML=content
    }
}
customElements.define('hub-footer', footer);
    
class item extends HTMLElement {
    constructor() {
        super();
        //this.attachShadow({ mode: 'open' });
        
    }
    connectedCallback(){
        this.render()
    }
    render(){
        let content= `
        <li class="" data-testid="todo-item">
  <div class="view">
    <input class="toggle" type="checkbox" data-testid="todo-item-toggle" />
    <label data-testid="todo-item-label">task 1</label>
    <button class="destroy" data-testid="todo-item-button"></button>
  </div>
</li>
                `;
        this.innerHTML=content
    }
}
customElements.define('hub-item', item);
    

export default class Router extends HTMLElement {
    constructor() {
        super()

        /** @type {Route[]} */
        this.routes = [
        
                {
                    name: 'hub-activepage',
                    hash: '/active',
                    regExp: new RegExp(/^#\/active$/)
                }
                ,
                {
                    name: 'hub-completedpage',
                    hash: '/completed',
                    regExp: new RegExp(/^#\/completed$/)
                }
                ,
                {
                    name: 'hub-page',
                    hash: '/',
                    regExp: new RegExp(/^#\/$/)
                }
                
            // 404 Page not found
            ,{
                name: 'Hub-404',
                hash:'#/404',
                regExp: new RegExp(/^#\/404$/)
            },
        ]

        this.previousRoute = this.routes[0]

        /**
         * Listens to hash changes and forwards the new hash to route
         */
        this.hashChangeListener = event => {
            this.previousRoute = this.route(location.hash, false, event.newURL === event.oldURL)
        }
    }

    connectedCallback() {
        self.addEventListener('hashchange', this.hashChangeListener)
        this.previousRoute = this.route(this.routes.some(route => route.regExp.test(location.hash)) ? location.hash : '#/', true)
    }

    disconnectedCallback() {
        self.removeEventListener('hashchange', this.hashChangeListener)
    }

    /**
     * route to the desired hash/domain
     *
     * @param {string} hash
     * @param {boolean} [replace = false]
     * @param {boolean} [isUrlEqual = true]
     * @return {Route}
     */
    route(hash, replace = false, isUrlEqual = true) {
        // escape on route call which is not set by hashchange event and trigger it here, if needed
        if (location.hash !== hash) {
            if (replace) location.replace(hash);
            return this.previousRoute
        }

        let route
        // find the correct route or do nothing
        if ((route = this.routes.find(route => route.regExp.test(hash)))) {
                if (this.shouldComponentRender(route.name, isUrlEqual)) {
                    // document.title = route.title
                    let component= document.createElement(route.name)
                    this.render(component)
                }
        } else {
            console.log("Not Found");
            self.location.hash = '#/404'
        }

        return route ? route : this.previousRoute
    }

    /**
     * evaluates if a render is necessary
     *
     * @param {string} name
     * @param {boolean} [isUrlEqual = true]
     * @return {boolean}
     */
    shouldComponentRender(name, isUrlEqual = true) {
        if (!this.children || !this.children.length) return true
        return !isUrlEqual || this.children[0].tagName !== name.toUpperCase()
    }

    /**
     * renders the page
     *
     * @param {HTMLElement} component
     * @return {void}
     */
    render(component) {
        // clear previous content
        this.innerHTML = ''
        this.appendChild(component)
    }
}
customElements.define('hub-router', Router);

