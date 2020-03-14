import { machine } from './fsm.js';

const app = {
  stateTitle: null,
  methodList: null,
  init: function() {
    app.stateTitle = document.getElementById('state');
    app.methodList = document.getElementById('methods');
    app.displayStateList();
  },
  displayStateList: function() {
    app.stateTitle.textContent = machine.state;
    document.body.className = machine.state;
    app.methodList.innerHTML = '';
    let list = Object.keys(machine.transitions[machine.state]);
    list.forEach((method, idx) => {
      //if (method !== 'lifecycle') {
      let li = document.createElement('li');
      li.textContent = method;
      //idx is just here as a sample payload
      li.addEventListener(
        'click',
        machine.dispatch.bind(machine, method, app.displayStateList)
      );
      app.methodList.appendChild(li);
      //}
    });
  }
};

document.addEventListener('DOMContentLoaded', app.init);
