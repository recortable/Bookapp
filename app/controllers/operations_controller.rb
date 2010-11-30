class OperationsController < InheritedResources::Base
  respond_to :html, :xml, :json
  # #before_filter :authenticate_user!

 

  def new
    @operation = Operation.new
    new!
  end



  def create
    create! { (@project == @repository) ? [@project, :operations] : [@project, @repository, :operations] }
    Realtime.trigger :create, :operation, @operation, current_user
  end

  def update
    update! { (@project == @repository) ? [@project, :operations] : [@project, @repository, :operations] }
  end

  def destroy
    destroy! { (@project == @repository) ? [@project, :operations] : [@project, @repository, :operations] }
  end

  protected
  def begin_of_association_chain
    @project = Project.find(params[:project_id])
    if params[:article_id].present?
      @repository = @article = Article.find(params[:article_id])
    elsif params[:discussion_id].present?
      @repository = @discussion = Discussion.find(params[:discussion_id])
    elsif params[:book_id].present?
      @repository = @book = Book.find(params[:book_id])
    else
      @repository = @project;
    end

    params[:operation][:repository_id] = @repository.id
    params[:operation][:repository_class] = @repository.class.to_s
    params[:operation][:project_id] = @project.id

    @repository
  end
 

end
