import * as $ from 'jquery';

let log = function(...v: any[]) {
    console.log.apply(this, v);
    $('#status').text(v.join(','));
};

let error = function(...v: any[]) {
    console.error.apply(this, v);
    console.log.apply(this, [new Error().stack]);
    $('#status').text(v.join(','));
};

export {log, error}