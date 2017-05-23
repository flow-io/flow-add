flow-add
========

Transform stream factory to increment streamed numeric data values.


## Installation

``` bash
$ npm install flow-add
```

## API

To create a stream factory,

``` javascript
var addStream = require( 'flow-add' );

// Create a new factory:
var aStream = addStream();
```

### aStream.add( [value] )

This method is a setter/getter. If no `value` is provided, returns the `value` added to streamed values (a.k.a., the `addend`); default is `0`. To set the `value`,

``` javascript
aStream.add( 100 );
```

### aStream.stream()

To create a new addition stream,

``` javascript
var stream = aStream.stream();
```


## Usage

Methods are chainable.

``` javascript
addStream()
	.add( 100 )
	.stream()
	.pipe( /* writable stream */ );
```


## Examples

``` javascript
var eventStream = require( 'event-stream' ),
	aStream = require( 'flow-add' );

// Create some data...
var data = new Array( 1000 );
for ( var i = 0; i < data.length; i++ ) {
	data[ i ] = Math.round(Math.random()*10);
}

// Create a readable stream:
var readStream = eventStream.readArray( data );

// Create a new addition stream:
var stream = aStream()
	.add( 100 )
	.stream();

// Pipe the data:
readStream.pipe( stream )
	.pipe( eventStream.map( function( d, clbk ) {
		clbk( null, d.toString()+'\n' );
	}))
	.pipe( process.stdout );
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```


## Tests

Unit tests use the [Mocha](http://mochajs.org/) test framework with [Chai](http://chaijs.com) assertions.

Assuming you have installed Mocha, execute the following command in the top-level application directory to run the tests:

``` bash
$ mocha
```

All new feature development should have corresponding unit tests to validate correct functionality.


## License

[MIT license](http://opensource.org/licenses/MIT). 


---
## Copyright

Copyright &copy; 2014. Athan Reines.

