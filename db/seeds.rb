
user = User.create!(:name => 'danigb', :email => 'danigb@gmail.com',
  :password => 'entrar', :password_confirmation => 'entrar',
  :rpx_identifier => "https://www.google.com/profiles/107943787634405328584")

%w(Uno Dos).each do |name|
  project = Project.create!(:title => "Proyecto #{name}", :user => user)
  project.articles.create!(:title => "Artículo #{name}", :user => user)
end


