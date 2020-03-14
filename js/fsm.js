export const machine = {
  dispatch(actionName, ...payload) {
    const actions = this.transitions[this.state];
    const action = actions?.[actionName];
    //A good place to apply optional chaining
    if (action) {
      console.log(actionName, payload);
      action.apply(machine, payload);
    }
  },

  changeStateTo(newState) {
    //for all transitions
    this.lifecycle['onBeforeTransition'](this.state, newState);
    //check for an onLeave event
    if (this.lifecycle.transitions[this.state].onLeave) {
      this.lifecycle.transitions[this.state].onLeave.call(this);
    }
    //change the state
    let oldState = this.state;
    this.state = newState;
    //check for an onEnter event
    if (this.lifecycle.transitions[newState].onEnter) {
      this.lifecycle.transitions[newState].onEnter.call(this);
    }
    //for all transitions
    this.lifecycle['onAfterTransition'](oldState, newState);
    //this would be longer if state was an object instead of just a string
  },

  //LIFECYCLE methods
  lifecycle: {
    onBeforeTransition(oldState, newState) {
      //do something before every transition
      console.log(`About to go from ${oldState} to ${newState}`);
    },
    onAfterTransition(oldState, newState) {
      //do something after every transition
      console.log(`Just went from ${oldState} to ${newState}`);
    },
    transitions: {
      ONE: {
        onEnter: function() {
          //example lifecycle method
          console.log('state ONE onEnter');
        },
        onLeave: function() {
          //example lifecycle method
          console.log('state ONE onLeave');
        }
      },
      TWO: {
        onLeave: function() {
          console.log('state TWO leave');
        }
        //no onEnter for this state
      },
      THREE: {
        onEnter: function() {
          //example lifecycle method
          console.log('state THREE onEnter');
        },
        onLeave: function() {
          //example lifecycle method
          console.log('state THREE onLeave');
        }
      },
      FOUR: {
        //no onEnter or onLeave for this state
      }
    }
  },

  state: 'ONE',
  //this is the initial state

  transitions: {
    ONE: {
      doAThing: function(...payload) {
        console.log('ONE', payload);
        this.changeStateTo('TWO');
        if (typeof payload[0] === 'function') {
          payload[0].call(this);
        }
      }
    },
    TWO: {
      undoAThing: function(...payload) {
        this.changeStateTo('ONE');
        if (typeof payload[0] === 'function') {
          payload[0].call(this);
        }
      },
      startSomething: function(...payload) {
        this.changeStateTo('THREE');
        if (typeof payload[0] === 'function') {
          payload[0].call(this);
        }
      }
    },
    THREE: {
      finishSomething: function(...payload) {
        this.changeStateTo('FOUR');
        if (typeof payload[0] === 'function') {
          payload[0].call(this);
        }
      },
      startOver: function(...payload) {
        this.changeStateTo('ONE');
        if (typeof payload[0] === 'function') {
          payload[0].call(this);
        }
      }
    },
    FOUR: {
      startOver: function(...payload) {
        this.changeStateTo('ONE');
        if (typeof payload[0] === 'function') {
          payload[0].call(this);
        }
      },
      waitForAWhile: function(...payload) {
        this.changeStateTo('FOUR');
        console.log('in state FOUR. Staying in state FOUR.');
        if (typeof payload[0] === 'function') {
          payload[0].call(this);
        }
      }
    }
  }
};
