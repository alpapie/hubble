**Hubble Framework Specification Document**

---

**1. Introduction**

The Hubble Framework is a modern web framework inspired by the association of Alpine.js and WebComponents. It allows developers to build dynamic web applications using a combination of Hubble directives and native web components. This specification document outlines the key features, architecture, and usage guidelines for the Hubble Framework.

---

**2. Key Features**

- Lightweight and efficient: Hubble leverages the power of native web components and minimalistic syntax to ensure optimal performance.
- Declarative syntax: Developers can use intuitive Hubble directives to define dynamic behavior and data binding in their applications.
- Component-based architecture: Hubble encourages the creation of reusable components, making it easy to build complex UIs.
- Hash-based routing: Hubble provides built-in support for hash-based routing, allowing developers to create single-page applications with ease.
- File-based routing: Hubble automatically generates routing based on the folder tree structure, simplifying project organization.

---

**3. Project Structure**

A typical Hubble project follows a specific folder structure:

```
├── build
│   ├── css
│   ├── images
│   ├── js
│   ├── app.js
│   └── index.html
├── src
│   ├── static
│   │   ├── css
│   │   ├── images
│   │   ├── js
│   ├── pages
│   │   ├── blog
│   │   │   ├── index.hubble
│   │   │   ├── [slug].hubble
│   │   │   └── add-post.js
│   │   └── index.hubble
│   └── widgets
│       ├── header.hubble
│       ├── footer.hubble
│       ├── post-card.hubble
│       └── post-list.hubble
├── index.html
└── package.json
```

- **build**: Contains the compiled JavaScript code (`app.js`) and the generated `index.html` file.
- **src**: Contains the source code for the Hubble application.
  - **pages**: Contains Hubble components for different pages in the application.
  - **widgets**: Contains reusable Hubble components used across multiple pages.
- **index.html**: Entry point for the Hubble application.
- **package.json**: Configuration file with build and dev commands.

---

**4. Hubble Directives**

Hubble directives are special attributes added to HTML elements to define dynamic behavior and data binding. The following directives are supported in Hubble:

- **x-data**: Initializes the component's data and state.
- **x-bind**: Binds HTML attributes or properties to component data.
- **x-on:event**: Listens for events and executes JavaScript code.
- **x-text**: Sets the text content of an element.
- **x-if**: Conditionally renders an element based on a boolean expression.
- **x-else**: Renders an alternate content if the condition is not met.
- **x-for**: Iterates over a collection and generates multiple elements.
- **x-model**: Binds an input element's value to component data.
- **x-props**: Passes properties to child components.

---

**5. File Parsing and Code Transformation**

The Hubble Framework includes a file parsing module and a code transformation module to convert Hubble components into JavaScript code. These modules perform the following tasks:

- **File Parsing Module**:
  - Detects changes in `.hubble` files using a file watcher.
  - Reads and extracts the content of `.hubble` files.
  - Generates routing from the `pages` folder tree.

- **Code Transformation Module**:
  - Defines the structure of the generated JavaScript code for Hubble components.
  - Ensures compatibility with various Hubble syntax variations and edge cases.

---

**7. Documentation**

Comprehensive documentation is provided to help developers understand and use the Hubble Framework effectively. The documentation includes:

- Setup instructions and project structure overview.
- Explanation of Hubble directives and syntax.
- Usage examples and best practices.
- Troubleshooting tips and common pitfalls.

---

**8. Conclusion**

The Hubble Framework offers a modern and efficient solution for building dynamic web applications. With its lightweight syntax, component-based architecture, and built-in routing, developers can create robust and scalable applications with ease. By following the specifications outlined in this document, developers can leverage the full potential of the Hubble Framework to create compelling web experiences.

---

# ANNEXE (IMPROVEMENT)

1. **Function Call in Event Listeners**:
   - Allow function calls directly in event listeners for cleaner and more maintainable code.

2. **x-props Directive**:
   - Implement the `x-props` directive to pass variables and properties to child components, enhancing component reusability and flexibility.

3. **Conditional Directives**:
   - Enable the chaining of `x-else` with `x-if` to create more complex conditional rendering logic within components.

4. **Scoped Styles**:
   - Implement support for scoped styles within Hubble components to prevent style leakage and improve encapsulation.

5. **Global State Management**:
   - Introduce a global state management solution (e.g., Vuex or Redux) to manage shared state across components more efficiently.

6. **Async Data Loading**:
   - Provide support for asynchronous data loading in components to fetch data from external sources (e.g., APIs) and update the UI accordingly.

7. **Component Lifecycle Hooks**:
   - Implement lifecycle hooks (e.g., `created`, `mounted`, `updated`, `destroyed`) to allow developers to execute custom logic at different stages of a component's lifecycle.

8. **Custom Directives**:
   - Allow developers to define custom directives to extend the functionality of Hubble and implement specific behavior tailored to their applications.

9. **Error Handling**:
    - Enhance error handling mechanisms to provide more informative error messages and debugging tools for developers.

