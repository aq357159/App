const arangodb_database_Exercise = true;
const arangodb_Exercise = false;
const mongodb_Exercise1 = false;
const express_Exercise = false;
const EventEmitter_Exercise = false;
const module_exports_Exercise = false;
const fs_Exercise = false;
const http_server_Exercise = false;

var log = require("./Log.js");
var contant = require("./Constant.js");
//測試 
//arangodb 連線功能    
/*
ArangoDB的一些測試方向
1.Node.js與ArangoDB的AQL的所有功能的應用測試
2.叢集，同步的速度時間，斷線備援的機制與時間
3.Index的測試與比較
    Hash Indexes
    Skiplists
    Persistent Indexes
    Fulltext Indexes
    Geo-spatial Indexes
    Vertex-centric Indexes
4.Transactions 資料lock的程度測試 與 錯誤的處理方式
  (也要Transactions不同參數的測試)
5.key-value與document的不同類型的資料表的join查詢測試
6.測試不同的db是否可以一起查詢
7.Storage Engines的比較與測試
  MMFiles VS RocksDB
8.Naming Conventions in ArangoDB
  了解命名規則
9.測試_key 極限
10.測試多資料 跟少資料 建立速度
11
以上皆需要測試大量資料時的速度與效能，並寫成node.js的測試程式
(網路上抓的範例只用參考用的 絕對不是最佳方式 你必須跟你實際的需求 來做最佳的修改與調整
切記，一定要驗證傳入與傳出的參數是否符合需求，以及做好錯誤與例外的處理)
*/

// Unique：唯一建值
// Sparse：
// Deduplicate：
//3 Hash Indexes：  單一查詢速度 快
//6. 建立兩個db 讓他們的collection 實做 join 會報err  兩個不同資料庫不能一起join 

//arangodb 屬於逐一處理 
//node js 屬於 非同步 處理
//測試 ： node js 多個同時呼叫 arangodb search data   arangodb 會跑完一個在跑第二個 

//AQL index search test
//一般
//範圍查詢 平均 111ms
//單一查詢 平均 62ms

//HASH
//範圍查詢 平均 113ms
//單一查詢 平均 9ms

//persistent
//範圍查詢 平均 54ms
//單一查詢 平均 8ms

//skiplist
//範圍查詢 平均 48ms
//單一查詢 平均 9ms

//fulltext
//範圍查詢 平均 110ms
//單一查詢 平均 63ms

// index hash join 
// join 條件  31ms
//join 條件 加 單一查詢   18ms
//join 條件 加 範圍查詢   26ms

// index persistent join 
// join 條件  71ms
//join 條件 加 單一查詢  62ms  
//join 條件 加 範圍查詢  75ms

// index skiplist join 
//join 條件  51ms
//join 條件 加 單一查詢   38ms
//join 條件 加 範圍查詢   46ms

// index fulltext join 
//join 條件  19583ms
//join 條件 加 單一查詢  19772ms
//join 條件 加 範圍查詢  20078ms


