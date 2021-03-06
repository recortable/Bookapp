class ArticlesController < InheritedResources::Base
  #  before_filter :authenticate_user!, :unless => :is_json_request?
  respond_to :html, :xml, :json
  belongs_to :project

  def show
    @project = Project.find params[:project_id]
    @article = @project.articles.find params[:id]
    respond_to do |format|
      format.html
      format.json { render :json => @article.to_json(:include => :operations)}
    end
  end

  def update
    update! { project_articles_path(@project)}
    Realtime.trigger :update, :article, @article, current_user
  end

  def create
    create! { project_articles_path(@project)}
    Realtime.trigger :create, :article, @article, current_user
  end
end
