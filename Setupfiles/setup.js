var serverDbs = db.getMongo().getDBNames();
const arrayDbs = ["customerdata", "moviesdata", "sample_training", "londonfixprices", "weatherdata"]

let dbExist = serverDbs.filter(f => arrayDbs.includes(f));

for (let i = 0; i < dbExist.length; i++){
    db = db.getSiblingDB(dbExist[i]);
    if(db) {
    db.dropDatabase();
    print("DROP", db);
    }
}