// arangoDB test

const host = "127.0.0.1";
const prot = "8529";
const clcName = "clc";
const rootName = "root";
const password = "123456";
const databaseName_system = "_system";
const databaseName_mydb = "mydb";


var log = require("./Log.js");

var arangojs = require("arangojs");
var aqlQuery = require('arangojs').aqlQuery;


//db 連線
var db = new arangojs.Database(`http://${host}:${prot}`);
//輸入user data
db.useBasicAuth(rootName, password);
//選擇 db
db.useDatabase(databaseName_system);

const test1 = false;
//在中途更換沒有權線的帳號 是否能正常執行
if (test1 == true) {
    var collection = db.collection("user");
    // 資料查詢
    getAll(collection, "1");

    //換帳號後 查詢一樣的資料  如果更換的帳號沒有collection 查看權限 會報error  

    db.useBasicAuth(clcName, password);

    // 資料查詢
    getAll(collection, "2");

    // //重新定義 collection 
    collection = db.collection("user");

    // // 資料查詢
    getAll(collection, "3");

}

/*
   //取得db 裡面所有collection 資料
   實例：
   db.listCollections().then(
       cursor => console.log(cursor)
   );
   格式：
   [
       {
           id: '143599750',
           name: 'test2',              //collection Name
           status: 3,
           type: 2,
           isSystem: false,
           globallyUniqueId: 'h755E54F1449/143599750'
       },
       ....
   ]
   */


