var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var BoletoFormModal = React.createClass({

  propTypes: {
    initialText: React.PropTypes.string,
    onCreate: React.PropTypes.func.isRequired
  },

  getInitialState() {
    return {
      ref: null,
      name: null,
      document: null,
      address: null,
      isOpen: false
    }
  },

  componentWillReceiveProps: function(nextProps) {
    var textIsNumber = !isNaN(nextProps.initialText);
    if (textIsNumber) {
      this.setState({ref: nextProps.initialText})
    } else {
      this.setState({name: nextProps.initialText})
    }
  },

  componentDidUpdate(prevProps, prevState) {
    if (this.props.initialText !== prevProps.initialText) {
      this.setState({isOpen: true}, function() {
        React.findDOMNode(this.refs.clientRef).focus()
      });
    }
  },

  render() {
    var modalStyles = {
      zIndex: 1003,
      display: this.state.isOpen ? 'block' : 'none',
      top: 100
    };

    return (
        <div className="modal" ref="modal" style={modalStyles}>

          <form onSubmit={this._handleSubmit}>

            <div className="modal-content">

              <div className="row">

                <div className="field col s2">
                  <label>Ref</label>
                  <input
                      type="text"
                      ref="clientRef"
                      value={this.state.ref}
                      onChange={e => this.setState({ref: e.target.value})}
                      />
                </div>

                <div className="field col s5">
                  <label>Nome</label>
                  <input
                      type="text"
                      ref="clientName"
                      value={this.state.name}
                      onChange={e => this.setState({name: e.target.value})}
                      />
                </div>

                <div className="field col s5">
                  <label>Documento</label>
                  <input
                      type="text"
                      value={this.state.document}
                      onChange={e => this.setState({document: e.target.value})}
                      />
                </div>

              </div>

              <div className="row">
                <div className="field col s12">
                  <label>Endereço</label>
                  <input
                      type="text"
                      value={this.state.address}
                      onChange={e => this.setState({address: e.target.value})}
                      />
                </div>
              </div>

            </div>

            <div className="modal-footer row">
              <div className="actions col s3">
                <a className="waves-effect waves-teal btn-flat"
                   onClick={this._handleCancel}>
                  Cancelar
                </a>
              </div>

              <div className="actions col s3">
                <button type="submit" className="btn waves-effect waves-light" disabled={!this._valid()}>Gravar</button>
              </div>

            </div>

          </form>
        </div>
    );
  },

  _handleSubmit(e) {
    e.preventDefault();

    $.ajax({
      type: 'post',
      dataType: "json",
      url: '/clients',
      data: { client: this.state },
      success: data => this._submitSuccess(data),
      error: error => this._submitError(error)
    });
  },

  _submitSuccess(data) {
    this.setState({
      ref: null,
      name: null,
      document: null,
      isOpen: false
    });

    Materialize.toast('salvo!', 4000, 'toast-success');
    this.props.onCreate(data);
  },

  _submitError(error) {
    Materialize.toast('falhou! ' + error, 4000, 'toast-fail');
    console.log(error)
  },

  _valid() {
    return this.state.ref &&
        this.state.name &&
        this.state.document
  },

  _handleCancel() {
    this.setState({
      ref: null,
      name: null,
      document: null,
      isOpen: false
    });
  }
});
