class FridgeSerializer
  def initialize(fridge_object)
    @fridge = fridge_object
  end

  def to_serialized_json
    options = {
      except: [:updated_at]
    }
    @fridge.to_json(options)
  end
end
