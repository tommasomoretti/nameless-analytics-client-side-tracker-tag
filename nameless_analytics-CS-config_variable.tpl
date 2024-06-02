___TERMS_OF_SERVICE___

By creating or modifying this file you agree to Google Tag Manager's Community
Template Gallery Developer Terms of Service available at
https://developers.google.com/tag-manager/gallery-tos (or such other URL as
Google may provide), as modified from time to time.


___INFO___

{
  "type": "MACRO",
  "id": "cvt_temp_public_id",
  "version": 1,
  "securityGroups": [],
  "displayName": "Nameless Analytics | CS | Config variable",
  "description": "",
  "containerContexts": [
    "WEB"
  ]
}


___TEMPLATE_PARAMETERS___

[
  {
    "type": "GROUP",
    "name": "basic_settings",
    "displayName": "Basic settings",
    "groupStyle": "ZIPPY_OPEN",
    "subParams": [
      {
        "type": "TEXT",
        "name": "endpoint_domain_name",
        "displayName": "Domain name",
        "simpleValueType": true,
        "valueValidators": [
          {
            "type": "NON_EMPTY"
          }
        ],
        "alwaysInSummary": true,
        "valueHint": "(not set)",
        "help": "Domain for the request. Es: gtm.domain.com"
      },
      {
        "type": "TEXT",
        "name": "endpoint_path",
        "displayName": "Endpoint name",
        "simpleValueType": true,
        "valueValidators": [
          {
            "type": "NON_EMPTY"
          }
        ],
        "alwaysInSummary": true,
        "valueHint": "(not set)",
        "help": "Custom endpoint for the request. Es: custom_endpoint"
      }
    ],
    "help": "Lorem ipsum"
  },
  {
    "type": "GROUP",
    "name": "params_settings",
    "displayName": "Parameters",
    "groupStyle": "ZIPPY_OPEN",
    "subParams": [
      {
        "type": "SIMPLE_TABLE",
        "name": "common_event_params",
        "displayName": "Common event params",
        "simpleTableColumns": [
          {
            "defaultValue": "",
            "displayName": "Param name",
            "name": "param_name",
            "type": "TEXT",
            "valueHint": "(not set)",
            "isUnique": true,
            "valueValidators": [
              {
                "type": "NON_EMPTY"
              }
            ]
          },
          {
            "defaultValue": "",
            "displayName": "Param value",
            "name": "param_value",
            "type": "TEXT",
            "valueHint": "(not set)"
          }
        ],
        "alwaysInSummary": true,
        "help": "Insert column name and values."
      }
    ]
  },
  {
    "type": "GROUP",
    "name": "option",
    "displayName": "Options",
    "groupStyle": "ZIPPY_OPEN",
    "subParams": [
      {
        "type": "CHECKBOX",
        "name": "enable_cross_domain_tracking",
        "checkboxText": "Set enable_cross_domain_tracking",
        "simpleValueType": true,
        "help": "Add a domain, one per row",
        "displayName": "Enable cross domain tracking",
        "defaultValue": false,
        "alwaysInSummary": true,
        "subParams": [
          {
            "type": "SIMPLE_TABLE",
            "name": "cross_domain_domains",
            "displayName": "",
            "simpleTableColumns": [
              {
                "defaultValue": "",
                "displayName": "Domain",
                "name": "domain",
                "type": "TEXT"
              }
            ],
            "valueValidators": [
              {
                "type": "NON_EMPTY"
              }
            ],
            "alwaysInSummary": true,
            "enablingConditions": [
              {
                "paramName": "enable_cross_domain_tracking",
                "paramValue": true,
                "type": "EQUALS"
              }
            ]
          }
        ]
      },
      {
        "type": "CHECKBOX",
        "name": "respect_consent_mode",
        "checkboxText": "Set respectConsentMode",
        "simpleValueType": true,
        "displayName": "Respect consent mode",
        "help": "If set to true, then the tags respect consent mode analytics_storage value.",
        "defaultValue": false,
        "alwaysInSummary": true
      },
      {
        "type": "CHECKBOX",
        "name": "enable_logs",
        "checkboxText": "Set enableLogs",
        "simpleValueType": true,
        "displayName": "Enable logs",
        "help": "If set to true, then enable logging on browser console.",
        "defaultValue": false,
        "alwaysInSummary": true
      }
    ],
    "help": "Lorem ipsum"
  },
  {
    "type": "GROUP",
    "name": "credits",
    "displayName": "Variable info",
    "groupStyle": "ZIPPY_OPEN",
    "subParams": [
      {
        "type": "LABEL",
        "name": "version",
        "displayName": "Version: 1.0"
      },
      {
        "type": "LABEL",
        "name": "creator",
        "displayName": "Created by \u003ca href\u003d\"https://tommasomoretti.com/?utm_source\u003dcs_analytics_config_variable\u0026utm_medium\u003dreferral\"\u003eTommaso Moretti\u003c/a\u003e"
      }
    ]
  }
]


___SANDBOXED_JS_FOR_WEB_TEMPLATE___

const Object = require('Object');

Object.delete(data, 'gtmEventId');
return data;


___TESTS___

scenarios: []


___NOTES___

Created on 02/06/2024, 15:30:39


