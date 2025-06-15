![Na logo beta](https://github.com/tommasomoretti/nameless-analytics/assets/29273232/7d4ded5e-4b79-46a2-b089-03997724fd10)

---

# Client-side tracker tag
The Nameless Analytics Client-side tracker tag is a highly customizable GTM custom template designed to send requests to the [Nameless Analytics Server-side client tag](https://github.com/tommasomoretti/nameless-analytics-server-side-client-tag). 

For an overview of how Nameless Analytics works [start from here](https://github.com/tommasomoretti/nameless-analytics#how-it-works).

Start from here:
- [Client-side tracker tag UI](#tag-ui)
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



## Tag UI
This is the UI of the Client-side tracker tag.

![CS](https://github.com/user-attachments/assets/7182fc97-c2dd-4c49-9df4-a474de804a3b)



## Basic settings
### Configuration variable
The Nameless Analytics Client-side tracker tag inherits configuration settings from [Nameless Analytics Client-side configuration variable](https://github.com/tommasomoretti/nameless-analytics-client-side-config-variable). 

This variable will handle settings like:
- [set requests endpoint domain name and path](https://github.com/tommasomoretti/nameless-analytics-client-side-config-variable/blob/main/README.md#basic-settings)
- [set user level parameters](https://github.com/tommasomoretti/nameless-analytics-client-side-config-variable/blob/main/README.md#user-parameters)
- [set session level parameters](https://github.com/tommasomoretti/nameless-analytics-client-side-config-variable/blob/main/README.md#session-parameters)
- [set common event parameters](https://github.com/tommasomoretti/nameless-analytics-client-side-config-variable/blob/main/README.md#event-parameters)
- [respect Google Consent Mode](https://github.com/tommasomoretti/nameless-analytics-client-side-config-variable/blob/main/README.md#respect-google-consent-mode)
- [enable cross-domain tracking](https://github.com/tommasomoretti/nameless-analytics-client-side-config-variable/blob/main/README.md#enable-cross-domain-tracking)
- [customize source and campaigns url parameters](https://github.com/tommasomoretti/nameless-analytics-client-side-config-variable/blob/main/README.md#customize-source-and-campaigns-url-parameters)
- [change default JavaScript page view event names](https://github.com/tommasomoretti/nameless-analytics-client-side-config-variable/blob/main/README.md#change-default-JavaScript-page-view-event-names)
- [load main library from custom location](https://github.com/tommasomoretti/nameless-analytics-client-side-config-variable/blob/main/README.md#load-main-library-from-custom-location)
- [add current dataLayer state](https://github.com/tommasomoretti/nameless-analytics-client-side-config-variable/blob/main/README.md#add-current-dataLayer-state)
- [show logs in JavaScript console](https://github.com/tommasomoretti/nameless-analytics-client-side-config-variable/blob/main/README.md#enable-logs-in-javascript-console)




## Event data
### Event type
Choose between standard event names or custom event names. 

Be carefull to:
- Always trigger a page_view event as the very first event on every page load. See [Change default JavaScript page view event names](https://github.com/tommasomoretti/nameless-analytics-client-side-config-variable/blob/main/README.md#change-default-javascript-page-view-event-names) in the Nameless Analytics Client-side configuration variable for more information
- Use standard event names when possible
- Follow naming convention for event name and event parameters 

#### Standard event
Choose between:
- page_view: Send this event when a page is viewed. Use this event for both standard and virtual pageviews. This is the only mandatory event.
- page_load_time: Send this event when a page is loaded (on gtm.load javascript event) with this parameters:
  - time_to_dom_interactive: performance.timing.domInteractive - performance.timing.responseStart
  - page_render_time: performance.timing.domComplete - performance.timing.domLoading
  - time_to_dom_complete: performance.timing.domComplete - performance.timing.responseStart
  - total_page_load_time: performance.timing.loadEventEnd - performance.timing.navigationStart
- page_closed: Send this event when a page is closed to improve the accuracy of time_on_page, session_duration and other metrics. This event can be triggered on gtm.scrollDepth since this event is pushed every time a page is closed, but it doesn't work with back and forward browser's buttons and with History.pushState() or History.replaceState() used in Single Page Applications.
- view_promotion: Send this event when a user views a promotion
- select_promotion: Send this event when a user interacts with a promotion
- view_item: Send this event when a user views the details of a product
- view_item_list: Send this event when a user views a list of products
- select_item: Send this event when a user selects a product from a list
- add_to_cart: Send this event when a user adds a product to the cart
- remove_from_cart: Send this event when a user removes a product from the cart
- add_to_wishlist: Send this event when a user adds a product to the wishlist
- remove_from_wishlist: Send this event when a user removes a product to the wishlist
- view_cart: Send this event when a user views the cart
- begin_checkout: Send this event when a user starts the checkout process
- add_payment_info: Send this event when a user provides payment information during checkout
- add_shipping_info: Send this event when a user adds shipping information during checkout
- purchase: Send this event when a purchase is successfully completed
- refund: Send this event when a refund is issued

#### Custom event
Choose a custom name for the event. 

Please note: To maintain consistency between events, it is highly recommended to use underscores between words to create descriptive, easily interpretable names. 

Examples:
- button_clicked
- form_submitted
- video_played

Avoid:
- Spaces: button clicked
- Hyphens: button-clicked
- CamelCase: ButtonClicked


### Event parameters
Add event parameters manually or via dataLayer for a specific event. The parameters will be added in the `event_data` object in the payload. 

Please note: if a parameter has the same name as another, it can override or be overridden depending on where it was set.

This is the hierarchy of event parameter importance:

[Server-side event parameters](https://github.com/tommasomoretti/nameless-analytics-server-side-client-tag/blob/main/README.md#addoverride-event-parameters) overrides [Specific event parameters](#addoverride-event-parameters) overrides [Shared event parameters](https://github.com/tommasomoretti/nameless-analytics-client-side-config-variable/edit/main/README.md#add-shared-event-parameters) overrides [dataLayer parameters](#add-event-parameters-from-datalayer) overrides [Standard parameters](#standard-payload)

#### Add/override event parameters
Add or overwrite parameters for a specific event. Values accepted: strings, Integers, float and json. Page_id and event_id parameters cannot be overwritten.

These parameters can override:
- default parameters
- parameters taken from dataLayer in Nameless Analytics Client-side Tracker tag
- shared event parameters added in Nameless Analytics Client-side Configuration variable

These parameters can be overridden by:
- parameter added for a specific request in Nameless Analytics Server-side client tag

#### Add event parameters from dataLayer
Retrieve current dataLayer values from the dataLayer.push() event that triggered the tag.

These parameters can override:
- default event parameters

These parameters can be overridden by:
- shared event parameters added in Nameless Analytics Client-side configuration variable
- event parameters added in Nameless Analytics Client-side tracker tag
- event parameters added in Nameless Analytics Server-side client tag



## Advanced settings
### Send ecommerce data
Add ecommerce data from as a json object inside ecommerce field. 

Please note: The pre-built Google BigQuery ecommerce data model extracts data from the standard GA4 ecommerce structure, but it can be customized to support any ecommerce structure.

#### From dataLayer
To add ecommerce data from dataLayer, create a tag with this settings:

<img width="1265" alt="Screenshot 2025-06-13 alle 13 12 43" src="https://github.com/user-attachments/assets/73761561-879c-4dd1-93be-d4ad0bd245a0" />

and a trigger with this regex:

view_promotion|select_promotion|view_item_list|select_item|view_item|add_to_wishlist|add_to_cart|remove_from_cart|view_cart|begin_checkout|add_shipping_info|add_payment_info|purchase|refund

<img width="1265" alt="Screenshot 2025-06-12 alle 17 35 19" src="https://github.com/user-attachments/assets/4fd258be-6d25-4190-af27-22523457632d" />

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

#### From custom variable
To add ecommerce data from custom variable, create a tag with this settings:

<img width="1265" alt="Screenshot 2025-06-13 alle 13 13 10" src="https://github.com/user-attachments/assets/6a6b7d8b-99e9-4793-be73-58cbd6f5bfba" />

and this variable

<img width="1265" alt="Screenshot 2025-06-12 alle 17 47 18" src="https://github.com/user-attachments/assets/4948aa46-bfb3-4e0b-90b0-94b6340279dc" />

and a trigger with this regex:

view_promotion|select_promotion|view_item_list|select_item|view_item|add_to_wishlist|add_to_cart|remove_from_cart|view_cart|begin_checkout|add_shipping_info|add_payment_info|purchase|refund

<img width="1265" alt="Screenshot 2025-06-12 alle 17 35 19" src="https://github.com/user-attachments/assets/4fd258be-6d25-4190-af27-22523457632d" />


### Add page status code
Add page status code to the request in event_data when a page_view happens. 

Please note: this will not work for virtual_page_view.


### Disable logs in JavaScript console for this event
Disable console log for this specific event when [Enable logs in JavaScript console](https://github.com/tommasomoretti/nameless-analytics-client-side-config-variable?tab=readme-ov-file#enable-logs-in-javascript-console) is enabled in the Nameless Analytics Client-side config variable. 

---

Reach me at: [Email](mailto:hello@tommasomoretti.com) | [Website](https://tommasomoretti.com/?utm_source=github.com&utm_medium=referral&utm_campaign=nameless_analytics) | [Twitter](https://twitter.com/tommoretti88) | [Linkedin](https://www.linkedin.com/in/tommasomoretti/)
