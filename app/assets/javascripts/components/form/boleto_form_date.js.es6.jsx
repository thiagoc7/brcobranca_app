var BoletoFormDate = React.createClass({

  propTypes: {
    value: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func.isRequired
  },

  _mask: null,

  getInitialState() {
    var value = undefined;
    if (this.props.value) { value = moment(this.props.value).format('DD/MM/YYYY')}
    return {
      displayValue: value
    };
  },

  componentDidMount() {
    this._mask = $(this.refs.input.getDOMNode()).mask('00/00/0000');
  },

  componentWillUnmount: function () {
    this._mask.unmask();
  },

  onChange(e) {
    this.setState({displayValue: e.target.value});
    var newDate = moment(e.target.value, 'DD/MM/YYYY').format('YYYY-MM-DD');
    this.props.onChange(newDate)
  },

  render() {
    return <input
        type="text"
        ref="input"
        {...this.props}
        value={this.state.displayValue}
        onChange={this.onChange}
        />
  }
});
