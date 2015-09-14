var BoletoFormPopover = React.createClass({

  propTypes: {
    clients: React.PropTypes.array.isRequired,
    currentIndex: React.PropTypes.number.isRequired
  },

  render() {
    return (
        <div className='drop-popover'>
          <ul>
            {this.props.clients.map((obj, idx) => this.renderItem(obj, idx))}
          </ul>
        </div>
    );
  },

  renderItem(obj, idx) {
    return (
        <BoletoFormPopoverItem
            key={obj.id}
            obj={obj}
            index={idx}
            currentIndex={this.props.currentIndex}
            totalItems={this.props.clients.length}
            />
    )
  }
});
