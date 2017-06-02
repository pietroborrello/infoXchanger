class CreateTokens < ActiveRecord::Migration[5.1]
  def change
    create_table :tokens do |t|
      t.references :user, foreign_key: true
      t.string :info
      t.string :password

      t.timestamps
    end
  end
end
