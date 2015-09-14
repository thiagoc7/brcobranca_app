var BoletoTableCellEditDate = React.createClass({

  propTypes: {
    value: React.PropTypes.string.isRequired,
    prop: React.PropTypes.string.isRequired,
    onEdit: React.PropTypes.func.isRequired
  },

  getInitialState() {
    return {
      isEditing: false,
      newValue: this.props.value
    }
  },

  componentWillReceiveProps(nextProps) {
    this.setState({newValue: nextProps.value})
  },

  render: function() {
    var style = {
      padding: 0,
      height: 25,
      margin: 0,
      border: 0,
      width: 120
    };

    if (this.state.isEditing) {
      return (
          <td>
            <BoletoFormDate
                value={this.state.newValue}
                ref="dateForm"
                style={style}
                onChange={newValue => this.setState({newValue: newValue})}
                onBlur={() => this.setState({isEditing: false})}
                onKeyDown={this._onInputKeyDown}
                />
          </td>
      )
    } else {
      return (
          <td onDoubleClick={() => this.setState({isEditing: true}, () => React.findDOMNode(this.refs.dateForm).focus())} >
            {moment(this.props.value).format('DD/MM/YYYY')}
          </td>
      )
    }
  },

  _onInputKeyDown(e) {
    switch (e.keyCode) {
      case 13: // Enter
        var result = {};
        result[this.props.prop] = this.state.newValue;
        this.props.onEdit(result);
        this.setState({
          isEditing: false,
          newValue: this.props.value
        });
        break;

      case 27: // ESC
        this.setState({
          isEditing: false,
          newValue: this.props.value
        });
        break;
    }
  }
});
