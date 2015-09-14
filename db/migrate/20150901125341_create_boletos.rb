class CreateBoletos < ActiveRecord::Migration
  def change
    create_table :boletos do |t|
      t.decimal :amount
      t.decimal :discount
      t.string :date
      t.date :maturity
      t.string :doc_number

      t.references :client, index: true
      t.boolean :printed, default: false

      t.timestamps null: false
    end
  end
end
