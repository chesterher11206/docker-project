var MongoClient = require('mongodb').MongoClient;

MongoClient.connect("mongodb://localhost:27017/CpuUsage", function (err, db) {
    if(err) throw err;
    //Write databse Insert/Update/Query code here..
    console.log('mongodb is running!');
    let rawData;
    let sectionId;

    db.collection('section',function(err,collection){
        const sectionData = { startTime: rawData[0].time };
        collection.insertOne(sectionData)
        .then(result => {
            sectionId = result.insertedId;
            console.log('Inserting New Section: ', sectionId);
        })
        .catch(err => {
            console.log(err);
        });
    });

    db.collection('cpu',function(err,collection){
        const cpuData = rawData.map((cpuInfo) => {
            cpuInfo.section = sectionId;
            return cpuInfo;
        })
        collection.insertMany(cpuData)
        .then(result => {
            console.log('Insert New Section Successfully: ', sectionId);
        })
        .catch(err => {
            console.log(err);
        });

        collection.count(function(err,count){
            if(err) throw err;
            console.log('Total Rows:'+count);
        });
    });
    db.close(); //關閉連線
});