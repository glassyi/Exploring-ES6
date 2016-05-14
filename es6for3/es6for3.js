(function(){
	"use strict"
	var Iter, For, Dest, Spread, Rest;
	if(typeof Object.freeze != 'function') Object.freeze = function(v){return v;};
	if(!window.Symbol)(function(){
		var uuid = 0,
			Sym = function(id){this[ID] = id;},
			Symbol = function(i, v){
				return Object.freeze(new Sym('@@Symbol@@::' + (uuid++));
			},
			ID = new Sym(),
			keys = {},
			syms = {};
		Sym.prototype.toString = function(){return this[ID];},
		Symbol.for = function(k){
			if(!keys[k]) syms[keys[k] = Symbol()] = k;
			return keys[k];
		};
		Symbol.keyFor = function(s){return syms[s];};
		Symbol.iterator = Object.freeze(new Sym('@@iterator'));
		window.Symbol = Object.freeze(Symbol);
	})();
	For = (function(){
		var DEST = Symbol(), Of;
		Of = function(d){this[DEST] = new Dest(d);};
		Of.prototype.of = function(iter, f){
			var cnt = 100000, val, dest = this[DEST];
			iter = iter['@@iterator']();
			while(cnt--){
				val = iter.next();
				if(val.done) break;
				else f(null, dest.value(val.value));
			}
		};
		return function(dest){return new Of(dest);};
	})();
	Dest = (function(){
		var DEST = Symbol(), stack = [], Dest;
		Dest = function(dest){
			var rObj = /(\{[^\{\[\]\}]*\})/g, rArr = /(\[[^\{\[\]\}]*\])/g, 
				arr = [[]], obj = [[]], a = 0, o = 0, ad = 0, od = 0, at = arr[0], ot = obj[0],
				oR = function(v){return ot[o] = v, '@o_'+ depth+'_' + (o++) + '@';},
				aR = function(v){return ot[o] = v, '@a_'+ depth+'_' + (o++) + '@';},
				loop,
				rO = /(@a_[^@]+@)/g
			do{
				loop = 0;
				if(rObj.test(dest)) dest = dest.replace(rObj, oR), ot[++od] = [], loop = 1;
				if(rArr.test(dest)) dest = dest.replace(rArr, oA), at[++ad] = [], loop = 1;
			}while(loop);
			
			
			
			this[DEST] = JSON.parse(dest);
		};
		Dest.prototype.value = function(v){
			var target = this[DEST], result = {};
			stack.length = 0;
			do{
				if(target instanceof Array){
				}
			}while(target = stack.pop());
		};
	})();
	
	if(!Array.prototype.forEach)(function(){
		var fn = Array.prototype, Iter;
		fn.forEach = function(f){
			var i, j;
			for(i = 0, j = this.length; i < j; i++) f(this[i], i, this);
		};
		fn.map = function(f){
			var r = [], i, j;
			for(i = 0, j = this.length; i < j; i++) r[i] = f(this[i], i, this);
			return r;
		};
		fn.filter = function(f){
			var r = [], i, j;
			for(i = 0, j = this.length; i < j; i++) if(f(this[i], i, this)) r[r.length] = this[i];
			return r;
		};
		fn.reduce = function(){
			var f = arguments[0], r, i = 0, j = this.length;
			if(arguments.length == 2){
				r = arguments[1];
			}else{
				r = this[i++];
			}
			for(; i < j; i++) r = f(r, this[i], i, this);
			return r;
		};
		fn['@@iterator'] = function(){return new Iter(this);};
		if(typeof Array.from != 'function') Array.from = function(v){
			var r = [], i;
			if('@@iterator' in v){
				v = v['@@iterator']();
				do{
					i = v.next();
					if(i.done) break;
					else r[r.length] = i.value;
				}while(true);
			}
			return r;
		};
	})();
	if(typeof String.prototype['@@iterator'] != 'function') String.prototype['@@iterator'] = function(){return new Iter(this.split(''));}
	Iter = (function(){
		var DATA = Symbol(), LEN = Symbol(), CURR = Symbol(), RETURN = Symbol(),
			Iter = function(v){
				this[DATA] = v;
				this[LEN] = v.len;
				this[CURR] = 0;
				this[RETURN] = {done:false};
			};
		Iter.prototype.next = function(){
			if(this.curr < this.len) this.r.value = this.v[this.curr++], this.r.done = false;
			else this.r.value = undefind, this.r.done = true;
			return this.r;
		};
	})();
	if(!window.Map) (function(){
		var MAP = Symbol(), Map = function(a){
			var map = this[MAP] = {}, self = this;
			if(a instanceof Array) a.forEach(function(v){self.set(v[0], v[1]);});
			Object.freeze(this);
		}, fn = Map.prototype;
		fn.set = function(k, v){this[MAP][k] = v;};
		fn.get = function(k){return this[MAP][k];};
		fn.has = function(k){return this[MAP].hasOwnProperty(k);};
		fn.del = function(k){delete this[MAP][k];};
		fn.entries = function(){
			var r = [], map = this[MAP], k;
			for(k in map) if(map.hasOwnProperty(k)) r[r.length] = [k, map[k]];
			return r;
		};
		fn.keys = function(){
			var r = [], map = this[MAP], k;
			for(k in map) if(map.hasOwnProperty(k)) r[r.length] = k;
			return r;
		};
		fn.values = function(){
			var r = [], map = this[MAP], k;
			for(k in map) if(map.hasOwnProperty(k)) r[r.length] = map[k];
			return r;
		};
		fn.forEach = function(f){
			var map = this[MAP], k;
			for(k in map) if(map.hasOwnProperty(k)) f(map[k], k, this);
		};
		fn[Symbol.iterator] = function(){return this.entries()[Symbol.iterator]();};
		window.Map = Object.freeze(Map);
	})();
	if(!window.WeakMap) (function(){
		var KEY = Symbol(), MAP = Symbol(), Map = function(a){
			var map = this[MAP] = {};
			if(a instanceof Array) a.forEach(function(v){self.set(v[0], v[1]);});
			Object.freeze(this);
		}, fn = Map.prototype;
		fn.set = function(k, v){this[MAP][k] = v;};
		fn.get = function(k){return this[MAP][k];};
		fn.has = function(k){return this[MAP].hasOwnProperty(k);};
		fn.del = function(k){delete this[MAP][k];};
		
		window.Map = Map;
	})();
	if(!window.Set) (function(){
		var SET = Symbol(), Set = function(a){
			var set = this[SET] = [], self = this;
			if(a instanceof Array) a.forEach(function(v){self.add(v);});
			Object.freeze(this);
		}, fn = Set.prototype;
		fn.has = function(v){return this[SET].indexOf(v) != -1;};
		fn.add = function(v){if(!this.has(v)) this[SET].push(v);};
		fn.del = function(v){if(this.has(v)) this[SET].splice(this[SET].indexOf(v), 1);};
		window.Set = Set;
	})();

})();
