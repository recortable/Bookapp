class Article < Repository

  def as_json(options = {})
    super(:include => :operations)
  end
end
