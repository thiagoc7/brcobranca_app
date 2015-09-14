var FancyItem = React.createClass ({

  render() {
    return (
      <li clasName={this.renderClassName()}>
        {this.props.name} {this.renderClassName()}
      </li>
    )
  },

  renderClassName() {
    var currentIndex = this.props.currentIndex;
    var itemIndex = this.props.itemIndex;

    if (currentIndex == itemIndex) {
      return "active";
    }
  }
});