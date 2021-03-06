/* */ 
(function(Buffer) {
  var util = require('./util');
  var FLOAT_LENGTH = 8;
  function identity(value) {
    return value;
  }
  function shortlexEncode(codec) {
    return function(source, base) {
      var length = util.encodeFloat(source.length);
      var body = codec.encode(source, base);
      return Buffer.concat([length, body]);
    };
  }
  function shortlexDecode(codec) {
    return function(buffer) {
      return codec.decode(this, buffer.slice(FLOAT_LENGTH));
    };
  }
  function shortlexParse(codec) {
    return function(buffer, base) {
      throw new Error('NYI');
    };
  }
  function shortlex(codec) {
    return {
      encode: shortlexEncode(codec),
      decode: shortlexDecode(codec),
      parse: shortlexParse(codec)
    };
  }
  var codecs = exports;
  codecs.HEX = {
    encode: function(source) {
      return new Buffer(source, 'hex');
    },
    decode: function(buffer) {
      return buffer.toString('hex');
    }
  };
  codecs.UINT8 = {
    encode: identity,
    decode: identity,
    escape: util.escapeFlat,
    unescape: util.unescapeFlat
  };
  codecs.UINT8_SHORTLEX = shortlex(codecs.UINT8);
  codecs.UTF8 = {
    encode: function(source) {
      return new Buffer(source, 'utf8');
    },
    decode: function(buffer) {
      return buffer.toString('utf8');
    },
    escape: util.escapeFlatLow,
    unescape: util.unescapeFlatLow
  };
  codecs.UTF8_SHORTLEX = shortlex(codecs.UTF8);
  codecs.POSITIVE_FLOAT = {
    length: FLOAT_LENGTH,
    encode: util.encodeFloat,
    decode: util.decodeFloat
  };
  codecs.NEGATIVE_FLOAT = {
    length: FLOAT_LENGTH,
    encode: util.encodeFloat,
    decode: function(buffer) {
      return util.decodeFloat(buffer, null, true);
    }
  };
  codecs.POST_EPOCH_DATE = {
    length: FLOAT_LENGTH,
    encode: util.encodeFloat,
    decode: function(buffer) {
      return new Date(util.decodeFloat(buffer));
    }
  };
  codecs.PRE_EPOCH_DATE = {
    length: FLOAT_LENGTH,
    encode: util.encodeFloat,
    decode: function(buffer) {
      return new Date(util.decodeFloat(buffer, null, true));
    }
  };
  codecs.LIST = {
    encode: util.encodeList,
    decode: util.decodeList
  };
  codecs.TUPLE = shortlex(codecs.LIST);
  codecs.HASH = {};
  codecs.RECORD = shortlex(codecs.HASH);
})(require('buffer').Buffer);
