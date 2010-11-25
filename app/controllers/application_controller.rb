class ApplicationController < ActionController::Base
  protect_from_forgery

  protected
  def unless_json_request?
    request.format.json?
  end
end
