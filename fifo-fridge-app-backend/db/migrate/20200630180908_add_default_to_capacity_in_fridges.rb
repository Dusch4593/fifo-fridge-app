class AddDefaultToCapacityInFridges < ActiveRecord::Migration[6.0]

  def up
    change_column :fridges, :capacity, :integer, :default => 0
  end

  def down
    change_column :fridges, :capacity, :integer
  end
end
