class Repository < ActiveRecord::Base
  belongs_to :user
  belongs_to :project
  has_many :operations, :as => :repository
end
