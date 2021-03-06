/**
 * Created by Ali on 7/28/2016.
 */

var assert = require('assert');
var oneandone = require('../lib/liboneandone');
var helper = require('../test/testHelper');
var server = {};
var fixedInstaceserver = {};
var hardwareFlavour = {};
var currentHdd = {};
var currentImage = {};
var appliance = {};
var dataCenter = {};


describe('Server tests', function () {
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
                var serverData = {
                    "name": "Node Server",
                    "description": "description",
                    "hardware": {
                        "vcore": 2,
                        "cores_per_processor": 1,
                        "ram": 2,
                        "hdds": [
                            {
                                "size": 40,
                                "is_main": true
                            },
                            {
                                "size": 20,
                                "is_main": false
                            }
                        ]
                    },
                    "appliance_id": appliance.id,
                    "datacenter_id": dataCenter.id
                };
                oneandone.createServer(serverData, function (error, response, body) {
                    helper.assertNoError(202, response, function (result) {
                        assert(result);
                    });
                    assert.equal(error, null);
                    server = JSON.parse(body);
                    assert.notEqual(response, null);
                    assert.notEqual(body, null);
                    assert.equal(server.name, serverData.name)
                    done();
                });
            });

        });
    });

    removeServer = function (serverToRemove, callback) {
        if (serverToRemove.id) {
            helper.checkServerReady(serverToRemove, function () {
                oneandone.deleteServer(serverToRemove.id, false, function (error, response, body) {
                    helper.assertNoError(202, response, function (result) {
                        assert(result);
                    });
                    callback();
                });
            });
        }
        else {
            callback();
        }
    };
    after(function (done) {
        removeServer(server, function () {
            removeServer(fixedInstaceserver, function () {
                done();
            });
        });
    });

    it('Create Fixed Instance server', function (done) {
        fixedInstace = {
            "name": "Node Fixed Instance server",
            "description": "My server description",
            "hardware": {
                "fixed_instance_size_id": "65929629F35BBFBA63022008F773F3EB"
            },
            "appliance_id": appliance.id,
            "datacenter_id": dataCenter.id
        };
        oneandone.createServer(fixedInstace, function (error, response, body) {
            helper.assertNoError(202, response, function (result) {
                assert(result);
            });
            fixedInstaceserver = JSON.parse(body);
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            assert.equal(fixedInstaceserver.name, fixedInstace.name)
            done();
        });
    });

    it('List servers', function (done) {
        oneandone.listServers(function (error, response, body) {
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

    it('List servers with options', function (done) {
        var options = {
            query: "node"
        };
        oneandone.listServersWithOptions(options, function (error, response, body) {
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

    it('List Server Flavours', function (done) {
        oneandone.listHardwareFlavours(function (error, response, body) {
            helper.assertNoError(200, response, function (result) {
                assert(result);
            });
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            var object = JSON.parse(body);
            assert(object.length > 0);
            hardwareFlavour = object[0];
            done();
        });
    });

    it('Get Server Flavour', function (done) {
        oneandone.getHardwareFlavour(hardwareFlavour.id, function (error, response, body) {
            helper.assertNoError(200, response, function (result) {
                assert(result);
            });
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            done();
        });
    });

    it('Get server status', function (done) {
        oneandone.getServerStatus(server.id, function (error, response, body) {
            helper.assertNoError(200, response, function (result) {
                assert(result);
            });
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            done();
        });
    });

    it('Get server', function (done) {
        oneandone.getServer(server.id, function (error, response, body) {
            helper.assertNoError(200, response, function (result) {
                assert(result);
            });
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            var object = JSON.parse(body);
            assert.equal(object.id, server.id);
            assert.equal(object.name, server.name);
            done();
        });
    });

    it('Update server', function (done) {
        updateData = {
            "name": "Node Server - UPDATED",
            "description": "desc",

        };
        helper.checkServerReady(server, function () {
            oneandone.updateServer(server.id, updateData, function (error, response, body) {
                helper.assertNoError(200, response, function (result) {
                    assert(result);
                });
                assert.notEqual(response, null);
                assert.notEqual(body, null);
                var object = JSON.parse(body);
                assert.equal(object.id, server.id);
                assert.equal(object.name, updateData.name);
                assert.equal(object.description, updateData.description);
                done();
            });
        });
    });

    it('Update server status', function (done) {
        updateData = {
            "action": oneandone.ServerUpdateAction.REBOOT,
            "method": oneandone.ServerUpdateMethod.SOFTWARE

        };
        helper.checkServerReady(server, function () {
            oneandone.updateServerStatus(server.id, updateData, function (error, response, body) {
                helper.assertNoError(202, response, function (result) {
                    assert(result);
                });
                assert.notEqual(response, null);
                assert.notEqual(body, null);
                var object = JSON.parse(body);
                assert.equal(object.id, server.id);
                done();
            });
        });
    });

    it('Get Server Hardware', function (done) {
        oneandone.getHardware(server.id, function (error, response, body) {
            helper.assertNoError(200, response, function (result) {
                assert(result);
            });
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            done();
        });
    });

    it('Update server Hardware', function (done) {
        updateHardwareData = {
            "vcore": 4,
            "cores_per_processor": 2,
            "ram": 6
        };
        helper.turnOffServer(server, function () {
            helper.checkServerReady(server, function () {
                oneandone.updateHardware(server.id, updateHardwareData, function (error, response, body) {
                    helper.assertNoError(202, response, function (result) {
                        assert(result);
                    });
                    assert.notEqual(response, null);
                    assert.notEqual(body, null);
                    var object = JSON.parse(body);
                    assert.equal(object.id, server.id);
                    done();
                });
            });
        });
    });

    it('List Servers HDDs ', function (done) {
        helper.checkServerReady(server, function () {
            oneandone.listHdds(server.id, function (error, response, body) {
                helper.assertNoError(200, response, function (result) {
                    assert(result);
                });
                assert.notEqual(body, null);
                var object = JSON.parse(body);
                assert(object.length > 0);
                currentHdd = object[0];
                done();
            });
        });
    });

    it('Add Hdd to the server', function (done) {
        hddData = {
            "hdds": [
                {
                    "size": 40,
                    "is_main": false
                }
            ]
        };
        helper.checkServerReady(server, function () {
            oneandone.addHdd(server.id, hddData, function (error, response, body) {
                helper.assertNoError(202, response, function (result) {
                    assert(result);
                });
                var hdds = JSON.parse(body);
                //give time for the Hdd to be added
                helper.checkServerReady(server, function () {
                    assert.notEqual(response, null);
                    assert.notEqual(body, null);
                    assert(hdds.hardware.hdds.length > 0);
                    done();
                });
            });
        });
    });

    it('Get Server specific Hdd', function (done) {
        oneandone.getHdd(server.id, currentHdd.id, function (error, response, body) {
            helper.assertNoError(200, response, function (result) {
                assert(result);
            });
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            done();
        });
    });

    it('Update server specific Hdd', function (done) {
        updateData = {
            "size": 40
        };
        helper.checkServerReady(server, function () {
            oneandone.updateHdd(server.id, currentHdd.id, updateData, function (error, response, body) {
                helper.assertNoError(202, response, function (result) {
                    assert(result);
                });
                assert.notEqual(response, null);
                assert.notEqual(body, null);
                var object = JSON.parse(body);
                assert.equal(object.id, server.id);
                done();
            });
        });
    });

    it('Delete server specific Hdd', function (done) {
        helper.checkServerReady(server, function () {
            oneandone.listHdds(server.id, function (error, response, body) {
                var hddList = JSON.parse(body);
                var hddToDelete;
                for (var i = 0; i < hddList.length; i++) {
                    var curHdd = hddList[i];
                    if (!curHdd.is_main) {
                        hddToDelete = curHdd;
                        break;
                    }
                }
                if (hddToDelete) {
                    oneandone.deleteHdd(server.id, hddToDelete.id, function (error, response, body) {
                        helper.assertNoError(202, response, function (result) {
                            assert(result);
                        });
                        assert.notEqual(response, null);
                        assert.notEqual(body, null);
                        var object = JSON.parse(body);
                        assert.equal(object.id, server.id);
                        done();
                    });
                }
            });

        });
    });

    it('Get Server Image', function (done) {
        helper.checkServerReady(fixedInstaceserver, function () {
            oneandone.getServerImage(fixedInstaceserver.id, function (error, response, body) {
                helper.assertNoError(200, response, function (result) {
                    assert(result);
                });
                assert.notEqual(response, null);
                assert.notEqual(body, null);
                var object = JSON.parse(body);
                currentImage = object;
                done();
            });
        });
    });

    it('Update server Image', function (done) {
        updateData = {
            "id": currentImage.id,
            "password": "Test123!"
        };
        helper.checkServerReady(fixedInstaceserver, function () {
            oneandone.updateServerImage(fixedInstaceserver.id, updateData, function (error, response, body) {
                helper.assertNoError(202, response, function (result) {
                    assert(result);
                });
                assert.notEqual(response, null);
                assert.notEqual(body, null);
                var object = JSON.parse(body);
                assert.equal(object.id, fixedInstaceserver.id);
                done();
            });
        });
    });

});
