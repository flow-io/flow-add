/**
*
*	STREAM: add
*
*
*	DESCRIPTION:
*		- Transform stream factory to increment streamed numeric data values.
*
*
*	NOTES:
*		[1] 
*
*
*	TODO:
*		[1] 
*
*
*	HISTORY:
*		- 2014/08/08: Created. [AReines].
*
*
*	DEPENDENCIES:
*		[1] through2
*
*
*	LICENSE:
*		MIT
*
*	Copyright (c) 2014. Athan Reines.
*
*
*	AUTHOR:
*		Athan Reines. athan@nodeprime.com. 2014.
*
*/

(function() {
	'use strict';

	// MODULES //

	var // Through2 module:
		through2 = require( 'through2' );


	// FUNCTIONS //

	/**
	* FUNCTION: onData( addend )
	*	Returns a callback which performs addition.
	*
	* @private
	* @param {Number} addend - value to add to streamed values
	* @returns {Function} callback
	*/
	function onData( addend ) {
		/**
		* FUNCTION: onData( newVal, encoding, clbk )
		*	Data event handler. Performs addition.
		*
		* @private
		* @param {Number} newVal - streamed data value
		* @param {String} encoding
		* @param {Function} clbk - callback to invoke after performing scalar division. Function accepts two arguments: [ error, chunk ].
		*/
		return function onData( newVal, encoding, clbk ) {
			clbk( null, newVal+addend );
		}; // end FUNCTION onData()
	} // end FUNCTION onData()


	// STREAM //

	/**
	* FUNCTION: Stream()
	*	Stream constructor.
	*
	* @constructor
	* @returns {Stream} Stream instance
	*/
	function Stream() {
		this._addend = 1;
		return this;
	} // end FUNCTION Stream()

	/**
	* METHOD: add( value )
	*	Setter and getter for the addend. If a value is provided, sets the addend. If no value is provided, returns the addend.
	*
	* @param {Number} value - addend (the value to be add to streamed values)
	* @returns {Stream|Number} Stream instance or addend
	*/
	Stream.prototype.add = function( value ) {
		if ( !arguments.length ) {
			return this._addend;
		}
		if ( typeof value !== 'number' || value !== value ) {
			throw new Error( 'add()::invalid input argument. Addend must be numeric.' );
		}
		this._addend = value;
		return this;
	}; // end METHOD add()

	/**
	* METHOD: stream()
	*	Returns a through stream for performing addition.
	*
	* @returns {object} through stream
	*/
	Stream.prototype.stream = function() {
		return through2({'objectMode': true}, onData( this._addend ) );
	}; // end METHOD stream()


	// EXPORTS //

	module.exports = function createStream() {
		return new Stream();
	};

})();