/**
 * DataFormsJS <data-table> Control
 */

/* Validates with both [jshint] and [eslint] */
/* global app */
/* jshint strict: true */
/* eslint-env browser */
/* eslint quotes: ["error", "single", { "avoidEscape": true }] */
/* eslint strict: ["error", "function"] */
/* eslint spaced-comment: ["error", "always"] */
/* eslint no-console: ["error", { allow: ["log", "warn", "error"] }] */

(function() {
    'use strict';

    /**
     * CSS loaded if using <template> instead of Handlebars, Vue, etc
     */
    var css = '.dataformsjs-control-loading .is-loaded { display:none; }';
    css += ' .dataformsjs-control-loading .has-error { display:none; }';
    css += ' .dataformsjs-control-loaded .is-loading { display:none; }';
    css += ' .dataformsjs-control-loaded .has-error { display:none; }';
    css += ' .dataformsjs-control-error .is-loading { display:none; }';
    css += ' .dataformsjs-control-error .is-loaded { display:none; }';

    /**
     * Set CSS on Control Element to show Loading/Loaded/Error
     */
    function setControlClass(element, control) {
        // Only load CSS if it is going to be used
        if (element.querySelector('.is-loading, is-loaded, .has-error') === null) {
            return;
        }
        
        // Create CSS and Update View
        app.loadCss('dataformsjs-control-json-data', css);
        element.classList.remove('dataformsjs-control-loading');
        element.classList.remove('dataformsjs-control-error');
        element.classList.remove('dataformsjs-control-loaded');
        if (control.isLoading) {
            element.classList.add('dataformsjs-control-loading');
        } else if (control.isLoaded) {
            element.classList.add('dataformsjs-control-loaded');
        } else if (control.hasError) {
            element.classList.add('dataformsjs-control-error');
        }
    }

    /**
     * DataFormsJS <json-data> Control
     */
    var jsonData = {
        /**
         * Data for the control
         */
        data: {
            url: '',
            isLoading: false,
            isLoaded: false,
            hasError: false,
            errorMessage: null,
            modelProp: null,
            refreshTimeInterval: null,
            intervalID: null,
            clickSelector: null,
            graphqlId: null,
            graphqlSrc: null,
            graphqlQuery: null,
            errorTextGraphQLErrors: '{count} GraphQL Errors occured. See console for full details.',
        },

        /**
         * Custom callback events
         */
        onFetch: null,
        onError: null,

        /**
         * Download JSON Data from a Web Service and refresh the control once loaded
         *
         * @this jsonData.data
         * @param {HTMLElement} element
         * @param {function} callback   (Optional)
         */
        fetchData: function (element, callback) {
            // Reference the Control's [data]
            var control = this,
                activeModelProp = null,
                url,
                init = null;

            // Exit if already loading
            if (control.isLoading) {
                return;
            }
            control.isLoading = true;
            control.isLoaded = false;
            control.hasError = false;

            // If using a property of the active model then get it or create
            // it as an object and assign control props.
            if (control.modelProp !== null) {
                app.activeModel[control.modelProp] = app.activeModel[control.modelProp] || {};
                activeModelProp = app.activeModel[control.modelProp];
                Object.assign(activeModelProp, control);
            }

            // Render HTML to allow for a 'Loading' message to show
            jsonData.renderControl(element, control);

            // If using GraphQL then POST the Query and Variables.
            // Otherwise a GET request is made.
            if (control.graphqlQuery) {
                url = (control.url ? control.url : app.settings.graphqlUrl);
                init = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        query: control.graphqlQuery,
                        variables: app.buildGraphQLVariables(control.graphqlQuery, app.activeModel),
                    }),
                };
            } else {
                // Build URL from Model Variables
                url = app.buildUrl(control.url, app.activeModel);
            }

            // Make the JSON Request
            app
            .fetch(url, init)
            .then(function(data) {
                // Make sure the response sent an object. This file expects
                // 'application/json' and not 'text/plain' and other response types.
                if (!(typeof data === 'object' || data === null)) {
                    throw new TypeError('Invalid Response type. Received data in format of [' + (typeof data) + ']');
                }

                // Make control as loaded
                control.isLoading = false;
                control.isLoaded = true;
                control.hasError = false;
                control.errorMessage = null;

                // Assign downloaded JSON to either the control or the model
                if (!control.graphqlQuery) {
                    if (activeModelProp === null) {
                        Object.assign(control, data);
                    } else {
                        Object.assign(activeModelProp, control);
                        Object.assign(activeModelProp, data);
                    }
                } else {
                    // If using GraphQL then copy from the [data] property.
                    if (activeModelProp === null) {
                        Object.assign(control, data.data);
                    } else {
                        Object.assign(activeModelProp, control);
                        Object.assign(activeModelProp, data.data);
                    }

                    // GraphQL can return both valid data and errors at the same time.
                    if (data.errors && data.errors.length) {
                        var errorMessage;
                        if (data.errors.length === 1 && data.errors[0].message) {
                            errorMessage = '[GraphQL Error]: ' + data.errors[0].message;
                        } else {
                            errorMessage = control.errorTextGraphQLErrors.replace('{count}', data.errors.length);
                        }
                        throw errorMessage;
                    }
                }

                // Render the HTML
                jsonData.renderControl(element, control);

                // Custom callback events
                if (jsonData.onFetch !== null) {
                    jsonData.onFetch.call(control, element);
                }
                if (callback !== undefined) {
                    callback();
                }
            })
            .catch(function(error) {
                // Update control data and show error for the element
                control.isLoading = false;
                control.isLoaded = false;
                control.hasError = true;
                control.errorMessage = error;
                if (activeModelProp !== null) {
                    Object.assign(activeModelProp, control);
                }     

                // Render the HTML
                jsonData.renderControl(element, control, error);

                // Custom callback events
                if (jsonData.onError !== null) {
                    jsonData.onError.call(control, element);
                }
                if (callback !== undefined) {
                    callback();
                }
            });
        },

        /**
         * Used internally to render the control once
         * data is downloaded or if there is an error.
         *
         * @param {HTMLElement} element
         * @param {object} control
         * @param {undefined|string} error
         */
        renderControl: function(element, control, error) {
            // Update CSS on the Control for Loading/Loaded/Error
            setControlClass(element, control);

            // Render or Refresh Control
            if (element.getAttribute('data-template-id') !== null || element.getAttribute('data-template-url') !== null) {
                // If the control uses a template then render it
                if (control.modelProp === null) {
                    app.refreshHtmlControl(element, undefined, control);
                } else {
                    app.refreshHtmlControl(element);
                }
            } else {
                // Otherwise no template, so just bind or show error
                if (error === undefined) {
                    app.refreshPlugins(element);
                } else {
                    app.showError(element, error);
                }
            }
        },

        /**
         * Event that gets called when a <json-data> is rendered on screen
         *
         * @this jsonData.data
         * @param {HTMLElement} element
         */
        onLoad: function(element) {
            var control = this;
            if (this.graphqlId || this.graphqlSrc) {
                // Assign URL from App Settings
                if (!this.url) {
                    this.url = app.settings.graphqlUrl;
                }

                // Get the GraphQL Script
                app
                .getGraphQL(control.graphqlId, control.graphqlSrc)
                .then(function(query) {
                    control.graphqlQuery = query;
                    jsonData.setupControl(control, element);
                })
                .catch(function(error) {
                    app.showErrorAlert(error);
                    jsonData.setupControl(control, element);
                });
            } else {
                jsonData.setupControl(control, element);
            }
        },

        /**
         * This gets called from [onLoad()] immediately for standard
         * JSON Services or once the GraphQL query is loaded.
         */
        setupControl: function (control, element) {
            // Handle the [data-click-selector] Attribute. If defined on the <json-data>
            // Control then data is not fetched until the user clicks the element specified
            // from the selector. This feature along with the [dataBind] plugin allows 
            // for search pages and forms to be developed through HTML.
            if (control.clickSelector !== null) {
                var btn = document.querySelector(control.clickSelector);
                if (btn === null) {
                    var error = 'Element not found for <json-data> Control using [data-click-selector]: ' + String(control.clickSelector);
                    app.showErrorAlert(error);
                } else {
                    btn.addEventListener('click', function() {
                        if (typeof btn.disabled === 'boolean') {
                            btn.disabled = true;
                        }
                        jsonData.fetchData.call(control, element, function() {
                            if (typeof btn.disabled === 'boolean') {
                                btn.disabled = false;
                            }
                        });
                    });
                }
                return;
            }

            // Fetch data when control is loaded
            jsonData.fetchData.call(control, element);

            // Fetch data on a timer
            if (control.refreshTimeInterval !== null) {
                control.intervalID = window.setInterval(function() {
                    jsonData.fetchData.call(control, element);
                }, control.refreshTimeInterval);
            }
        },

        /**
         * Event that gets called when a <json-control> element is unloaded
         *
         * @this jsonData.data
         */
        onUnload: function() {
            if (this.intervalID !== null) {
                window.clearInterval(this.intervalID);
            }
        },
    };

    /**
     * Add control to app
     */
    app.addControl('json-data', jsonData);
})();