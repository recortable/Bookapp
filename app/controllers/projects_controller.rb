class ProjectsController < InheritedResources::Base
  before_filter :authenticate_user!
  load_and_authorize_resource
  before_filter :set_user_id_params, :only => [:create, :update]

  def index
    @projects = current_user.projects
  end

  def set_user_id_params
    params[:project][:user_id] = current_user.id
  end


end
