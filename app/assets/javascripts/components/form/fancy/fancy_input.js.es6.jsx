var FancyInput = React.createClass ({

  focusIn() {
    this.props.handleFocus(true)
  },

  focusOut() {
    this.props.handleFocus(false)
  },

  render() {
    return (
      <input type="text"
             value={this.props.inputValue}
             name={this.props.inputName}
             onChange={this.props.handleValue}
             onFocus={this.focusIn}
             onBlur={this.focusOut}
             onKeyDown={this.props.handleKeyDown}
          />
    )
  }
});