class Project < ActiveRecord::Base
  has_many :collaborators
  has_many :users, :through => :collaborators
  has_many :articles, :dependent => :destroy
  has_many :discussions, :dependent => :destroy
  has_many :books, :dependent => :destroy
  belongs_to :user
  has_many :operations, :as => :repository

  scope :accessibles, :conditions => {:public => true}

  validates :title, :presence => true
  validates :user, :presence => true

  after_create :setup_project

  def collaborator?(user)
    Collaborator.find(:conditions => {:project_id => self.id, :user_id => user.id}).count > 0
  end

  def as_json(options)
    if options
      super(options)
    else
      super(:include => {:collaborators => { :include => {:user => {:only => [:id, :email, :name] }}}})
    end
  end

  protected
  def setup_project
    Project.transaction do
      collaborators.create!(:user => self.user, :roles => 'owner')
      books.create!(:title => self.title)
    end
  end
end
