class ArticlesController  < InheritedResources::Base
  before_filter :authenticate_user!
  respond_to :html, :xml, :json
  belongs_to :project


  def update
    update! { project_articles_path(@project)}
  end

  def create
    create! { project_articles_path(@project)}
  end
end