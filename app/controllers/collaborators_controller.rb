class CollaboratorsController < InheritedResources::Base
  respond_to :html, :xml, :json
  belongs_to :project
end
