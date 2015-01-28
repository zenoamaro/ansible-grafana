// WARNING: This file is auto-generated from the provisioning
//          scripts. Do not edit by hand because your changes
//          will likely be overwritten.

// See the [documentation] for help in configuring Grafana.
// [documentation]: http://grafana.org/docs/

// Configuration
// -------------
// config.js is where you will find the core Grafana configuration. This
// file contains parameter that must be set before Grafana is run for
// the first time.

define(['settings'], function(Settings) {

  return new Settings({

      /* Data sources
      * ========================================================
      * Datasources are used to fetch metrics, annotations, and serve as
      * dashboard storage
      *  - You can have multiple of the same type.
      *  - grafanaDB: true    marks it for use for dashboard storage
      *  - default: true      marks the datasource as the default metric
      *    source (if you have multiple)
      *  - basic authentication: use url syntax
      *    http://username:password@domain:port
      */

      datasources: {
{% for name, source in grafana_data_sources.items() %}
        "{{name}}": {
          type: "{{source.type}}",
          url: "{{source.url}}",
          {% if 'username' in source %}username: "{{source.username}}",{% endif %}
          {% if 'password' in source %}password: "{{source.password}}",{% endif %}
          {% if 'index' in source %}index: "{{source.index}}",{% endif %}
          {% if 'grafana_db' in source %}grafanaDB: "{{'true' if source.grafana_db else 'false'}}"{% endif %}
        },
{% endfor %}
      },

      /* Global configuration options
      * ========================================================
      */

      // specify the limit for dashboard search results
      search: {
        max_results: {{grafana_search_max_results}}
      },

      // default home dashboard
      default_route: '{{grafana_default_route}}',

      // set to false to disable unsaved changes warning
      unsaved_changes_warning: {{'true' if grafana_unsaved_changes_warning else 'false'}},

      // set the default timespan for the playlist feature
      // Example: "1m", "1h"
      playlist_timespan: '{{grafana_playlist_timespan}}',

      // If you want to specify password before saving, please specify
      // it below The purpose of this password is not security, but to
      // stop some users from accidentally changing dashboards
      admin: {
        password: '{{grafana_admin_password or ''}}'
      },

      // Change window title prefix from 'Grafana - <dashboard title>'
      window_title_prefix: '{{grafana_window_title_prefix}}',

      // Add your own custom panels
      plugins: {
        // list of plugin panels
        panels: [
{% for plugin in grafana_plugins_panels %}
          '{{plugin}}'
{% endfor %}
        ],

        // requirejs modules in plugins folder that should be loaded
        // for example custom datasources
        dependencies: [
{% for dependency in grafana_plugins_dependencies %}
          '{{dependency}}'
{% endfor %}
        ],
      }

    });
});
