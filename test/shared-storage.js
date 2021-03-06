/**
 * Created by Ali on 8/7/2016.
 */

var assert = require('assert');
var oneandone = require('../lib/liboneandone');
var helper = require('../test/testHelper');
var server = {};
var sharedStorage = {};
var appliance = {};
var dataCenter = {};


describe('Shared Storage tests', function () {
    this.timeout(900000);

    before(function (done) {
        helper.authenticate(oneandone);
        var options = {
            query: "centos"
        };
        oneandone.listServerAppliancesWithOptions(options, function (error, response, body) {
            var res = JSON.parse(body);
            appliance = res[0];
            var options = {
                query: "us"
            };
            oneandone.listDatacentersWithOptions(options, function (error, response, body) {
                var res1 = JSON.parse(body);
                dataCenter = res1[0];
            });
            var serverData = {
                "name": "Node sharedStorage",
                "description": "description",
                "hardware": {
                    "vcore": 2,
                    "cores_per_processor": 1,
                    "ram": 2,
                    "hdds": [
                        {
                            "size": 40,
                            "is_main": true
                        }
                    ]
                },
                "appliance_id": appliance.id,
                "datacenter_id": dataCenter.id
            };
            oneandone.createServer(serverData, function (error, response, body) {
                server = JSON.parse(body);
                var storageData = {
                    "name": "Node storage test",
                    "description": "My shared storage test description",
                    "size": 50
                };
                helper.checkServerReady(server, function () {
                    oneandone.createSharedStorage(storageData, function (error, response, body) {
                        helper.assertNoError(202, response, function (result) {
                            assert(result);
                        });
                        assert.notEqual(response, null);
                        sharedStorage = JSON.parse(body);
                        done();
                    });
                });
            });
        });
    });

    removeServer = function (serverToRemove, callback) {
        if (serverToRemove.id) {
            helper.checkServerReady(serverToRemove, function () {
                oneandone.deleteServer(serverToRemove.id,false, function (error, response, body) {
                    callback();
                });
            });
        }
        else {
            callback();
        }
    };

    removeStorage = function (storageToRemove, callback) {
        if (storageToRemove.id) {
            oneandone.deleteSharedStorage(storageToRemove.id, function (error, response, body) {
                callback();
            });
        }
        else {
            callback();
        }
    };
    after(function (done) {
        removeStorage(sharedStorage, function () {
            setTimeout(function () {
                removeServer(server, function () {
                    done();
                });
            }, 100000);
        });
    });

    it('List Shared Storages', function (done) {
        setTimeout(function () {
            oneandone.listSharedStorages(function (error, response, body) {
                helper.assertNoError(200, response, function (result) {
                    assert(result);
                });
                assert.notEqual(response, null);
                assert.notEqual(body, null);
                var object = JSON.parse(body);
                assert(object.length > 0);
                done();
            });
        }, 7000);
    });

    it('List Shared Storages with options', function (done) {
        var options = {
            query: "node"
        };

        setTimeout(function () {
            oneandone.listSharedStoragesWithOptions(options, function (error, response, body) {
                helper.assertNoError(200, response, function (result) {
                    assert(result);
                });
                assert.notEqual(response, null);
                assert.notEqual(body, null);
                var object = JSON.parse(body);
                assert(object.length > 0);
                done();
            });
        }, 5000);
    });

    it('Get Shared Storage', function (done) {
        oneandone.getSharedStorage(sharedStorage.id, function (error, response, body) {
            helper.assertNoError(200, response, function (result) {
                assert(result);
            });
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            var object = JSON.parse(body);
            assert.equal(object.id, sharedStorage.id);
            done();
        });
    });

    it('Update Shared Storage', function (done) {
        updateData = {
            "name": "node js storage test rename",
            "description": "My shared storage rename"
        };
        oneandone.updateSharedStorage(sharedStorage.id, updateData, function (error, response, body) {
            helper.assertNoError(202, response, function (result) {
                assert(result);
            });
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            var object = JSON.parse(body);
            assert.equal(object.name, updateData.name);
            done();
        });
    });
    it('Attach server', function (done) {
        attachData = {
            "servers": [
                {
                    "id": server.id,
                    "rights": oneandone.StorageServerRights.RW
                }
            ]
        };
        oneandone.attachServerToSharedStorage(sharedStorage.id, attachData, function (error, response, body) {
            helper.assertNoError(202, response, function (result) {
                assert(result);
            });
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            setTimeout(function () {
                done();
            }, 10000);
        });
    });

    it('List Shared Storage Servers', function (done) {
        oneandone.listSharedStorageServers(sharedStorage.id, function (error, response, body) {
            helper.assertNoError(200, response, function (result) {
                assert(result);
            });
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            var object = JSON.parse(body);
            assert(object.length > 0);
            done();
        });
    });

    it('Get Shared Storage Server', function (done) {
        oneandone.getSharedStorageServer(sharedStorage.id, server.id, function (error, response, body) {
            helper.assertNoError(200, response, function (result) {
                assert(result);
            });
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            var object = JSON.parse(body);
            assert.equal(object.id, server.id);
            done();
        });
    });

    it('Delete Shared Storage Server', function (done) {
        oneandone.detachServerFromSharedStorage(sharedStorage.id, server.id, function (error, response, body) {
            helper.assertNoError(202, response, function (result) {
                assert(result);
            });
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            var object = JSON.parse(body);
            assert.equal(object.id, sharedStorage.id);
            done();
        });

    });

    it('List Access Credentials', function (done) {
        oneandone.getAccessCredentials(function (error, response, body) {
            helper.assertNoError(200, response, function (result) {
                assert(result);
            });
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            var object = JSON.parse(body);
            assert(object.length > 0);
            done();
        });
    });

    it('Change access password', function (done) {
        updateData = {
            "password": "Test123!"
        };
        oneandone.changePassword(updateData, function (error, response, body) {
            helper.assertNoError(202, response, function (result) {
                assert(result);
            });
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            var object = JSON.parse(body);
            assert.equal(object.name, updateData.name);
            done();
        });
    });
})
;
