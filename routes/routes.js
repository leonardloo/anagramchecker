/**
 * Helper function that tests if input strings are anagrams.
 * If string type is alphabets only, O(n) runtime
 * Else, O(n log n) runtime
 */
var isAnagram = function(string1, string2) {
	// Remove whitespace and lowercase
	string1 = string1.toLowerCase().replace(/ /g,'')
	string2 = string2.toLowerCase().replace(/ /g,'')
	var isAlphabetOnly = /^[a-zA-Z]+$/.test(string1) && /^[a-zA-Z]+$/.test(string2);
	if (isAlphabetOnly) { // Alphabets only
	    console.log("[Info] Alphabets only check");
	    var alphabets = [];
	    for (var i = 0; i < 26; i++) {
	        alphabets.push(0);
	    }
	    for (var i = 0; i < string1.length; i++) {
	        alphabets[string1.charCodeAt(i) - 97] += 1;
	    }
	    for (var i = 0; i < string2.length; i++) {
	        alphabets[string2.charCodeAt(i) - 97] -= 1;
	    }
	    for (var i = 0; i < alphabets.length; i++) {
	        if (alphabets[i] !== 0) return false;
	    }
	    return true;
	} else { // All kinds of characters
	    console.log("[Info] All character check");
	    var sortedString1 = string1.split('').sort().join('');
	    var sortedString2 = string2.split('').sort().join('');
	    return sortedString1 === sortedString2;
	}
}

/**
 * Evaluates if input strings are anagrams.
 */
var postEvaluate = function(req, res) {
	var string1 = req.body.string1;
	var string2 = req.body.string2;
    console.log("[Info] String1: " + string1 + " || " + "String2: " + string2);

    // Error checking for empty string
    if (string1 === '' || string2 === '') {
        res.render("index", {checked: false, error: true});
        return;
    }

    var isAnagram = routes.isAnagram(string1, string2);
    var message = string1 + " and " + string2;
    message += (isAnagram) ? " are anagrams." : " are NOT anagrams.";

    res.render("index", {checked: true, isAnagram: isAnagram, message: message, error: false});
}

/**
 * Tests hard-coded pairs of input strings for anagrams.
 * Results can only be viewed from the server.
 */
var getTest = function(req, res) {
	var trueTests = [['hello', 'olleh'], 
					['hey!', '!yeh'],
					['@@%^', '%^@@'],
					['H E l l o', 'hello'], 
					['%    ! hey', 'eyh !%  ']];
	var falseTests = [['HEYA', 'hey'],
					['h   e llo', 'o li e h'],
					['!!!!', '@@@@'], 
					['! ^ ^ !', '! ^ ^ *'], 
					['a', '!']];
	console.log("\n[Testing] RUNNING TESTS...\n");

	var success = true;

	var testFunc = function(isTrueTest, tests) {
		var count = 0;
		for (var i = 0; i < tests.length; i++) {
			var test = tests[i];
			var result = routes.isAnagram(test[0], test[1]);
			if (result === isTrueTest) { 
				count++;
			} else {
				console.log('[Testing] TEST FAILED: ' + test[0] + ' || ' + test[1]);
			}
		}
		if (count !== tests.length) success = false;
		if (isTrueTest) {
			console.log("\n[Testing] TRUE TESTS: " + count + " / " + tests.length + "\n");
		} else {
			console.log("\n[Testing] FALSE TESTS: " + count + " / " + tests.length + "\n");
		}
	}
	testFunc(true, trueTests);
	testFunc(false, falseTests);
	if (success) {
		console.log('\n[Testing] ALL TESTS SUCCESSFUL.\n');
	} else {
		console.log('\n[Testing] SOME TESTS FAILED!\n');
	}
	res.render("index", {checked: false, error: false});
}

var routes = {
	get_test: getTest,
	post_evaluate: postEvaluate,
	isAnagram: isAnagram
}

module.exports = routes;
