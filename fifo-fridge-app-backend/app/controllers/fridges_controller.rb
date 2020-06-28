class FridgesController < ApplicationController
  before_action: :set_fridge, only: [:show, :destroy]
  def index
    @fridges = Fridge.all
    render json: FridgeSerializer.new(@fridges).to_serialized_json
  end

  def show
    render json: FridgeSerializer.new(@fridge).to_serialized_json
  end

  def destroy
    @fridge.destroy
  end

  private
  def set_fridge
    @fridge = Fridge.find_by(id: params[:id])
  end
end
