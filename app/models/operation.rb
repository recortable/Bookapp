class Operation < ActiveRecord::Base
  belongs_to :repository, :polymorphic => true
  belongs_to :project

  ACTIONS = ['create', 'update']
  MODELS = ['Paragraph', 'Comment']

  validates :repository_type, :presence => true
  validates :repository_class, :presence => true
  validates :repository,  :presence => true
  validates :project, :presence => true
end
