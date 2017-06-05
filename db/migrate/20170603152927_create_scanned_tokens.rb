class CreateScannedTokens < ActiveRecord::Migration[5.1]
  def change
    create_table :scanned_tokens do |t|
      t.references :scanner, index:true , foreign_key: { to_table: :users }
      t.references :scanned, index:true, foreign_key: { to_table: :users }
      t.references :token, foreign_key: true

      t.timestamps
    end
  end
end
