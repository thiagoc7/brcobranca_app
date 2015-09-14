class CreateClients < ActiveRecord::Migration
  def change
    create_table :clients do |t|
      t.string :name
      t.string :document
      t.string :address
      t.integer :ref

      t.timestamps null: false
    end
  end
end
