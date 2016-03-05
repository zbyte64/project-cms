import _ from 'lodash';
import {Map, fromJS} from 'immutable';


//TODO storage backend should be configurable
import localdb from '~/services/localdb';

export var storage = localdb()
/*
detect record_change
 * new_object, update_object, remove_object
 * object_id
 * table_name

object_id is the key
*/


function toJS(obj) {
  if (_.isFunction(obj.toJS)) return obj.toJS();
  return obj;
}

function toImmut(obj) {
  if (_.isFunction(obj.toJS)) return obj;
  return fromJS(obj);
}


const INITIAL_STATE = Map();

export function tablesReducer(state=INITIAL_STATE, action) {
  const {record_change, record_changes} = action;
  if (record_change) {
    return recordChange(state, record_change);
  } else if (record_changes) {
    _.each(record_changes, rc => {
      state = recordChange(state, rc);
    });
  }
  return state
}

export function recordChange(state, record_change) {
  const { new_object, update_object, remove_object, table_name, object_id } = record_change;
  if (new_object) {
    console.log("New object:", table_name, object_id);
    storage.putObject(table_name, object_id, toJS(new_object));
    return state.setIn([table_name, object_id], toImmut(new_object));
  } else if (update_object) {
    console.log("Update object:", table_name, object_id);
    storage.putObject(table_name, object_id, toJS(update_object));
    return state.setIn([table_name, object_id], toImmut(update_object));
  } else if (remove_object) {
    storage.deleteObject(table_name, object_Id)
    return state.deleteIn([table_name, object_id]);
  }
  console.warn("Received invalid record_change:", record_change);
  return state;
}

export function writeFixture(fixtureData) {
  console.log("writeFixture", fixtureData);
  _.each(fixtureData, function(rows, tableName) {
    _.each(rows, function(value, key) {
      storage.putObject(tableName, key, toJS(value))
    });
  });
}

export function readTable(table_name) {
  return storage.readTable(table_name).then(table_data => {
    if (!table_data) return null;
    return fromJS(table_data);
  });
}

export default tablesReducer;
