class Project < ActiveRecord::Base
  has_many :collaborators
  has_many :users, :through => :collaborators
  has_many :documents, :dependent => :destroy
  belongs_to :user
  has_many :operations, :as => :repository


  validates :title, :presence => true
  validates :user, :presence => true

  after_create :setup_project
  
  protected
  def setup_project
    Project.transaction do
      collaborators.create!(:user => self.user, :roles => 'owner')
    end
  end
end
