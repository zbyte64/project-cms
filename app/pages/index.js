import {connect} from 'react-redux'
import _ from 'lodash';

import PageList from './components/PageList.jsx';
import AddPage from './components/AddPage.jsx';
import EditPage from './components/EditPage.jsx';

import actions from './actions';
import publish from './publish';
import fixtures from './fixtures';

function pageTemplates(state) {
  return state.getIn(['tables', '/templates']).filter(tmp => tmp.get('type') === 'page');
}

function mediaSidebar(state) {
  let mediaApp = _.find(state.getIn(['/engine', 'apps']), {baseUrl: '/media'});
  return (mediaApp && mediaApp.embeddableComponents) ? mediaApp.embeddableComponents.mediaSidebar : null;
}

export default function PagesApplicationFactory(baseUrl) {
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
            pages: state.getIn(['tables', baseUrl]).toJS()
          }
        })(PageList)
      },
      childRoutes: [{
        path: 'add',
        component: connect(state => {
          return {
            baseUrl: baseUrl,
            templates: pageTemplates(state),
            render: state.getIn(['/engine', 'renderer']),
            mediaSidebar: mediaSidebar(state)
          }
        }, {
          addPage: _.partial(actions.addPage, baseUrl),
        })(AddPage)
      }, {
        path: '**',
        component: connect((state, props) => {
          let path = '/'+props.params.splat;
          return {
            baseUrl: baseUrl,
            page: state.getIn(['tables', baseUrl, path]).toJS(),
            path,
            templates: pageTemplates(state),
            render: state.getIn(['/engine', 'renderer']),
            mediaSidebar: mediaSidebar(state)
          }
        }, {
          updatePage: _.partial(actions.updatePage, baseUrl),
          removePage: _.partial(actions.removePage, baseUrl),
        })(EditPage)
      }]
    }
  }
}
