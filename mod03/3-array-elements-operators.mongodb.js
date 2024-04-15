// Модуль 3. Операторы запросов
// Ex 3 - ОПЕРАТОРЫ МАССИВОВ И ЭЛЕМЕНТОВ
//

// Коллекция weatherdata.weather
use('weatherdata')

// 1. Найти документы, где количество элементов в массиве sections равно 2 (74).
q = { sections: { $size: 2 } } 

// 2. Найти документы, где массив sections содержит элемент "MW1" (9106).
q = { sections: "MW1" } 

// 3.Найти документы, где массив sections содержит элементы "MW1", "GF1", "UA1" (6972).
q = { sections: { $all: ["MW1", "GF1", "UA1"] } } 

// 4. Найти документы, где размер массива sections равен 5 и содержит элементы "MW1", "GF1", "UA1". 
// Выведите только название станции (st) и skyCondition (32).
q = { $and: [ { sections: { $size: 5 } } , { sections: { $all: ["MW1", "GF1", "UA1"] } } ] }
p = { st: 1, skyCondition: 1, sections: 1, _id: 0}

// 5. Найти документы, где значение температуры воздуха (value) равно 6.6 (23).
q = { "airTemperature.value": 6.6 } 

// 6. Найти документы, где индекс качества воздуха (quality) не равен 1 (574).
q = { "airTemperature.quality": {$ne: "1"} } 

// 7. Найти документы, где значение температуры воздуха меньше или равно -40 (9). 
// Отсортировать по значению температуры по убыванию
// Вывести только callLetters и массив airTemperature
q = { "airTemperature.value": {$lte: -40 }}
s = { "airTemperature.value": -1}
p = { callLetters: 1, airTemperature: 1, _id: 0}

// 8. Найти документы, где значение температуры воздуха либо меньше -40, 
// либо в промежутке от +38 до +50 градусов (включая) (12).
 q = {$or: 
  [ {"airTemperature.value": {$lt: -40 }},
  {"airTemperature.value": {$gte: 38, $lte: 50  } }
  ]
 }

// 9. Найти документы, где тип ветра не равен "N" (719).
// Вывести только callLetters и wind.type
q = { "wind.type": {$ne: "N" }}
p = { callLetters: 1, "wind.type": 1, _id: 0}

// 10. Найти документы, где тип ветра не равен "N", а значение температуры воздуха меньше 0 (66).
// Вывести только callLetters, wind.type и значение температуры воздуха
q = {$and: [
    { "wind.type": {$ne: "N" }},
    {"airTemperature.value": {$lt: 0 }}
]}
p = { callLetters: 1, "wind.type": 1, "airTemperature.value":1,  _id: 0}

// 11. Найти все документы, где существует поле atmosphericPressureChange (8431).
q = { atmosphericPressureChange: { $exists: true }}
p = { callLetters: 1, atmosphericPressureChange: 1,  _id: 0}

// 12. Найти все документы, где в поле atmosphericPressureChange значение кода равно 2 или 3. 
// Вывести только значения callLetters и atmosphericPressureChange.tendency (2883)
q = { "atmosphericPressureChange.tendency.code": { $in: ["2","3"] }}
p =  { callLetters: 1, "atmosphericPressureChange.tendency": 1,  _id: 0}

// 13. Найти все документы, где долгота точки измерения восточнее, чем 10 градусов; а широта севернее 69 градусов (97)
// Вывести станцию, callLetters и массив координат
q = { $and:[
{"position.coordinates.0": {$gt: 10} },
{"position.coordinates.1": {$gt: 69} }
] }

p = {st: 1, callLetters:1, "position.coordinates":1,  _id: 0}

// Запросы для проверки
db.weather.find(q)
db.weather.find(q,p)
db.weather.find(q,p).sort(s)
db.weather.find(q).count()


// ------------------------- //
// Коллекция sample_training.companies
use('sample_training')

// 1. Найти документы, где хотя бы один из офисов компании расположен в Seattle.
// Вывести имя компании, год основания, адрес1 офисов и город (117)
q = {offices: { $elemMatch: {city: 'Seattle'}} }
p = {_id: 0, name: 1, founded_year:1, "offices.address1":1,  "offices.city": 1}

// 2. Найти документы, где резерв (funding_rounds) состоит из 8 элементов. 
// Вывести только имена компаний, год основания, funded_year и raised_amount (21).
q = {funding_rounds: { $size: 8  } }
p = {_id: 0, name: 1, founded_year:1, "funding_rounds.funded_year":1, "funding_rounds.raised_amount":1}

// 3. Найти документы, где резерв (funding_rounds) состоит не менее, чем из одного элемента, но не более, чем из 3 элементов. 
// Вывести только имена компаний, год основания, funded_year и raised_amount (1910).
// Упорядочить по имени компании в алфавитном порядке
q ={ $expr:
 { $and: [
 {$gt: [{$size: "$funding_rounds"}, 0]},
 {$lt: [{$size: "$funding_rounds"}, 3]}
  ] } }
s = {name: 1}

// Запросы для проверки
db.companies.find(q,p)
db.companies.find(q,p).sort(s)
db.companies.find(q).count()