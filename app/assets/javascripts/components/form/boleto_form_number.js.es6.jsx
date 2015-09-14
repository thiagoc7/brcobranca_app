var BoletoFormNumber = React.createClass({

  propTypes: {
    onChange: React.PropTypes.func.isRequired
  },

  _mask: null,

  getInitialState() {
    return {
      displayValue: this.props.value
    };
  },

  componentDidMount() {
    this._mask = $(this.refs.input.getDOMNode()).mask('000.000.000.000.000,00', {reverse: true});
  },

  componentWillUnmount: function () {
    this._mask.unmask();
  },

  componentWillReceiveProps(nextProps) {
    if (nextProps.value === null) {
      this.setState({displayValue: null})
    }
  },

  onChange(e) {
    this.setState({displayValue: e.target.value}, () => this.props.onChange(this._mask.cleanVal() / 100));
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
