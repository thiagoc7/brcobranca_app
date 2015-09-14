var BoletoFormPopoverItem = React.createClass({

  propTypes: {
    obj: React.PropTypes.object.isRequired,
    index: React.PropTypes.number.isRequired,
    currentIndex: React.PropTypes.number.isRequired,
    totalItems: React.PropTypes.number.isRequired
  },

  componentWillReceiveProps(nextProps) {
    var adjIndex = nextProps.index + 2;
    if (nextProps.currentIndex > adjIndex) {
      this.setState({display: false})
    } else {
      this.setState({display: true})
    }
  },

  getInitialState() {
    return {display: true}
  },

  render() {
    if (this.state.display) {
      return (
          <li className={this.props.index == this.props.currentIndex ? 'active' : ''}
              style={{display: this.state.display}}
              >
            {this.props.obj.display_name}
          </li>
      );
    } else {
      return null;
    }
  }
});
