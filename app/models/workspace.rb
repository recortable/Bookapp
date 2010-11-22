# To change this template, choose Tools | Templates
# and open the template in the editor.

class Workspace
  attr_reader :projects, :user_id, :user_name, :csrf
  def initialize(csrf, current_user)
    @csrf = csrf
    if current_user
      @user_id = current_user.id
      @user_name = current_user.name
      @projects = current_user.projects
    else
      @projects = Project.public
    end
  end
end
