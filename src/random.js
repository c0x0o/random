function randomANumberBetween(a, b) {
    var random = Math.random();

    return parseInt(random*(b-a)+a);
}

function randomAPrintableChar(exceptSpace) {
    var start = exceptSpace ? 33 : 32;

    return String.fromCharCode(randomANumberBetween(start, 127));
}

function generateNBytesRandomStringSequence(n, exceptSpace) {
    var str = '';
    for (var i = 0; i < n; i++) {
        str += randomAPrintableChar(exceptSpace);
    }

    return str;
}

module.exports = {

    // a <= x < b
    randomANumberBetween: randomANumberBetween,

    // pass a true if you dont want a <space> character
    randomAPrintableChar: randomAPrintableChar,

    // generate a n bytes long string squence
    generateNBytesRandomStringSequence: generateNBytesRandomStringSequence
};
