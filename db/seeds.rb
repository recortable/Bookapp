
user = User.create!(:name => 'danigb', :email => 'danigb@gmail.com',
  :password => 'entrar', :password_confirmation => 'entrar',
  :rpx_identifier => "https://www.google.com/profiles/107943787634405328584")

project = Project.create!(:title => 'Proyecto uno', :user => user)
project.documents.build(:title => 'Documento uno', :user => user)
