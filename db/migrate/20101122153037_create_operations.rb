class CreateOperations < ActiveRecord::Migration
  def self.up
    create_table :operations do |t|
      t.references :repository
      t.string :repository_type, :limit => 32
      t.string :model, :limit => 32
      t.string :action, :limit => 32
      t.string :params, :limit => 256
      t.text :body
      t.timestamps
    end
  end

  def self.down
    drop_table :operations
  end
end
