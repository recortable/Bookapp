class Operation < ActiveRecord::Base
  belongs_to :repository, :polymorphic => true

  ACTIONS = ['create', 'update']
  MODELS = ['Paragraph', 'Comment']
end
