class FridgesController < ApplicationController
  def index
    @fridges = Fridge.all
    render json: FridgeSerializer.new(@fridges).to_serialized_json
  end

  def show
    @fridge = Fridge.find_by(id: params[:id])
    render json: FridgeSerializer.new(@fridge).to_serialized_json
  end
end
