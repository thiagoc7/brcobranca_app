var FancySelect = React.createClass ({

  mixins: [FancyKeyHandle, FancyHelpers],

  getInitialState() {

    var value = undefined;
    var inputValue = '';

    if (this.props.value) {
      var obj = this._findDataById(this.props.value);
      value = obj.id;
      inputValue = obj.name;
    }

    return {
      isFocused: false,
      isOpen: false,
      inputValue: inputValue,
      currentIndex: 0,
      value: value,
      records: this.props.data
    }
  },

  handleFocus(focus) {
    this.setState({isFocused: focus});
    if (focus) {this.setState({isOpen: true});}
  },

  handleInputValue(e) {
    var newInputValue = e.target.value;
    var newRecords = this._filterRecords(newInputValue, this.props.data, this.props.displayField);

    this.setState({
      inputValue: newInputValue,
      records: newRecords,
      currentIndex: 0
    })
  },

  handleKeyDown(e) {
    this.setState({isOpen: true});

    var currentIndex = this.state.currentIndex;
    var totalItens = this.state.records.length;
    var newIndex = this.inputKeyDownHelper(e, currentIndex, totalItens);

    if (newIndex !== undefined) {
      this.setState({currentIndex: newIndex});
      this.handleNewItem(newIndex)
    }
  },

  handleNewItem(newIndex) {
    var newItem = this.state.records[newIndex];
    this.setState({
      inputValue: newItem[this.props.displayField]
    })
  },

  render() {
    return (
        <div className="drop-container">
          <label>{this.props.label}</label>
          <FancyInput
              inputValue={this.state.inputValue}
              handleValue={this.handleInputValue}
              handleFocus={this.handleFocus}
              handleKeyDown={this.handleKeyDown}
              />
          {this.renderPopover()}
        </div>
    )
  },

  renderPopover() {
    if (this.state.isFocused && this.state.isOpen) {
      return (
          <FancyPopover
              inputValue={this.state.inputValue}
              displayField={this.props.displayField}
              records={this.state.records}
              currentIndex={this.state.currentIndex}
              />
      )

    }
  },

  _findDataById(id) {
    return this.props.data.filter(function( obj ) {
      return obj.id == id;
    });
  }
});