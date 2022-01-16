# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2022_01_16_011159) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "bond_invites", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "bond_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["bond_id"], name: "index_bond_invites_on_bond_id"
    t.index ["user_id"], name: "index_bond_invites_on_user_id"
  end

  create_table "bonds", force: :cascade do |t|
    t.string "name"
    t.string "image_url"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "med_groups", force: :cascade do |t|
    t.string "name"
    t.text "detail"
    t.integer "compliance_time"
    t.integer "message_to"
    t.bigint "user_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_med_groups_on_user_id"
  end

  create_table "med_histories", force: :cascade do |t|
    t.bigint "med_group_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["med_group_id"], name: "index_med_histories_on_med_group_id"
  end

  create_table "meds", force: :cascade do |t|
    t.string "name"
    t.bigint "med_group_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "measure"
    t.integer "num"
    t.string "pill_type"
    t.integer "dosage"
    t.index ["med_group_id"], name: "index_meds_on_med_group_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email"
    t.string "phone_number"
    t.boolean "easy_mode", default: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "image_url"
    t.string "password_digest"
    t.string "first_name"
    t.string "last_name"
  end

  add_foreign_key "bond_invites", "bonds"
  add_foreign_key "bond_invites", "users"
  add_foreign_key "med_groups", "users"
  add_foreign_key "med_histories", "med_groups"
  add_foreign_key "meds", "med_groups"
end
