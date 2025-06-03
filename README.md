![Na logo beta](https://github.com/tommasomoretti/nameless-analytics/assets/29273232/7d4ded5e-4b79-46a2-b089-03997724fd10)

---

# Client-side tracker tag
The Nameless Analytics Client-side tracker tag is a highly customizable GTM custom template designed to send requests to the [Nameless Analytics Server-side client tag](https://github.com/tommasomoretti/nameless-analytics-server-side-client-tag). 

For an overview of how Nameless Analytics works [start from here](https://github.com/tommasomoretti/nameless-analytics#how-it-works).

Start from here:
- [Client-side tracker tag UI](#tag-ui-and-default-payload)
- [Default payload](#default-payload)
- Basic settings
  - [Configuration variable](#configuration-variable)
- Event data
  - [Event type](#event-type)
    - [Standard events](#standard-events)
    - [Custom events](#custom-events)
  - [Event parameters](#event-parameters)
    - [Add/override event parameters](#addoverride-event-parameters)
    - [Add event parameters from dataLayer](#add-event-parameters-from-datalayer)
- Advanced settings
  - [Disable logs in JavaScript console for this event](#disable-logs-in-javascript-console-for-this-event)

 

## Tag UI and default payload
This is the UI of the Client-side tracker tag.

<img width="1265" alt="Screenshot 2025-06-03 alle 15 43 37" src="https://github.com/user-attachments/assets/cebde006-94d2-4e80-97a1-1b8a62a2426e" />



## Default payload
This is a payload with only standard parameters and no customization at all.

```json
{
  "event_date": "2025-02-04",
  "event_datetime": "2025-02-04T19:17:30.296000",
  "event_timestamp": 1738696650296,
  "received_event_timestamp": 1738696650571,
  "user_id": "Redacted",
  "client_id": "Redacted",
  "session_id": "Redacted_Redacted",
  "event_name": "page_view",
  "event_origin": "Website",
  "content_length": 1441,
  "event_data": {
    "event_type": "page_view",
    "event_id": "Redacted_Redacted-xg6k8WD3EjvYCRg_ytQ2z8joW5z6wCn",
    "channel_grouping": "direct",
    "source": "direct",
    "campaign": null,
    "campaign_id": null,
    "campaign_term": null,
    "campaign_content": null,
    "page_id": "Redacted_Redacted-xg6k8WD3EjvYCRg",
    "page_title": "Tommaso Moretti | Freelance digital data analyst",
    "page_hostname_protocol": "https",
    "page_hostname": "tommasomoretti.com",
    "page_location": "/",
    "page_fragment": null,
    "page_query": null,
    "page_extension": null,
    "page_referrer": null,
    "cs_container_id": "GTM-PW7349P",
    "user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36",
    "browser_name": "Chrome",
    "browser_language": "it-IT",
    "browser_version": "132.0.0.0",
    "device_type": "desktop",
    "device_vendor": "Apple",
    "device_model": "Macintosh",
    "os_name": "Mac OS",
    "os_version": "10.15.7",
    "screen_size": "1512x982",
    "wiewport_size": "1512x823",
    "page_language": "it",
    "country": "IT",
    "city": "trieste",
    "ss_hostname": "gtm.tommasomoretti.com",
    "ss_container_id": "GTM-KQG9ZNG"
  },
  "consent_data": {
    "respect_consent_mode": "No",
    "tracking_anonimization": "Yes",
    "consent_type": "Default",
    "ad_user_data": "Denied",
    "ad_personalization": "Denied",
    "ad_storage": "Denied",
    "analytics_storage": "Denied",
    "functionality_storage": "Denied",
    "personalization_storage": "Denied",
    "security_storage": "Denied"
  }
}
```


| **Event overview**       | **Event details**       | **Type** | **Added**   | **Field description**                                                     | **Calculated** |
|--------------------------|-------------------------|----------|-------------|---------------------------------------------------------------------------|--------------------|
| event_date               |                         | String   | Client side | Date of the event (YYYY-MM-DD format)                                     | Via Javascript with [format-timestamp utility function]([url](https://github.com/tommasomoretti/nameless-analytics-measurement-protocol-and-utility-functions?tab=readme-ov-file#format-timestamp)) | 
| event_datetime           |                         | String   | Client side | Full timestamp of the event (ISO 8601 format)                             |
| event_timestamp          |                         | Integer  | Client side | Unix timestamp (milliseconds) of when the event was triggered             |
| received_event_timestamp |                         | Integer  | Server side | Unix timestamp (milliseconds) of when the event was received              |
| user_id                  |                         | String   | Client side | User ID (if available, may be anonymized)                                 |
| client_id                |                         | String   | Server side | Unique identifier for the client (browser or app instance)                |
| session_id               |                         | String   | Server side | Unique identifier for the session                                         |
| event_name               |                         | String   | Client side | Name of the event (e.g., page view, click, purchase)                      |
| event_origin             |                         | String   | Client side | Source of the event (e.g., Website, Mobile App)                           |
| content_length           |                         | Integer  | Server side | Length of the event payload (bytes)                                       |
| event_data               | event_type              | String   | Client side | Type of event                                                             |
|                          | event_id                | String   | Client side | Unique identifier for the event                                           |
|                          | channel_grouping        | String   | Client side | Attribution channel (e.g., organic, paid, direct)                         |
|                          | source                  | String   | Client side | Source of traffic (e.g., google, facebook, direct)                        |
|                          | campaign                | String   | Client side | Name of the campaign (if applicable)                                      |
|                          | campaign_id             | String   | Client side | Campaign ID (if applicable)                                               |
|                          | campaign_term           | String   | Client side | Search term used in the campaign (if applicable)                          |
|                          | campaign_content        | String   | Client side | Campaign content (e.g., ad variation, CTA text)                           |
|                          | page_id                 | String   | Client side | Unique identifier for the page                                            |
|                          | page_title              | String   | Client side | Title of the page visited                                                 |
|                          | page_hostname_protocol  | String   | Client side | Protocol used (http or https)                                             |
|                          | page_hostname           | String   | Client side | Hostname of the page                                                      |
|                          | page_location           | String   | Client side | Path of the page within the website                                       |
|                          | page_fragment           | String   | Client side | URL fragment (hash part, e.g., #section1)                                 |
|                          | page_query              | String   | Client side | Query string parameters in the URL                                        |
|                          | page_extension          | String   | Client side | File extension of the page (e.g., .html, .php)                            |
|                          | page_referrer           | String   | Client side | Referrer URL (previous page)                                              |
|                          | page_language           | String   | Client side | Language of the page content                                              |
|                          | cs_container_id         | String   | Client side | Client-side Google Tag Manager container ID                               |
|                          | user_agent              | String   | Client side | User agent string                                                         |
|                          | browser_name            | String   | Client side | Name of the browser used                                                  |
|                          | browser_language        | String   | Client side | Language setting of the browser                                           |
|                          | browser_version         | String   | Client side | Version of the browser                                                    |
|                          | device_type             | String   | Client side | Type of device (e.g., desktop, mobile, tablet)                            |
|                          | device_vendor           | String   | Client side | Manufacturer of the device                                                |
|                          | device_model            | String   | Client side | Model of the device                                                       |
|                          | os_name                 | String   | Client side | Operating system name                                                     |
|                          | os_version              | String   | Client side | Version of the operating system                                           |
|                          | screen_size             | String   | Client side | Full screen resolution of the device                                      |
|                          | wiewport_size           | String   | Client side | Viewport size (usable area in browser)                                    |
|                          | country                 | String   | Server side | Country of the user (based on IP or other signals)                        |
|                          | city                    | String   | Server side | City of the user (based on IP or other signals)                           |
|                          | ss_hostname             | String   | Server side | Server-side GTM hostname                                                  |
|                          | ss_container_id         | String   | Server side | Server-side Google Tag Manager container ID                               |
| Consent details          | respect_consent_mode    | String   | Client side | Whether consent mode is respected                                         |
|                          | tracking_anonimization  | String   | Client side | Whether tracking is anonymized (if respect_consent_mode is "No")          |
|                          | consent_type            | String   | Client side | Type of consent applied                                                   |
|                          | ad_user_data            | String   | Client side | Whether advertising user data is allowed                                  |
|                          | ad_personalization      | String   | Client side | Whether ad personalization is allowed                                     |
|                          | ad_storage              | String   | Client side | Whether ad-related storage (cookies, local storage) is allowed            |
|                          | analytics_storage       | String   | Client side | Whether analytics storage (cookies, local storage) is allowed             |
|                          | functionality_storage   | String   | Client side | Whether functional cookies (e.g., preferences) are allowed                |
|                          | personalization_storage | String   | Client side | Whether personalization storage is allowed                                |
|                          | security_storage        | String   | Client side | Whether security-related storage (e.g., authentication tokens) is allowed |



## Basic settings
### Configuration variable
The Nameless Analytics Client-side tracker tag inherits configuration settings from [Nameless Analytics Client-side configuration variable](https://github.com/tommasomoretti/nameless-analytics-client-side-config-variable). 

This variable will handle settings like:
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

#### Standard events
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

#### Custom events

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

[Server-side parameters](https://github.com/tommasomoretti/nameless-analytics-server-side-client-tag/blob/main/README.md#addoverride-event-parameters) > [Specific event parameters](#addoverride-event-parameters) > [Shared parameters](https://github.com/tommasomoretti/nameless-analytics-client-side-config-variable/edit/main/README.md#add-shared-event-parameters) > [dataLayer parameters](#add-event-parameters-from-datalayer) > [Default parameters](#default-payload)

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
