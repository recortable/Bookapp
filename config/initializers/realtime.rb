
class Realtime
  URL = 'http://api.beaconpush.com/1.0.0/5ed7901c/channels/booka'

  def self.trigger(action, name, model, user)
    data = {}
    data['action'] = action
    data['model_class'] = name
    data['model'] = model
    data['user_id'] = user ? user.id : nil
    data['user_name'] = user ? user.name : 'anónimo'
    RestClient.post URL, data.to_json, :content_type => :json, :accept => :json
  end

end

