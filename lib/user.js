/**
 * Created by Ali on 8/16/2016.
 */
module.exports = {
    usrEndPointPath: "users",

    listUsers: function (callback) {
        req.is_get([this.usrEndPointPath], callback)
    },

    listUsersWithOptions: function (options, callback) {
        var path = this.usrEndPointPath;
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
    createUser: function (json, callback) {
        req.is_post([this.usrEndPointPath], json, callback)
    },
    getUser: function (usr_id, callback) {
        req.is_get([this.usrEndPointPath, usr_id], callback)
    },
    updateUser: function (usr_id, json, callback) {
        req.is_put([this.usrEndPointPath, usr_id], json, callback)
    },
    deleteUser: function (usr_id, callback) {
        req.is_del([this.usrEndPointPath, usr_id], callback)
    },
    getUserApiInformation: function (usr_id, callback) {
        req.is_get([this.usrEndPointPath, usr_id, "api"], callback)
    },
    updateUserApiInformation: function (usr_id, json, callback) {
        req.is_put([this.usrEndPointPath, usr_id, "api"], json, callback)
    },

    getUserApiKey: function (usr_id, callback) {
        req.is_get([this.usrEndPointPath, usr_id, "api", "key"], callback)
    },
    updateUserApiKey: function (usr_id, callback) {
        req.is_put([this.usrEndPointPath, usr_id, "api", "key"], null, callback)
    },

    getUserApiAllowedIPs: function (usr_id, callback) {
        req.is_get([this.usrEndPointPath, usr_id, "api", "ips"], callback)
    },
    addUserAPIAllowedIPs: function (usr_id, json, callback) {
        req.is_post([this.usrEndPointPath, usr_id, "api", "ips"], json, callback)
    },
    deleteUserAPIAllowedIPs: function (usr_id, ip, callback) {
        req.is_del([this.usrEndPointPath, usr_id, "api", "ips", ip], callback)
    },

    getCurrentUserPermissions: function (callback) {
        req.is_get([this.usrEndPointPath, "current_user_permissions"], callback)
    },
}