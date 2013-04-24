window.libretto = {};

(function() {
	
	var l = libretto,
		ns = null,			// namespace
		data = {};

	l.setNamespace = function( namespace ) {
		var storage = localStorage;
		if( storage[ namespace ] ) {
			throw 'Namespace already taken';
		}
		else
		{
			ns = namespace;
			data.namespace = namespace;
			storage[ namespace ] = '{ "namespace":"'+namespace+'" }';	
		} 
	};

	l.getNamespace = function() {
		return ns;
	};

	l.data = function() {
		return stringToObject( localStorage[ ns ] );
	};

	l.deleteNamespace = function( namespace ) {
		delete localStorage[namespace];
	};

	l.add = function( item, value ) {
		if( data[ item ] === undefined ) {
			data[ item ] = value;
			setStorage( data );
		}
		else {
			this.set( item, value);
		}
	};

	l.set = function( item, value ) {
		data[ item ] = value;
		setStorage( data );
	};

	l.delete = function( item, value ) {
		if( data[ item ] !== undefined ) {
			delete data[ item ];
			setStorage( data );
		}
	};

	function setStorage( newData ) {
		localStorage[ ns ] = objectToString( newData );
	}

	function objectToString( object ) {
		var keys = objectGetKeys( object ),
			json = '{';

		for( var i = 0, len = keys.length; i < len; i++ ) {
			json += ' \"' + keys[i] + '\" : \"' + object[ keys[i] ] + '\",';
		}
		if( len > 0 ) {
			json = json.substring(0, json.length - 1 );
		}

		json += ' }';
		
		return json;
	}

	function objectGetKeys( object ) {
		var keys = [];
		for( var key in object ) {
			if( object.hasOwnProperty(key) )
			{
				keys.push(key);
			}
		}
		return keys;
	}

	function stringToObject( string ) {
		return JSON.parse( string );
	}
})();