class Collaborator < ActiveRecord::Base
  belongs_to :user
  belongs_to :project

  def as_json(options)
    super(:include => {:user => {:only => [:id, :name, :email]}})
  end
end
