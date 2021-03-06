import React from 'react';
import {destroy} from '~/reducers/tables';

function doPurge(event) {
  destroy().then(x => {
    console.log("Purge complete");
    window.location.reload();
  }, error => {
    console.error("Purge failed", error);
  });
}

export default function Welcome() {
  return <div className="container-fluid">
    <div className="row">
      <div className="col-sm-12">
        <h1>Welcome!</h1>

        <p>
          Things you should try:
        </p>
        <ul>
          <li><a href="#/pages/add">Add a Page</a></li>
          <li><a href="#/templates/base.html">Change the base layout of the site</a></li>
          <li>Press the export button in the top right corner</li>
        </ul>

        <p>
          App ideas:
        </p>
        <ul>
          <li>Blogging: much like pages but generates index pages</li>
          <li>Gallery: upload a list of images and get a gallery page</li>
          <li>Media: Core app, manage photos, videos, and other assets</li>
          <li>CTA: Create call to actions that can be embedded into any template (using a swig template tag)</li>
        </ul>

        <p>
          Technical Notes:
        </p>
        <ul>
          <li>This demo is 100% in the browser, no help from servers</li>
          <li>Everything is a pluggable application and is given a `baseUrl` for mounting in the dashboard app</li>
          <li>Publishing currently exports to a zipfile or S3 if configured</li>
          <li>Persistence is done with localstorage which can be <a onClick={doPurge}>purged</a></li>
          <li>[TODO] HTTP/2 will dramatically decrease load time</li>
          <li>I would hot load github modules and push to IPFS but cross origin security prevents that</li>
          <li>No uploading until you plugin S3 credentials</li>
        </ul>
      </div>
    </div>
  </div>
}