if (arangodb_Exercise) {
        var arangojs = require("arangojs");
        var aqlQuery = require('arangojs').aqlQuery;

        const host = "127.0.0.1";
        const prot = "8529";
        const username = "clc";
        const password = "123456";
        const databaseName1 = "_system";
        const databaseName2 = "mydb";
        var db = new arangojs.Database(`http://${host}:${prot}`);

        var db2 = new arangojs.Database(`http://${host}:${prot}`);

        // Set User Data
        db.useBasicAuth(username, password);

        //基本
        //方法1：
        function createDataBase1(db, databaseName) {
                db.createDatabase(databaseName, function (err) {
                        if (err) {
                                log.error("create DataBase Error" + err);
                        }
                        else {
                                log.debug("create " + databaseName + " DataBase ");
                        }
                });
        }
        //方法2：
        function createDataBase2(db, databaseName) {
                db.createDatabase(databaseName).then(
                        () => log.debug("create " + databaseName + " DataBase "),
                        err => log.error("create database error " + err)
                );
        }

        // Create Collection
        //方法1：
        function createCollection1(collection) {
                collection.create().then(
                        () => log.debug("create collection"), // or () => {log.debug("create collection");},
                        err => log.error(err)                 // err => {log.error(err);}
                );
        }
        //方法2：
        function createCollection2(collection) {
                collection2.create(function (err) {
                        if (err) {
                                log.error(err);
                        }
                        else {
                                log.debug("create collection2");
                        }
                });
        }

        //Save
        //方法1：
        function save1(collection, data) {
                collection.save(data).then(
                        meta => log.debug(meta),
                        err => log.error(err)
                );
        }
        //方法2：
        function save2(collection, data) {
                collection.save(data, function (err, result) {
                        if (err) {
                                //log.debug(result);
                                // log.error(err);
                                console.log(err);
                        }
                        else {

                                log.debug(result);
                                // updata1(collection, result._key, { name: "999999" });
                                // remove2(collection, result._key);
                        }
                });
        }

        //update
        //方法1：
        function updata1(collection, key, updateData) {
                collection.update(key, updateData).then(
                        meta => log.debug(meta),
                        err => log.error(err)
                );
        }
        //方法2：
        function updata2(collection, key, updateData) {
                collection.update(key, updateData, function (err, meta) {
                        if (err) {
                                log.debug(meta);
                                log.error(err);

                        }
                        else {
                                log.debug(meta);

                        }
                });
        }

        //remove
        //方法1：
        function remove1(collection, key) {
                collection.remove(key).then(
                        () => log.debug("remove data"),
                        err => log.error(err)
                );
        }
        //方法2：
        function remove2(collection, key) {
                collection.remove(key, function (err) {
                        if (err) {
                                log.error(err); 也會便慢
                        }
                        else {
                                log.debug("remove data");

                        }
                });
        }
        //doecument
        //方法1：
        function document1(collection, key) {
                collection.document(key).then(
                        data => { log.debug(data); },
                        err => log.error(err)
                )
        }
        //方法2：
        function document2(collection, key) {
                collection.document(key, function (err, data) {
                        if (err) {
                                log.error(err);
                        }
                        else {
                                log.debug(data);
                        }
                });
        }
        //import
        //方法1：
        function import1(collection, data) {
                collection.import(data).then(
                        result => log.debug(result),
                        err => log.error(err)
                );
        }
        //方法2：
        function import2(collection, data) {
                collection.import(data, function (err, result) {
                        if (err) {
                                log.error(err);
                        }
                        else {
                                log.debug(result);
                        }
                });
        }
        //all
        //方法1：
        function ALL1(collection) {
                collection.all().then(
                        cursor => cursor.all()
                ).then(
                        data => log.debug(data),
                        err => log.error(err)
                )
        }
        //方法2：
        function ALL2(collection) {
                collection.all(function (err, data) {
                        if (err) {
                                log.error(err);
                        }
                        else {
                                log.debug(data._result);
                                log.debug(data.count);
                        }
                });
        }

        //AQL
        //join
        function join1(db, collection, collection2) {
                var date = new Date().getTime();
                db.query(aqlQuery`
                FOR c1 IN ${collection}
                FOR c2 IN ${collection2}
                FILTER c1.id == c2.id AND c2.age > 3000 and c2.age < 8000
                RETURN {name:c1.name,age:c2.age}
                `).then(
                        cursor => cursor.all()
                        ).then(
                                data => {
                                        //log.debug(data);
                                        log.debug(new Date().getTime() + "-" + date + "=" + (new Date().getTime() - date));

                                },
                                err => log.error("" + err)
                        );
        }

        //truncate
        function truncate(collection) {
                collection.truncate().then(
                        () => log.debug("truncate OK"),
                        err => log.error(err)
                );
        }


        // Set DataBase
        db.useDatabase(databaseName1);
        db2.useDatabase(databaseName2);

        var collection = db.collection("user");
        var collection1 = db.collection("age");

        var collection2 = db2.collection("test");

        //table join test
        if (false) {

                var collection = db.collection("user");
                var collection1 = db.collection("age");

                var collection2 = db2.collection("test");

                truncate(collection);
                truncate(collection1);
                truncate(collection2);

                save1(collection, { id: 1, name: "test1" });
                save1(collection1, { id: 1, age: 18 });
                save1(collection2, { id: 1, age: 18 });

                join1(db, collection, collection1);
                join1(db, collection, collection2);

        }

        function testIndex(db, collection, key) {
                //AND c.${key} < 20000
                var dateTime = new Date().getTime();
                db.query(aqlQuery`
                FOR c IN ${collection}
                FILTER c.id == 523 or c.id1 == 24534 or c.id2 == 4885 or c.id3 == 345 or c.id4 == 456 
                RETURN c
                `).then(
                        cursor => cursor.all()
                        ).then(
                                data => {
                                        //log.debug(data);
                                        log.debug("--------------" + key + "---------------");
                                        //log.debug(data.length);
                                        var a = new Date().getTime();
                                        log.debug(a + " - " + dateTime + "=" + (a - dateTime));
                                        log.debug("----------------------------------------");

                                        return new Date().getTime() - dateTime;
                                },
                                err => log.error(err)
                        );
        }
        if (false) {

                // Unique：true 唯一值
                //

                // var collection = db.collection("t2");
                var collection = db.collection("t1");
                // ALL1(collection);
                // var arr = [];
                // for (var i = 219001; i <= 239000; i++) {
                //         var obj = {};
                //         obj["id"] = i;
                //         obj["id1"] = i;
                //         obj["id2"] = i;
                //         //obj["id3"] = i;
                //         obj["id4"] = i;
                //         arr.push(obj);
                // }
                // import1(collection, arr);

                // ALL1(collection);

                testIndex(db, collection, "id");

        }


        if (true) {
                // truncate(collection);
                // truncate(collection1);

                var collection = db.collection("user");
                var collection1 = db.collection("age");
                // var arr = [];
                // var arr1 = [];
                // for (let i = 1, num = 10000; i <= num; i++) {
                //         var obj = {};
                //         obj["id"] = i;
                //         obj["name"] = "p" + i;
                //         var obj2 = {};
                //         obj2["id"] = i;
                //         obj2["age"] = i + 18;

                //         arr.push(obj);
                //         arr1.push(obj2);
                // }
                // import1(collection, arr);
                // import1(collection1, arr1);

                // ALL1(collection);

                // ALL1(collection1);

                join1(db, collection, collection1);

        }
        // var co = {};


        // var collection1 = db.collection("age");

        // var cb = function (err, p) {
        //         console.log(err);
        //         console.log(p);
        // };
        // db.transaction({
        //         write: "user",
        // }, String(function (params) {
        //         // This code will be executed inside ArangoDB!
        //         const db = require('@arangodb').db;
        //         return db._query(aqlQuery`
        //           FOR user IN user
        //           RETURN user
        //         `).toArray();
        // }),
        //         null, 10000, cb);

        // db.transaction({
        //         write: "user",
        // }, String(function (params) {
        //         // This code will be executed inside ArangoDB!
        //         const db = require('@arangodb').db;
        //         return db._query(aqlQuery`
        //                   FOR user IN user
        //                   RETURN user
        //                 `).toArray();
        // }),
        //         null, 10000, cb);


        // console.log(cb);

        // db._executeTransaction({
        //         collections: {
        //                 read: "user",
        //                 allowImplicit: false
        //         },
        //         action: function () {
        //                 /* The below query will now fail because the collection "connections" has not
        //                 been specified in the list of collections used by the transaction */
        //                 const db = require("@arangodb").db;
        //                 db._createStatement({
        //                         query: `FOR v IN ANY "users/1234" connections RETURN v`
        //                 }).execute().toArray().forEach(function (d) {
        //                         console.log(d);
        //                 });
        //         }
        // });


        // ALL1(collection);
        //ALL1(collection2);


        // var data = {};
        // data["id"] = 100;
        // data["name"] = "test";
        // save2(collection, data);
        // data["id"] = 101;
        // data["name"] = "test";
        // save2(collection, data);
        // data["id"] = 1000;
        // data["name"] = "test";
        // save1(collection2, data);
        // data["id"] = 1001;
        // data["name"] = "test";
        // save2(collection2, data);

        // document1(collection, "142769827");

        // var updateData = {};
        // updateData["name"] = "9988";
        // updata1(collection, "142769827", updateData);
        // document1(collection, "142769827");
        // var updateData = {};
        // updateData["name"] = "1133";
        // updata1(collection, "142769827", updateData);
        // document1(collection, "142769827");
        // var updateData = {};
        // updateData["name"] = "2277";
        // updata1(collection, "142769827", updateData);
        // document1(collection, "142769827");

        // db.collection.ensure




        // updata2(collection, "142763073", { name: "sssss" });
        // var updateData = {};
        // updateData["name"] = "t2";
        // updata1(collection, k1, updateData);
        // updateData["name"] = "ts2";
        // updata1(collection, k2, updateData);
        // document1(collection, "142767210");
        // document2(collection, "142767214");

        // var dataArr = [];
        // for (var i = 0; i < 10; i++) {
        //         var obj = {};
        //         obj["name"] = "p" + i;
        //         obj["id"] = i;
        //         dataArr.push(obj);
        // }
        // import1(collection, dataArr);
        // var dataArr2 = [];
        // for (var i = 10; i < 20; i++) {
        //         var obj = {};
        //         obj["name"] = "s" + i;
        //         obj["id"] = i;
        //         dataArr2.push(obj);
        // }
        // import2(collection, dataArr2);
        // ALL1(collection);
        // ALL2(collection);

        //AQL


        // db.query(aqlQuery`
        // FOR i IN 1..1000
        // INSERT {time:DATE_FORMAT(DATE_NOW(),'%yyyy/%mm/%dd %hh:%ii:%ss.%fff'),index:i} INTO ${test}
        // `).then(
        //         cursor => cursor.all()
        //         ).then(
        //                 data => console.debug("" + JSON.stringify(data)),
        //                 err => {
        //                         console.error("error mag:" + err);

        //                 }
        //         );



        // db.query(aqlQuery`	
        // FOR t IN ${test}
        // COLLECT AGGREGATE
        // x=MAX(t.time),
        // n=MIN(t.time)
        // RETURN {max:x,min:n,f:DATE_DIFF(n,x,'second',true)}
        // `, function (err, data) {
        //                 //data._result
        //         });

        // .then(
        //         cursot => cursot.all()
        // ).then(
        //         function (data, err) {
        //                 if (err) {
        //                         log.error(err);
        //                 }
        //                 else {
        //                         log.debug(data);
        //                         datas = data;
        //                 }
        //         }
        // );


        // setTimeout(function () { log.debug("78889999---->" + JSON.stringify(datas)); }, 1000)



        // test.truncate().then(
        //         () => log.debug("truncate OK"),
        //         err => log.error(err)
        // );

        // db.query(aqlQuery`
        // FOR t IN ${test}
        // REMOVE t IN ${test}
        //  `).then(
        //          cursor => cursor()
        //  ).then(
        //          data=>
        //  )




        // db.query(`
        // INSERT {name:"a4"} INTO log
        // RETURN NEW
        // `).then(
        //         cursor => cursor.all()
        //         ).then(
        //                 docs => docs.forEach(doc => console.log(doc)),
        //                 err => console.error('Query failed:\n', err.response.body)
        //         );

        // db.query(`
        // FOR l IN log
        // RETURN l.name
        // `).then(
        //         cursor => cursor.all()
        //         ).then(
        //                 docs => docs.forEach(doc => console.log(doc)),
        //                 err => console.error('Query failed:\n', err.response.body)
        //         );

        //if ArangoError: not authorized to execute this request. use this
        //
        // 创建数据库
        // db.createDatabase('mydb', function (err) {
        //         if (err) {
        //                 log.debug("arangodb create database error: " + err);
        //         }
        //         else {
        //                 log.debug("arangodb create database OK");
        //         }
        // });
}


