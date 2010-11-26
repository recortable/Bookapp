
user = User.create!(:name => 'danigb', :email => 'danigb@gmail.com',
  :password => 'entrar', :password_confirmation => 'entrar')

project = Project.create!(:title => "Booka", :user => user, :public => true)
%w(Uno Dos).each do |name|
  project = Project.create!(:title => "Proyecto #{name}", :user => user)
  project.articles.create!(:title => "Artículo #{name}", :user => user)
end


