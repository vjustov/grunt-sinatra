tests:
	./node_modules/.bin/mocha -R spec test/* 

.PHONY: all test clean
