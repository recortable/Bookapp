class Ability
  include CanCan::Ability

  def initialize(user)
    puts "JODER " + user.to_yaml
    if user
      can :manage, Project do |project|
        true
      end
    elsif
      can :read, Project, :public => true
    end
  end

end
