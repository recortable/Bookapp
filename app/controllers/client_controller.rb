
class ClientController< ApplicationController
  layout 'client'
  protect_from_forgery

  def show
    render :action => 'client', :layout => false
  end
end
