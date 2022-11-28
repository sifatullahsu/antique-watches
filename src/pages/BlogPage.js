import React from 'react';
import Heading from '../components/Heading';

const BlogPage = () => {
  return (
    <main id='content'>
      <div className="container">
        <Heading
          title="Our Blogs"
        ></Heading>
        <div className="grid grid-cols-1 gap-20">
          <div>
            <h3 className='mb-5'>What are the different ways to manage a state in a React application?</h3>
            <p>Local state is perhaps the easiest kind of state to manage in React, considering there are so many tools built into the core React library for managing it. useState is the first tool you should reach for to manage state in your component. It can take accept any valid data value, including primitive and object values. Additionally, its setter function can be passed down to other components as a callback function (without needing optimizations like useCallback). useReducer is another option that can be used for either local or global state. It is similar in many ways to useState under the hood, although instead of just an initial state it accepts a reducer.</p>
          </div>
          <div>
            <h3 className='mb-5'>How does prototypical inheritance work?</h3>
            <p> The Prototypal Inheritance is a feature in javascript used to add methods and properties in objects. It is a method by which an object can inherit the properties and methods of another object. Traditionally, in order to get and set the [[Prototype]] of an object, we use Object.getPrototypeOf and Object. In JavaScript, objects have a special hidden property [[Prototype]] (as named in the specification), that is either null or references another object. That object is called “a prototype”. When we read a property from object, and it’s missing, JavaScript automatically takes it from the prototype. In programming, this is called “prototypal inheritance”. And soon we’ll study many examples of such inheritance, as well as cooler language features built upon it.</p>
          </div>
          <div>
            <h3 className='mb-5'>What is a unit test? Why should we write unit tests?</h3>
            <p>Unit Testing is a type of software testing where individual units or components of a software are tested. The purpose is to validate that each unit of the software code performs as expected. Unit Testing is done during the development (coding phase) of an application by the developers. Unit Tests isolate a section of code and verify its correctness. A unit may be an individual function, method, procedure, module, or object. Unit tests save time and money. Usually, we tend to test the happy path more than the unhappy path. If you release such an app without thorough testing, you would have to keep fixing issues raised by your potential users. The time to fix these issues could've been used to build new features or optimize the existing system. Bear in mind that fixing bugs without running tests could also introduce new bugs into the system. Well-written unit tests act as documentation for your code. Any developer can quickly look at your tests and know the purpose of your functions.</p>
          </div>
          <div>
            <h3 className='mb-5'>React vs. Angular vs. Vue?</h3>
            <div>
              <span className='font-semibold'>Angular</span>
              <p>AngularJS was developed in 2009 by Google. The first version was Angular.JS. Angular is currently known as a JavaScript framework. Obviously, all significant Google projects have been developed with Angular. Allows MVC architecture. Good maintainability. Web applications built with Angular perform very well. Projects may now be developed, expanded, and generated more quickly thanks to technologies like the Angular-CLI command-line tool. Angular provides a basic framework for developing web applications and manages them without additional libraries. Easy unit and end-to-end testing. Reloads the complete HTML tags tree structure. Slow loading time due to the Ionic app. Because of the given framework, Angular is relatively stiff and inflexible. To work with Angular.js, you need a certain training period. If a user has deactivated JavaScript in the browser, using a JavaScript-based SPA is not possible.</p>
            </div>
            <div>
              <span className='font-semibold'>React</span>
              <p>Facebook released React.js in March 2013 as a JavaScript library. Because React just provides one view, it is not appropriate for building an MVC architecture: you must solve the model and controller yourself. Besides this, there are only advantages and lots of advantages. One of the biggest of them is that React.js uses a virtual DOM that only compares the previous HTML code differences and only loads the different parts. This significantly impacts the loading times. In a positive way, of course. With React.js, you handle the markup and the logic in the same file, which means you can output variables in a view component (JSX). React offers a type of mobile solution for applications called React-Native.</p>
            </div>
            <div>
              <span className='font-semibold'>Vue</span>
              <p>Vue.js is a JavaScript-based progressive framework for creating single-page applications. It was created with scalability and incrementality in mind, as well as ease of integration with other view layer frameworks. Vue is built from the bottom up to be progressively adaptable, unlike other monolithic frameworks. The core library focuses solely on the view layer, and it's simple to use and connect with other libraries or applications. This framework's fast learning angle is almost a trademark. It's a flexible framework that may be used as a library or a full-fledged framework for developing large web applications. Vue.js combines the useful principles of the Angular and React frameworks and presents them in a minimalistic modern style. Web developers use Vue.js to create frontend user interfaces for web-based and hybrid mobile applications.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default BlogPage;