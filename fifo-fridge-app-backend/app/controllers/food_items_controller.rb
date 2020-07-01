class FoodItemsController < ApplicationController
  def destroy
    @food_item = FoodItem.find_by(params[:id])
    @food_item.destroy
  end
end
