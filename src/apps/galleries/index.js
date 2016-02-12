import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import _ from 'lodash';

import GalleryList from './components/GalleryList.jsx';
import AddGallery from './components/AddGallery.jsx';
import EditGallery from './components/EditGallery.jsx';

import actions from './actions';
import publish from './publish';
import fixtures from './fixtures';

import {askForMedia} from '~/actions';
import {getTemplates} from '~/plugins';


const galleryTemplates = getTemplates('page', ['gallery']);


export default function GallerysApplicationFactory(baseUrl) {
  return {
    type: 'application',
    actions,
    fixtures,
    publish: _.partial(publish, baseUrl),
    tables: [baseUrl],
    title: 'Galleries',
    routes: {
      path: baseUrl,
      component: 'div',
      indexRoute: {
        component: connect(state => {
          return {
            baseUrl: baseUrl,
            galleries: state.getIn(['tables', baseUrl])
          }
        }, {
          askForMedia
        })(GalleryList)
      },
      childRoutes: [{
        path: 'add',
        component: connect(state => {
          return {
            baseUrl: baseUrl,
            templates: galleryTemplates(state),
            render: state.getIn(['/engine', 'renderer'])
          }
        }, {
          addGallery: _.partial(actions.addGallery, baseUrl),
          askForMedia,
        })(AddGallery)
      }, {
        path: '**',
        component: connect((state, props) => {
          let path = '/'+props.params.splat;
          return {
            baseUrl: baseUrl,
            gallery: state.getIn(['tables', baseUrl, path]),
            path,
            templates: galleryTemplates(state),
            render: state.getIn(['/engine', 'renderer']),
          }
        }, {
          updateGallery: _.partial(actions.updateGallery, baseUrl),
          removeGallery: _.partial(actions.removeGallery, baseUrl),
          askForMedia,
        })(EditGallery)
      }]
    }
  }
}