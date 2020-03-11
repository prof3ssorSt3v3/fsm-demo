export const machine = {
  dispatch(actionName, ...payload) {
    const actions = this.transitions[this.state];
    const action = this.transitions[this.state][actionName];
    //could be a place to apply optional chaining
    if (action) {
      action.apply(machine, ...payload);
    }
  },

  changeStateTo(newState) {
    //for all transitions
    this.onBeforeTransition(this.state, newState);
    //check for an onLeave event
    if (this.transitions[this.state].lifecycle.onLeave) {
      this.transitions[this.state].lifecycle.onLeave.call(this);
    }
    //change the state
    let oldState = this.state;
    this.state = newState;
    //check for an onEnter event
    if (this.transitions[newState].lifecycle.onEnter) {
      this.transitions[newState].lifecycle.onEnter.call(this);
    }
    //for all transitions
    this.onAfterTransition(oldState, newState);
    //this would be longer if state was an object instead of just a string
  },

  //LIFECYCLE methods
  onBeforeTransition(oldState, newState) {
    //do something before every transition
    console.log(`About to go from ${oldState} to ${newState}`);
  },
  onAfterTransition(oldState, newState) {
    //do something after every transition
    console.log(`Just went from ${oldState} to ${newState}`);
  },

  state: 'ONE',
  //this is the initial state

  transitions: {
    ONE: {
      doAThing: function(payload) {
        this.changeStateTo('TWO');
        if (typeof payload === 'function') {
          payload.call(this);
        }
      },
      lifecycle: {
        onEnter: function() {
          //example lifecycle method
          console.log('state ONE onEnter');
        },
        onLeave: function() {
          //example lifecycle method
          console.log('state ONE onLeave');
        }
      }
    },
    TWO: {
      undoAThing: function(payload) {
        this.changeStateTo('ONE');
        if (typeof payload === 'function') {
          payload.call(this);
        }
      },
      startSomething: function(payload) {
        this.changeStateTo('THREE');
        if (typeof payload === 'function') {
          payload.call(this);
        }
      },
      lifecycle: {
        onLeave: function() {
          console.log('state TWO leave');
        }
      }
    },
    THREE: {
      finishSomething: function(payload) {
        this.changeStateTo('FOUR');
        if (typeof payload === 'function') {
          payload.call(this);
        }
      },
      startOver: function(payload) {
        this.changeStateTo('ONE');
        if (typeof payload === 'function') {
          payload.call(this);
        }
      },
      lifecycle: {
        onEnter: function() {
          //example lifecycle method
          console.log('state THREE onEnter');
        },
        onLeave: function() {
          //example lifecycle method
          console.log('state THREE onLeave');
        }
      }
    },
    FOUR: {
      startOver: function(payload) {
        this.changeStateTo('ONE');
        if (typeof payload === 'function') {
          payload.call(this);
        }
      },
      waitForAWhile: function(payload) {
        this.changeStateTo('FOUR');
        console.log('in state FOUR. Staying in state FOUR.');
        if (typeof payload === 'function') {
          payload.call(this);
        }
      },
      lifecycle: {}
    }
  }
};
