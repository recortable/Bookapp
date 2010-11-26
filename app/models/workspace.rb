# To change this template, choose Tools | Templates
# and open the template in the editor.

class Workspace
  attr_reader :projects, :user_id, :user_name, :csrf, :messages
  def initialize(csrf, current_user)
    @csrf = csrf
    @messages = Message.order('id DESC').limit(10).reverse
    if current_user
      @user_id = current_user.id
      @user_name = current_user.name
      @projects = current_user.projects
      @collaborators = []
      @projects.each do |project|
        @collaborators += project.collaborators
      end
    else
      @projects = Project.accessibles
    end
  end
end
