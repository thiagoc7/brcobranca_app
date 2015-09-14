var BoletoTableLine = React.createClass({

  propTypes: {
    boleto: React.PropTypes.object.isRequired,
    onDelete: React.PropTypes.func.isRequired
  },

  onDelete(e) {
    e.preventDefault();
    $.ajax({
      type: 'delete',
      url: "/boletos/" + this.props.boleto.id,
      dataType: 'json',
      success: () => this.props.onDelete(this.props.boleto),
      error: error => console.log(error)
    });
  },

  render: function() {
    return (
        <tr>
          <BoletoTableCellEditDate value={this.props.boleto.date} onEdit={this.onEdit} prop={"date"} />
          <BoletoTableCellEditDate value={this.props.boleto.maturity} onEdit={this.onEdit} prop={"maturity"} />
          <td>{this.props.boleto.doc_number}</td>
          <td>{this.props.boleto.client}</td>
          <BoletoTableCellEditNumber value={parseFloat(this.props.boleto.amount).toFixed(2)} onEdit={this.onEdit} prop={"amount"} />
          <BoletoTableCellEditNumber value={parseFloat(this.props.boleto.discount || 0).toFixed(2)} onEdit={this.onEdit} prop={"discount"} />
          <td>
            <a href={"/boletos/generate." + this.props.boleto.id} target="_blank">
              <i className="tiny material-icons">print</i>
            </a>
            <a data-confirm="Are you sure?" rel="nofollow" onClick={this.onDelete} href="#">
              <i className="tiny material-icons">delete</i>
            </a>
          </td>
        </tr>
    );
  },

  onEdit(newData) {
    $.ajax({
      type: 'put',
      dataType: "json",
      url: '/boletos/' + this.props.boleto.id,
      data: {boleto: newData},
      success: data => this.props.onEdit(data, this.props.boleto),
      error: error => Materialize.toast('falhou! ' + error, 4000, 'toast-fail')
    });
  },

  formatNumber(number) {
    var newNumber = number.replace(/\./g, ',');
    return newNumber.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
});