const test2 = false;
//多筆資料少筆資料 速度 差
if (test2 == true) {

    // var collectnionTest1 = db.collection("test1");
    // var collectnionTest2 = db.collection("test2");

    //getAll(collectnionTest1);

    //兩個 collection 分別Test1,Test2 Test1 新增多筆資料後 Test1查詢速度 會變慢 測試 Test2 是否也會變慢
    //ps: 不會變慢 collecction資料量 只影響 針對這個collection作查詢的速度 
    // getAll(collectnionTest1);//9
    // getAll(collectnionTest2);//9
    //1. 10w Key.LEN = 20 //1019ms 
    //2. 10w Key.LEN = 20 //1029ms 
    //3. 10w Key.LEN = 20 //1047ms 
    //4. 10w Key.LEN = 20 //1021ms 
    //5. 10w Key.LEN = 20 //1090ms 
    //6. 10w Key.LEN = 20 //1003ms 
    // insertTest(collectnionTest1, "import", 100000, 20);
    // getAll(collectnionTest1); //23 目前資料10w
    // getAll(collectnionTest2); //9 目前資料0
    // getAll(collectnionTest1); //39 目前資料20w
    // getAll(collectnionTest2); //9 目前資料0
    // getAll(collectnionTest1); //53 目前資料30w
    // getAll(collectnionTest2); //9 目前資料0


    ////測試 新增(import) 1筆 資料  
    //// key長度 1 => 例：{ a1: 1 } value.length == 10
    ////結果：9ms
    // insertTest2(collectnionTest2, "import", 1, 10, 1);

    ////測試 新增(import) 1筆 資料  
    //// key長度 1 => 例：{ a1: 1 } value.length == 100
    ////結果：9ms
    // insertTest2(collectnionTest1, "import", 1, 100, 1);

    ////測試 新增(import) 1筆 資料  
    //// key長度 1 => 例：{ a1: 1 } value.length == 1k
    ////結果：9ms
    // insertTest2(collectnionTest1, "import", 1, 1000, 1);

    ////測試 新增(import) 1筆 資料  
    //// key長度 1 => 例：{ a1: 1 } value.length == 1w
    ////結果：10ms
    // insertTest2(collectnionTest1, "import", 1, 10000, 1);

    ////測試 新增(import) 1筆 資料  
    //// key長度 1 => 例：{ a1: 1 } value.length == 10w
    ////結果：10ms
    // insertTest2(collectnionTest1, "import", 1, 100000, 1);

    ////測試 新增(import) 1筆 資料  
    //// key長度 1 => 例：{ a1: 1 } value.length == 100w
    ////結果：25ms
    // insertTest2(collectnionTest1, "insert", 1, 1000000, 1);

    ////測試 新增(import) 1筆 資料  
    //// key長度 1 => 例：{ a1: 1 } value.length == 1000w
    ////結果：132ms
    // insertTest2(collectnionTest1, "insert", 1, 10000000, 1);

    ////測試 新增(import) 1筆 資料  
    //// key長度 1 => 例：{ a1: 1 } value.length == 1億
    ////結果：1445ms
    // insertTest2(collectnionTest1, "insert", 1, 100000000, 1);



    ////資料過多 insert 得速度也會便慢
    ////------------------------key長度 5---------------------------------------------
    ////測試 新增(import) 1w 資料  
    //// key長度 5 => 例：{ a1: 1, a2: 1, a3: 1, a4: 1, a5: 1 }
    ////結果： 45ms 46ms 45ms  平均 46ms
    // insertTest(collectnionTest1, "import", 10000, 5);


    ////測試 新增(import) 10w 資料  
    //// key長度 5 => 例：{ a1: 1, a2: 1, a3: 1, a4: 1, a5: 1 }
    ////結果： 407ms 457ms 383ms  平均 415ms
    // insertTest(collectnionTest1, "import", 100000, 5);

    //// 測試 新增(import ) 100w 資料
    //// key長度 5 => 例：{ a1: 1, a2: 1, a3: 1, a4: 1, a5: 1 }
    // //結果： 4345ms 4269ms 4311ms  平均 4308ms
    // insertTest(collectnionTest1, "import", 1000000, 5);

    ////----------value 變化------------------
    ////----------------------value 10字-----------------------
    ////測試 新增(import) 1w 資料  
    //// key長度 5 => 例：{ a1: 1, a2: 1, a3: 1, a4: 1, a5: 1 } valeu 10字
    ////結果： 55ms 52ms 61ms  平均 56ms
    // insertTest2(collectnionTest1, "import", 10000, 10, 5);

    ////測試 新增(import) 10w 資料  
    //// key長度 5 => 例：{ a1: 1, a2: 1, a3: 1, a4: 1, a5: 1 } valeu 10字
    ////結果： 537ms 513ms 524ms  平均 525ms
    // insertTest2(collectnionTest1, "import", 100000, 10, 5);

    //// 測試 新增(import ) 100w 資料
    //// key長度 5 => 例：{ a1: 1, a2: 1, a3: 1, a4: 1, a5: 1 }valeu 10字
    // //結果： 5485ms 5640ms 5495ms  平均 5540ms
    // insertTest2(collectnionTest1, "import", 1000000, 10, 5);
    ////-----------------value 20字------------------------
    ////測試 新增(import) 1w 資料  
    //// key長度 5 => 例：{ a1: 1, a2: 1, a3: 1, a4: 1, a5: 1 } valeu 20字
    ////結果： 83ms 63ms 61ms  平均 69ms
    // insertTest2(collectnionTest1, "import", 10000, 20, 5);

    ////測試 新增(import) 10w 資料  
    //// key長度 5 => 例：{ a1: 1, a2: 1, a3: 1, a4: 1, a5: 1 } valeu 20字
    ////結果： 654ms 626ms 651ms  平均 643ms
    // insertTest2(collectnionTest1, "import", 100000, 20, 5);

    //// 測試 新增(import ) 100w 資料
    //// key長度 5 => 例：{ a1: 1, a2: 1, a3: 1, a4: 1, a5: 1 }valeu 20字
    // //結果： 7327ms 7258ms 6993ms  平均 7192ms
    // insertTest2(collectnionTest1, "import", 1000000, 20, 5);


    ////--------------------------key長度 10-------------------------------------------------
    ////測試 新增(import) 1w 資料  
    //// key長度 10 => 例：{ a1: 1, a2: 1, a3: 1, a4: 1, a5: 1 }
    ////結果： 57ms 55ms 56ms  平均 56ms
    // insertTest(collectnionTest1, "import", 10000, 10);

    ////測試 新增(import) 10w 資料  
    ////key長度 10 => 例：{ a1: 1, a2: 1, a3: 1, a4: 1, a5: 1 }
    ////結果： 540ms 528ms 544ms  平均 537ms
    // insertTest(collectnionTest1, "import", 100000, 10);

    //// 測試 新增(import ) 100w 資料
    //// key長度 10 => 例：{ a1: 1, a2: 1, a3: 1, a4: 1, a5: 1 }
    //// 結果： 5789ms 6094ms 5775ms  平均 5886ms
    // insertTest(collectnionTest1, "import", 1000000, 10);


    ////----------value 變化------------------
    ////----------------------value 10字-----------------------
    ////測試 新增(import) 1w 資料  
    //// key長度 10 => 例：{ a1: 1, a2: 1, a3: 1, a4: 1, a5: 1 } valeu 10字
    ////結果： 78ms 82ms 72ms  平均 77ms
    // insertTest2(collectnionTest1, "import", 10000, 10, 10);

    ////測試 新增(import) 10w 資料  
    //// key長度 10 => 例：{ a1: 1, a2: 1, a3: 1, a4: 1, a5: 1 } valeu 10字
    ////結果： 1295ms 1460ms 1623ms  平均 1459ms
    // insertTest2(collectnionTest1, "import", 100000, 10, 10);

    //// 測試 新增(import ) 100w 資料
    //// key長度 10 => 例：{ a1: 1, a2: 1, a3: 1, a4: 1, a5: 1 }valeu 10字
    // //
    // insertTest2(collectnionTest1, "import", 1000000, 10, 10);
    ////-----------------value 20字------------------------
    ////測試 新增(import) 1w 資料  
    //// key長度 10 => 例：{ a1: 1, a2: 1, a3: 1, a4: 1, a5: 1 } valeu 20字
    ////結果： 83ms 63ms 61ms  平均 69ms
    // insertTest2(collectnionTest1, "import", 10000, 20, 10);

    ////測試 新增(import) 10w 資料  
    //// key長度 10 => 例：{ a1: 1, a2: 1, a3: 1, a4: 1, a5: 1 } valeu 20字
    ////結果： 654ms 626ms 651ms  平均 643ms
    // insertTest2(collectnionTest1, "import", 100000, 20, 10);

    //// 測試 新增(import ) 100w 資料
    //// key長度 10 => 例：{ a1: 1, a2: 1, a3: 1, a4: 1, a5: 1 }valeu 20字
    // //結果： 7327ms 7258ms 6993ms  平均 7192ms
    // insertTest2(collectnionTest1, "import", 1000000, 20, 10);


    ////-------------------------- 100w  key長度 15-------------------------------------------------
    //// 測試 新增(import ) 100w 資料
    //// key長度 15 => 例：{ a1: 1, a2: 1, a3: 1, a4: 1, a5: 1 }
    //// 結果： 7706ms 7877ms 7631ms  平均 7738ms
    // insertTest(collectnionTest1, "import", 1000000, 15);

    ////--------------------------key長度 20-------------------------------------------------
    ////測試 新增(import) 1w 資料  
    //// key長度 20 => 例：{ a1: 1, a2: 1, a3: 1, a4: 1, a5: 1 }
    ////結果： 106ms 106ms 102ms  平均 104ms
    // insertTest(collectnionTest1, "import", 10000, 20);

    ////測試 新增(import) 10w 資料  
    //// key長度 20 => 例：{ a1: 1, a2: 1, a3: 1, a4: 1, a5: 1 }
    //// 結果： 1047ms 1037ms 1013ms  平均 1032ms
    // insertTest(collectnionTest1, "import", 100000, 20);

    //// 測試 新增(import ) 100w 資料
    //// key長度 20 => 例：{ a1: 1, a2: 1, a3: 1, a4: 1, a5: 1 }
    //// 結果： 沒辦法執行 資料量 過多s
    // insertTest(collectnionTest1, "import", 1000000, 20);

    ////----------value 變化------------------
    ////----------------------value 10字-----------------------
    ////測試 新增(import) 1w 資料  
    //// key長度 10 => 例：{ a1: 1, a2: 1, a3: 1, a4: 1, a5: 1 } valeu 10字
    ////結果： 78ms 82ms 72ms  平均 77ms
    // insertTest2(collectnionTest1, "import", 10000, 10, 20);

    ////測試 新增(import) 10w 資料  
    //// key長度 10 => 例：{ a1: 1, a2: 1, a3: 1, a4: 1, a5: 1 } valeu 10字
    ////結果： 1295ms 1460ms 1623ms  平均 1459ms
    // insertTest2(collectnionTest1, "import", 100000, 10, 20);

    //// 測試 新增(import ) 100w 資料
    //// key長度 10 => 例：{ a1: 1, a2: 1, a3: 1, a4: 1, a5: 1 }valeu 10字
    // //
    // insertTest2(collectnionTest1, "import", 1000000, 10, 20);
    ////-----------------value 20字------------------------
    ////測試 新增(import) 1w 資料  
    //// key長度 10 => 例：{ a1: 1, a2: 1, a3: 1, a4: 1, a5: 1 } valeu 20字
    ////結果： 83ms 63ms 61ms  平均 69ms
    // insertTest2(collectnionTest1, "import", 10000, 20, 20);

    ////測試 新增(import) 10w 資料  
    //// key長度 10 => 例：{ a1: 1, a2: 1, a3: 1, a4: 1, a5: 1 } valeu 20字
    ////結果： 654ms 626ms 651ms  平均 643ms
    // insertTest2(collectnionTest1, "import", 100000, 20, 20);

    //// 測試 新增(import ) 100w 資料
    //// key長度 10 => 例：{ a1: 1, a2: 1, a3: 1, a4: 1, a5: 1 }valeu 20字
    // //結果： 7327ms 7258ms 6993ms  平均 7192ms
    // insertTest2(collectnionTest1, "import", 1000000, 20, 20);

}
var test3 = true
//test transaction
if (test3 == true) {
    var testCollection2 = db.collection("test2");

    // getAll(testCollection2);

    // db.query(aqlQuery`
    //               FOR i IN 1..3000000
    //               insert {id:i,test:"aeknacasew"} into test2 
    //             `).then(
    //     cursor => cursor.all()
    //     ).then(
    //         result => console.log(result),
    //         err => console.log(err)
    //     );

    // db.query(aqlQuery`
    //     return length(test2)           
    //      `).then(
    //     cursor => cursor.all()
    //     ).then(
    //         result => console.log(result),
    //         err => console.log(err)
    //     );

    // db.transaction({
    //     write: "test",
    // }, String(function (params) {
    //     const db = require('@arangodb').db;
    //     return db._query(aqlQuery`
    //               FOR i IN 1..1000
    //               insert {id:i,test:"aeknacasew"} into test 
    //             `).toArray();
    // }), null, 10, function (err, data) {
    //     console.log(data);
    //     console.log(err);
    // });


    var cb = function (err, data) {
        if (err) {
            console.log(err);
        }
        else {
            console.log(data);
        }
    };
    db.transaction({
        write: "test2",
    }, String(function (params) {
        // This code will be executed inside ArangoDB!
        const db = require('@arangodb').db;
        return db._query(aqlQuery`
                  FOR i IN 1..1000
                  insert {id:i,test:"aeknacasew"} into test2 
                  RETURN NEW
                `).toArray();
    }),
        null, 10000, cb);

    //db = require('@arangodb').db;

    // var cb = function (err, data) {
    //     console.log(err);
    //     console.log(data);
    // };
    // db.transaction({
    //     read: "test2",
    // }, String(function (params) {
    //     // This code will be executed inside ArangoDB!
    //     const db = require('@arangodb').db;
    //     return db._query(aqlQuery`
    //                     return length(test2)
    //                 `).toArray();
    // }),
    //     null, 10000, cb);



    // getAll(testCollection2);

    // getAll(testCollection2);

}

