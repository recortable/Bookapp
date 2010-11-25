class ArticlesController  < InheritedResources::Base
#  before_filter :authenticate_user!, :unless => :is_json_request?
  respond_to :html, :xml, :json
  belongs_to :project


  def update
    update! { project_articles_path(@project)}
  end

  def create
    create! { project_articles_path(@project)}
  end
end
