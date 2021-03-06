/**
 * Created by Ali on 8/7/2016.
 */
module.exports = {

    fpEndPointPath: "firewall_policies",

    listFirewallPolicies: function (callback) {
        req.is_get([this.fpEndPointPath], callback)
    },

    listFirewallPoliciesWithOptions: function (options, callback) {
        var path = this.fpEndPointPath;
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

    createFirewallPolicy: function (json, callback) {
        req.is_post([this.fpEndPointPath], json, callback)
    },

    getFirewallPolicy: function (fp_id, callback) {
        req.is_get([this.fpEndPointPath, fp_id], callback)
    },

    updateFirewallPolicy: function (fp_id, json, callback) {
        req.is_put([this.fpEndPointPath, fp_id], json, callback)
    },

    deleteFirewallPolicy: function (fp_id, callback) {
        req.is_del([this.fpEndPointPath, fp_id], callback)
    },

    listFirewallPolicyServerIps: function (fp_id, callback) {
        req.is_get([this.fpEndPointPath, fp_id, "server_ips"], callback)
    },

    assignServerIpToFirewallPolicy: function (fp_id, json, callback) {
        req.is_post([this.fpEndPointPath, fp_id, "server_ips"], json, callback)
    },

    getFirewallPolicyServerIp: function (fp_id, ip_id, callback) {
        req.is_get([this.fpEndPointPath, fp_id, "server_ips", ip_id], callback)
    },

    unassignServerIpFromFirewallPolicy: function (fp_id, ip_id, json, callback) {
        req.is_del([this.fpEndPointPath, fp_id, "server_ips", ip_id], json, callback)
    },

    listFirewallPolicyRules: function (fp_id, callback) {
        req.is_get([this.fpEndPointPath, fp_id, "rules"], callback)
    },

    addRulesToFirewallPolicy: function (fp_id, json, callback) {
        req.is_post([this.fpEndPointPath, fp_id, "rules"], json, callback)
    },

    getFirewallPolicyRule: function (fp_id, rule_id, callback) {
        req.is_get([this.fpEndPointPath, fp_id, "rules", rule_id], callback)
    },

    removeRuleFromFirewallPolicy: function (fp_id, rule_id, json, callback) {
        req.is_del([this.fpEndPointPath, fp_id, "rules", rule_id], json, callback)
    },
}