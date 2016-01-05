import levelup from 'levelup';
import localstorage from 'localstorage-down';
import sublevel from 'level-sublevel';
import _ from 'lodash';
import {Map, fromJS} from 'immutable';

/*
detect
 * new_object, update_object, remove_object
 * object_id
 * baseUrl

baseUrl determines the sublevel
object_id is the key

but for say /site the object is the sublevel, object_id will be $ or _ or self
*/


var top = sublevel(levelup('cms', { db: localstorage, valueEncoding : 'json' }));
var tables = {};

export function getTable(baseUrl) {
  if (!tables[baseUrl]) tables[baseUrl] = top.sublevel(baseUrl);
  return tables[baseUrl];
}

export default function persistenceMiddleware() {
  return (next) => (action) => {
    const {record_change} = action;
    if (!record_change) {
      return next(action);
    }
    const { new_object, update_object, remove_object, table_name, object_id } = record_change;
    const table = getTable(table_name);
    if (new_object) {
      console.log("New object:", table_name, object_id)
      //if (_.isFunction(new_object.toJS)) new_object = new_object.toJS();
      table.put(object_id, new_object);
    } else if (update_object) {
      console.log("Update object:", table_name, object_id)
      //if (_.isFunction(update_object.toJS)) update_object = update_object.toJS();
      table.put(object_id, update_object);
    } else if (remove_object) {
      table.del(object_id);
    }
    next(action);
  };
}

export function readTable(tableName) {
  return new Promise(function(resolve, reject) {
    var key_values;

    getTable(tableName).createReadStream()
      .on('data', function(data) {
        if (typeof data.value !== 'undefined') {
          if (!key_values) key_values = Map();
          key_values = key_values.set(data.key, fromJS(data.value));
        }
      })
      .on('end', function () {
        resolve(key_values);
      });
  });
}

export function destroy(callback) {
  return Promise.all(_.map(tables, (table, table_name) => {
    return purgeTable(table_name);
  })).then(x => {
    return localstorage.destroy('cms', callback);
  });
}

export function purgeTable(table_name) {
  return new Promise(function(resolve, reject) {
    var table = getTable(table_name);
    var ops = [];
    table.createKeyStream()
      .on('data', function(key) {
        ops.push({ type: 'del', key });
      })
      .on('end', function () {
        var batchJob = table.batch(ops, function(err) {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      });
  });
}
