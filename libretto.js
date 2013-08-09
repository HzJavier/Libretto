window.libretto = {};

(function(undefined) {
	var l = libretto,
		ns = null,			// namespace
		data = {};

	/*\
	 * libretto.setNamespace
	 [ method ]
	 ** 
	 * Creates a namespace to store data in localStorage
	 > Parameters
	 - namespace (string) The name of the namespace to refer
	 ** = (type) return value description
	 > Usage
	 | libretto.setNamespace( 'myAppNs' );
	 ** o list item
	 ** # HTML <a href="">link</a>
	\*/
	l.setNamespace = function (namespace) {
		var storage = localStorage;
		if (storage[namespace]) {
			// throw 'Namespace already taken';
			ns = namespace;
			// data.namespace = namespace;
			data = l.data();
		}
		else {
			ns = namespace;
			data.namespace = namespace;
			storage[namespace] = '{ "namespace":"'+namespace+'" }';
		} 
	};

	/*\
	 * libretto.namespaceExists
	 [ method ]
	 ** 
	 * Returns if the given namespace already exists or not
	 > Parameters
	 - namespace (string) The name of the namespace to refer
	 = (object) return the namespace or null if it doesnt exists
	 > Usage
	 | if( libretto.namespaceExists('myNamespace') ) {
	 |  	libretto.set('key', 'theNewValue');
	 \ }
	\*/
	l.namespaceExists = function (namespace) {
		return localStorage[namespace];
	};

	/*\
	 * libretto.getNamespace
	 [ method ]
	 ** 
	 * Returns the namespace used in the app.
	 = (string) The name of the namespace used in the app
	 > Usage
	 | var myNs = libretto.getNamespace();
	\*/
	l.getNamespace = function () {
		return ns;
	};

	/*\
	 * libretto.data
	 [ method ]
	 ** 
	 * Returns the data contained in the namespace as a Javascript object
	 = (object) Object containing the data
	 > Usage
	 | var myData = libretto.data(),
	 |	   property = myData.myProperty;
	\*/
	l.data = function () {
		return JSON.parse(localStorage[ns]);
	};

	/*\
	 * libretto.deleteNamespace
	 [ method ]
	 ** 
	 * Deletes the key from the localStorage object corresponding to the 
	 * given namespace and the data associate with it.
	 > Parameters
	 - namespace (string) The namespace to delete
	 > Usage
	 | libretto.deleteNamespace('myAppNs');
	\*/
	l.deleteNamespace = function (namespace) {
		delete localStorage[namespace];
	};

	/*\
	 * libretto.add
	 [ method ]
	 ** 
	 * Adds a key to the object with a given value
	 > Parameters
	 - item  (string) The key to refer the new item
	 - value (object) The value to assign to the item
	 > Usage
	 | libretto.add( 'newItem', 10 );
	\*/	
	l.add = function (item, value) {
		if (data[item] === undefined) {
			data[item] = value;
			setStorage(data);
		}
		else {
			this.set(item, value);
		}
	};

	/*\
	 * libretto.set
	 [ method ]
	 ** 
	 * Sets a new value to an existing item
	 > Parameters
	 - item  (string) The key of the item to refer
	 - value (object) The new value to set to the item
	 > Usage
	 | libretto.set( 'existingKey', 'newValue' );
	\*/
	l.set = function (item, value) {
		data[item] = value;
		setStorage(data);
	};

	/*\
	 * libretto.get
	 [ method ]
	 ** 
	 * Gets the value of a given key
	 > Parameters
	 - item  (string) The key of the item to refer
	 > Usage
	 | var myVal = libretto.get('existingKey');
	\*/
	l.get = function (item) {
		return data.item;
	};

	/*\
	 * libretto.delete
	 [ method ]
	 ** 
	 * Deletes the key and the value of a given item
	 > Parameters
	 - item (string) The key of the item to delete
	 > Usage
	 | libretto.delete( 'itemToDelete' );
	\*/
	l.delete = function (item) {
		if (data[item] !== undefined) {
			delete data[item];
			setStorage(data);
		}
	};

	function setStorage (newData) {
		localStorage[ns] = JSON.stringify(newData);
	}
})();