class ArticlesController < InheritedResources::Base
#  before_filter :authenticate_user!, :unless => :is_json_request?
  respond_to :html, :xml, :json
  belongs_to :project

  def show
    show! do |format|
      format.json { render :json => @article.to_json(:include => :operations)}
    end
  end

  def update
    update! { project_articles_path(@project)}
  end

  def create
    create! { project_articles_path(@project)}
  end
end
