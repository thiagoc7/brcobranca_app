json.boletos(@boletos) do |boleto|
  json.extract! boleto, :id, :amount, :discount, :date, :maturity, :days_to_maturity, :doc_number
  json.client boleto.client.name
  json.url boleto_url(boleto, format: :json)
end
