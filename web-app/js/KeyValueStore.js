var TURF = TURF || {}; // TURF namespace declaration
TURF.Util = TURF.Util || {}; // TURF.Util namespace declaration

( function()
{
	TURF.Util.KeyValueStore = KeyValueStore;

	function KeyValueStore()
	{
		var _this = this;

		_this.clear = clear;
		_this.containsKey = containsKey;
		_this.containsValue = containsValue;
		_this.get = get;
		_this.isEmpty = isEmpty;
		_this.keys = keys;
		_this.push = push;
		_this.pop = pop;
		_this.size = size;
		_this.toString = toString;
		_this.values = values;
		_this.store = {};

		function clear()
		{
			_this.store = {};
		}

		function containsKey(key)
		{
			var exists = false;
			for ( var i in _this.store) {
				if (i == key) {
					exists = true;
					break;
				}
			}
			return exists;
		}

		function containsValue(value)
		{
			var contains = false;
			if (value != null) {
				for ( var i in _this.store) {
					if (_this.store[i] == value) {
						contains = true;
						break;
					}
				}
			}
			return contains;
		}

		function get(key)
		{
			return _this.store[key];
		}

		function isEmpty()
		{
			return (parseInt(_this.size()) == 0) ? true : false;
		}

		function keys()
		{
			var keys = [];
			for ( var i in _this.store) {
				keys.push(i);
			}
			return keys;
		}

		function push(key, value)
		{
			if (key == null || value == null) {
				throw "NullPointerException {" + key + "},{" + value + "}";
			}
			else {
				_this.store[key] = value;
			}
		}

		function pop(key)
		{
			var rtn = _this.store[key];
			delete _this.store[key];
			return rtn;
		}

		function size()
		{
			var size = 0;
			for ( var i in _this.store) {
				size++;
			}
			return size;
		}

		function toString()
		{
			var result = "";
			for ( var i in _this.store) {
				result += "{" + i + "},{"
					+ _this.store[i] + "}\n";
			}
			return result;
		}

		function values()
		{
			var values = [];
			for ( var i in _this.store) {
				 values
						.push(_this.store[i]);
			}
			return values;
		}
	}
})();