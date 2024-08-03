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
  "displayName": "Nameless Analytics | CS | Config Variable",
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
        "displayName": "Endpoint domain name",
        "simpleValueType": true,
        "valueValidators": [
          {
            "type": "NON_EMPTY"
          }
        ],
        "alwaysInSummary": true,
        "valueHint": "(not set)",
        "help": "Endpoint domain for the request, without any protocols.\n\u003cp\u003e\u003c/p\u003e\nE.g.: gtm.domain.com"
      },
      {
        "type": "TEXT",
        "name": "endpoint_path",
        "displayName": "Endpoint path",
        "simpleValueType": true,
        "valueValidators": [
          {
            "type": "NON_EMPTY"
          }
        ],
        "alwaysInSummary": true,
        "valueHint": "(not set)",
        "help": "Custom endpoint for the requests.\u003cp\u003e\u003c/p\u003eE.g.: collect/na"
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
        "help": "Custom event parameter names and values shared between events.\n\u003cp\u003e\u003c/p\u003e\nE.g.: parameter name \u003d page_category and parameter value \u003d Homepage"
      }
    ]
  },
  {
    "type": "GROUP",
    "name": "advanced_settings",
    "displayName": "Advanced settings",
    "groupStyle": "ZIPPY_OPEN",
    "subParams": [
      {
        "type": "CHECKBOX",
        "name": "respect_consent_mode",
        "checkboxText": "Respect Google Consent Mode",
        "simpleValueType": true,
        "displayName": "",
        "help": "If set to true, respects consent mode analytics_storage value.",
        "defaultValue": true,
        "alwaysInSummary": true
      },
      {
        "type": "CHECKBOX",
        "name": "enable_cross_domain_tracking",
        "checkboxText": "Enable cross domain tracking",
        "simpleValueType": true,
        "help": "If set to true, ebables cross-domain tracking. Add the domains without any protocols, one per row.\n\u003cp\u003e\u003c/p\u003e\nE.g.:\u003c/br\u003e\ndomain1.com\u003c/br\u003e\ndomain2.com",
        "displayName": "",
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
                "type": "TEXT",
                "valueHint": "(not set)",
                "isUnique": true,
                "valueValidators": [
                  {
                    "type": "NON_EMPTY"
                  }
                ]
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
        "name": "enable_logs",
        "checkboxText": "Enable Logs",
        "simpleValueType": true,
        "displayName": "",
        "help": "If set to true, enables logging on browser console.",
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
        "name": "nameless_analytics",
        "displayName": "\u003cimg src\u003d\"https://namelessanalytics.com/img/Logo%20black.svg\" width\u003d\"400\"\u003e"
      },
      {
        "type": "LABEL",
        "name": "info",
        "displayName": "Beta version: 1.0. \n\u003cp\u003e\u003cp/\u003e\nRead more about the \u003ca href\u003d\"https://github.com/tommasomoretti/nameless-analytics\"\u003eNameless Analytics project\u003c/a\u003e or the \u003ca href\u003d\"https://github.com/tommasomoretti/nameless-analytics-client-tag\"\u003eClient-side Config Variable\u003c/a\u003e.\n\u003cp\u003e\u003c/p\u003e\nCreated by \u003ca href\u003d\"https://tommasomoretti.com/?utm_source\u003dtagmanager.google.com\u0026utm_medium\u003dreferral\u0026utm_campaign\u003dcs_analytics_config_variable\"\u003eTommaso Moretti\u003c/a\u003e"
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

Created on 03/08/2024, 09:48:42


