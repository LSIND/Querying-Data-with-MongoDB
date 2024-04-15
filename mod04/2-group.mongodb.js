// Модуль 4. Агрегирование данных
// Ex 2 - Оператор $group
//
// Сравните результирующие наборы с solution/2-task-result.txt
//

// Коллекция customerdata.customers
use('customerdata');

// 1.	Найти средний возраст всех заказчиков ($age) (avgAge = 32.583).

var pipeline = [
  {
    $group: {
        _id: "",
        avgAge: { $avg: "$age" }
          }},
{ $project: {_id: 0 } }
]


// 2. Подсчитать количество сотрудников по каждому типу аккаунта ($accountType).
var pipeline = [
  { 
    $group: {
        _id: "$accountType",
        countN: { $sum: 1  }
}}
]

// 3. Найти минимальный баланс на счету для каждого возраста.
// Выведите только те значения, где баланс в промежутке от 1100 до 1200. Отсортируйте по балансу по убыванию (6). 
var pipeline = [
  {
      $group: {
          _id: "$age",
          avgBal: {  $min: "$balance" }
          }}, 
  { $match: {"avgBal": {$gte: 1100, $lte: 1200}}},
  { $sort: {"avgBal": -1}}
]

// 4. Найти средний баланс на счетах сотрудников в зависимости от пола ($gender). 
// Округлите данные до 3-х знаков после запятой.
var pipeline = [
    {   $group: {  _id: "$gender",
        avgBal: {    $avg: "$balance"  } }
    },
{ 
  $project: 
  { _id: 1, avgBalRound: { $round : ["$avgBal", 3] } }
}
]

// Запрос для проверки
db.customers.aggregate(pipeline)


// ------------------------- //
// Коллекция sample_training.grades
use('sample_training');

// 1. Найти общее количество студентов в классе с номером 108 (total = 236).
var pipeline = [ 
  { $match: {"class_id" : 108}},
    {
        $group: {
            _id: {st: "$student_id"   }
    }},
  { $count: "total" }
]

// 2. Найти общее количество оценок (массив $scores) студентов с номерами 1, 5 и 10. 
// Отсортировать по номеру студента. 
var pipeline = [ 
  { $match: {"student_id" : { $in: [1,5,10]} } },
  { $unwind: "$scores"},
  { $group: {
  _id: {student: "$student_id"},
   numOfScores: { $sum: 1  }
   }},
  { $sort: {"_id" : 1 }}
]

// 3. Найти среднее количество баллов по классам с номерами 0-5. 
// Отсортируйте результат от наибольшего количества баллов к наименьшему.
var pipeline = [ 
  { $match: { "class_id" : {$gte: 0, $lte : 5 } } },
  { $unwind: "$scores" },
  { $group: {
      _id:  "$class_id",
      value: {$avg: "$scores.score"}
    }
  },
  { $sort: {"value": -1}}
 ]

// 4. Найти максимальное количество баллов по каждому классу. 
// Вывести только те классы, где максимальное значение больше 99.999.
var pipeline = [ 
  { $unwind: "$scores" },
 { $group: {
  _id:  "$class_id",
  value: {$max: "$scores.score"}
    }
     },
  { $match: {"value": {$gte: 99.999}}},   
   {$sort: {"_id": 1}}
 ]

 // 5. Найти среднее количество баллов по всем классам. 
// Вывести только те классы, где средний балл меньше 48 (12).
// Упорядочить по среднему баллу по возрастанию
var pipeline = [   
  { $unwind: "$scores" },
  { $group: {
      _id:  "$class_id",
      value: {$avg: "$scores.score"}
    }
  },
  { $match: {"value": {$lt: 48}}},
  { $sort: {"value": 1}}
 ]


// Запросы для проверки
db.grades.aggregate(pipeline)
db.grades.aggregate(pipeline).itcount()


// ------------------------- //
// Коллекция londonfixprices.metalprices
use('londonfixprices');

// 1.	Рассчитать изменения в цене за 1 oz t серебра относительно 1 января 2022 года 
// Использовать оконную функцию $first 

var firstDate = new ISODate("2022-01-01");
var pipeline = [
  {$match: {Date: {$gt: firstDate}}},
  {
    "$setWindowFields": {
      "partitionBy": null,
      "sortBy": {
        "Date": 1
      },
      "output": {
        fOM: {
          $first: "$SilverFix",
          window: {documents: ["unbounded", "current"]}
        },
        lead: {
          $shift: {
            output: "$SilverFix",
            by: 1,
            default: 0
          }
        }
      }
    }
  },
  {$project: {"_id":0, YMD: { $dateToString: { format: "%d.%m.%Y", date: "$Date" } }, Diff: { $convert: { input:  { $subtract: [ "$SilverFix", "$fOM" ] }, to: "string"}}, "SilverFix": { $convert: { input: "$SilverFix", to: "string" } }
  }},
]


// 2. Найти 3 документа с самой низкой ценой золота (GoldAMFix) за 1999 год.
// Выведите только дату и цену
// Учитывайте, что таких дат может быть несколько (соответственно документов >=3).
// Использовать оконную функцию $denseRank 

var pipeline = [
  { $match: { Date: { $gte: new ISODate("1999-01-01"), $lt: new ISODate("2000-01-01") } } },
  {"$setWindowFields": 
      {"output": {"dense-rank": {"$denseRank": {}}},
       "sortBy": {"GoldAMFix": 1}}},
    {"$match": {"$expr": {"$lte": ["$dense-rank", 3]}}},
    {"$unset": ["dense-rank"]},
    { $project: {_id: 0, Date:1, "GoldAMFix": 1} } 
]


// Запрос для проверки
db.metalprices.aggregate(pipeline)