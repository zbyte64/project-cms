import _ from 'lodash';

import {loadAppsConfig, makeReducer} from '~/appsLoader';


export function setRenderer(renderer) {
  /* set the template renderer */
  //assert renderer is function
  return {
    type: 'SET_RENDERER',
    renderer
  };
}

export function pushContent(path, content, mimetype) {
  return {
    type: 'PUSH_CONTENT',
    path,
    content,
    mimetype
  };
}

export function setApps(apps) {
  return {
    type: 'SET_APPS',
    apps
  }
}

export function testAppsConfig(appsConfig) {
  return {
    type: 'TEST_APPS_CONFIG',
    appsConfig,
    promise: loadAppsConfig(appsConfig)
  }
}

export function setAppsConfig(appsConfig, store) {
  /* sets apps on successful loading and records change */
  if (!store) throw new Error('Must provide store when setting appsConfig');
  //CONSIDER: this might become THE way to load apps

  let record_change = {
    update_object: appsConfig,
    table_name: '/engine',
    object_id: 'appsConfig'
  };

  return {
    type: 'SET_APPS_CONFIG',
    appsConfig,
    promise: loadAppsConfig(appsConfig).then(apps => {
      if (store) {
        console.log("Triggering apps reload", apps, store);
        let reducer = makeReducer(apps);
        let renderer = _.find(apps, {baseUrl: '/templates'}).renderFactory(store);
        console.log("renderer:", renderer);

        store.replaceReducer(reducer);
        store.dispatch(setApps(apps));
        store.dispatch(setRenderer(renderer));
        //TODO handle fixtures

        store.dispatch({
          type: '!',
          record_change
        });
      }
      return apps;
    })
  }
}

export function setAwsConfig(awsConfig) {
  return {
    type: 'SET_AWS_CONFIG',
    awsConfig,
    record_change: {
      update_object: awsConfig,
      table_name: '/engine',
      object_id: 'awsConfig'
    }
  }
}

export default {setRenderer, pushContent, setApps, testAppsConfig, setAppsConfig, setAwsConfig}