// mongodb 連線功能
if (mongodb_Exercise1) {
        var mongodb = require("mongodb").MongoClient;

        mongodb.connect("mongodb://127.0.0.1:27017/", function (err, db) {
                if (err) {
                        log.error("mongodb 連線失敗");
                        log.error(err);
                }
                else {
                        var find_Exercise_status = false;


                        log.debug("mongodb 連線成功");

                        var dbo = db.db("mydb");

                        var searchCount = function () {
                                //查詢資料
                                dbo.collection("user").find({}).toArray(function (err, result) {
                                        if (err) {
                                                log.error("mongodb find error");
                                                log.error(err);
                                        }
                                        else {
                                                log.debug("size() => " + result.length);
                                        }
                                });
                        }

                        var searchData = function (query, projection, sort = false, limit = false) {
                                //query 
                                // {key:value},{projection:{key:1=>顯示 0=>不顯示}}
                                // 例：{id:1},{projection:{_id:0,name:0}}
                                // sort 排序 {key: 1:升序 -1:降序} 例：{name:-1} or {name:1}
                                // limit 筆數 
                                var resultFn = function (err, result) {
                                        if (err) {
                                                log.error("mongodb find error");
                                                log.error(err);
                                        }
                                        else {
                                                log.debug("data size => " + result.length);
                                                for (let i = 0; i < result.length; i++) {
                                                        log.info(JSON.stringify(result[i]));
                                                }
                                        }
                                };
                                query = typeof query !== "object" ? {} : query;
                                projection = typeof projection !== "object" ? {} : projection;
                                limit = limit != false ? (typeof limit === "number" && limit < 0 ? limit : false) : limit;
                                sort = sort != false ? (typeof sort === "object" && Object.keys(sort).length > 0 ? sort : false) : sort;

                                if (sort && limit) {
                                        dbo.collection("user").find(query, projection).sort(sort).limit(limit).toArray(resultFn);
                                }
                                else if (sort && limit == false) {
                                        dbo.collection("user").find(query, projection).sort(sort).toArray(resultFn);
                                }
                                else if (sort == false && limit) {
                                        dbo.collection("user").find(query, projection).limit(limit).toArray(resultFn);
                                }
                                else {
                                        dbo.collection("user").find(query, projection).toArray(resultFn);
                                }
                        }

                        var insertData = function () {
                                var data = [];
                                for (let i = 1; i <= 10; i++) {
                                        let obj = {};
                                        obj["id"] = i;
                                        obj["name"] = "a" + i;
                                        data.push(obj);
                                }
                                //新增資料
                                dbo.collection("user").insertMany(data, function (err, res) {
                                        if (err) {
                                                log.error("mongodb insert err")
                                                log.error(err);
                                        }
                                        else {
                                                log.debug("total Row: tedCount: " + res.insertedCount);
                                        }
                                });
                        }
                        var updateData = function () {
                                var myquery = { id: 1 };
                                var newView = { $set: { name: "88888" } };
                                //修改資料
                                dbo.collection("user").updateMany(myquery, newView, function (err, res) {
                                        if (err) {
                                                log.error("mongodb update error");
                                                log.error(err);
                                        }
                                        else {
                                                log.debug("Total Row: " + res.upsertedCount);
                                        }
                                });
                        }

                        var deleteData = function () {
                                var query = { id: 3 };
                                //刪除資料
                                dbo.collection("user").deleteMany(query, function (err, obj) {
                                        if (err) {
                                                log.error("mongodb delete error");
                                                log.error(err);
                                        }
                                        else {
                                                log.debug("delete data status: " + obj.result.ok);
                                                log.debug("delete data count: " + obj.result.n);
                                        }
                                });
                        }

                        var removeData = function () {
                                //刪除資料
                                dbo.collection("user").remove({ id: 2 }, function (err, obj) {
                                        if (err) {
                                                log.error("mongodb remove error");
                                                log.error(err);
                                        }
                                        else {
                                                log.debug("remove data status: " + obj.result.ok);
                                                log.debug("remove data count: " + obj.result.n);
                                        }
                                });
                        }

                        var dropCollection1 = function () {
                                dbo.collection("test1").drop(function (err, result) {
                                        if (err) {
                                                log.error("mongodb drop error");
                                                log.error(err);
                                        }
                                        else if (result) {
                                                log.debug("drop Collection OK");
                                        }
                                        else {
                                                log.debug("drop fail");
                                        }
                                });
                        }

                        var dropCollection2 = function () {
                                dbo.dropCollection("test2", function (err, result) {
                                        if (err) {
                                                log.error("mongodb drop error");
                                                log.error(err);
                                        }
                                        else if (result) {
                                                log.debug("drop Collection OK");
                                        }
                                        else {
                                                log.debug("drop fail");
                                        }
                                });
                        }


                        //find 範例 練習
                        if (find_Exercise_status) {

                                log.debug("test 1 query projection");
                                var query = { id: 1 };
                                var projection = { projection: { _id: 0 } };
                                var sort = "";
                                var limit = 0;
                                searchData(query, projection, sort, limit);

                                log.debug("test 2 sort limit");
                                var query = {};
                                var projection = { projection: { _id: 0 } };
                                var sort = { id: -1 };
                                var limit = 5;
                                searchData(query, projection, sort, limit);

                                log.debug("test 3 大於 5");
                                var query = { id: { $gt: 5 } };
                                var projection = { projection: { _id: 0 } };
                                var sort = "";
                                var limit = 0;
                                searchData(query, projection, sort, limit);

                                log.debug("test 4 大於等於 5 ");
                                var query = { id: { $gte: 5 } };
                                var projection = { projection: { _id: 0 } };
                                var sort = "";
                                var limit = 0;
                                searchData(query, projection, sort, limit);

                                log.debug("test 5 小於 5 ");
                                var query = { id: { $lt: 5 } };
                                var projection = { projection: { _id: 0 } };
                                var sort = "";
                                var limit = 0;
                                searchData(query, projection, sort, limit);

                                log.debug("test 6  lte 小於等於 5 ");
                                var query = { id: { $lte: 5 } };
                                var projection = { projection: { _id: 0 } };
                                var sort = "";
                                var limit = 0;
                                searchData(query, projection, sort, limit);

                                log.debug("test 7 in 1,2,3");
                                var query = { id: { $in: [1, 2, 3] } };
                                var projection = { projection: { _id: 0 } };
                                var sort = "";
                                var limit = 0;
                                searchData(query, projection, sort, limit);

                                log.debug("test 8 nin 1,2,3");
                                var query = { id: { $nin: [1, 2, 3] } };
                                var projection = { projection: { _id: 0 } };
                                var sort = "";
                                var limit = 0;
                                searchData(query, projection, sort, limit);

                                log.debug("test 9 or id 1 or name a5");
                                var query = { $or: [{ id: 1 }, { name: "a5" }] };
                                var projection = { projection: { _id: 0 } };
                                var sort = "";
                                var limit = 0;
                                searchData(query, projection, sort, limit);

                                log.debug("test 10 not id gte 10 ");
                                var query = { id: { $not: { $gte: 10 } } };
                                var projection = { projection: { _id: 0 } };
                                var sort = "";
                                var limit = 0;
                                searchData(query, projection, sort, limit);
                        }

                        dropCollection1();
                        dropCollection2();

                        // searchCount();
                        // deleteData();
                        // searchCount();
                        // removeData();
                        // searchCount();



                        // removeData();
                        // searchCount();
                        // insertData();
                        // searchCount();
                        // updateData();
                        // searchCount();
                }
                db.close();
        });

}


