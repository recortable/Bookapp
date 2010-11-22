class Ability
  include CanCan::Ability

  def initialize(user)
    can :manage, Project do |project|
      user.projects.include? project
    end
  end

end
