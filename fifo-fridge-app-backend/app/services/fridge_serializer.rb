class FridgeSerializer
  def initialize(fridge_object)
    @fridge = fridge_object
  end

  def to_serialized_json
    options = {
      include: [food_items: {
        except: [:updated_at]
        }],
      except: [:updated_at]
    }
    @fridge.to_json(options)
  end
end
