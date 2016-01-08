import {connect} from 'react-redux'

import Dashboard from './components/Dashboard.jsx';
import Welcome from './components/Welcome.jsx';

import reducer, {INITIAL_STATE} from './reducer';
import actions from './actions';

export default function DashboardApplicationFactory(baseUrl) {
  return {
    reducer,
    actions,
    baseUrl,
    fixtures: {
      initial: INITIAL_STATE
    },
    title: 'Dashboard',
    routes: {
      path: baseUrl,
      component: connect(state => {
        return {
          apps: state.getIn(['/engine', 'apps']),
          plugins: state.getIn(['/', 'plugins']),
        }
      })(Dashboard),
      indexRoute: {
        component: Welcome
      }
    }
  }
}
