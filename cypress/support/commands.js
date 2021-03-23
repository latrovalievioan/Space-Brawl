Cypress.Commands.add('pixiClick', {
  prevSubject: true
}, (element) => {
  element.emit('click');
  return element; // return for chaining purposes
});

Cypress.Commands.add('pixiOn', {
  prevSubject: true
}, (element, event, callback) => {
  return new Promise((resolve) => {
    element.on(event, (...args) => {
      if(callback && callback(...args) === true) {
        resolve(element);
      } else if(callback && !callback(...args)) {
        console.warn(`pixiOn: callback is false; args:`, args);
      } else if(!callback) {
        resolve(element);
      }
    });
  });
});

Cypress.Commands.add('pixiOff', {
  prevSubject: true
}, (element, event) => {
  return element.off(event);
});

Cypress.Commands.add('onEvent', {
  prevSubject: true
}, (element, event, callback) => {
  return new Promise((resolve) => {

    element.on(event, (...args) => {
      if(callback && callback(...args) === true) {
        resolve(element);
      } else if(callback && !callback(...args)) {
        console.warn(`onEvent: callback is false; args:`, args);
      } else if(!callback) {
        resolve(element);
      }
    });
  });
});
