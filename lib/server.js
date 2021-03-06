/**
 * Created by Ali on 7/28/2016.
 */
module.exports = {
    listServers: function (callback) {
        req.is_get(["servers"], callback)
    },

    listServersWithOptions: function (options, callback) {
        var path = "servers";
        if (options) {
            path += "?";
            if (options.page) {
                path += "&page=" + options.page;
            }
            if (options.perPage) {
                path += "&per_page=" + options.perPage;
            }
            if (options.sort) {
                path += "&sort=" + options.sort;
            }
            if (options.query) {
                path += "&q=" + options.query;
            }
            if (options.fields) {
                path += "&fields=" + options.fields;
            }
        }

        req.is_get([path], callback)
    },

    listHardwareFlavours: function (callback) {
        req.is_get(["servers/fixed_instance_sizes"], callback)
    },

    getHardwareFlavour: function (favour_id, callback) {
        req.is_get(["servers", "fixed_instance_sizes", favour_id], callback)
    },

    createServer: function (json, callback) {
        req.is_post(["servers"], json, callback)
    },

    getServer: function (srv_id, callback) {
        req.is_get(["servers", srv_id], callback)
    },

    getServerStatus: function (srv_id, callback) {
        req.is_get(["servers", srv_id, "status"], callback)
    },

    updateServer: function (srv_id, json, callback) {
        req.is_put(["servers", srv_id], json, callback)
    },

    updateServerStatus: function (srv_id, json, callback) {
        req.is_put(["servers", srv_id, "status/action"], json, callback)
    },

    deleteServer: function (srv_id, keep_ips, callback) {
        if (!keep_ips) {
            keep_ips = false;
        }
        req.is_del(["servers", srv_id + "?keep_ips=" + keep_ips], callback)
    },

    getHardware: function (srv_id, callback) {
        req.is_get(["servers", srv_id, "hardware"], callback)
    },

    updateHardware: function (srv_id, json, callback) {
        req.is_put(["servers", srv_id, "hardware"], json, callback)
    },

    listHdds: function (srv_id, callback) {
        req.is_get(["servers", srv_id, "hardware/hdds"], callback)
    },

    addHdd: function (srv_id, json, callback) {
        req.is_post(["servers", srv_id, "hardware/hdds"], json, callback)
    },

    getHdd: function (srv_id, hdd_id, callback) {
        req.is_get(["servers", srv_id, "hardware/hdds", hdd_id], callback)
    },

    updateHdd: function (srv_id, hdd_id, json, callback) {
        req.is_put(["servers", srv_id, "hardware/hdds", hdd_id], json, callback)
    },

    deleteHdd: function (srv_id, hdd_id, callback) {
        req.is_del(["servers", srv_id, "hardware/hdds", hdd_id], callback)
    },

    getServerImage: function (srv_id, callback) {
        req.is_get(["servers", srv_id, "image"], callback)
    },

    updateServerImage: function (srv_id, json, callback) {
        req.is_put(["servers", srv_id, "image"], json, callback)
    },

    listIps: function (srv_id, callback) {
        req.is_get(["servers", srv_id, "ips"], callback)
    },

    addIp: function (srv_id, json, callback) {
        req.is_post(["servers", srv_id, "ips"], json, callback)
    },

    getIp: function (srv_id, ip_id, callback) {
        req.is_get(["servers", srv_id, "ips", ip_id], callback)
    },

    deleteIp: function (srv_id, ip_id,json, callback) {
        req.is_delWithBody(["servers", srv_id, "ips", ip_id],json, callback)
    },

    listIpFirewallPolicies: function (srv_id, ip_id, callback) {
        req.is_get(["servers", srv_id, "ips", ip_id, "firewall_policy"], callback)
    },

    addFirewallPolicy: function (srv_id, ip_id, json, callback) {
        req.is_put(["servers", srv_id, "ips", ip_id, "firewall_policy"], json, callback)
    },

    deleteIpFirewallPolicy: function (srv_id, ip_id, callback) {
        req.is_del(["servers", srv_id, "ips", ip_id, "firewall_policy"], callback)
    },

    listIpLoadBalancer: function (srv_id, ip_id, callback) {
        req.is_get(["servers", srv_id, "ips", ip_id, "load_balancers"], callback)
    },

    addIpLoadBalancer: function (srv_id, ip_id, json, callback) {
        req.is_post(["servers", srv_id, "ips", ip_id, "load_balancers"], json, callback)
    },

    deleteIpLoadBalancer: function (srv_id, ip_id, load_balancer_id, callback) {
        req.is_del(["servers", srv_id, "ips", ip_id, "load_balancers", load_balancer_id], callback)
    },

    getDvd: function (srv_id, callback) {
        req.is_get(["servers", srv_id, "dvd"], callback)
    },

    unloadDvd: function (srv_id, callback) {
        req.is_del(["servers", srv_id, "dvd"], callback)
    },

    loadDvd: function (srv_id, json, callback) {
        req.is_put(["servers", srv_id, "dvd"], json, callback)
    },

    listServerPrivateNetworks: function (srv_id, callback) {
        req.is_get(["servers", srv_id, "private_networks"], callback)
    },

    assignPrivateNetworkToServer: function (srv_id, json, callback) {
        req.is_post(["servers", srv_id, "private_networks"], json, callback)
    },

    deletePrivateNetworkFromServer: function (srv_id, private_network_id, callback) {
        req.is_del(["servers", srv_id, "private_networks", private_network_id], callback)
    },

    getServerPrivateNetwork: function (srv_id, private_network_id, callback) {
        req.is_get(["servers", srv_id, "private_networks", private_network_id], callback)
    },

    listSnapshots: function (srv_id, callback) {
        req.is_get(["servers", srv_id, "snapshots"], callback)
    },

    createSnapshot: function (srv_id, callback) {
        req.is_post(["servers", srv_id, "snapshots"], null, callback)
    },

    restoreSnapshot: function (srv_id, snapshot_id, callback) {
        req.is_put(["servers", srv_id, "snapshots", snapshot_id], null, callback)
    },

    deleteSnapshot: function (srv_id, snapshot_id, callback) {
        req.is_del(["servers", srv_id, "snapshots", snapshot_id], callback)
    },

    clone: function (srv_id, json, callback) {
        req.is_post(["servers", srv_id, "clone"], json, callback)
    },


} //

