var BoletoFilter = React.createClass({

  propTypes: {
    onFilter: React.PropTypes.func.isRequired
  },

  getInitialState() {
    return {
      client_ref: null,
      doc_number: null,
      date_begin: moment().format('YYYY-MM-DD'),
      date_end: moment().format('YYYY-MM-DD'),
      isOpen: false
    }
  },

  render: function() {
    return (
        <div className="row">
          <h5 style={{cursor: 'pointer'}} onClick={() => this.setState({isOpen: !this.state.isOpen})} >Filtrar</h5>
          <ReactCSSTransitionGroup transitionName="boletoTable">
            {this.renderForm()}
          </ReactCSSTransitionGroup>
        </div>
    )
  },

  renderForm() {
    if (this.state.isOpen) {
      return (
          <form onSubmit={this._handleSubmit} key='filter'>

            <div className="row">

              <div className="field col s3">
                <label>Cliente Ref</label>
                <input
                    type="text"
                    value={this.state.client_ref}
                    onChange={(e) => this.setState({client_ref: e.target.value})}
                    />
              </div>

              <div className="field col s3">
                <label>NF</label>
                <input
                    type="text"
                    ref="nf"
                    value={this.state.doc_number}
                    onChange={(e) => this.setState({doc_number: e.target.value})}
                    />
              </div>

              <div className="field col s3">
                <label>Venc Inicial</label>
                <BoletoFormDate
                    value={this.state.date_begin}
                    onChange={(newDate) => this.setState({date_begin: newDate})}
                    />
              </div>

              <div className="field col s3">
                <label>Venc Final</label>
                <BoletoFormDate
                    value={this.state.date_end}
                    onChange={(newDate) => this.setState({date_end: newDate})}
                    />
              </div>

            </div>

            <div className="row">

              <div className="actions col s3">
                <button type="submit" className="btn waves-effect waves-light">Filtrar</button>
              </div>

            </div>

          </form>
      )
    }
  },

  _handleSubmit(e) {
    e.preventDefault();

    $.ajax({
      type: 'get',
      dataType: "json",
      url: '/boletos',
      data: {
        ref: this.state.client_ref,
        doc_number: this.state.doc_number,
        date_begin: this.state.date_begin,
        date_end: this.state.date_end
      },
      success: data => this._handleSubmitSuccess(data),
      error: error => Materialize.toast(error, 4000)
    });
  },

  _handleSubmitSuccess(data) {
    this.props.onFilter(data.boletos);
    this.setState({
      client_ref: null,
      doc_number: null,
      isOpen: false
    })
  }
});