var test4 = false;
//test index
if (test4 == true) {

    // var testCollection2 = db.collection("test2");
    //show collection index list
    // testCollection2.indexes().then(
    //     result => console.log(result),
    //     err => console.log(err)
    // );


    // //查詢欄位id index 資料
    // testCollection2.index().then(
    //     result => console.log(result),
    //     err => console.log(err)
    // );

    // // 刪除 index 
    // testCollection2.dropIndex("test2/0").then(
    //     result => console.log(result),
    //     err => console.log(err)
    // );

    // // 建立 index
    // var indexObj = {};
    // indexObj["type"] = "hash"; //1.hash 2.skiplist 3.fulltext 4.geo1 5.geo2
    // indexObj["fields"] = []; //key 可以一次多個
    // indexObj["fields"].push("id");
    // indexObj["unique"] = false; //boolean
    // indexObj["sparse"] = false; //boolean
    // indexObj["deduplicate"] = false; //boolean
    // testCollection2.createIndex(indexObj).then(
    //     result => console.log(result),
    //     err => console.log(err)
    // );

    // //建立各種index
    // var fields = [];
    // var opts = {};
    // fields.push("id");
    // // opts 也可以只設 boolean 但defaule {unique:opts(boolean)}
    // opts["unique"] = false;
    // opts["sparse"] = false;
    // opts["deduplicate"] = false;
    // testCollection2.createHashIndex(fields, opts).then(
    //     result => console.log(result),
    //     err => console.log(err)
    // );
    // testCollection2.createSkipList(fields, opts).then(
    //     result => console.log(result),
    //     err => console.log(err)
    // );
    // testCollection2.createPersistentIndex(fields, opts).then(
    //     result => console.log(result),
    //     err => console.log(err)
    // );
    // testCollection2.createGeoIndex(fields, opts).then(
    //     result => console.log(result),
    //     err => console.log(err)
    // );
    // testCollection2.createFulltextIndex(fields, opts).then(
    //     result => console.log(result),
    //     err => console.log(err)
    // );

}

