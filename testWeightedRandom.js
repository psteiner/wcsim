function weightedScore (min=0, max=25) {
    // https://stackoverflow.com/a/46774731/234235
    // var rv = Math.round(max / (Math.random() * max + min)) - min;

    var lambda = 3;
    var k = Math.random() * max + min;
    var e = Math.exp(-lambda);
    var l = lambda ** k;
    var f = math.factorial(k);
    var x = (e * l) / f;
    rv = Math.round(x * max + min);
    return rv;
}

function poisson() {
    var mean = 1.2;
    var L = Math.exp(-mean);
    var p = 1.0;
    var k = 0;

    do {
        k++;
        p *= Math.random();
    } while (p > L);

    return k - 1;
}

var results = new Object();

for (var i = 0; i < 100; i++) {
    var result = poisson();
    if (!results.hasOwnProperty(result)) {
        results[result] = 0;
    }
    results[result]++;
}

for (var r in results) {
    console.log("|" + r + "|" + results[r]);
}