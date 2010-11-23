class OperationsController < InheritedResources::Base
  respond_to :html, :xml, :json
  before_filter :authenticate_user!

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
    params.each do |name, value|
      if name =~ /(.+)_id$/
        @repository = $1.classify.constantize.find(value)
        return @repository
      end
    end
    nil
  end
 

end
