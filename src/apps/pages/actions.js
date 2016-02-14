
export function addPage(baseUrl, path, page) {
  return {
    type: 'ADD_PAGE',
    path,
    page,
    record_change: {
      new_object: page,
      table_name: baseUrl,
      object_id: path,
    },
    alert_message: `Added page ${page.title}`,
    next_url: `${baseUrl}${path}`
  };
}

export function removePage(baseUrl, path) {
  return {
    type: 'REMOVE_PAGE',
    path,
    record_change: {
      remove_object: path,
      table_name: baseUrl,
      object_id: path
    },
    alert_message: `Removed page`,
    next_url: `${baseUrl}`
  };
}

export function updatePage(baseUrl, path, page) {
  return {
    type: 'UPDATE_PAGE',
    path,
    page,
    record_change: {
      update_object: page,
      table_name: baseUrl,
      object_id: path
    },
    alert_message: `Updated page ${page.title}`,
  };
}

export default {addPage, removePage, updatePage}
