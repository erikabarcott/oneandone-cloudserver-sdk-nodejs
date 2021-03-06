/**
 * Created by Ali on 8/18/2016.
 */
var assert = require('assert');
var oneandone = require('../lib/liboneandone');
var helper = require('../test/testHelper');
var appliance = {};
var dvdIso = {};
var dataCenter = {};

describe('Monitoring center tests', function () {
    this.timeout(900000);

    before(function (done) {
        helper.authenticate(oneandone);
        done();
    });

    it('List Usages with fixed period', function (done) {
        var options = {
            page: 1
        };
        oneandone.listUsagesFixedPeriodWithOptions(oneandone.PeriodType.LAST_30D, options, function (error, response, body) {
            helper.assertNoError(200, response, function (result) {
                assert(result);
            });
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            done();
        });
    });

    it('List Usages with custom period', function (done) {
        var start_date = "2015-19-05T00:05:00Z";
        var end_date = "2016-19-07T00:05:00Z";
        oneandone.listUsagesCustomPeriodWithOptions(start_date, end_date, null, function (error, response, body) {
            helper.assertNoError(200, response, function (result) {
                assert(result);
            });
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            done();
        });
    });

    it('List Server Appliances', function (done) {
        oneandone.listServerAppliances(function (error, response, body) {
            helper.assertNoError(200, response, function (result) {
                assert(result);
            });
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            var object = JSON.parse(body);
            assert(object.length > 0);
            appliance = object[0];
            done();
        });
    });

    it('List Server Appliances with options', function (done) {
        var options = {
            page: 1
        };

        setTimeout(function () {
            oneandone.listServerAppliancesWithOptions(options, function (error, response, body) {
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

    it('Get Server Appliance', function (done) {
        oneandone.getServerAppliance(appliance.id, function (error, response, body) {
            helper.assertNoError(200, response, function (result) {
                assert(result);
            });
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            var object = JSON.parse(body);
            assert.equal(object.id, appliance.id);
            done();
        });
    });

    it('List DVD ISO', function (done) {
        oneandone.listDvdIso(function (error, response, body) {
            helper.assertNoError(200, response, function (result) {
                assert(result);
            });
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            var object = JSON.parse(body);
            assert(object.length > 0);
            dvdIso = object[0];
            done();
        });
    });

    it('List DVD ISO with options', function (done) {
        var options = {
            page: 1
        };

        setTimeout(function () {
            oneandone.listDvdIsoWithOptions(options, function (error, response, body) {
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

    it('Get DVD ISO', function (done) {
        oneandone.getDvdIso(dvdIso.id, function (error, response, body) {
            helper.assertNoError(200, response, function (result) {
                assert(result);
            });
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            var object = JSON.parse(body);
            assert.equal(object.id, dvdIso.id);
            done();
        });
    });

    it('Ping', function (done) {
        oneandone.pingApi(function (error, response, body) {
            helper.assertNoError(200, response, function (result) {
                assert(result);
            });
            assert.notEqual(response, null);
            assert.equal(body, '["PONG"]');
            done();
        });
    });

    it('Ping Authentication', function (done) {
        oneandone.pingApiAuthentication(function (error, response, body) {
            helper.assertNoError(200, response, function (result) {
                assert(result);
            });
            assert.notEqual(response, null);
            assert.equal(body, '["PONG"]');
            done();
        });
    });

    it('Pricing', function (done) {
        oneandone.getPricing(function (error, response, body) {
            helper.assertNoError(200, response, function (result) {
                assert(result);
            });
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            done();
        });
    });

    it('List Datacenters ', function (done) {
        oneandone.listDatacenters(function (error, response, body) {
            helper.assertNoError(200, response, function (result) {
                assert(result);
            });
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            var object = JSON.parse(body);
            assert(object.length > 0);
            dataCenter = object[0];
            done();
        });
    });

    it('List Datacenters with options', function (done) {
        var options = {
            page: 1
        };

        setTimeout(function () {
            oneandone.listDatacentersWithOptions(options, function (error, response, body) {
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

    it('Get Datacenters ISO', function (done) {
        oneandone.getDatacenters(dataCenter.id, function (error, response, body) {
            helper.assertNoError(200, response, function (result) {
                assert(result);
            });
            assert.notEqual(response, null);
            assert.notEqual(body, null);
            var object = JSON.parse(body);
            assert.equal(object.id, dataCenter.id);
            done();
        });
    });
});