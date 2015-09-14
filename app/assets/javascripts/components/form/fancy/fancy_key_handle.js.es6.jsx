var FancyKeyHandle = {
  inputKeyDownHelper(e, currentIndex, totalItens) {

    switch (e.keyCode) {
      case 13: // Enter
        this.handleKeyEnter();
        break;

      case 27: // ESC
        this.handleKeyEsc();
        break;

      case 38: // Up
        e.preventDefault();
        if (!this.state.isOpen) { return undefined; }
        if (currentIndex == 0) {
          return totalItens - 1;
        }
        return currentIndex - 1;
        break;

      case 40: // Down
        if (!this.state.isOpen) { return undefined; }
        if (currentIndex == (totalItens - 1)) {
          return 0;
        }
        return currentIndex + 1;
        break;
    }
  },

  handleKeyEnter() {
  },

  handleKeyEsc() {
    this.setState({isOpen: false});
  }

};