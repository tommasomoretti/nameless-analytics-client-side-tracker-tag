![Na logo beta](https://github.com/tommasomoretti/nameless-analytics/assets/29273232/7d4ded5e-4b79-46a2-b089-03997724fd10)

---

# Client-side tracker tag
The Nameless Analytics Client-side tracker tag is a highly customizable GTM custom template designed to send requests to the [Nameless Analytics Server-side client tag](https://github.com/tommasomoretti/nameless-analytics-server-side-client-tag). 

For an overview of how Nameless Analytics works [start from here](https://github.com/tommasomoretti/nameless-analytics).

Start from here:
- [Client-side tracker tag UI](#tag-ui-and-default-payload)
- [Default payload](#default-payload)
- Basic settings
  - [Configuration variable](#configuration-variable)
- Event data
  - [Event type](#event-type)
    - [Standard events](#standard-events)
    - [Custom events](#custom-events)
  - Event parameters
    - [Add/override event parameters](#addoverride-event-parameters)
    - [Add event parameters from dataLayer](#add-event-parameters-from-datalayer)
- [Advanced settings](#advanced-settings)
  - [Disable logs in JavaScript console for this event](#disable-logs-in-javascript-console-for-this-event)

 

## Tag UI and default payload
This is the UI of the Client-side tracker tag.

<img width="1265" alt="client-side-tracker-tag" src="https://github.com/user-attachments/assets/a8470cb7-cf74-4f50-8d24-adabef2d194f"/>



## Default payload
This is a standard payload with no customization at all.

```json
{
  "event_name": "page_view", // Name of the event
  "event_timestamp": 1732279797314, // Timestamp of the event
  "from_measurement_protocol": "No", // Whether the event came from the Measurement Protocol
  "event_date": "2024-11-22", // Date of the event
  "event_datetime": "2024-11-22T12:49:57.314000", // Datetime of the event
  "user_id": "hello@domain.com", // User / Customer ID (only if configured) 
  "client_id": "Lxt3Tvvy28gGcbp", // Unique client ID
  "session_id": "Lxt3Tvvy28gGcbp_oTTWe4cEKBOlqex", // Unique session ID
  "received_event_timestamp": 1732279797603, // Timestamp when the event was received
  "content_length": 1410, // Length of the event content
  "event_data": {
    "event_id": "Lxt3Tvvy28gGcbp_oTTWe4cEKBOlqex-8sXAXZWpkuw9osP_1wU9MsrRZR8AKxG", // Unique event ID
    "event_type": "page_view", // Type of the event
    "channel_grouping": "direct", // Channel grouping
    "source": "direct", // Traffic source
    "campaign": null, // Campaign name
    "campaign_id": null, // Campaign ID
    "campaign_term": null, // Campaign term
    "campaign_content": null, // Campaign content
    "content_group": "Homepage", // Content group
    "page_id": "Lxt3Tvvy28gGcbp_oTTWe4cEKBOlqex-8sXAXZWpkuw9osP", // Unique page ID
    "page_title": "Tommaso Moretti | Freelance digital data analyst", // Title of the page
    "page_hostname_protocol": "https", // Protocol of the page hostname
    "page_hostname": "tommasomoretti.com", // Hostname of the page
    "page_location": "/", // Location of the page
    "page_fragment": null, // Fragment of the page URL
    "page_query": null, // Query parameters of the page
    "page_extension": null, // File extension of the page
    "page_referrer": null, // Referrer of the page
    "user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36", // User agent string
    "browser_name": "Chrome", // Name of the browser
    "browser_language": "it-IT", // Language of the browser
    "browser_version": "131.0.0.0", // Version of the browser
    "device_type": "desktop", // Type of the device
    "device_vendor": "Apple", // Vendor of the device
    "device_model": "Macintosh", // Model of the device
    "os_name": "Mac OS", // Operating system name
    "os_version": "10.15.7", // Version of the operating system
    "screen_size": "1512x982", // Screen size of the device
    "wiewport_size": "1512x823", // Viewport size of the device
    "country": "IT", // Country of the user
    "city": "treviso", // City of the user
    "cs_container_id": "GTM-PW7349P", // Client-side Google Tag Manager container ID
    "ss_container_id": "GTM-KQG9ZNG", // Server-side Google Tag Manager container ID
    "ss_hostname": "gtm.tommasomoretti.com" // Server-side Google Tag Manager hostname
  },
  "consent_data": {
    "consent_type": "default", // Type of consent
    "tracking_accuracy": "Enhanced", // Tracking accuracy
    "respect_consent_mode": true, // Whether consent mode is respected
    "ad_user_data": false, // Whether ad user data is allowed
    "ad_personalization": false, // Whether ad personalization is allowed
    "ad_storage": false, // Whether ad storage is allowed
    "analytics_storage": true, // Whether analytics storage is allowed
    "functionality_storage": false, // Whether functionality storage is allowed
    "personalization_storage": false, // Whether personalization storage is allowed
    "security_storage": false // Whether security storage is allowed
  }
}
```



## Basic settings
### Configuration variable
The Nameless Analytics Client-side tracker tag inherits configuration settings from [Nameless Analytics Client-side configuration variable](https://github.com/tommasomoretti/nameless-analytics-client-side-config-variable). 

This variable will handle settings:
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
  - time_to_dom_interactive: performance.timing.domInteractive - performance.timing.responseStart
  - page_render_time: performance.timing.domComplete - performance.timing.domLoading
  - time_to_dom_complete: performance.timing.domComplete - performance.timing.responseStart
  - total_page_load_time: performance.timing.loadEventEnd - performance.timing.navigationStart
- page_closed: Send this event when a page is closed to improve the accuracy of time_on_page and session_duration
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
#### Add/override event parameters
Add or overwrite parameters for a specific event. The parameters will be added in the `event_data` object in the payload. 

Values accepted: strings, integers, float and json. 

These parameters can override [shared event parameters](https://github.com/tommasomoretti/nameless-analytics-client-side-config-variable/blob/main/README.md#add-shared-event-parameters) and event parameters taken from dataLayer if they have the same name. Page_id and event_id parameters cannot be overwritten.

See the [default payload](#default-payload) for the parameters that are already sent by default.

#### Add event parameters from dataLayer
Retrieve current dataLayer values from the dataLayer.push() event that triggered the tag. The parameters will be added in the `event_data` object in the payload. 

These parameters can be overridden if they have the same name as [shared event parameters](https://github.com/tommasomoretti/nameless-analytics-client-side-config-variable/blob/main/README.md#add-shared-event-parameters) or parameter added for a specific event.



## Advanced settings
### Disable logs in JavaScript console for this event
Disable console log for this specific event if [Enable logs in JavaScript console](https://github.com/tommasomoretti/nameless-analytics-client-side-config-variable?tab=readme-ov-file#enable-logs-in-javascript-console) is enabled in the Nameless Analytics Client-side config variable. 

---

Reach me at: [Email](mailto:hello@tommasomoretti.com) | [Website](https://tommasomoretti.com/?utm_source=github.com&utm_medium=referral&utm_campaign=nameless_analytics) | [Twitter](https://twitter.com/tommoretti88) | [Linkedin](https://www.linkedin.com/in/tommasomoretti/)
