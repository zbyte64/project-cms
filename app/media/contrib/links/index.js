import {connect} from 'react-redux'
import _ from 'lodash';

import LinkList from './components/LinkList.jsx';
import AddLink from './components/AddLink.jsx';

import actions from './actions';


function renderMediaItem(media_item, field) {
  switch(field) {
    case "detail_link":
      return media_item.get('media_type') + "/" + media_item.get('id');
    case "preview":
      return media_item.get('path');
    case "embed_code":
      const path = media_item.get('path');
      switch(media_item.get('type')) {
        case "anchor":
          return `<a href=${path}>${path}</a>`
        case "css":
          return `<link ref="stylesheet" href=${path}/>`
        case "javascript":
          return `<script src=${path}></script>`
        case "image":
          return `<img src=${path}/>`
      }
  }
}


export default function LinksApplicationFactory(baseUrl) {

  return {
    type: 'media provider',
    actions,
    title: 'Links',
    renderMediaItem: renderMediaItem,
    routes: {
      path: baseUrl,
      component: 'div',
      indexRoute: {
        component: connect(state => {
          return {
            baseUrl: baseUrl,
            links: state.getIn(['tables', '/media']).filter(x => x.get('media_type') === baseUrl)
          }
        })(LinkList)
      },
      childRoutes: [{
        path: 'add',
        component: connect(state => {
          return {
            baseUrl: baseUrl
          }
        }, {
          addLink: _.partial(actions.addLink, baseUrl),
        })(AddLink)
      }]
    }
  }
}
