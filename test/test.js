
// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Test utilities:
	utils = require( './utils' ),

	// Module to be tested:
	addStream = require( './../lib' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'flow-add', function tests() {
	'use strict';

	it( 'should export a factory function', function test() {
		expect( addStream ).to.be.a( 'function' );
	});

	it( 'should provide a method to set/get the addend', function test() {
		var aStream = addStream();
		expect( aStream.add ).to.be.a( 'function' );
	});

	it( 'should set the addend', function test() {
		var aStream = addStream();
		aStream.add( 100 );
		assert.strictEqual( aStream.add(), 100 );
	});

	it( 'should not allow a non-numeric addend', function test() {
		var aStream = addStream(),
			values = [
				'5',
				[],
				{},
				null,
				undefined,
				NaN,
				false,
				function(){}
			];
		
		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( Error );
		}

		function badValue( value ) {
			return function() {
				aStream.add( value );
			};
		}
	});

	it( 'should provide a default behavior of having an addend equal to 0', function test( done ) {
		var data, expected, aStream;

		// Simulate some data...
		data = [ 1,2,3,4,5 ];

		// Expected values:
		expected = [ 1,2,3,4,5 ];

		// Create a new addition stream:
		aStream = addStream().stream();

		// Mock reading from the stream:
		utils.readStream( aStream, onRead );

		// Mock piping a data to the stream:
		utils.writeStream( data, aStream );

		return;

		/**
		* FUNCTION: onRead( error, actual )
		*	Read event handler. Checks for errors and compares streamed data to expected data.
		*/
		function onRead( error, actual ) {
			expect( error ).to.not.exist;

			for ( var i = 0; i < expected.length; i++ ) {
				assert.strictEqual(
					actual[ i ],
					expected[ i ]
				);
			}
			done();
		} // end FUNCTION onRead()
	});

	it( 'should add to piped data using an arbitrary addend', function test( done ) {
		var data, expected, aStream, ADDEND = 100;

		// Simulate some data...
		data = [ 1,2,3,4,5 ];

		// Expected values:
		expected = [ 101,102,103,104,105 ];

		// Create a new addition stream:
		aStream = addStream()
			.add( ADDEND )
			.stream();

		// Mock reading from the stream:
		utils.readStream( aStream, onRead );

		// Mock piping a data to the stream:
		utils.writeStream( data, aStream );

		return;

		/**
		* FUNCTION: onRead( error, actual )
		*	Read event handler. Checks for errors and compares streamed data to expected data.
		*/
		function onRead( error, actual ) {
			expect( error ).to.not.exist;

			for ( var i = 0; i < expected.length; i++ ) {
				assert.strictEqual(
					actual[ i ],
					expected[ i ]
				);
			}
			done();
		} // end FUNCTION onRead()
	});

});