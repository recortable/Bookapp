class User < ActiveRecord::Base
  before_save :add_name

  has_many :collaborators
  has_many :projects, :through => :collaborators

  # Include default devise modules. Others available are:
  # :token_authenticatable, :confirmable, :lockable and :timeoutable
  devise :database_authenticatable, :registerable,
    :recoverable, :rememberable, :trackable, :validatable,
    :rpx_connectable

  # Setup accessible (or protected) attributes for your model
  attr_accessible :email, :password, :password_confirmation, :remember_me

  def accessible_projects
    Project.joins(:collaborators).where(:user_id => self.id) | Project.where(:public => true)
  end

  def as_json(options = {})
    super(:only => [:id, :email, :name])
  end

  protected
  def add_name
    self.name ||= self.email.split('@')[0]
  end
end
