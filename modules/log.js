let log = function (...v) {
    ///  console.log.apply(this, v);
    //$('#status').text(v.join(','));
};
let error = function (...v) {
    console.error.apply(this, v);
    //$('#status').text(v.join(','));
};
export class Log {
    static log(...v) {
        ///  console.log.apply(this, v);
        //$('#status').text(v.join(','));
    }
    static debug(...v) {
        ///  console.log.apply(this, v);
        //$('#status').text(v.join(','));
    }
    static error(...v) {
        console.error.apply(this, v);
        //$('#status').text(v.join(','));
    }
}
export { log, error };
//# sourceMappingURL=log.js.map