//join test
var test5 = false;
if (test5 == true) {

    // 兩張表join 資料量 1w 20s
    // 兩張表join 資料量 1w 加 hash index 15ms

    // 三張表join 資料量 1w 超過1分以上
    // 三張表join 資料量 1w 加 hash index 27ms

    // 四張表join 資料量 1w 加 hash index 40ms

    // 五張表join 資料量 1w 加 hash index 61ms

    // 兩張表join 資料量 10w 加 hash index 172ms
    // 三張表join 資料量 10w 加 hash index 303ms
    // 四張表join 資料量 10w 加 hash index 450ms
    // 五張表join 資料量 10w 加 hash index 550ms

    // 兩張表join 資料量 10w 加 skiplist index 540ms
    // 三張表join 資料量 10w 加 skiplist index 1s
    // 四張表join 資料量 10w 加 skiplist index 1.5s
    // 五張表join 資料量 10w 加 skiplist index 2s


    // 兩張表join 資料量 10w 加 persistent index 1.4s
    // 三張表join 資料量 10w 加 persistent index 2.5s
    // 四張表join 資料量 10w 加 persistent index 3.8s
    // 五張表join 資料量 10w 加 persistent index 4.4s



    //同樣查詢條件 return 值不同 速度會有差異 return 值少也會影響查詢時間
    /* 
    例：
    300ms
    for u in user 
    for a in age 
    for g in game
    filter u.id == a.id and u.id == g.id 
    limit 0,100000
    return {id:u.id,age:a.age,game:g.game} //return 3個參數

    //270ms
    for u in user 
    for a in age 
    for g in game
    filter u.id == a.id and u.id == g.id 
    limit 0,100000
    return {id:u.id,age:a.age} //return 2個參數

    //200ms
    for u in user 
    for a in age 
    for g in game
    filter u.id == a.id and u.id == g.id 
    limit 0,100000
    return {id:u.id} //return 1個參數
    */

    /*
    資料量 10w 
    23ms
    for u in user 
    return {id:u.id}    
    {
        "id": 78447
    }

    55ms
    for u in user 
    return {id:u.id,name:u.name}
    {
        "id": 78447,
        "name": "updateName"
    }

    60ms 
    for u in user 
    return {id:u.id,name:u.name,a:u.a}
    {
        "id": 78447,
        "name": "updateName",
        "a": "a"
    }

    63ms 
    for u in user 
    return {id:u.id,name:u.name,a:u.a,b:u.b}
    {
        "id": 78447,
        "name": "updateName",
        "a": "a",
        "b": "b"
    }

    72ms
    for u in user 
    return {id:u.id,name:u.name,a:u.a,b:u.b,c:u.c}
    {
        "id": 78447,
        "name": "updateName",
        "a": "a",
        "b": "b",
        "c": "c"
    }
    
    結果：return 欄位多 對查詢速度影響不大  主要影響是資料value 大小 
    
    */



    var userCollection = db.collection("user");
    var ageCollection = db.collection("age");
    var gameCollection = db.collection("game");
    var a1Collection = db.collection("a1");
    var a2Collection = db.collection("a2");

    // createHashIndexs(userCollection, ["id"], null);

    // var userCollection = db.collection("user");

    dropAllIndex(userCollection);
    dropAllIndex(ageCollection);
    dropAllIndex(gameCollection);
    dropAllIndex(a1Collection);
    dropAllIndex(a2Collection);

    setTimeout(function () {
        createHashIndexs(userCollection, ["id"], null);
        createHashIndexs(ageCollection, ["id"], null);
        createHashIndexs(gameCollection, ["id"], null);
        createHashIndexs(a1Collection, ["id"], null);
        createHashIndexs(a2Collection, ["id"], null);
    }, 1000);


    // setTimeout(function () {
    //     var now = new Date().getTime();
    //     db.query(aqlQuery`
    //         for u in user 
    //         for a in age 
    //         FILTER u.id == a.id 
    //         limit 0,10000
    //         RETURN {id:u.id}
    //         `).then(
    //         cursor => cursor.all()
    //         ).then(
    //             data => {
    //                 console.log("data:" + data);
    //                 console.log((new Date().getTime() - now) + "ms");
    //             },
    //             err => console.log(err)
    //         );
    // }, 2000);
}


