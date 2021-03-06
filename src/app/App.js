var inherit = require('raptor-util/inherit');
var AppState = require('./AppState');

/**
 * This is the "class" definition for our app. On the client-side
 * we create a single instance of this class and use it as the default
 * exports for the "src/app/main/index.js" module. The App instances
 * expose methods which can be used to modify the internal application
 * state. When the internal state is changed, a "change" event is emitted
 * along with the new state.
 *
 * The App constructor should be provided with the initial state object.
 * The provided state object is wrapped and normalized by the AppState
 * module.
 *
 * @param {Object} state The initial state for the app.
 */
function App(state) {
    this.setState(state);
}

/**
* Actions which modify the state.
**/
App.prototype = {

    getState: function() {
        return this.state;
    },

    setState: function(state) {
        var self = this;

        state = state || {};
        this.state = new AppState(state);

        function emitChangeEvent() {
            self.emit('change', self.state);
        }

        this._emitChangeEvent = emitChangeEvent;

        // When the internal state changes also emit a change event on
        // the app and pass along the updated state.
        this.state.on('change', emitChangeEvent);
    },

    addAction: function(action) {
        this.prototype[action.name] = action;
    },

    onChange: function(callback) {
        this.on('change', callback);
    }


};

inherit(App, require('events').EventEmitter);

module.exports = App;