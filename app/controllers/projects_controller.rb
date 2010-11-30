class ProjectsController < InheritedResources::Base
  respond_to :html, :xml, :json
#  before_filter :set_user_id_params, :only => [:create, :update]

  def index
    @projects = current_user ? current_user.accessible_projects : Project.accessibles
    #authorize!(params[:action], @projects)
    index!
  end

  def show
    @project = Project.find params[:id]
    #authorize!(params[:action], @project)
    respond_to do |format|
      format.html
      format.json { render :json => @project.to_json(:include => :operations)}
    end
  end

  def update
    update! do |format|
      format.html
      format.json { render :json => @project.to_json(:include => :operations)}
    end
  end

  def create
    params[:project][:user_id] = current_user.id 
    create!
  end
end
