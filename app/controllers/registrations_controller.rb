class RegistrationsController < Devise::RegistrationsController
  def after_sign_up_path_for(resource)
    csrf = form_authenticity_token
    respond_to do |format|
      format.html { redirect_to projects_path }
      format.xml  { render :xml => Workspace.new(csrf, current_user) }
      format.json { render :json => Workspace.new(csrf, current_user) }
    end
  end
end

