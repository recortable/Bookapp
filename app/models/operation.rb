class Operation < ActiveRecord::Base
  belongs_to :repository, :polymorphic => true
end
