class FridgesController < ApplicationController
  before_action :set_fridge, only: [:show, :update, :destroy]
  def index
    @fridges = Fridge.all
    # render json: FridgeSerializer.new(@fridges).to_serialized_json
    render json: @fridges.as_json(include: {food_items: {only:[:id, :name, :food_group, :expiration_date, :quantity]}})
  end

  def show
    render json: @fridge.as_json(include: {food_items: {only:[:id, :name, :food_group, :expiration_date, :quantity]}})
  end

  def create
    @fridge = Fridge.new(fridge_params)
    if @fridge.save
      render json: @fridge.as_json(include: {food_items: {only:[:id, :name, :food_group, :expiration_date, :quantity]}})
    else
      render json: @fridge.errors, status: :unprocessable_entity
    end
  end

  def update
    if @fridge.update(fridge_params)
      render json: @fridge.as_json(include: {food_items: {only:[:id, :name, :food_group, :expiration_date, :quantity]}})
    else
      render json: @fridge.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @fridge.destroy
  end

  private
  def set_fridge
    @fridge = Fridge.find_by(id: params[:id])
  end

  def fridge_params
    params.require(:fridge).permit(:id, :name, :capacity, food_items_attributes: [:id, :name, :food_group, :expiration_date, :quantity, :fridge_id])
  end
end
