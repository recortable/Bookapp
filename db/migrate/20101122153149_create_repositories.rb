class CreateRepositories < ActiveRecord::Migration
  def self.up
    create_table :repositories do |t|
      t.string :title, :limit => 128
      t.string :type, :limit => 32
      t.references :user
      t.references :project
      t.string :description, :limit => 256
      t.timestamps
    end
  end

  def self.down
    drop_table :repositories
  end
end
