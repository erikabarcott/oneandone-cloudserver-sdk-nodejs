/**
 * Created by Ali on 8/7/2016.
 */
var assert = require('assert');
var oneandone = require('../lib/liboneandone');
var helper = require('../test/testHelper');
var server = {};
var firewallPolicy = {};
var appliance = {};
var dataCenter = {};


describe('Firewall Policy tests', function () {
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
                "name": "Node firewall policy",
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
                var firewallData = {
                    "name": "node firewall policy",
                    "description": "My firewall policy description",
                    "rules": [
                        {
                            "protocol": "TCP",
                            "port_from": 80,
                            "port_to": 80,
                            "source": "0.0.0.0"
                        },
                        {
                            "protocol": "TCP",
                            "port_from": 443,
                            "port_to": 443,
                            "source": "0.0.0.0"
                        }
                    ]
                };
                helper.checkServerReady(server, function () {
                    oneandone.createFirewallPolicy(firewallData, function (error, response, body) {
                        helper.assertNoError(202, response, function (result) {
                            assert(result);
                        });
                        assert.notEqual(response, null);
                        firewallPolicy = JSON.parse(body);
                        done();
                    });
                });
            });
        });
    });

    removeServer = function (serverToRemove, callback) {
        if (serverToRemove.id) {
            helper.checkServerReady(serverToRemove, function () {
                oneandone.deleteServer(serverToRemove.id, false, function (error, response, body) {
                    callback();
                });
            });
        }
        else {
            callback();
        }
    };

    removeFirewallPolicy = function (firewallToRemove, callback) {
        if (firewallToRemove.id) {
            oneandone.deleteFirewallPolicy(firewallToRemove.id, function (error, response, body) {
                callback();
            });
        }
        else {
            callback();
        }
    };
    after(function (done) {
        removeFirewallPolicy(firewallPolicy, function () {
            setTimeout(function () {
                removeServer(server, function () {
                    done();
                });
            }, 100000);
        });
    });

    it('List Firewall Policies', function (done) {
        setTimeout(function () {
            oneandone.listFirewallPolicies(function (error, response, body) {
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

    it('List Firewall Policies with options', function (done) {
        var options = {
            query: "node"
        };

        setTimeout(function () {
            oneandone.listFirewallPoliciesWithOptions(options, function (error, response, body) {
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

    it('Get Firewall Policy', function (done) {
        oneandone.getFirewallPolicy(firewallPolicy.id, function (error, response, body) {
            helper.assertNoError(200, response, function (result) {
                assert(result);
            });
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            var object = JSON.parse(body);
            assert.equal(object.id, firewallPolicy.id);
            done();
        });
    });

    it('Update Firewall Policy', function (done) {
        updateData = {
            "name": "node js Firewall test rename",
            "description": "My Firewall Policy rename"
        };
        oneandone.updateFirewallPolicy(firewallPolicy.id, updateData, function (error, response, body) {
            helper.assertNoError(200, response, function (result) {
                assert(result);
            });
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            var object = JSON.parse(body);
            assert.equal(object.name, updateData.name);
            done();
        });
    });

    it('Assign server ip', function (done) {
        setTimeout(function () {
            helper.updateServerData(server, function (updatedServer) {
                server = updatedServer;
                assignData = {
                    "server_ips": [
                        server.ips[0].id
                    ]
                };
                oneandone.assignServerIpToFirewallPolicy(firewallPolicy.id, assignData, function (error, response, body) {
                    helper.assertNoError(202, response, function (result) {
                        assert(result);
                    });
                    assert.notEqual(response, null);
                    assert.notEqual(body, null);

                    var object = JSON.parse(body);
                    assert(object.server_ips.length > 0);
                    done();
                });
            });
        }, 10000);
    });

    it('List Firewall Policy server ips', function (done) {
        oneandone.listFirewallPolicyServerIps(firewallPolicy.id, function (error, response, body) {
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

    it('Get Firewall Policy server ip', function (done) {
        oneandone.getFirewallPolicyServerIp(firewallPolicy.id, server.ips[0].id, function (error, response, body) {
            helper.assertNoError(200, response, function (result) {
                assert(result);
            });
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            var object = JSON.parse(body);
            assert.equal(object.id, server.ips[0].id);
            done();
        });
    });

    it('Delete Firewall Policy server ip', function (done) {
        oneandone.unassignServerIpFromFirewallPolicy(firewallPolicy.id, server.ips[0].id, function (error, response, body) {
            helper.assertNoError(202, response, function (result) {
                assert(result);
            });
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            var object = JSON.parse(body);
            assert.equal(object.id, firewallPolicy.id);
            done();
        });

    });

    it('Add rule', function (done) {
        ruleData = {
            "rules": [
                {
                    "protocol": oneandone.RuleProtocol.TCP,
                    "port_from": 4567,
                    "port_to": 4567,
                    "source": "0.0.0.0"
                }
            ]
        };
        oneandone.addRulesToFirewallPolicy(firewallPolicy.id, ruleData, function (error, response, body) {
            helper.assertNoError(202, response, function (result) {
                assert(result);
            });
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            setTimeout(function () {
                var object = JSON.parse(body);
                assert(object.rules.length > 0);
                done();
            }, 10000);
        });
    });

    it('List Firewall Policy Rules', function (done) {
        oneandone.listFirewallPolicyRules(firewallPolicy.id, function (error, response, body) {
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

    it('Get Firewall Policy Rule', function (done) {
        oneandone.getFirewallPolicyRule(firewallPolicy.id, firewallPolicy.rules[0].id, function (error, response, body) {
            helper.assertNoError(200, response, function (result) {
                assert(result);
            });
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            done();
        });
    });

    it('Delete Firewall Policy Rule', function (done) {
        oneandone.removeRuleFromFirewallPolicy(firewallPolicy.id, firewallPolicy.rules[0].id, function (error, response, body) {
            helper.assertNoError(202, response, function (result) {
                assert(result);
            });
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            var object = JSON.parse(body);
            assert.equal(object.id, firewallPolicy.id);
            done();
        });

    });
});
