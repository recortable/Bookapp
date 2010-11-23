class MessagesController < InheritedResources::Base
  respond_to :html, :xml, :json
  
  def index
    index!
  end

  def create
    params[:message][:user_id] = current_user if current_user
    create! { messages_path }
  end

  def update
    update! { messages_path }
  end
end
