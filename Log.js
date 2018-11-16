var date = new Date();
var fs = require('fs');
const InfoLogUrl = __dirname + "/log/InfoLog.txt";
const debugLogUrl = __dirname + "/log/DebugLog.txt";
const warnLogUrl = __dirname + "/log/WarnLog.txt";
const errorLogUrl = __dirname + "/log/ErrorLog.txt";


function appendLog(logUrl, logStr) {
        fs.appendFile(logUrl, logStr + "\n", function (err) {
                if (err) {
                        console.error("appendFile error");
                        console.error(err);
                }
        });
}

var log = {
        info: function (val) {
                if (typeof val === "object") {
                        val = "" + JSON.stringify(val);
                }
                else {
                        val = "" + val;
                }
                var txt = date + "\tInfo: " + val.toString("utf8");
                console.log(txt);
                appendLog(InfoLogUrl, txt);

        },
        debug: function (val) {
                if (typeof val === "object") {
                        val = "" + JSON.stringify(val);
                }
                else {
                        val = "" + val;
                }
                var txt = date + "\tDebug: " + val.toString("utf8");
                console.info(txt);
                appendLog(debugLogUrl, txt);
        },
        warn: function (val) {
                if (typeof val === "object") {
                        val = "" + JSON.stringify(val);
                }
                else {
                        val = "" + val;
                }
                var txt = date + "\tWarn: " + val.toString("utf8");
                console.warn(txt);
                appendLog(warnLogUrl, txt);

        },
        error: function (val) {
                if (typeof val === "object") {
                        val = "" + JSON.stringify(val);
                }
                else {
                        val = "" + val;
                }
                var txt = date + "\tError: " + val.toString("utf8");
                console.error(txt);
                appendLog(errorLogUrl, txt);
        },
        clear: function () {
                console.clear();
        }
};

module.exports = log;
