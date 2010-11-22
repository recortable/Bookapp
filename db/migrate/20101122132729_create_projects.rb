class CreateProjects < ActiveRecord::Migration
  def self.up
    create_table :projects do |t|
      t.references :user
      t.string :title, :limit => 256
      t.string :description, :limit => 512
      t.boolean :public
      t.string :stage, :limit => 100
      t.timestamps
    end

    create_table :collaborators do |t|
      t.references :user
      t.references :project
      t.string :roles, :limit => 32
      t.timestamps
    end

  end

  def self.down
    drop_table :projects
    drop_table :collaborators
  end
end
