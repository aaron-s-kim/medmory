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
  name: 'Squid bond',
  image_url: 'https://raw.githubusercontent.com/aaron-s-kim/medmory/master/client/src/assets/images/bond.jpeg',
)

Bond.create(
  name: 'Second bond',
  image_url: 'https://www.cheatsheet.com/wp-content/uploads/2021/10/Rainn-Wilson.jpg',
)

puts "Creating users..."

son = User.create(
    first_name: 'Jason',
    last_name: 'Lee',
    phone_number: ENV['JEFF_NUMBER'],
    email: 'jason.winner@squidy.com',
    password: '123',
    image_url: "https://raw.githubusercontent.com/aaron-s-kim/medmory/master/client/src/assets/images/son.jpeg",
    bond_id: 1
  )

grandpa = User.create(
  first_name: 'Alfred',
  last_name: 'Lee',
  phone_number: ENV['AARON_NUMBER'],
  email: 'alfred.lee@squidy.com',
  password: '123',
  image_url: "https://raw.githubusercontent.com/aaron-s-kim/medmory/master/client/src/assets/images/grandpa.jpeg",
)

poor_girl = User.create(
  first_name: 'Holly',
  last_name: 'Mcdonals',
  phone_number: ENV['CONNOR_NUMBER'],
  email: 'holly.jolly@christmas.com',
  password: '123',
  image_url: "https://raw.githubusercontent.com/aaron-s-kim/medmory/master/client/src/assets/images/poor-girl.jpeg",
  bond_id: 1,
)

bad_girl = User.create(
  first_name: 'Stacy',
  last_name: 'Robert',
  email: 'stacy.robert@example.com',
  password: '123',
  image_url: "https://raw.githubusercontent.com/aaron-s-kim/medmory/master/client/src/assets/images/bad-girl.jpeg",
)

bad_guy = User.create(
  first_name: 'Oliver',
  last_name: 'Greedy',
  email: 'oliver.greedy@badbad.com',
  password: '123',
  image_url: "https://raw.githubusercontent.com/aaron-s-kim/medmory/master/client/src/assets/images/bad-guy.jpeg",
)

good_guy = User.create(
  first_name: 'Aliabdul',
  last_name: 'Strongman',
  email: 'aliabdul.strongman@strong.com',
  password: '123',
  image_url: "https://raw.githubusercontent.com/aaron-s-kim/medmory/master/client/src/assets/images/ali.jpeg",
  bond_id: 1,
)

smart_guy = User.create(
  first_name: 'Smarty',
  last_name: 'Lee',
  email: 'smarty.lee@UbcAndSfu.com',
  password: '123',
  image_url: "https://raw.githubusercontent.com/aaron-s-kim/medmory/master/client/src/assets/images/smart-guy.jpeg",
  bond_id: 1,
)

doc = User.create(
  first_name: 'Hamilton',
  last_name: 'Organer',
  email: 'bad.doctor@organsell.com',
  password: '123',
  image_url: "https://raw.githubusercontent.com/aaron-s-kim/medmory/master/client/src/assets/images/doc.jpeg",
)

rec = User.create(
  first_name: 'Rectang',
  last_name: 'Gang',
  email: 'rectang.gang@gangang.com',
  password: '123',
  image_url: "https://raw.githubusercontent.com/aaron-s-kim/medmory/master/client/src/assets/images/rec.jpeg",
)

cir = User.create(
  first_name: 'Circle',
  last_name: 'Gang',
  email: 'circle.gang@gangang.com',
  password: '123',
  image_url: "https://raw.githubusercontent.com/aaron-s-kim/medmory/master/client/src/assets/images/circle.jpeg",
)

tri = User.create(
  first_name: 'Triangle',
  last_name: 'Gang',
  email: 'triangle.gang@gangang.com',
  password: '123',
  image_url: "https://raw.githubusercontent.com/aaron-s-kim/medmory/master/client/src/assets/images/tri.jpeg",
)

15.times do
  User.create(
    first_name: Faker::Name.first_name,
    last_name: Faker::Name.last_name,
    email: Faker::Internet.user[:email],
    password: '123',
    image_url: "https://i.pravatar.cc/150?img=#{rand(1..70)}",
    bond_id: 2
  )
end

puts "Creating med groups..."

med_group1 = MedGroup.create(
  name: 'My meds',
  detail: 'take daily',
  user_id: son.id
)

med_group2 = MedGroup.create(
  name: 'Vitamins',
  detail: 'take daily',
  compliance_time: 10,
  user_id: son.id,
)

med_group3 = MedGroup.create(
  name: 'Vitamins',
  detail: 'take daily',
  compliance_time: 10,
  user_id: grandpa.id,
)

med_group4 = MedGroup.create(
  name: 'Hypertension Medications',
  detail: 'take daily',
  compliance_time: 13,
  user_id: grandpa.id,
)

puts "Creating meds..."

Med.create(
  name: 'pill 1',
  dosage: 120,
  measure: 'mcg',
  num: 1,
  pill_type: 'capsule',
  med_group_id: med_group1.id
)

Med.create(
  name: 'pill 2',
  dosage: 10,
  measure: 'mcg',
  num: 1,
  pill_type: 'capsule',
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
  dosage: 1000,
  measure: 'mg',
  num: 1,
  pill_type: 'tablet',
  med_group_id: med_group3.id
)

Med.create(
  name: 'Omega 3',
  num: 1,
  pill_type: 'softgel',
  med_group_id: med_group3.id
)

Med.create(
  name: 'Amlodipine',
  dosage: 200,
  measure: 'mg',
  num: 1,
  pill_type: 'tablet',
  med_group_id: med_group4.id
)

Med.create(
  name: 'Perindopril',
  dosage: 10,
  measure: 'mg',
  num: 1,
  pill_type: 'tablet',
  med_group_id: med_group4.id
)

puts "Creating med group histories..."

for i in 1..30 do
  MedHistory.create(
  med_group_id: med_group1.id
).update(created_at: "Apr #{i} 2022 #{rand(7..16)}:00")
end

for i in 1..30 do
  MedHistory.create(
  med_group_id: med_group2.id
).update(created_at: "Apr #{i} 2022 #{rand(7..16)}:00")
end

for i in 1..30 do
  MedHistory.create(
  med_group_id: med_group3.id
).update(created_at: "Apr #{i} 2022 #{rand(7..16)}:00")
end

for i in 1..30 do
  MedHistory.create(
  med_group_id: med_group4.id
).update(created_at: "Apr #{i} 2022 #{rand(7..16)}:00")
end

puts "Creating bond invites..."

puts "finish seeding!"