class SessionsController < Devise::SessionsController

  def create
    resource = warden.authenticate!(:scope => resource_name, :recall => "#{controller_path}#new")
    set_flash_message :notice, :signed_in
    sign_in(resource_name, resource)
    render_response
  end

  def destroy
    signed_in = signed_in?(:user)
    sign_out(:user)
    @current_user = nil
    set_flash_message :notice, :signed_out if signed_in
    render_response
  end

  protected
  def render_response
    puts "JODER JODER!!----------------#{current_user.inspect}"
    csrf = form_authenticity_token
    respond_to do |format|
      format.html { redirect_to projects_path }
      format.xml  { render :xml => Workspace.new(csrf, current_user) }
      format.json { render :json => Workspace.new(csrf, current_user) }
    end
  end
end
