tests:
	./node_modules/.bin/mocha -R spec test/*.js

.PHONY: all test clean
