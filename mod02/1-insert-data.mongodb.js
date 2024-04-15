// Модуль 2. Язык запросов MQL
// Ex 1 - ВСТАВКА ДАННЫХ
//

// Коллекция sample_training.zips - Compass
use('sample_training')

// 1. Вставить документ
db.zips.insertOne({city:"TEST",zip:"35018",loc:{y:33.509002,x:86.147547},pop:40000,state:"AL"})

// Найти этот документ
db.zips.find({zip: "35018"})

db.zips.countDocuments()


// Коллекция sample_training.pets
use('sample_training')

// 2. В базу данных sample_training добавить коллекцию pets. 
 db.createCollection("pets")

// 3. Для коллекции sample_training.pets выполнить следующие команды.
// Изучить ошибки исполнения запросов
// С помощью find() определить данные, которые были записаны в коллекцию
// Удалить все данные можно командой deleteMany({})

// 3.1. Duplicate Key 3
db.pets.insertMany([{ _id: 1, pet: "cat", age: 5 },
                { _id: 2, pet: "dog", age: 10 },
                { _id: 3, pet: "fish", age: 1 },
                { _id: 3, pet: "snake", age: 2 }])

db.pets.find()

db.pets.deleteMany({})

// 3.2. Duplicate Key 1 - ordered true
db.pets.insertMany([{ _id: 1, pet: "cat", age: 6 },
                { _id: 1, pet: "dog", age: 9 },
                { _id: 3, pet: "fish", age: 3 },
                { _id: 4, pet: "snake" }], { "ordered": true })

db.pets.find()

db.pets.deleteMany({})

// 3.3. Duplicate Key 1 - ordered false
db.pets.insertMany([{ _id: 1, pet: "cat", age: 6 },
                { _id: 1, pet: "dog", age: 9 },
                { _id: 3, pet: "fish", age: 3 },
                { _id: 4, pet: "snake" }], { "ordered": false })

db.pets.find()

db.pets.deleteMany({})

// 4. Удалить все данные из коллекции.
db.pets.deleteMany({})

// 5. Дважды выполнить запрос на вставку данных. Убедиться, что все значения были добавлены (8).
db.pets.insertMany([{ pet: "cat", age: 20 },
                { pet: "dog", age: 1 },
                { pet: "fish", age: 1 }, 
                { pet: "pig", age: 12 }])

db.pets.find()
db.pets.countDocuments()