class CreateFoodItems < ActiveRecord::Migration[6.0]
  def change
    create_table :food_items do |t|
      t.string :name
      t.string :food_group
      t.string :expiration_date
      t.integer :quantity
      t.references :fridge, null: false, foreign_key: true

      t.timestamps
    end
  end
end
