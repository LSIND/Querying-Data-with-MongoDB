// Модуль 2. Язык запросов MQL
// EX 2 - ОБНОВЛЕНИЕ ДАННЫХ
//
// Сравните результирующие наборы с solution/2-task-result.txt
//

use('sample_training')
// Коллекция sample_training.zips - Compass
// 1. Изменить поле zip на 12345
db.zips.updateOne({zip: "35018"}, { $set: { zip: "12345" } })
db.zips.find({zip: "12345"})

// Добавить новое поле типа Array, состоящее из нескольких элементов
db.zips.updateOne(
   { zip: "12345" },
   { $push: { Locations: { $each: [ "X1", "X2" ] } } }
)

db.zips.find({zip: "12345"})

// 2.	Добавьте поле population со значением 22000 у документа с zip-кодом 35054
use('sample_training')
db.zips.update({ zip: "35054" },
   { $set: { Population: 40000 }
   })

db.zips.find({zip: "35054"})


// 3. Найти документ(ы), в которые были добавлены поля population и Locations. 
// Удалить поля population и Locations во всех документах. Оператор $unset.
use('sample_training')
db.zips.updateMany(
    { Population: { $exists: true }},
   { $unset: { Population: "", Locations: "" } }
)
db.zips.find({zip: "12345"})


// ------------------------- //
// Коллекция sample_training.pets
use('sample_training')
// 1. Выполнить запрос. Подсчитать количество документов

db.pets.find({pet: "fish"})
db.pets.find({pet: "fish"}).count()

// 2. Увеличить значение поля age на 3 у всех найденных документов из п.2
// (оператор $inc)
use('sample_training')
db.pets.updateMany({ pet: "fish" }, { $inc: { age: 3 } })

use('sample_training')
db.pets.find({pet: "fish"})

// 3. Установить новое значение поля age, равное 15, для первого документа 
// по условию pet = dog (updateOne() и оператор $set).
use('sample_training')
db.pets.updateOne({ pet: "dog" }, { $set: { age: 15 } })

use('sample_training')
db.pets.find({pet: "dog"})

// 4. Добавить новое булево поле isDomestic ко всем документам. 
// Значение isDomestic должно быть true у cat, dog и fish и false у pig.
use('sample_training')

db.pets.updateMany({ pet: {$in: ["cat", "dog", "fish"]} },
   { $set: { isDomestic: true }
   })

db.pets.updateMany({ pet: "pig" },
   { $set: { isDomestic: false }
   })

db.pets.find({})

// ------------------------- //
// Коллекция sample_training.grades

// 1. Найти студента с номером student_id = 250 в классе class_id = 339.
db.grades.find({ student_id: 250, class_id: 339 })

// 2. Обновить документ из п.1, добавив баллы в массив scores (extra credit: 100). Оператор $push.
use('sample_training')
db.grades.updateOne({ student_id: 250, class_id: 339 },
                    { $push: { scores: { type: "extra credit",
                                         score: 100 }
                                }
                     })
db.grades.find({ student_id: 250, class_id: 339 })


// -------------------------------------------//
// УДАЛЕНИЕ ДАННЫХ
// 1. Удалите все созданные документы, где pet = cat (deleteMany)
use('sample_training')
db.pets.deleteMany({ pet: "cat"})

// 2. Удалите все созданные документы, где pet = pig (deleteOne)
db.pets.deleteOne({ pet: "pig" })

// 3. Что еще осталось в коллекции?
db.pets.find()

// 4. Удалить коллекцию pets командой drop()
db.pets.drop()


// 5. Найти и удалить документ, добавленный в п.1 модуля2
db.zips.deleteOne({ zip: "12345" })