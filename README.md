![Na logo beta](https://github.com/tommasomoretti/nameless-analytics/assets/29273232/7d4ded5e-4b79-46a2-b089-03997724fd10)

---

# Client-side tracker tag
The Nameless Analytics Client-side tracker tag is a highly customizable GTM custom template designed to send requests to the [Nameless Analytics Server-side client tag](https://github.com/tommasomoretti/nameless-analytics-server-side-client-tag). 

For an overview of how Nameless Analytics works [start from here](https://github.com/tommasomoretti/nameless-analytics#how-it-works).

Start from here:
- [Client-side tracker tag UI](#tag-ui-and-default-payload)
- [Standard payload](#standard-payload)
- Basic settings
  - [Configuration variable](#configuration-variable)
- Event data
  - [Event type](#event-type)
    - [Standard event](#standard-events)
    - [Custom event](#custom-events)
  - [Event parameters](#event-parameters)
    - [Add/override event parameters](#addoverride-event-parameters)
    - [Add event parameters from dataLayer](#add-event-parameters-from-datalayer)
- Advanced settings
  - [Disable logs in JavaScript console for this event](#disable-logs-in-javascript-console-for-this-event)

 

## Tag UI and default payload
This is the UI of the Client-side tracker tag.

<img width="1265" alt="Screenshot 2025-06-03 alle 15 43 37" src="https://github.com/user-attachments/assets/cebde006-94d2-4e80-97a1-1b8a62a2426e" />



## Standard payload
This is a payload with only standard parameters and no customization at all.

```json
{
  "client_id": "WNRc8grrzRrm1eV",
  "consent_data": {
    "ad_personalization": "Denied",
    "ad_storage": "Denied",
    "ad_user_data": "Denied",
    "analytics_storage": "Granted",
    "consent_type": "Update",
    "functionality_storage": "Denied",
    "personalization_storage": "Denied",
    "respect_consent_mode": "Yes",
    "security_storage": "Denied"
  },
  "content_length": 1421,
  "event_data": {
    "browser_language": "it-IT",
    "browser_name": "Chrome",
    "browser_version": "136.0.0.0",
    "campaign": null,
    "campaign_content": null,
    "campaign_id": null,
    "campaign_term": null,
    "channel_grouping": "direct",
    "city": "venice",
    "country": "IT",
    "cs_container_id": "GTM-PW7349P",
    "device_model": "Macintosh",
    "device_type": "desktop",
    "device_vendor": "Apple",
    "event_type": "page_view",
    "os_name": "Mac OS",
    "os_version": "10.15.7",
    "page_extension": null,
    "page_fragment": null,
    "page_hostname": "tommasomoretti.com",
    "page_hostname_protocol": "https",
    "page_id": "WNRc8grrzRrm1eV_Uq1RHjzmFeSj8wB-s2vfzOjFVERD7PH",
    "page_language": "it",
    "page_location": "/",
    "page_query": null,
    "page_referrer": null,
    "page_status_code": 200,
    "page_title": "Tommaso Moretti | Freelance digital data analyst",
    "screen_size": "1512x982",
    "source": "direct",
    "ss_container_id": "GTM-KQG9ZNG",
    "ss_hostname": "gtm.tommasomoretti.com",
    "user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36",
    "viewport_size": "1512x823"
  },
  "event_date": "2025-06-03",
  "event_datetime": "2025-06-03T18:21:38.447000",
  "event_id": "WNRc8grrzRrm1eV_Uq1RHjzmFeSj8wB-s2vfzOjFVERD7PH_1jEa60Curv2FVhT",
  "event_name": "page_view",
  "event_origin": "Website",
  "event_timestamp": 1748974898447,
  "processing_event_timestamp": 1748974898560,
  "session_data": {
    "cross_domain_session": "No",
    "session_browser_name": "Chrome",
    "session_campaign": null,
    "session_campaign_id": null,
    "session_channel_grouping": "direct",
    "session_country": "IT",
    "session_date": "2025-06-03",
    "session_device_type": "desktop",
    "session_end_timestamp": 1748974898447,
    "session_exit_page_location": "/",
    "session_exit_page_title": "Tommaso Moretti | Freelance digital data analyst",
    "session_hostname": "tommasomoretti.com",
    "session_language": "it-IT",
    "session_landing_page_location": "/",
    "session_landing_page_title": "Tommaso Moretti | Freelance digital data analyst",
    "session_number": 2,
    "session_source": "direct",
    "session_start_timestamp": 1748974898447
  },
  "session_id": "WNRc8grrzRrm1eV_Uq1RHjzmFeSj8wB",
  "user_data": {
    "user_campaign": null,
    "user_campaign_id": null,
    "user_channel_grouping": "direct",
    "user_country": "IT",
    "user_date": "2025-06-03",
    "user_device_type": "desktop",
    "user_first_session_timestamp": 1748965154138,
    "user_language": "it-IT",
    "user_last_session_timestamp": 1748974898447,
    "user_source": "direct"
  }
}

```
| **Event overview**       | **Type** | **Added**   | **Field description**                 |
|--------------------------|----------|-------------|---------------------------------------|
| event_date               | string   | Client-side | Date of the event                     |
| event_datetime           | string   | Client-side | Datetime of the event                 |
| event_timestamp          | integer  | Client-side | Timestamp of the event                |
| client_id                | string   | Server-side | Identificativo univoco dell'utente    |
| session_id               | string   | Server-Side | Identificativo univoco della sessione |



## Basic settings
### Configuration variable
The Nameless Analytics Client-side tracker tag inherits configuration settings from [Nameless Analytics Client-side configuration variable](https://github.com/tommasomoretti/nameless-analytics-client-side-config-variable). 

This variable will handle settings like:
- [set user level parameters]()
- [set session level parameters]()
- [set common event parameters]()
- [add last dataLayer status to the request]()
- [add page status code to the requests]()
- [set requests endpoint domain name and path](https://github.com/tommasomoretti/nameless-analytics-client-side-config-variable/blob/main/README.md#basic-settings)
- [add common event parameters and user ID](https://github.com/tommasomoretti/nameless-analytics-client-side-config-variable/blob/main/README.md#event-data)
- [set consent behavior](https://github.com/tommasomoretti/nameless-analytics-client-side-config-variable/blob/main/README.md#respect-google-consent-mode)
- [enable cross-domain tracking](https://github.com/tommasomoretti/nameless-analytics-client-side-config-variable/blob/main/README.md#enable-cross-domain-tracking-alfa-feature)
- [change traffic source URL parameters](https://github.com/tommasomoretti/nameless-analytics-client-side-config-variable/blob/main/README.md#customize-source-and-campaigns-url-parameters)
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
- page_load_time: Send this event when a page is loaded (on gtm.load event) with this parameters:
  - time_to_dom_interactive: ```performance.timing.domInteractive``` - ```performance.timing.responseStart```
  - page_render_time: ```performance.timing.domComplete``` - ```performance.timing.domLoading```
  - time_to_dom_complete: ```performance.timing.domComplete``` - ```performance.timing.responseStart```
  - total_page_load_time: ```performance.timing.loadEventEnd``` - ```performance.timing.navigationStart```
- page_closed: Send this event when a page is closed to improve the accuracy of ```time_on_page``` and ```session_duration```. This event can be triggered on ```gtm.scrollDepth``` since this event is pushed every time a page is closed, but it doesn't work with back and forward browser's buttons and with ```History.pushState()``` or ```History.replaceState()``` used in Single Page Applications.
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

To maintain consistency between events, it is highly recommended to use underscores between words to create descriptive, easily interpretable names. 

Examples:
- button_click
- form_submission
- video_played

Avoid:
- Spaces: button click
- Hyphens: button-click
- CamelCase: ButtonClick


### Event parameters
Add event parameters manually or via dataLayer for a specific event. The parameters will be added in the `event_data` object in the payload. 

If a parameter has the same name as another, it can override or be overridden depending on where it was set. 

This is the hierarchy of event parameter importance:

[Server-side parameters](https://github.com/tommasomoretti/nameless-analytics-server-side-client-tag/blob/main/README.md#addoverride-event-parameters) > [Specific event parameters](#addoverride-event-parameters) > [Shared parameters](https://github.com/tommasomoretti/nameless-analytics-client-side-config-variable/edit/main/README.md#add-shared-event-parameters) > [dataLayer parameters](#add-event-parameters-from-datalayer) > [Standard parameters](#standard-payload)

#### Add/override event parameters
Add or overwrite parameters for a specific event. Values accepted: strings, integers, float and json. Page_id and event_id parameters cannot be overwritten.

These parameters can override:
- default parameters
- parameters taken from dataLayer in Nameless Analytics Client-side Tracker tag
- shared event parameters added in Nameless Analytics Client-side Configuration variable

These parameters can be overridden by:
- parameter added for a specific request in Nameless Analytics Server-side client tag

#### Add event parameters from dataLayer
Retrieve current dataLayer values from the dataLayer.push() event that triggered the tag.

These parameters can override:
- default parameters

These parameters can be overridden by:
- parameter added for a specific request in Nameless Analytics Server-side client tag
- parameter added for a specific event in Nameless Analytics Client-side Tracker tag
- shared event parameters added in Nameless Analytics Client-side Configuration variable



## Advanced settings
### Disable logs in JavaScript console for this event
Disable console log for this specific event if [Enable logs in JavaScript console](https://github.com/tommasomoretti/nameless-analytics-client-side-config-variable?tab=readme-ov-file#enable-logs-in-javascript-console) is enabled in the Nameless Analytics Client-side config variable. 

---

Reach me at: [Email](mailto:hello@tommasomoretti.com) | [Website](https://tommasomoretti.com/?utm_source=github.com&utm_medium=referral&utm_campaign=nameless_analytics) | [Twitter](https://twitter.com/tommoretti88) | [Linkedin](https://www.linkedin.com/in/tommasomoretti/)
