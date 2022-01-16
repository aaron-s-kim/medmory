# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

#Faker::Name.unique.name
puts "Start seeding..."

puts "Creating a bond..."

Bond.create(
  name: 'First bond',
  image_url: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.cheatsheet.com%2Fentertainment%2Fthe-office-rainn-wilson-gave-most-dwight-answer-asked-punched-junk.html%2F&psig=AOvVaw3lkRtnkynYuyGda5nGKSdH&ust=1642382352536000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCJCDiquNtfUCFQAAAAAdAAAAABAD',
)

Bond.create(
  name: 'First bond',
  image_url: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.cheatsheet.com%2Fentertainment%2Fthe-office-rainn-wilson-gave-most-dwight-answer-asked-punched-junk.html%2F&psig=AOvVaw3lkRtnkynYuyGda5nGKSdH&ust=1642382352536000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCJCDiquNtfUCFQAAAAAdAAAAABAD',
)

Bond.create(
  name: 'First bond',
  image_url: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.cheatsheet.com%2Fentertainment%2Fthe-office-rainn-wilson-gave-most-dwight-answer-asked-punched-junk.html%2F&psig=AOvVaw3lkRtnkynYuyGda5nGKSdH&ust=1642382352536000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCJCDiquNtfUCFQAAAAAdAAAAABAD',
)

Bond.create(
  name: 'First bond',
  image_url: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.cheatsheet.com%2Fentertainment%2Fthe-office-rainn-wilson-gave-most-dwight-answer-asked-punched-junk.html%2F&psig=AOvVaw3lkRtnkynYuyGda5nGKSdH&ust=1642382352536000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCJCDiquNtfUCFQAAAAAdAAAAABAD',
)

puts "Creating users..."

jeff = User.create(
    first_name: 'Jeff',
    last_name: 'Kim',
    email: 'jeff.kim@example.com',
    password: '123'
  )

aaron = User.create(
  first_name: 'Aaron',
  last_name: 'Kim',
  email: 'aaron.kim@example.com',
  password: '123'
)

connor = User.create(
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
    password: '123',
    image_url: "https://i.pravatar.cc/150?img=#{rand(1..70)}",
    bond_id: rand(2..4)
  )
end

puts "Creating med groups..."

med_group1 = MedGroup.create(
  name: 'Protein',
  detail: 'after workout',
  user_id: jeff.id
)

med_group2 = MedGroup.create(
  name: 'Vitamins',
  detail: 'take daily',
  compliance_time: 10,
  user_id: aaron.id,
  message_to: jeff.id
)

med_group3 = MedGroup.create(
  name: 'Vitamins',
  detail: 'take daily',
  compliance_time: 10,
  user_id: connor.id,
  message_to: aaron.id
)

puts "Creating meds..."

Med.create(
  name: 'WHEY protein',
  dosage: 22,
  measure: 'g',
  med_group_id: med_group1.id
)

Med.create(
  name: 'Vitamin C',
  dosage: 1000,
  measure: 'mg',
  num: 1,
  pill_type: 'tablet',
  med_group_id: med_group2.id
)

Med.create(
  name: 'Vitamin D3',
  dosage: 25,
  measure: 'mcg',
  num: 1,
  pill_type: 'tablet',
  med_group_id: med_group2.id
)

Med.create(
  name: 'Vitamin C',
  dosage: 500,
  measure: 'mg',
  num: 1,
  pill_type: 'tablet',
  med_group_id: med_group3.id
)

Med.create(
  name: 'Multi vitamins',
  num: 1,
  pill_type: 'capsule',
  med_group_id: med_group3.id
)

puts "Creating med group histories..."

for i in 1..26 do
  MedHistory.create(
  med_group_id: med_group1.id
).update(created_at: "Jan #{i} 2022 #{rand(7..22)}:00")
end


for i in 1..26 do
  MedHistory.create(
  med_group_id: med_group2.id
).update(created_at: "Jan #{i} 2022 #{rand(7..16)}:00")
end

for i in 1..26 do
  MedHistory.create(
  med_group_id: med_group3.id
).update(created_at: "Jan #{i} 2022 #{rand(7..16)}:00")
end

puts "Creating bond invites..."

BondInvite.create(
  user_id: 1,
  bond_id: 1
)

BondInvite.create(
  user_id: 1,
  bond_id: 3
)

BondInvite.create(
  user_id: 1,
  bond_id: 3
)

puts "finish seeding!"