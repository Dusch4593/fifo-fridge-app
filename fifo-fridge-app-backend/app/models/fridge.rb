class Fridge < ApplicationRecord
  has_many :food_items, dependent: :destroy
  accepts_nested_attributes_for :food_items
end
