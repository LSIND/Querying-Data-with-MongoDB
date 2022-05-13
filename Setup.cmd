@Echo Off
ECHO Preparing the lab environment...

REM - Get current directory
SET SUBDIR=%~dp0

REM - Run Mongosh commands to prepare the database environment
ECHO Preparing Databases...
mongosh localhost:27017 %SUBDIR%Setupfiles\setup.js
ECHO Import Weatherdata, Customerdata Databases...
mongoimport --uri "mongodb://localhost:27017/customerdata" --collection=customers --drop %SUBDIR%Setupfiles\data\customers.json
mongoimport --uri "mongodb://localhost:27017/weatherdata" --collection=weather --drop %SUBDIR%Setupfiles\data\weather.json
ECHO Import Moviesdata Database...
mongoimport --uri "mongodb://localhost:27017/moviesdata" --collection=movies --drop %SUBDIR%Setupfiles\data\movies.json
ECHO Import solarsystem, exoplanets Databases...
mongoimport --uri "mongodb://localhost:27017/solarsystem" --collection=planets --drop %SUBDIR%Setupfiles\data\solarSystem.json
mongoimport --uri "mongodb://localhost:27017/exoplanets" --collection=planets --drop %SUBDIR%Setupfiles\data\data\exoplanets.json
ECHO Import sample_training Collections...
mongoimport --uri "mongodb://localhost:27017/sample_training" --collection=companies --drop %SUBDIR%Setupfiles\data\sample_training\companies.json
mongoimport --uri "mongodb://localhost:27017/sample_training" --collection=grades --drop %SUBDIR%Setupfiles\data\sample_training\grades.json
mongoimport --uri "mongodb://localhost:27017/sample_training" --collection=inspections --drop %SUBDIR%Setupfiles\data\sample_training\inspections.json
mongoimport --uri "mongodb://localhost:27017/sample_training" --collection=posts --drop %SUBDIR%Setupfiles\data\sample_training\posts.json
mongoimport --uri "mongodb://localhost:27017/sample_training" --collection=routes --drop %SUBDIR%Setupfiles\data\sample_training\routes.json
mongoimport --uri "mongodb://localhost:27017/sample_training" --collection=trips --drop %SUBDIR%Setupfiles\data\sample_training\trips.json
mongoimport --uri "mongodb://localhost:27017/sample_training" --collection=zips --drop %SUBDIR%Setupfiles\data\sample_training\zips.json
ECHO Import londonfixprices Database...
mongoimport --uri "mongodb://localhost:27017/londonfixprices" --collection=metalprices --type csv --fields "Date.date_ms("yyyy-MM-dd"), GoldAMFix.decimal(),GoldPMFix.decimal(),SilverFix.decimal(),PlatinumAMFix.decimal(),PlatinumPMFix.decimal(),PalladiumAMFix.decimal(),PalladiumFMFix.decimal()" --file %SUBDIR%Setupfiles\data\londonfixprices.csv --columnsHaveTypes

mongosh "mongodb://localhost:27017/londonfixprices" --eval "db.metalprices.createIndex( { 'Date': -1 }, { unique: true, name: 'dateDescIndex'})"

ECHO Setup Finished.

pause