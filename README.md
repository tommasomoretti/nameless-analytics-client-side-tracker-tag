<img src="https://github.com/user-attachments/assets/93640f49-d8fb-45cf-925e-6b7075f83927#gh-light-mode-only" alt="Light Mode" />
<img src="https://github.com/user-attachments/assets/71380a65-3419-41f4-ba29-2b74c7e6a66b#gh-dark-mode-only" alt="Dark Mode" />

---

# Client-side tracker tag
The Nameless Analytics Client-side tracker tag is a highly customizable GTM custom template designed to send requests to the [Nameless Analytics Server-side client tag](https://github.com/tommasomoretti/nameless-analytics-server-side-client-tag). 

For an overview of how Nameless Analytics works [start from here](https://github.com/tommasomoretti/nameless-analytics/#how-it-works).

Table of contents:
- [Tag UI](#tag-ui)
- Basic settings
  - [Configuration variable](#configuration-variable)
- Event data
  - [Event type](#event-type)
    - [Standard event](#standard-events)
    - [Custom event](#custom-events)
  - [Event parameters](#event-parameters)
    - [Add/override event level parameters](#addoverride-event-level-parameters)
    - [Add event level parameters from dataLayer](#add-event-level-parameters-from-datalayer)
- Advanced settings
  - [Add ecommerce data](#send-ecommerce-data)
    - [From dataLayer](#from-dataLayer)
    - [From custom variable](#from-custom-variable)
  - [Add page status code](#add-page-status-code)
  - [Disable logs in JavaScript console for this event](#disable-logs-in-javascript-console-for-this-event)



# Tag UI
This is the UI of the Client-side tracker tag.

<img src="https://github.com/user-attachments/assets/c0c043de-35d3-4017-b5dd-4cb95453c5cb" alt="Nameless Analytics - Client-side tracker tag UI" />



# Basic settings
## Configuration variable
The Nameless Analytics Client-side tracker tag inherits configuration settings from [Nameless Analytics Client-side tracker configuration variable](https://github.com/tommasomoretti/nameless-analytics-client-side-tracker-configuration-variable/). 

<img src="https://github.com/user-attachments/assets/f39691cb-8b2c-4ba8-bfc3-2ca470d27922" alt="Basic settings" />

This variable will handle settings like:
- [set requests endpoint domain name and path](https://github.com/tommasomoretti/nameless-analytics-client-side-config-variable/#basic-settings)
- [set user level parameters](https://github.com/tommasomoretti/nameless-analytics-client-side-config-variable/#user-parameters)
- [set session level parameters](https://github.com/tommasomoretti/nameless-analytics-client-side-config-variable/#session-parameters)
- [set common event parameters](https://github.com/tommasomoretti/nameless-analytics-client-side-config-variable/#event-parameters)
- [respect Google Consent Mode](https://github.com/tommasomoretti/nameless-analytics-client-side-config-variable/#respect-google-consent-mode)
- [enable cross-domain tracking](https://github.com/tommasomoretti/nameless-analytics-client-side-config-variable/#enable-cross-domain-tracking)
- [customize source and campaigns url parameters](https://github.com/tommasomoretti/nameless-analytics-client-side-config-variable/#customize-source-and-campaigns-url-parameters)
- [change default JavaScript page view event names](https://github.com/tommasomoretti/nameless-analytics-client-side-config-variable/#change-default-JavaScript-page-view-event-names)
- [load main library from custom location](https://github.com/tommasomoretti/nameless-analytics-client-side-config-variable/#load-main-library-from-custom-location)
- [add current dataLayer state](https://github.com/tommasomoretti/nameless-analytics-client-side-config-variable/#add-current-dataLayer-state)
- [show logs in JavaScript console](https://github.com/tommasomoretti/nameless-analytics-client-side-config-variable/#enable-logs-in-javascript-console)



# Event data
## Event type
Choose between standard event names or custom event names. 

Please note: page_view is the only mandatory event, any events triggered prior to a page_view will be rejected. 

Be carefull to:
- Always trigger a page_view event as the very first event on every page load, any event triggered before to a page_view will be rejected.
- Prefer using standard event names when possible
- Follow naming convention for event name and event parameters 

### Standard event
Choose between:
- page_view: Send this event when a page is viewed. Use this event for both standard and virtual pageviews. This is the only mandatory event.
  
  <img src="https://github.com/user-attachments/assets/6676046d-ac08-4940-9cf6-8bdac962b88f" alt="Page view event configuration" />

- consent_given: Send this event the user give consent to improve the accuracy of consents metrics.
  
  <img src="https://github.com/user-attachments/assets/a6b61150-1b11-41c1-badb-cef6a61d9ad7" alt="Consent given event configuration" />

- page_load_time: Send this event when a page is loaded (on gtm.load javascript event) with this parameters:
  - time_to_dom_interactive: performance.timing.domInteractive - performance.timing.responseStart
  - page_render_time: performance.timing.domComplete - performance.timing.domLoading
  - time_to_dom_complete: performance.timing.domComplete - performance.timing.responseStart
  - total_page_load_time: performance.timing.loadEventEnd - performance.timing.navigationStart

  <img src="https://github.com/user-attachments/assets/2c6eb640-0f03-4499-85a0-e402fde00d71" alt="Page load time event configuration" />

- page_closed: Send this event when a page is closed to improve the accuracy of time_on_page, session_duration and other metrics. This event can be triggered on gtm.scrollDepth since this event is pushed every time a page is closed, but it doesn't work with back and forward browser's buttons and with History.pushState() or History.replaceState() used in Single Page Applications.

  <img src="https://github.com/user-attachments/assets/206e2401-8901-4673-925c-c81b60b1667f" alt="Page closed time event configuration" />


### Custom event
Choose a custom name for the event. 

<img src="https://github.com/user-attachments/assets/3e22ede5-7b71-4289-96ea-9b111f891265" alt="Custom event configuration" />


Please note: To maintain consistency between events, it is highly recommended to use _snake_case_ notation style (with underscores between words) to create descriptive, easily interpretable names. 

Examples:
- button_clicked
- form_submitted
- video_played

Avoid:
- Spaces: button clicked
- Hyphens: button-clicked
- CamelCase: ButtonClicked


## Event parameters
Add event parameters manually or via dataLayer for a specific event. The parameters will be added in the event_data object in the payload. 

Please note: if a parameter has the same name as another, it can override or be overridden depending on where it was set.

This is the hierarchy of event parameter importance:

[Server-side event parameters](https://github.com/tommasomoretti/nameless-analytics-server-side-client-tag/#addoverride-event-parameters) overrides [Specific event parameters](#addoverride-event-parameters) overrides [Shared event parameters](https://github.com/tommasomoretti/nameless-analytics-client-side-config-variable/#add-shared-event-parameters) overrides [dataLayer parameters](#add-event-parameters-from-datalayer) overrides [Standard parameters](#standard-request-payload)

### Add/override event parameters
Add or overwrite parameters for a specific event. Values accepted: strings, Integers, float and json. Page_id and event_id parameters cannot be overwritten.

<img src="https://github.com/user-attachments/assets/b1401824-a5eb-4082-bd29-2a83ccf819d0" alt="Add/override event parameters" />

These parameters can override:
- default parameters
- parameters taken from dataLayer in Nameless Analytics Client-side Tracker tag
- shared event parameters added in Nameless Analytics Client-side Configuration variable

These parameters can be overridden by:
- parameter added for a specific request in Nameless Analytics Server-side client tag

### Add event parameters from dataLayer
Retrieve current dataLayer values from the dataLayer.push() event that triggered the tag.

<img src="https://github.com/user-attachments/assets/669ec958-c93f-4f9a-afd5-12efa0e91cd1" alt="Add event parameters from dataLayer" />

These parameters can override:
- default event parameters

These parameters can be overridden by:
- shared event parameters added in Nameless Analytics Client-side configuration variable
- event parameters added in Nameless Analytics Client-side tracker tag
- event parameters added in Nameless Analytics Server-side client tag



# Advanced settings
## Send ecommerce data
Add ecommerce data from as a json object inside ecommerce field. 

Please note: The data model extracts data from the standard GA4 ecommerce structure but can be customized to support any ecommerce setup by modifying the JSON paths in the user, session, ecommerce, product and funnels queries.

### From dataLayer
To add ecommerce data from dataLayer, create a tag with this settings:

<img src="https://github.com/user-attachments/assets/73761561-879c-4dd1-93be-d4ad0bd245a0" alt="Send ecommerce data from dataLayer" />

and a trigger with this regex:

view_promotion|select_promotion|view_item_list|select_item|view_item|add_to_wishlist|add_to_cart|remove_from_cart|view_cart|begin_checkout|add_shipping_info|add_payment_info|purchase|refund

<img src="https://github.com/user-attachments/assets/4fd258be-6d25-4190-af27-22523457632d" alt="Send ecommerce data from dataLayer" />

Push ecommerce data into dataLayer as follow:

```javascript
dataLayer.push({ ecommerce: null });
dataLayer.push({
  event: "purchase",
  ecommerce: {
    // Ecommerce data
  }
});
```

### From custom variable
To add ecommerce data from custom variable, create a tag with this settings:

<img src="https://github.com/user-attachments/assets/6a6b7d8b-99e9-4793-be73-58cbd6f5bfba" alt="Send ecommerce data from custom variable" />

and this variable

<img src="https://github.com/user-attachments/assets/4948aa46-bfb3-4e0b-90b0-94b6340279dc" alt="Send ecommerce data from custom variable" />

and a trigger with this regex:

view_promotion|select_promotion|view_item_list|select_item|view_item|add_to_wishlist|add_to_cart|remove_from_cart|view_cart|begin_checkout|add_shipping_info|add_payment_info|purchase|refund

<img src="https://github.com/user-attachments/assets/4fd258be-6d25-4190-af27-22523457632d" alt="Send ecommerce data from custom variable" />


## Add page status code
Add page status code to the request in the event_data when a page_view happens. This setting will be visible in the UI only when the event name is equal to page_view.

<img src="https://github.com/user-attachments/assets/6446d49b-d8e7-4bd6-903a-1105ce0410a8" alt="Add page status code" />

Please note: this will not work for virtual_page_view.


## Disable logs in JavaScript console for this event
Disable console log for this specific event when [Enable logs in JavaScript console](https://github.com/tommasomoretti/nameless-analytics-client-side-config-variable/#enable-logs-in-javascript-console) is enabled in the Nameless Analytics Client-side config variable. 

---

Reach me at: [Email](mailto:hello@tommasomoretti.com) | [Website](https://tommasomoretti.com/?utm_source=github.com&utm_medium=referral&utm_campaign=nameless_analytics) | [Twitter](https://twitter.com/tommoretti88) | [Linkedin](https://www.linkedin.com/in/tommasomoretti/)
