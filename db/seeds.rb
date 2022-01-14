# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

#Faker::Name.unique.name
puts "Start seeding..."

puts "Creating users..."

User.create(
    first_name: 'Jeff',
    last_name: 'Kim',
    email: 'jeff.kim@example.com',
    password: '123'
  )

User.create(
  first_name: 'Aaron',
  last_name: 'Kim',
  email: 'aaron.kim@example.com',
  password: '123'
)

User.create(
  first_name: 'Connor',
  last_name: 'Robert',
  email: 'connor.robert@example.com',
  password: '123'
)

50.times do
  User.create(
    first_name: Faker::Name.first_name,
    last_name: Faker::Name.last_name,
    email: Faker::Internet.user[:email],
    password: '123'
  )
end

puts "Creating med groups..."

MedGroup.create(
  name: 'Protein',
  detail: 'after workout',
  user_id: 1
)

MedGroup.create(
  name: 'Vitamins',
  detail: 'take daily',
  compliance_time: 10,
  user_id: 2,
  message_to: 1
)

MedGroup.create(
  name: 'Vitamins',
  detail: 'take daily',
  compliance_time: 10,
  user_id: 3,
  message_to: 2
)

puts "Creating meds..."

Med.create(
  name: 'WHEY protein',
  dosage: 22,
  measure: 'g',
  med_group_id: 1
)

Med.create(
  name: 'Vitamin C',
  dosage: 1000,
  measure: 'mg',
  num: 1,
  pill_type: 'tablet',
  med_group_id: 2
)

Med.create(
  name: 'Vitamin D3',
  dosage: 25,
  measure: 'mcg',
  num: 1,
  pill_type: 'tablet',
  med_group_id: 2
)

Med.create(
  name: 'Vitamin C',
  dosage: 500,
  measure: 'mg',
  num: 1,
  pill_type: 'tablet',
  med_group_id: 3
)

Med.create(
  name: 'Multi vitamins',
  num: 1,
  pill_type: 'capsule',
  med_group_id: 3
)

puts "Creating med group histories..."

for i in 1..23 do
  MedHistory.create(
  med_group_id: 1
).update(created_at: "Jan #{i} 2022")
end


for i in 1..23 do
  MedHistory.create(
  med_group_id: 2
).update(created_at: "Jan #{i} 2022 #{rand(7..15)}:00")
end

for i in 1..23 do
  MedHistory.create(
  med_group_id: 3
).update(created_at: "Jan #{i} 2022 #{rand(7..15)}:00")
end
