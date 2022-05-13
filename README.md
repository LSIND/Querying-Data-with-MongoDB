# Запрос данных в MongoDB
![](https://img.shields.io/badge/mongodb-v5.0.6-green?style=for-the-badge&logo=mongodb) ![](https://img.shields.io/badge/mongoshell-v1.2.2-green?style=for-the-badge&logo=mongodb) 

### Содержание
**Модуль 1. Введение в MongoDB**  
-- Nosql. Основные понятия и определения  
-- Обзор MongoDB. Базы данных, коллекции, документы  
-- MongoDB Shell  
-- Обзор встроенных типов данных. Формат BSON  

**Модуль 2. Язык запросов MQL**  
-- Обзор операций добавления, изменения и удаления документов   
-- Чтение данных: скаляры и массивы. Оператор find()   
-- Курсоры и проекции   

**Модуль 3. Операторы запросов MongoDB**  
-- Операторы сравнения  
-- Логические операторы  
-- Операторы вычислений  
-- Операторы элементов и массивов  

**Модуль 4. Агрегирование данных в MongoDB**   
-- Основные операции конвейера агрегирования - $match и $project  
-- Конвейер и этапы курсора  
-- Группировка данных. Оператор $group  
-- Дополнительные возможности фреймворка агрегирования  
 
### Предварительные требования  
![](https://img.shields.io/badge/mongodb-v5-green?style=for-the-badge&logo=mongodb) ![](https://img.shields.io/badge/compass-black?style=for-the-badge&logo=mongodb) ![](https://img.shields.io/badge/vscode-MongoDB-green?style=for-the-badge&logo=visualstudiocode) 

![](https://img.shields.io/badge/json-grey?style=for-the-badge&logo=json)  ![](https://img.shields.io/badge/javascript-blue?style=for-the-badge&logo=javascript) 

## Развертывание баз данных и коллекций
Скрипт `Setup.cmd` автоматически устанавливает исходные базы данных и коллекции на сервер MongoDB `mongodb://localhost:27017/` из каталога `Setupfiles\data`:
- sample_training
- moviesdata
- weatherdata
- londonfixprices
- solarsystem
- exoplanets

------------