
#### What is the difference between Component and PureComponent? give example where it might break my app.
The major difference between PureComponent and Component is PureComponent does a shallow comparison on state change

    class Parent extends React.Component {
      render() {
        return (
          <Child 
            caption="ImageGallery"
            images={[require('./someImage'), require('./otherImage')]}
          />
        )
      }
    }
    
    class Child extends React.PureComponent {
      render() {
        return (
          <View>
            <Text>{this.props.caption}</Text>
            {this.props.images.map(image => (
              <Image source={image} />
            ))}
          </View>
        )
      }
    }

The images prop passed down from Parent uses an array literal that breaks the PureComponent optimisation because it will always fail the equality check, even though the content of the array is the same.

#### Context + ShouldComponentUpdate might be dangerous. Can think of why is that?
shouldComponentUpdate bypasses the rendering of a part of the component tree. If props or state of a component are not changed in a meaningful way, it will return false from shouldComponentUpdate and descendants that make use of props and/or state won’t be updated.

#### Describe 3 ways to pass information from a component to its PARENT.
1) Using Callback function as a prop to child, call that callback from child.
2) Using Redux
3) Using Context API

#### Give 2 ways to prevent components from re-rendering. 

Convert the component to a class and prevent the re-render in shouldComponentUpdate() returning false.

#### What is a fragment and why do we need it? Give an example where it might break my app.
React Fragments allow you to wrap or group multiple elements without adding an extra node to the DOM.
This can be useful when rendering multiple child elements/components in a single parent component.

#### Give 3 examples of the HOC pattern.
	
	//HOC.js
    import React, {Component} from  'react'; 
    export  default  function Hoc(HocComponent){ 
	    return  class extends Component { 
	    render(){ 
		    return ( <div> <HocComponent></HocComponent> </div> ); 
		    } 
		} 
	}

	//APP.js
    import React, { Component } from  'react'; 
    import Hoc from  './HOC'; 
    class App extends Component { 
	    render() { 
		    return ( <div> Higher-Order Component Tutorial </div> ) 
		  } 
	} 
	App = Hoc(App); 
	export  default App;

#### what's the difference in handling exceptions in promises, callbacks and async...await.

1)In promises handle the exception with .cathc() block.
2)In Async/Await , wrap the await statement inside the try block and handle exception wuth catch block.
3) in  callback, set up the try/catch block within the callback code.

#### How many arguments does setState take and why is it async.

setState takes 2 arguments as (updater, [callback]).

setState does not always immediately update the component. It may batch or defer the update until later. This makes reading this.state right after calling setState a potential pitfall

#### List the steps needed to migrate a Class to Function Component.
1) Change the class to a function
2) Remove the render method
3) Convert all methods to functions
4) Remove references to  _this_
5) Remove constructor
6) Remove event handler bindings
7) Replace this.setState with react hooks
8) useEffect for state update side effects
9) Replace lifecycle methods with hooks

#### List a few ways styles can be used with components.
1) CSS Stylesheet
2) Inline styling
3) CSS Modules (A CSS Module is a CSS file in which all class names and animation names are scoped locally by default)
4) Styled-component (Styled-components is a library for React and React Native that allows you to use component-level styles in your application that are written with a mixture of JavaScript and CSS)

#### How to render an HTML string coming from the server.
dangerouslySetInnerHTML


