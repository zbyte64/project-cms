import {connect} from 'react-redux'
import _ from 'lodash';

import PageList from './components/PageList.jsx';
import AddPage from './components/AddPage.jsx';
import EditPage from './components/EditPage.jsx';

import actions from './actions';
import publish from './publish';
import fixtures from './fixtures';

import templateSettingsMiddleware from '~/appMiddleware/templateSettings/index';


export default templateSettingsMiddleware(function PagesApplicationFactory(baseUrl) {
  return {
    type: 'application',
    actions,
    fixtures,
    tables: [baseUrl],
    publish: _.partial(publish, baseUrl),
    title: 'Pages',
    routes: {
      path: baseUrl,
      component: 'div',
      indexRoute: {
        component: connect(state => {
          return {
            baseUrl: baseUrl,
            pages: state.getIn(['tables', baseUrl])
          }
        })(PageList)
      },
      childRoutes: [{
        path: 'add',
        component: connect(state => {
          return {
            baseUrl: baseUrl
          }
        }, {
          addPage: _.partial(actions.addPage, baseUrl),
        })(AddPage)
      }, {
        path: ':id',
        component: connect((state, props) => {
          let {id} = props.params;
          return {
            baseUrl: baseUrl,
            page: state.getIn(['tables', baseUrl, id]),
            id
          }
        }, {
          updatePage: _.partial(actions.updatePage, baseUrl),
          removePage: _.partial(actions.removePage, baseUrl),
        })(EditPage)
      }]
    }
  }
});