//express 練習 根據url 執行不同動作 文件上傳
if (express_Exercise) {
        var express = require('express');
        var fs = require("fs");
        var bodyParser = require("body-parser");
        var fileUpload = require("express-fileupload");
        var keys = Object.keys || require("object-keys");

        var app = express();
        app.use(fileUpload());
        app.use(bodyParser.urlencoded({ extended: false }));


        app.use("/img", express.static(__dirname + "/img"));


        app.get('/', function (req, res) {
                res.sendFile(__dirname + "/index.html");

        });

        app.get("/listUsers", function (req, res) {
                fs.readFile(__dirname + "/" + "users.json", 'utf8', function (err, data) {
                        res.end(data);
                });
        });

        // app.get("/:id", function (res, req) {
        //         fs.readFile(__dirname + "/users.json", 'utf8', function (err, data) {
        //                 if (data.length > 0) {
        //                         try {
        //                                 data = JSON.parse(data);

        //                                 if (typeof data === "object") {
        //                                         var user = JSON.stringify(data[res.params.id]);
        //                                         res.json(user);
        //                                         next();
        //                                 }

        //                         } catch (e) {
        //                                 data = {};
        //                                 log.error("JSON error " + e);
        //                         }
        //                 }
        //         });
        // });

        app.post("/addUsers", function (req, res) {
                fs.readFile(__dirname + "/users.json", 'utf8', function (err, data) {
                        let gid = 1;
                        if (data.length > 0) {
                                try {
                                        data = JSON.parse(data);
                                        if (typeof data === "object") {
                                                for (let key in data) {
                                                        let id = parseInt("" + key)
                                                        if (gid <= id) {
                                                                gid = id + 1;
                                                        }
                                                }
                                        }
                                        else {
                                                data = {};
                                        }

                                } catch (e) {
                                        data = {};
                                        log.error("JSON error " + e);
                                }
                        }
                        else {
                                data = {};
                        }

                        var obj = {};
                        obj["name"] = req.body.name;
                        obj["password"] = req.body.password;
                        obj["profession"] = req.body.profession;
                        data[gid] = obj;

                        fs.writeFile(__dirname + "/users.json", JSON.stringify(data), function (err) {
                                if (err) {
                                        return res.status(400).send(JSON.stringify(data));
                                }
                                else {
                                        res.end(JSON.stringify(data));
                                }

                        });
                });

        });

        app.post('/file_upload', function (req, res) {
                if (!req.files || typeof req.files === "undfined") {
                        return res.status(400).send("NO files were uploaded");
                }
                else {
                        var fileObj = req.files.sampleFile;
                        var date = new Date().getTime();
                        var des_file = __dirname + "/img/" + date + "_" + fileObj.name;

                        fileObj.mv(des_file, function (err) {
                                if (err) {
                                        log.error(err);
                                }
                                else {
                                        res.send("文件上傳成功");
                                }
                        });
                }
        });
        app.post('/post', function (req, res) {
                var name = req.body.firstName + "" + req.body.lastName;
                res.send("POST Request " + name);
        });

        app.put('/put', function (req, res) {
                res.send("PUT Request");
        });

        app.delete('/delete', function (req, res) {
                res.send("DELETE Request");
        });

        var server = app.listen(contant.post, function () {
                var host = server.address().address
                var port = server.address().port

                log.debug("express server start... \n host:" + host + "\n post:" + port);
        });
}



