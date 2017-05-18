class AddInfoToUsers < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :first_name, :string
    add_column :users, :last_name, :string
    add_column :users, :address, :string
    add_column :users, :born_on, :date
    add_column :users, :born_at, :string
    add_column :users, :telephone, :string
    add_column :users, :website, :string
    add_column :users, :social_number, :string
    add_column :users, :id_number, :string
    add_column :users, :license_number, :string
    add_column :users, :car_plate, :string
    add_column :users, :weight, :float
    add_column :users, :height, :float
    add_column :users, :blood_group, :string
  end
end
