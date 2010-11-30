class DiscussionsController < InheritedResources::Base
  #  before_filter :authenticate_user!, :unless => :is_json_request?
  respond_to :html, :xml, :json
  belongs_to :project


  def show
    @project = Project.find params[:project_id]
    @discussion = @project.discussions.find params[:id]
    respond_to do |format|
      format.html
      format.json { render :json => @discussion.to_json(:include => :operations)}
    end

  end

  def update
    update! { project_discussions_path(@project)}
    Realtime.trigger :update, :discussion, @discussion, current_user
  end

  def create
    create! { project_discussions_path(@project)}
    Realtime.trigger :create, :discussion, @discussion, current_user
  end
end