//監聽 練習 
if (EventEmitter_Exercise) {
        var en = require("events");
        var em = new en.EventEmitter();

        em.on('firstE', function () {
                log.debug("firstE 啟動");
        });

        em.on('lastE', function (a, b) {
                log.debug("lastE 啟動");
                log.debug("A=>" + a);
                log.debug("B=>" + b);
        });

        em.emit('firstE');
        em.emit('lastE', "1", "2");
}

// 檔案載入練習 module.exports
if (module_exports_Exercise) {
        var obj = {};
        obj["a"] = 1;
        obj["b"] = 2;
        var person = require("./Person.js")

        log.info("test info log");
        log.debug("test debug log");
        log.warn("test warn log");
        log.error("test error log");

        log.debug("post=>" + contant.post);

        var p = new person("王", "小明");
        log.debug(p.firstName + "--" + p.lastName);

        log.debug(obj);
}

//fs 檔案讀寫 練習
if (fs_Exercise) {
        const TestFileUrl = __dirname + '/TestFile.txt';
        var fs = require('fs');

        // fs.readFile(TestFileUrl,function(err,data){
        //         if(err){
        //                 log.error("readFile error"); 
        //                 log.error(err)
        //         }else{
        //                 log.debug("TestFile1: "+data);
        //         }
        // });

        // var data2 = fs.readFileSync(TestFileUrl,'utf8');
        // log.debug("TestFile2: "+data2);

        // fs.writeFile(__dirname+'/test.txt','你好嗎?',function(err){
        //         if(err){
        //                 log.error("writeFile error");
        //                 log.error(err);        
        //         }
        //         else{
        //                 log.debug("成功");               
        //         }
        // });

        // fs.appendFile(__dirname+'/test.txt','我很好!',function(err){
        //         if(err){
        //                 log.error("appendFile error");
        //                 log.error(err);  
        //         }
        //         else{
        //                 log.debug("成功寫入");
        //         }
        // });



        // fs.open(TestFileUrl,'r+',function(err,fd){
        //         if(err){
        //                 log.error("open err");
        //                 log.error(err);
        //         }
        //         else{
        //                 log.debug("檔案開啟成功");

        //                 var buffer = new Buffer(1024);

        //                 fs.read(fd,buffer,0,buffer.length,0,function(err,bytes){
        //                         if(err){
        //                                 log.error("fs read file error");
        //                                 log.error(err);
        //                         }
        //                         else{
        //                                 var text = buffer.slice(0,bytes).toString("utf8");
        //                                 if(text.length > 0){
        //                                         log.debug(text.length);
        //                                         log.debug(text);
        //                                         log.debug("--------------------------");
        //                                         var str = "天氣差";
        //                                         log.debug(str.length);
        //                                         log.debug(str);
        //                                 }                        
        //                         }

        //                         fs.close(fd,function(err){
        //                                 if(err)log.error(err);                        
        //                         });
        //                 });

        //         }
        // });
}

//建立 http server 連線 練習 
if (http_server_Exercise) {

        var http = require('http');

        var server = http.createServer(function (req, res) {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                if (req.url == "/") {
                        res.write("<p>歡迎光臨<p>");
                }
                else if (req.url == "/Login") {
                        res.write("<p>登入成功<p>");
                }
                else if (req.url == "/Logout") {
                        res.write("<p>登出成功<p>");
                }
                else {
                        res.write("<p>404<p>");
                }
                res.end();
        });

        server.listen(contant.post);
}

