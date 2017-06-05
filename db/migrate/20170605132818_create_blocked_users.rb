class CreateBlockedUsers < ActiveRecord::Migration[5.1]
  def change
    create_table :blocked_users do |t|
      t.references :blocker, index:true , foreign_key: { to_table: :users }
      t.references :blocked, index:true, foreign_key: { to_table: :users }

      t.timestamps
    end
  end
end
