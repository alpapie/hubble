
class CompletedAllslaslapage extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
<div class="btn-group-vertical" role="group" aria-label="">
    <button type="button" class="btn btn-secondary">First One</button>
    <button type="button" class="btn btn-secondary">Second One</button>
    <div class="btn-group" role="group">
        <button
            id="dropdownId"
            type="button"
            class="btn btn-secondary dropdown-toggle"
            data-bs-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
        >
            More
        </button>
        <div class="dropdown-menu" aria-labelledby="dropdownId">
            <a class="dropdown-item" href="#/">First Dropdown</a>
            <a class="dropdown-item" href="#">Second Dropdown</a>
        </div>
    </div>
</div>
        `;
        
    }
}
customElements.define('hub-completedallslaslapage', CompletedAllslaslapage);
    
class CompletedOnepage extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
<div class="btn-group-vertical" role="group" aria-label="">
    <button type="button" class="btn btn-secondary">First One</button>
    <button type="button" class="btn btn-secondary">Second One</button>
    <div class="btn-group" role="group">
        <button
            id="dropdownId"
            type="button"
            class="btn btn-secondary dropdown-toggle"
            data-bs-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
        >
            More
            sd
        </button>
        <div class="dropdown-menu" aria-labelledby="dropdownId">
            <a class="dropdown-item" href="#/">First Dropdown</a>
            <a class="dropdown-item" href="#/completed">Second Dropdown</a>
        </div>
    </div>
</div>
        `;
        
    }
}
customElements.define('hub-completedonepage', CompletedOnepage);
    
class Completedpage extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
<div class="dropdown open">
    <button
        class="btn btn-secondary dropdown-toggle"
        type="button"
        id="triggerId"
        data-bs-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
    >
        Dropdown Button
    </button>
    <div class="dropdown-menu" aria-labelledby="triggerId">
        <button class="dropdown-item" href="#">Action</button>
        <button class="dropdown-item disabled" href="#">
            Disabled action
        </button>
    </div>
</div>
        `;
        
    }
}
customElements.define('hub-completedpage', Completedpage);
    
class page extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
<style>
    template, div{
        color:red
    }
</style>

<div><h1> alpapie is here</h1></div>
<a href="#/completed">completed</a>
<template
x-data="{
    search: '',
    items: ['foo', 'bar', 'baz'],
}"
>
<div><h1> alpapie is here</h1></div>
    <input placeholder="Search...">
 
    <ul>
        <template x-for="item in items" :key="item">
            <Todo x-props="{item}"/>
        </template>
    </ul>
</template>
        `;
        // import {Todo} from "./todo.huble"


function Getdata(data){
    return data
}
console.log(" je suis la");
    }
}
customElements.define('hub-page', page);
    
class todo extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
<template>
    <li  x-text="props.item"></li>
</template>
        `;
        
    }
}
customElements.define('hub-todo', todo);
    

export default class Router extends HTMLElement {
    constructor() {
        super()

        /** @type {Route[]} */
        this.routes = [
        
                {
                    name: 'hub-completedallslaslapage',
                    hash: '/completed/allslasla',
                    regExp: new RegExp(/^#\/completed\/allslasla$/)
                }
                ,
                {
                    name: 'hub-completedonepage',
                    hash: '/completed/one',
                    regExp: new RegExp(/^#\/completed\/one$/)
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

