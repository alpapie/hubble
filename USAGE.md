**Usage Guide: Hubble Framework**

---

**1. Getting Started**

To get started with the Hubble Framework, follow these simple steps:

1. Install Node.js and npm (Node Package Manager) if you haven't already.
2. Create a new directory for your Hubble project.
3. Inside your project directory, run `npm init -y` to initialize a new npm project.
4. Install the Hubble Framework package by running `npm install hubble-framework`.
5. Create your first Hubble component file with the `.hubble` extension.

Now you're ready to start building dynamic web applications with Hubble!

---

**2. Creating a Component: Basic Structure**

A basic Hubble component consists of HTML markup with Hubble directives. Here's an example of a simple Hubble component:

```html
<!-- my-component.hubble -->
<div x-data="{ message: 'Hello, Hubble!' }">
  <p x-text="message"></p>
</div>
```

In this example:
- The `x-data` directive initializes the component's data with an object containing a `message` property.
- The `x-text` directive binds the text content of the `<p>` element to the `message` property.

---

**3. Directives Usage Sample**

Hubble directives provide powerful functionality for creating dynamic web applications. Here's how you can use some of the key directives:

- **x-bind**: Bind HTML attributes or properties to component data.
  ```html
  <button x-bind:disabled="isDisabled">Click me</button>
  ```

- **x-on:event**: Listen for events and execute JavaScript code.
  ```html
  <button x-on:click="handleClick">Click me</button>
  ```

- **x-if**: Conditionally render an element based on a boolean expression.
  ```html
  <div x-if="isVisible">Visible content</div>
  ```

- **x-for**: Iterate over a collection and generate multiple elements.
  ```html
  <ul>
    <li x-for="item in items" x-text="item"></li>
  </ul>
  ```

- **x-model**: Bind an input element's value to component data.
  ```html
  <input type="text" x-model="username">
  ```

---

**4. Routing Functionality**

The Hubble Framework provides built-in support for hash-based routing. To define routes, create Hubble components in the `pages` directory. The folder structure within the `pages` directory determines the route hierarchy.

For example, the following folder structure:

```
src
└── pages
    ├── home.hubble
    └── about
        └── index.hubble
```

Will result in the following routes:
- `/home`
- `/about`

To navigate between routes, you can use anchor tags with the `href` attribute set to the desired route path.

---

**5. Conclusion**

By following this usage guide, you should now have a good understanding of how to get started with the Hubble Framework, create components, utilize directives, and implement routing functionality. For more detailed documentation and examples, refer to the official Hubble Framework documentation and explore the provided sample projects. Happy coding with Hubble!