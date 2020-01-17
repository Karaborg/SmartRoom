var Relay = require('../database.js').Relay;

exports.create = function (params, callback) {

    var relay = new Relay(params);

    relay.save(function (err, accountItem) {
        if (err) {
            callback({success: false, error:err});
        }else{
            callback({success: true, account: accountItem});
        }
    });

};
exports.list = function (callback) {
    find({}, callback);
};
function find(query, callback) {
    Relay.find(query).exec(function (err, accounts) {
        if (err) {
            callback({success: false, error: err});
        } else {
            callback({success: true, accounts: accounts});
        }
    });
}

exports.deleteById = function (id, callback) {
    Relay.remove({switchName: id}, function (err) {
        if (err) {
            callback({success: false, error: err});
        } else {
            callback({success: true});
        }
    });
};

exports.findById = function (id, callback) {
    Relay.findOne({switchName: id}, function (err, result) {
        if(err){
            callback({success:false, account:result})
        }else{
            callback({success:true, account:result});
        }
    });
};