
dani = User.create!(:name => 'Dani', :email => 'danigb@gmail.com',
  :password => 'entrar', :password_confirmation => 'entrar')
users = []
users << User.create!(:name => 'Paula', :email => 'alvarpau@gmail.com',
  :password => 'entrar', :password_confirmation => 'entrar')
users << User.create!(:name => 'Omi', :email => 'omi@calcaxy.com',
  :password => 'entrar', :password_confirmation => 'entrar')
users << User.create!(:name => 'Teresa', :email => 'es.miss.pi@gmail.com',
  :password => 'entrar', :password_confirmation => 'entrar')
users << User.create!(:name => 'Malex', :email => 'malex@calcaxy.com',
  :password => 'entrar', :password_confirmation => 'entrar')

booka = Project.create!(:title => "Booka", :user => dani, :public => true)
ccc = Project.create!(:title => 'Camiones, Contenedores, Colectivos', :user => dani, :public => true)


