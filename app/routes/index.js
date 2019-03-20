var express = require('express');
var router = express.Router();
const mongo = require("mongodb-curd");
const batadate = "list";
const coll = "user";
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

//获取全体成员信息
router.get('/api/getUser', function(req, res, next) {
    mongo.find(batadate, coll, function(result) {
        if (result.length === 0) {
            res.send({ code: 0, msg: "查询失败" })
        } else {
            res.send({ code: 1, data: result })
        }
    })
});
//获取单个成员信息
router.get('/api/getOne', function(req, res, next) {
    const id = req.query.id;
    if (!id) {
        res.send({ code: 3, msg: "参数无效" })
    }
    mongo.find(batadate, coll, { "_id": id }, function(result) {
        if (result.length === 0) {
            res.send({ code: 0, msg: "查无此人" })
        } else {
            res.send({ code: 1, data: result })
        }
    })
});
//更改成员信息
router.get('/api/upDate', function(req, res, next) {
    const id = req.query.id;
    const obj = req.query;
    delete obj.id;
    console.log(obj)
    mongo.update(batadate, coll, [{ "_id": id }, obj], function(result) {
        if (result.length === 0) {
            res.send({ code: 0, msg: "更改失败" })
        } else {
            res.send({ code: 1, msg: "修改成功" })
        }
    })
});
//添加成员
router.get('/api/getAdd', function(req, res, next) {
    mongo.insert(batadate, coll, req.query, function(result) {
        if (result.length === 0) {
            res.send({ code: 0, msg: "增加失败" })
        } else {
            res.send({ code: 1, msg: "添加成功" })
        }
    })
});
//删除信息
router.get('/api/delete', function(req, res, next) {
    const id = req.query.id;
    if (!id) {
        res.send({ code: 3, msg: "参数无效" })
    }
    mongo.remove(batadate, coll, { "_id": id }, function(result) {
        if (result.length === 0) {
            res.send({ code: 0, msg: "删除无效" })
        } else {
            res.send({ code: 1, msg: "删除成功" })
        }
    })
});
//模糊查找
router.get('/api/search', function(req, res, next) {
    const name = new RegExp(req.query.name);
    mongo.find(batadate, coll, { 'name': name }, function(result) {
        if (result.length === 0) {
            res.send({ code: 0, msg: "查询无效" })
        } else {
            res.send({ code: 1, data: result })
        }
    })
});
module.exports = router;