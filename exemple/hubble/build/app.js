
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
    