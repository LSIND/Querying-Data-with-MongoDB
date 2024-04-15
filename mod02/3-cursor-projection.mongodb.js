// Модуль 2. Язык запросов MQL
// Ex 3 - КУРСОРЫ И ПРОЕКЦИИ
//
// Сравните результирующие наборы с solution/3-task-result.txt
//

// Коллекция sample_training.zips
use('sample_training')

// 1. Найти все документы, описывающие штат NY. Подсчитать их количество (1596)
var q = { state: "NY"}
db.zips.find(q).count()

// 2. Вывести только штаты и города.
var p = { _id: 0, state: 1, city: 1}
db.zips.find({}, p)

// 3. Вывести список штатов (уникальные значения) - distinct
var p = { _id: 0, state: 1, city: 1}
db.zips.distinct("state")

// 4. Найти все документы, где штат – NY, а город – ALBANY.
//  Подсчитать их количество (7).
var q = { state: "NY", city: "ALBANY"}
db.zips.find(q)
db.zips.find(q).count()


// ------------------------- //
// Коллекция sample_training.companies
use('sample_training')

// 1. Вывести только _id, имена компаний и их номера телефонов.
var p = { name: 1, phone_number: 1}
db.companies.find({}, p)

// 2. Вывести только имена компаний, email и номера телефонов.
var p = { _id:0, name: 1, email_address:1, phone_number: 1}
db.companies.find({}, p)

// 3. Вывести последние 10 компаний в алфавитном порядке (Z-A) по полю name.
// Вывести только имена компаний и описание
var p = { _id:0, name: 1, description: 1}
var s = {name: -1}
var lim = 10
db.companies.find({}, p).sort(s).limit(lim)

// 4. Найти 3 самых старых компании по году основания (в founded_year могут содержаться значения null). 
// Вывести только имя компании, год основания и код категории.

var q = {founded_year: {$ne: null } }
var p = { _id:0, name: 1, founded_year: 1, category_code:1}
var s = {founded_year: 1}
var lim = 3
db.companies.find(q, p).sort(s).limit(lim)

// ------------------------- //
// Коллекция sample_training.trips
use('sample_training')

// 1. Найти 3 самые короткие поездки по времени.
var p = { _id:0, tripduration: 1, "end station name": 1}
var s = {tripduration: 1}
var lim = 3
db.trips.find({}, p).sort(s).limit(lim)

// 2. Найти самого молодого пользователя и вывести только год его рождения и тип пользователя (usertype).
var q = {"birth year": {$ne: ""}}
var p = { _id:0, "birth year": 1, usertype: 1}
var s = {"birth year": -1}
var lim = 1
db.trips.find(q, p).sort(s).limit(lim)

// 3. Найти 5 самых долгих поездок по времени. Вывести также станцию окончания поездки
var p = { _id:0, tripduration: 1, "end station name": 1}
var s = {tripduration: -1}
var lim = 5
db.trips.find({}, p).sort(s).limit(lim)

// 4. Вывести только длительность поездки и станцию окончания поездки
// Упорядочить данные по имени станции окончания поездки в алфавитном порядке
// Упорядочить данные по продолжительности поездки по убыванию относительно имени станции
var p = { _id:0, tripduration: 1, "end station name": 1}
var s = {"end station name": 1, tripduration: -1}
db.trips.find({}, p).sort(s)


// 5. Найти две самые последние поездки в системе (stop time).
var p = { _id:0, bikeid: 1, "stop time": 1}
var s = {"stop time": 1}
var lim = 2
db.trips.find({}, p).sort(s).limit(lim)

// 6. Выводятся 50 самых коротких поездок по времени. 
// Учитывая, что формируются 10 страниц по 5 документов на каждой, вывести только третью страницу.

var p = { _id:0, tripduration: 1, "end station name": 1}
var s = {tripduration: 1}
var lim = 5
var sk = 10
db.trips.find({}, p).sort(s).skip(sk).limit(lim)


// 7. Сделать запрос из п.6 универсальным. 
// Используя переменные, задайте размер страницы (pagesize) и номер страницы (pagenum)
var p = { _id:0, tripduration: 1, "end station name": 1}
var s = {tripduration: 1}
var pagesize = 5, pagenum = 1
db.trips.find({}, p).sort(s).skip((pagenum-1)*pagesize).limit(pagesize)