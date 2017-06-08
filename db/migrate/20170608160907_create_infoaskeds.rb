class CreateInfoaskeds < ActiveRecord::Migration[5.1]
  def change
    create_table :inforequests do |t|
      t.references :asker, index:true, foreign_key: { to_table: :users }
      t.references :asked, index:true, foreign_key: { to_table: :users }
      t.string :info

      t.timestamps
    end
  end
end
