class CreateMessages < ActiveRecord::Migration
  def self.up
    create_table :messages do |t|
      t.references :user
      t.string :action, :limit => 8
      t.string :user_name, :limit => 32
      t.text :body
      t.timestamps
    end
  end

  def self.down
    drop_table :messages
  end
end
