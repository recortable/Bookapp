class CreateOperations < ActiveRecord::Migration
  def self.up
    create_table :operations do |t|
      t.references :repository
      t.string :model, :limit => 32
      t.string :action, :limit => 32
      t.text :attributes
      t.timestamps
    end
  end

  def self.down
    drop_table :operations
  end
end
