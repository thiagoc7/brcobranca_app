var BoletoFormDrop = React.createClass({

  propTypes: {
    label: React.PropTypes.string.isRequired,
    value: React.PropTypes.number,
    clients: React.PropTypes.array.isRequired,
    onChange: React.PropTypes.func.isRequired,
    onCreate: React.PropTypes.func.isRequired
  },

  getInitialState() {
    return {
      isOpen: false,
      currentIndex: 0,
      inputValue: '',
      clients: this.props.clients
    }
  },

  componentDidMount() {
    this._setCurrentIndex();
  },

  componentWillReceiveProps(nextProps) {
    this._setCurrentIndex(nextProps.value, nextProps.clients);
  },

  //focus after submit
  componentDidUpdate(prevProps, prevState) {
    if (this.props.value === null && (prevProps.value !== null)) {
      React.findDOMNode(this.refs.input).focus();
    }
  },

  render() {
    return (
        <div className="drop-container">
          <label>{this.props.label}</label>
          <input
              type="text"
              ref="input"
              value={this.state.inputValue}
              onChange={this._handleInputChange}
              onFocus={this._onInputFocus}
              onBlur={this._onInputBlur}
              onKeyDown={this._onInputKeyDown}
              />
          {this.renderPopover()}
        </div>
    );
  },

  renderPopover() {
    if (this.state.isOpen) {
      return (
          <BoletoFormPopover
              clients={this.state.clients}
              currentIndex={this.state.currentIndex}
              inputValue={this.state.inputValue}
              />
      )

    }
  },

  // handle input events
  _handleInputChange(e) {
    var text = e.target.value;
    var clients = this._filterRecords(text);
    var currentIndex = 0;

    if (text.length > 0) { clients.unshift({id: 'CREATE', display_name: '+ ' + text}) }
    if (clients.length > 1) {currentIndex = 1}

    this.setState({
      clients: clients,
      inputValue: text,
      currentIndex: currentIndex
    });
  },

  _onInputFocus() {
    this.setState({isOpen: true})
  },

  _onInputBlur() {
    this._confirmChange();
    this.setState({isOpen: false})
  },

  _confirmChange() {
    var newObj = this.state.clients[this.state.currentIndex];
    this.setState({
      inputValue: newObj.display_name,
      isOpen: false
    });
    this.props.onChange(newObj.id)
  },

  _onInputKeyDown(e) {

    switch (e.keyCode) {
      case 13: // Enter
        this._confirmChange();
        break;

      case 27: // ESC
        this.setState({isOpen: false});
        this._setCurrentIndex();
        break;

      case 38: // Up
        e.preventDefault();
        if (this.state.currentIndex == 0) {
          this.setState({currentIndex: this.state.clients.length - 1})
        } else {
          this.setState({currentIndex: this.state.currentIndex - 1})
        }
        break;

      case 40: // Down
        if (this.state.currentIndex == (this.state.clients.length - 1)) {
          this.setState({currentIndex: 0, isOpen: true})
        } else {
          this.setState({currentIndex: this.state.currentIndex + 1, isOpen: true})
        }
        break;

      default:
        this.setState({isOpen: true})
    }
  },

  // helpers

  _confirmChange() {
    var newObj = this.state.clients[this.state.currentIndex];

    if (!newObj) {return;}

    if (newObj.id === "CREATE") {
      this.props.onCreate(this.state.inputValue);
      this.setState({isOpen: false})
    } else {
      this.setState({
        inputValue: newObj.display_name,
        isOpen: false
      });
      this.props.onChange(newObj.id)
    }
  },

  _setCurrentIndex(value = this.props.value, clients = this.props.clients) {
    var index = clients.map(obj => obj.id).indexOf(value);
    this.setState({
      clients: clients,
      currentIndex: index,
      inputValue: clients[index] ? clients[index].display_name : ''
    })
  },

  _filterRecords(text) {
    return this.props.clients.filter(function (record) {
      return record.display_name.toLowerCase().indexOf(text.toLowerCase()) >= 0
    })
  }
});
