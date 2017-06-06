# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170605132818) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "blocked_users", force: :cascade do |t|
    t.bigint "blocker_id"
    t.bigint "blocked_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["blocked_id"], name: "index_blocked_users_on_blocked_id"
    t.index ["blocker_id"], name: "index_blocked_users_on_blocker_id"
  end

  create_table "scanned_tokens", force: :cascade do |t|
    t.integer "scanner_id"
    t.integer "scanned_id"
    t.integer "token_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["scanned_id"], name: "index_scanned_tokens_on_scanned_id"
    t.index ["scanner_id"], name: "index_scanned_tokens_on_scanner_id"
    t.index ["token_id"], name: "index_scanned_tokens_on_token_id"
  end

  create_table "tokens", force: :cascade do |t|
    t.integer "user_id"
    t.string "info"
    t.string "password"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "token_hash"
    t.index ["token_hash"], name: "index_tokens_on_token_hash", unique: true
    t.index ["user_id"], name: "index_tokens_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string "current_sign_in_ip"
    t.string "last_sign_in_ip"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "provider"
    t.string "uid"
    t.string "first_name", default: ""
    t.string "last_name", default: ""
    t.string "address", default: ""
    t.date "born_on", default: "2000-01-01"
    t.string "born_at", default: ""
    t.string "telephone", default: ""
    t.string "website", default: ""
    t.string "social_number", default: ""
    t.string "id_number", default: ""
    t.string "license_number", default: ""
    t.string "car_plate", default: ""
    t.string "insurance_company", default: ""
    t.float "weight", default: 0.0
    t.float "height", default: 0.0
    t.string "blood_group", default: ""
    t.string "image_url"
    t.boolean "admin", default: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "blocked_users", "users", column: "blocked_id"
  add_foreign_key "blocked_users", "users", column: "blocker_id"
end
