class AddIndexToTokens < ActiveRecord::Migration[5.1]
  def change
    add_column :tokens, :token_hash, :string
    add_index :tokens, :token_hash, unique: true
  end
end
