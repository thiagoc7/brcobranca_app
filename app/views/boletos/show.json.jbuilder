json.extract! @boleto, :id, :amount, :discount, :date, :maturity, :days_to_maturity, :doc_number, :created_at, :updated_at
json.client @boleto.client.name
