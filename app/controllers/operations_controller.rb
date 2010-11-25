class OperationsController < InheritedResources::Base
  respond_to :html, :xml, :json
  #before_filter :authenticate_user!

  def new
    @operation = Operation.new
    new!
  end

  def create
    create! { [@repository, :operations]}
  end

  def update
    update! { [@repository, :operations]}
  end

  protected
  def begin_of_association_chain
    @project = Project.find(params[:project_id])
    @article = Article.find(params[:article_id]) if params[:article_id].present?
    @repository = @article ? @article : @project
    @repository
  end
 

end
