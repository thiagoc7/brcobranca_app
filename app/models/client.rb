class Client < ActiveRecord::Base
  has_many :boletos

  def to_h
    result = {}

    result[:sacado] = name
    result[:sacado_documento] = document
    result[:sacado_endereco] = address if address.present?

    result
  end
end
