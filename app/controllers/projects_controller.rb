class ProjectsController < InheritedResources::Base
  respond_to :html, :xml, :json
  before_filter :authenticate_user!
  load_and_authorize_resource
  before_filter :set_user_id_params, :only => [:create, :update]

  def index
    @projects = current_user.projects
    index!
  end

  def show
    @project = current_user.projects.find params[:id]
    respond_to do |format|
      format.html
      format.json { render :json => @project.to_json(:include => :operations)}
    end
  end

  def set_user_id_params
    params[:project][:user_id] = current_user.id
  end


end
