
export function addGallery(baseUrl, path, gallery) {
  return {
    type: 'ADD_GALLERY',
    path,
    gallery,
    record_change: {
      new_object: gallery,
      table_name: baseUrl,
      object_id: path,
    },
    next_url: `${baseUrl}${path}`
  };
}

export function removeGallery(baseUrl, path) {
  return {
    type: 'REMOVE_GALLERY',
    path,
    record_change: {
      remove_object: path,
      table_name: baseUrl,
      object_id: path
    },
    next_url: `${baseUrl}`
  };
}

export function updateGallery(baseUrl, path, gallery) {
  return {
    type: 'UPDATE_GALLERY',
    path,
    gallery,
    record_change: {
      update_object: gallery,
      table_name: baseUrl,
      object_id: path
    }
  };
}

export default {addGallery, removeGallery, updateGallery}