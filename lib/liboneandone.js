/**
 * Created by Ali on 7/28/2016.
 */
merge = require('./merge')
req = require('./req')
var oneandone = {}
/**
 merge is used to "flatten" functions
 into the top level namespace

 instead of calling

 oneandone.oneandone.server

 with merge we can call

 oneandone.server
 **/
merge('./server', oneandone)
merge('./req.js', oneandone)
merge('./types', oneandone)
merge('./image', oneandone)
merge('./shared-storage', oneandone)
merge('./firewall-policy', oneandone)
merge('./loadbalancer', oneandone)
merge('./public-ip', oneandone)
merge('./private-network', oneandone)
merge('./vpn', oneandone)
merge('./monitoring-center', oneandone)
merge('./monitoring-policy', oneandone)
merge('./log', oneandone)
merge('./user', oneandone)
merge('./role', oneandone)
merge('./informational-operations', oneandone)

module.exports = (function () {
    return oneandone
})()

