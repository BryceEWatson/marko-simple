/*
    We can add actions here, these actions will be added to the App and available from any widget.
    Our components can call these like `window.app.incrementState`.

    In these functions, the `this` context refers to the App.prototype.
*/

module.exports = [
    function incrementState() {
        this.state.set('value', (this.state.value - 1));
    },
    function decrementState() {
        this.state.set('value', (this.state.value + 1));
    }
];