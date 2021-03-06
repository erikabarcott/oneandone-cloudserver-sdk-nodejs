/**
 * Created by Ali on 8/18/2016.
 */
module.exports = {
    usagesEndPointPath: "usages",
    appliancesEndPointPath: "server_appliances",
    dvdIsoEndPointPath: "dvd_isos",
    datacentersEndPointPath: "datacenters",

    listUsagesFixedPeriodWithOptions: function (period, options, callback) {
        var path = this.usagesEndPointPath + "?period=" + period;
        if (options) {
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

    listUsagesCustomPeriodWithOptions: function (startDate, endDate, options, callback) {
        var path = this.usagesEndPointPath + "?period=CUSTOM";
        path += "&start_date=" + startDate + "&end_date=" + endDate;

        if (options) {
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

    listServerAppliances: function (callback) {
        req.is_get([this.appliancesEndPointPath], callback)
    },

    listServerAppliancesWithOptions: function (options, callback) {
        var path = this.appliancesEndPointPath;
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

    getServerAppliance: function (aplnc_id, callback) {
        req.is_get([this.appliancesEndPointPath, aplnc_id], callback)
    },

    listDvdIso: function (callback) {
        req.is_get([this.dvdIsoEndPointPath], callback)
    },

    listDvdIsoWithOptions: function (options, callback) {
        var path = this.dvdIsoEndPointPath;
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

    getDvdIso: function (dvd_id, callback) {
        req.is_get([this.dvdIsoEndPointPath, dvd_id], callback)
    },

    pingApi: function (callback) {
        req.is_get(["ping"], callback)
    },

    pingApiAuthentication: function (callback) {
        req.is_get(["ping_auth"], callback)
    }
    ,

    getPricing: function (callback) {
        req.is_get(["pricing"], callback)
    }
    ,

    listDatacenters: function (callback) {
        req.is_get([this.datacentersEndPointPath], callback)
    }
    ,

    listDatacentersWithOptions: function (options, callback) {
        var path = this.datacentersEndPointPath;
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
    }
    ,

    getDatacenters: function (dc_id, callback) {
        req.is_get([this.datacentersEndPointPath, dc_id], callback)
    }
    ,
}
;