function createHashIndexs(collection, fields, opts) {
    collection.createHashIndex(fields, opts).then(
        result => console.log(result),
        err => console.log(err)
    );

}

function createSkipLists(collection, fields, opts) {
    collection.createSkipList(fields, opts).then(
        result => console.log(result),
        err => console.log(err)
    );

}
function createPersistentIndexs(collection, fields, opts) {
    collection.createPersistentIndex(fields, opts).then(
        result => console.log(result),
        err => console.log(err)
    );

}



//dropAllIndex
function dropAllIndex(collection) {
    collection.indexes().then(
        data => {
            for (let i = 0; i < data.length; i++) {
                if (data[i].type != "primary") {
                    dropIndexs(collection, data[i].id);
                }
            }
        },
        err => console.log(err)
    );
}

function dropIndexs(collection, id) {
    collection.dropIndex(id).then(
        result => console.log(result),
        err => console.log(err)
    );
}

//import data
function imports(collection, data) {
    var now = new Date().getTime();
    collection.import(data).then(
        result => {
            console.log(result)
            console.log(new Date().getTime() + "-" + now + "==>" + (new Date().getTime() - now));
        },
        err => console.log(err)
    )
}

//查詢collection all data count
function getAll(collection, str) {
    str = typeof str === "undefined" ? "" : str.toString("utf8");
    var now = new Date().getTime();
    collection.all().then(
        cursor => cursor.all()
    ).then(
        data => {
            log.debug(str + " data count:" + data);
            log.debug(new Date().getTime() + "-" + now + "=>" + (new Date().getTime() - now));
        },
        err => log.error(err)
    );
}

