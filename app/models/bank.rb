class Bank < ActiveRecord::Base
  validates_presence_of :name, :agencia, :conta_corrente

  after_save :ensure_only_one_default

  def to_h
    result = {}

    result[:cedente] = cedente
    result[:documento_cedente] = cedente_doc
    result[:cedente_endereco] = cedente_address if cedente_address.present?

    result[:agencia] = agencia
    result[:conta_corrente] = conta_corrente
    result[:aceite] = aceite

    result[:variacao] = variacao if variacao.present?
    result[:carteira] = carteira if carteira.present?
    result[:convenio] = convenio.to_i if convenio.present?

    result
  end

  private
  def ensure_only_one_default
    if self.default_bank?
      Bank.where('id != ?', self.id).update_all("default_bank = 'false'")
    end
  end
end
