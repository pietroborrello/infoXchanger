class AddInfoToUsers < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :first_name, :string, default: ""
    add_column :users, :last_name, :string, default: ""
    add_column :users, :address, :string, default: ""
    add_column :users, :born_on, :date, default: "01/01/2000"
    add_column :users, :born_at, :string, default: ""
    add_column :users, :telephone, :string, default: ""
    add_column :users, :website, :string, default: ""
    add_column :users, :social_number, :string, default: ""
    add_column :users, :id_number, :string, default: ""
    add_column :users, :license_number, :string, default: ""
    add_column :users, :car_plate, :string, default: ""
    add_column :users, :insurance_company, :string, default: ""
    add_column :users, :weight, :float, default: 0.0
    add_column :users, :height, :float, default: 0.0
    add_column :users, :blood_group, :string, default: ""
  end
end
