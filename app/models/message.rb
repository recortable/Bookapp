class Message < ActiveRecord::Base
  belongs_to :user
  validates :body, :presence => true
  before_save :prepare_data

  protected
  def prepare_data
    self.action = "message" if action.blank?
    self.user_name = user ? user.name : 'anonymous'
  end
end