//truncate table
function truncate(collection) {
    collection.truncate().then(
        () => console.log("truncate collection"),
        err => console.log(err)
    )
}


//check collection 是否以被建立  有：就把原本的collection 回傳出去 沒有：重新建立新的collection 
function createCollection(db, collectName) {
    collectName = "" + collectName;
    db.listCollections(function (err, data) {
        if (!err) {
            let isCreateCollect = true;
            for (let i = 0, len = data.length; i < len; i++) {
                if (isCreateCollect) {
                    let name = data[i].name.toString("utf8");
                    if (name == collectName) {
                        isCreateCollect = false;
                    }
                }
                else {
                    break;
                }
            }
            if (isCreateCollect) {
                var newCollection = db.collection(collectName);
                newCollection.create().then(
                    () => {
                        console.log("create collection ");
                        return newCollection;
                    },
                    err => {
                        console.log(err);
                        return null;
                    }
                );
            }
            else {
                var oldCollection = db.collection(collectName);
                return oldCollection;
            }
        }
        else {
            log.error(err);
            return null;
        }
    });
}




//test function
function insertTest(collection, type, valLen, keyLen) {

    var arr = [];
    var testLen = keyLen;
    for (let i = 1, len = valLen; i <= len; i++) {
        let obj = {};
        for (let j = 1, keyLen = testLen; j <= keyLen; j++) {
            obj["a" + j] = i;
        }
        arr.push(obj);
    }
    if (type == "import") {
        var now = new Date().getTime();
        collection.import(arr).then(
            result => {
                console.log(result)
                console.log(new Date().getTime() + "-" + now + "==>" + (new Date().getTime() - now));

                //truncate(collectnionTest1);
            },
            err => console.log(err)
        )
    }
    else if (type == "insert") {
        var str = JSON.stringify(arr);
        db.query(aqlQuery`
        insert {a:${str}} into test1
        return NEW
        `
        ).then(
            cursor => cursor.all()
        ).then(
            result => console.log(result),
            err => console.log(err)
        );

    }
    else {
        console.log("type fail");
    }
}

// value string
function insertTest2(collection, type, valLen, valueStrLen, keyLen) {
    var crypto = require('crypto');
    var buf = crypto.randomBytes(valueStrLen);
    var arr = [];
    var testLen = keyLen;
    for (let i = 1, len = valLen; i <= len; i++) {
        let obj = {};
        for (let j = 1, keyLen = testLen; j <= keyLen; j++) {
            obj["a" + j] = buf.toString('hex');
        }
        arr.push(obj);
    }
    if (type == "import") {
        var now = new Date().getTime();
        console.log(arr);
        collection.import(arr).then(
            result => {
                console.log(result)
                console.log(new Date().getTime() + "-" + now + "==>" + (new Date().getTime() - now));


                //truncate(collection);
            },
            err => console.log(err)
        )
    }
    else if (type == "insert") {
        var str = JSON.stringify(arr);
        db.query(aqlQuery`
        insert {a:${str}} into test1
        return NEW
        `
        ).then(
            cursor => cursor.all()
        ).then(
            result => console.log(result[0]._key),
            err => console.log(err)
        );

    }
    else {
        console.log("type fail");
    }
}



