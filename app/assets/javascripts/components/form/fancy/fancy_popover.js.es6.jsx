var FancyPopover = React.createClass ({

  render() {
    return (
        <div className='drop-popover'>
          <ul>
            {this.renderList()}
          </ul>
        </div>
    )
  },

  renderList() {
    var currentIndex = this.props.currentIndex;
    var displayField = this.props.displayField;
    return this.props.records.map(function(record, idx) {
      return (
          <FancyItem
              name={record[displayField]}
              key={record.id}
              itemIndex={idx}
              currentIndex={currentIndex}
              />
          )
    });
  }
});