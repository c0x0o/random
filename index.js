var random = require('./src/random');
var process = require('process');

function cmdParser(argv) {
    var argv = Array.prototype.slice.call(process.argv, 2);
    var group = argv.join(' ').match(/\-[a-zA-Z]+[^\-]?/gi);
    var ret = {};

    group && group.forEach(function(pair, i) {
        var options, value = pair.split(' ')[1] ? pair.split(' ')[1] : null;

        for (var i = 1; i < pair.length; i++) {
            if (pair[i] == ' ') break;
            ret[pair[i]] = null;
        }

        ret[pair[i-1]] = value;
    });

    return ret;
}

function print_usage() {
    console.log('random [OPTIONS]');
    console.log('OPTIONS:');
    console.log('    -b n            generate n Bytes(count for number) long sequence, default: 1');
    console.log('    -s              generate a string, default value');
    console.log('    -n min-max      generate a number sequence between [min, max), default: [0, 100)');
    console.log('    -d delimiter    specify delimiter for generate number sequence, default: <space> ');
    console.log('    -h              print this message')
}

function main() {
    var options = cmdParser(process.argv);

    var n = 1, delimiter = ' ', type = 'string', min = 0, max = 100;
    var generator = null;

    for (option in options) {
        value = options[option] ? options[option] : null;
        switch(option) {
            case 'b':
                n = value ? value : 100;
                break;
            case 'n':
                type = 'number';
                if (value) {
                    var pair = value.split('-');
                    min = parseInt(pair[0]);
                    max = parseInt(pair[1]);
                }
                break;
            case 'd':
                delimiter = value ? value : ' ';
                break;
            case 'h':
                print_usage();
                return;
            default:
                console.log('Unknown option option'+option);
                print_usage();
                return;
        }

    }

    if (type == 'string') {
        generator = function() {
            return random.randomAPrintableChar(true);
        }
    } else {
        generator = function() {
            return random.randomANumberBetween(min, max);
        }
    }

    var sequence = '';
    for (var i = 0; i < n; i++) {
        sequence += generator();
    }

    console.log(sequence);

    return sequence;
}

main();
