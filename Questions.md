### 1. What is the difference between Component and PureComponent? give an example where it might break my app.
  - difference between React pure component and a React component is that a React component doesn’t implement shouldComponentUpdate() by default.
  - On the other hand, React pure component does implement shouldComponentUpdate() by default, and by performing a shallow comparison on React state and props values.
  - When props or state changes, PureComponent will do a shallow comparison on both props and state.

  #### Example of React regular component:- 
  
        class MyClass extends React.Component {
            shouldComponentUpdate(){
              return false;
            }
            render() {
              return <hi>Hi there, this is a Regular component</h1>
            }
        }

 #### Example of React pure component:-
  
     class MyClass extends React.PureComponent {
        render() {
          return <hi>Hi there, this is a Pure component</h1>
        }
    }

### 2. Context + ShouldComponentUpdate might be dangerous. Can think of why is that?

  - Context is used to communicate with deeply contained components or nested components. For example, a root component defines a theme, and any component in the component tree might (or might not) be interested in this information.

  - shouldComponentUpdate on the other hand short circuits the re-rendering of a part of the component tree (including children), for example if the props or state of a component are not modified in a meaningful way. As far as the component can tell.

  - shouldComponentUpdate returning false causes any context update to be no longer propagated to child components

### 3. Describe 3 ways to pass information from a component to its PARENT.
  - by the callback function.
      - for passing data using callback we need to first create a callback function in parents component. This callback function will  retrieve the data from the child component.
      - then Pass that callback function to the child as a props.
      - The child component calls the parent callback function using props and passes the data to the parent component.
  - by using redux.
    - Use a global store maintaining the states of all components which are needed to interact and consume the data required from the store. then set data in global store and use that data in parent component
  - by using Context API.

### 4. Give 2 ways to prevent components from re-rendering.
  - by React.memo()
    - useMemo allows you to memoize expensive functions so that you can avoid calling them on every render.
    - You simple pass in a function and an array of inputs and useMemo will only recompute the memoized value when one of the inputs has changed
  - by creating pure component.
    - you can return shouldComponentUpdate as a false so it prevent to re-render component on change of state and props 

### 5. What is a fragment and why do we need it? Give an example where it might break my app.
  - React Fragments allow you to wrap multiple elements without adding an extra DOM element.
  - example:- 
      
        const FragmentComponent = () => {
            return (
              <React.Fragment>
                <h1>Hello World!</h1>
                <h2>Example of fragment component</h2>
              </React.Fragment>
            )
          }
  - sort syntax for react fragment.
         
        const FragmentComponent = () => {
            return (
              <>
                <h1>Hello World!</h1>
                <h2>Example of fragment component</h2>
              </>
            )
          }

### 6. Give 3 examples of the HOC pattern.
  - React’s compositional nature with top-down data flow naturally supports a design pattern known as the Decorator. The decorator pattern is a function that takes in a component and returns a new one, decorating it with extra props. This pattern is excellent for centralizing logic for reuse. Consequently, container components are generally HOCs.
  - Redux :- connect() function, that creates a new component that wraps around your existing one. generally the preferred way of extending a component's functionality in React

### 7. what's the difference in handling exceptions in promises, callbacks and async...await.
  - In Promises :-  For a successfully resolved promise, we use .then() method and for rejected promise, we use .catch() method. To run a code after the promise has been handled using .then() or .catch() method, we can .finally() method. The code inside .finally() method runs once regardless of the state of the promise.

  - Exceptions handling is done using .then() and .catch() methods in Promises.

  - In async await :-  For a successfully resolved promise, we use try and for rejected promise, we use catch. To run a code after the promise has been handled using try or catch, we can .finally() method. The code inside .finally() method runs once regardless of the state of the promise.

  - Exceptions handling is done using .try() and .catch() methods in async await.

  - In Callback :- 
    - The first argument in the function is reserved for the error object. If any error has occurred during the execution of the function, it will be returned by the first argument.
    - The second argument of the callback function is reserved for any successful data returned by the function. If no error occurred then the error object will be set to null.

### 8. How many arguments does setState take and why is it async.
  - setState take a two arguments
    1. object :- The object passed would have keys corresponding to the keys in the component state, then setState() updates or sets the state by merging the object to the state. and some times it would be a function also.
    2. callBack function :- The second argument that can optionally be passed to setState is a callback function which gets called immediately after the setState is completed and the components get re-rendered.
  
  - why is it async ?
    - ReactJs sets its state asynchronously because it can result in an expensive operation. Making it synchronous might leave the browser unresponsive. Asynchronous setState calls are batched to provide a better user experience and performance.
    - React does not guarantee that the state changes are applied immediately.
    - setState() does not always immediately update the component.
    - Think of setState() as a request rather than an immediate command to update the component. 

### 9. List the steps needed to migrate a Class to Function Component.
    1. Change the class keyword to function and remove the extends React.Component part if you used.
    2. Remove the render method, but keep everything after & including the return. Make this the last statement in your function.
    3. Class methods won't work inside a function, so lets convert them all to functions.
    4. The this variable in your function isn't useful. Remove the references to it throughout your render and functions.
    5. Remove constructor.
      - Replace this.state with useState hooks
      - Remove event handler bindings.
    6. Replace this.setState with each of our setState calls with the relevant state variable
    7. Replace lifecycle methods with corresponding hooks.

### 10. List a few ways styles can be used with components.
    1. Inline CSS :- inline style specified with an object whose key is the camelCased version of the style name, and whose value is the style’s value, usually a string
    2. external CSS :- create an external CSS file for each component and do the required styling of classes. and use those class names inside the component
    3. Creating Style Objects:- create an object containing styling for each component and then interpolate the style object to the html elements
      ex:- import React from 'react';
            var stylingObject = {
              div: {
                color: "red",
                border: "1px solid red"
              }, input: {
                margin: "2px",
                padding: "5px"
              }
            }
            function App() {
              return (
                  <div style={stylingObject.div}>
                    <input style={stylingObject.input} type="text" />
                  </div>
              );
            }
          export default App;

    4. Styled Components :- Styled-components is a library for React that allows you to use component-level styles in your application that are written with a mixture of JavaScript and CSS. The styled-components allows us to style the CSS under the variable created in JavaScript

### 11. How to render an HTML string coming from the server.
- by dangerouslySetInnerHTML

        <div dangerouslySetInnerHTML={{__html: '<h1>Example</h1>'}} />
- by using external npm packages or library.