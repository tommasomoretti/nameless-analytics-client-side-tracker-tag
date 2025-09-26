<img src="https://github.com/user-attachments/assets/93640f49-d8fb-45cf-925e-6b7075f83927#gh-light-mode-only" alt="Light Mode" />
<img src="https://github.com/user-attachments/assets/71380a65-3419-41f4-ba29-2b74c7e6a66b#gh-dark-mode-only" alt="Dark Mode" />

---

# Client-side tracker tag
The Nameless Analytics Client-side tracker tag is a highly customizable GTM custom template designed to send requests to the [Nameless Analytics Server-side client tag](https://github.com/tommasomoretti/nameless-analytics-server-side-client-tag). 

For an overview of how Nameless Analytics works [start from here](https://github.com/tommasomoretti/nameless-analytics/#how-it-works).

Table of contents:
- [Client-side tracker tag UI](#tag-ui)
  - [Request payload](#request-payload)
- Event data
  - [Event type](#event-type)
    - [Standard event](#standard-events)
    - [Custom event](#custom-events)
  - [Event parameters](#event-parameters)
    - [Add/override event level parameters](#addoverride-event-level-parameters)
    - [Remove event level parameters](#remove-event-level-parameters)
    - [Add event level parameters from dataLayer](#add-event-level-parameters-from-datalayer)
    - [Add ecommerce data](#send-ecommerce-data)
- Settings
  - [Configuration variable](#configuration-variable)
- Advanced settings
  - [Disable logs in JavaScript console for this event](#disable-logs-in-javascript-console-for-this-event)



# Tag UI
This is the UI of the Client-side tracker tag.

<img src="https://github.com/user-attachments/assets/b4f232e8-bdce-481c-90d0-e5ecf335c889" alt="Nameless Analytics - Client-side tracker tag UI" />


## Request payload
<details><summary>Request payload example with only standard parameters and no customization at all.</summary>

```json
{
  "event_date": "2025-06-12",
  "event_datetime": "2025-06-12T13:26:05.138000",
  "event_timestamp": 1749734765138,
  "event_origin": "Website",
  "processing_event_timestamp": 1749734765882,
  "content_length": 1395,
  "client_id": "bm0nQaxTjBSf5Ag",
  "user_data": {
    "user_date": "2025-06-11",
    "user_channel_grouping": "gtm_debugger",
    "user_source": "tagassistant.google.com",
    "user_campaign": null,
    "user_campaign_id": null,
    "user_campaign_content": null, 
    "user_campaign_term": null, 
    "user_device_type": "desktop",
    "user_country": "IT",
    "user_language": "it-IT",
    "user_first_session_timestamp": 1749632541988,
    "user_last_session_timestamp": 1749734755749
  },
  "session_id": "bm0nQaxTjBSf5Ag_sJ3UilMZloKTSEb",
  "session_data": {
    "session_date": "2025-06-12",
    "session_number": 4,
    "cross_domain_session": "No",
    "session_channel_grouping": "direct",
    "session_source": "direct",
    "session_campaign": null,
    "session_campaign_id": null,
    "session_campaign_content": null, 
    "session_campaign_term": null, 
    "session_device_type": "desktop",
    "session_country": "IT",
    "session_language": "it-IT",
    "session_hostname": "tommasomoretti.com",
    "session_browser_name": "Chrome",
    "session_landing_page_category": null,
    "session_landing_page_location": "/",
    "session_landing_page_title": "Tommaso Moretti | Freelance digital data analyst",
    "session_exit_page_category": null, 
    "session_exit_page_location": "/",
    "session_exit_page_title": "Tommaso Moretti | Freelance digital data analyst",
    "session_start_timestamp": 1749734755749
    "session_end_timestamp": 1749734765138,
  },
  "event_name": "page_view",
  "event_id": "bm0nQaxTjBSf5Ag_sJ3UilMZloKTSEb-zN0WfbrVyWS5zYN_LHBTER67z2lV3Ac",
  "event_data": {
    "event_type": "page_view",
    "channel_grouping": "direct",
    "source": "direct",
    "campaign": null,
    "campaign_id": null,
    "campaign_term": null,
    "campaign_content": null,
    "page_id": "bm0nQaxTjBSf5Ag_sJ3UilMZloKTSEb-zN0WfbrVyWS5zYN",
    "page_title": "Tommaso Moretti | Freelance digital data analyst",
    "page_hostname_protocol": "https",
    "page_hostname": "tommasomoretti.com",
    "page_location": "/",
    "page_fragment": null,
    "page_query": null,
    "page_extension": null,
    "page_referrer": null,
    "page_language": "it",
    "page_status_code": 200,
    "cs_container_id": "GTM-PW7349P",
    "user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36",
    "browser_name": "Chrome",
    "browser_language": "it-IT",
    "browser_version": "137.0.0.0",
    "device_type": "desktop",
    "device_vendor": "Apple",
    "device_model": "Macintosh",
    "os_name": "Mac OS",
    "os_version": "10.15.7",
    "screen_size": "1920x1080",
    "viewport_size": "1920x934",
    "country": "IT",
    "city": "venice",
    "ss_hostname": "gtm.tommasomoretti.com",
    "ss_container_id": "GTM-KQG9ZNG"
  },
  "consent_data": {
    "respect_consent_mode": "Yes",
    "consent_type": "Update",
    "ad_user_data": "Denied",
    "ad_personalization": "Denied",
    "ad_storage": "Denied",
    "analytics_storage": "Granted",
    "functionality_storage": "Denied",
    "personalization_storage": "Denied",
    "security_storage": "Denied"
  }
}
```

| **Parameter name**         | **Sub-parameter**             | **Type** | **Added**   | **Field description**           |
|----------------------------|-------------------------------|----------|-------------|---------------------------------|
| event_date                 |                               | String   | Client-Side | Event date                      |
| event_datetime             |                               | String   | Server-side | Event date and time             |
| event_timestamp            |                               | Integer  | Client-Side | Event timestamp                 |
| event_origin               |                               | String   | Client-Side | Event origin                    |
| processing_event_timestamp |                               | Integer  | Server-Side | Event processing timestamp      |
| content_length             |                               | Integer  | Client-Side | Content length                  |
| client_id                  |                               | String   | Server-Side | Unique client identifier        |
| user_data                  | user_campaign_id              | String   | Server-Side | User campaign ID                |
|                            | user_country                  | String   | Server-Side | User country                    |
|                            | user_device_type              | String   | Server-Side | User device type                |
|                            | user_channel_grouping         | String   | Server-Side | User channel grouping           |
|                            | user_source                   | String   | Server-Side | User traffic source             |
|                            | user_date                     | String   | Server-Side | User first session date         |
|                            | user_campaign                 | String   | Server-Side | User campaign                   |
|                            | user_language                 | String   | Server-Side | User language                   |
|                            | user_first_session_timestamp  | String   | Server-Side | User first session timestamp    |
|                            | user_last_session_timestamp   | Integer  | Server-Side | User last session timestamp     |
| session_id                 |                               | String   | Server-Side | Unique session identifier       |
| session_data               | session_date                  | String   | Server-Side | Session date                    |
|                            | session_number                | String   | Server-Side | Session sequence number         |
|                            | cross_domain_session          | String   | Server-Side | Cross-domain session indicator  |
|                            | session_channel_grouping      | String   | Server-Side | Session channel grouping        |
|                            | session_source                | String   | Server-Side | Session source                  |
|                            | session_campaign              | String   | Server-Side | Session campaign                |
|                            | session_campaign_id           | String   | Server-Side | Session campaign ID             |
|                            | session_device_type           | String   | Server-Side | Session device type             |
|                            | session_country               | String   | Server-Side | Session country                 |
|                            | session_language              | String   | Server-Side | Session language                |
|                            | session_hostname              | String   | Server-Side | Session hostname                |
|                            | session_landing_page_category | String   | Server-Side | Landing page category           |
|                            | session_landing_page_location | String   | Server-Side | Landing page path               |
|                            | session_landing_page_title    | String   | Server-Side | Landing page title              |
|                            | session_exit_page_category    | String   | Server-Side | Landing page category           |
|                            | session_exit_page_location    | String   | Server-Side | Exit page path                  |
|                            | session_exit_page_title       | String   | Server-Side | Exit page title                 |
|                            | session_start_timestamp       | Integer  | Server-Side | Session start timestamp         |
|                            | session_end_timestamp         | Integer  | Server-Side | Session end timestamp           |
| event_name                 |                               | String   | Client-Side | Event name                      |
| event_id                   |                               | String   | Client-Side | Unique event identifier         |
| event_data                 | event_type                    | String   | Client-Side | Event type                      |
|                            | channel_grouping              | String   | Client-Side | Channel grouping                |
|                            | source                        | String   | Client-Side | Traffic source                  |
|                            | campaign                      | String   | Client-Side | Campaign                        |
|                            | campaign_id                   | String   | Client-Side | Campaign ID                     |
|                            | campaign_term                 | String   | Client-Side | Campaign term                   |
|                            | campaign_content              | String   | Client-Side | Campaign content                |
|                            | page_id                       | String   | Client-Side | Unique page identifier          |
|                            | page_title                    | String   | Client-Side | Page title                      |
|                            | page_hostname_protocol        | String   | Client-Side | Page hostname protocol          |
|                            | page_hostname                 | String   | Client-Side | Page hostname                   |
|                            | page_location                 | String   | Client-Side | Page path                       |
|                            | page_fragment                 | String   | Client-Side | URL fragment                    |
|                            | page_query                    | String   | Client-Side | URL query                       |
|                            | page_extension                | String   | Client-Side | Resource extension              |
|                            | page_referrer                 | String   | Client-Side | Page referrer                   |
|                            | page_language                 | String   | Client-Side | Page language                   |
|                            | cs_container_id               | String   | Client-Side | Client-Side container ID        |
|                            | user_agent                    | String   | Client-Side | User agent                      |
|                            | browser_name                  | String   | Client-Side | Browser name                    |
|                            | browser_language              | String   | Client-Side | Browser language                |
|                            | browser_version               | String   | Client-Side | Browser version                 |
|                            | device_type                   | String   | Client-Side | Device type                     |
|                            | device_vendor                 | String   | Client-Side | Device vendor                   |
|                            | device_model                  | String   | Client-Side | Device model                    |
|                            | os_name                       | String   | Client-Side | Operating system                |
|                            | os_version                    | String   | Client-Side | OS version                      |
|                            | screen_size                   | String   | Client-Side | Screen resolution               |
|                            | viewport_size                 | String   | Client-Side | Viewport size                   |
|                            | country                       | String   | Server-Side | Country (geo from event)        |
|                            | city                          | String   | Server-Side | City (geo from event)           |
|                            | ss_hostname                   | String   | Server-Side | Server-Side container hostname  |
|                            | ss_container_id               | String   | Server-Side | Server-Side container ID        |
| consent_data               | respect_consent_mode          | String   | Client-Side | Respect consent mode            |
|                            | consent_type                  | String   | Client-Side | Consent type                    |
|                            | ad_user_data                  | String   | Client-Side | Ads user data consent           |
|                            | ad_personalization            | String   | Client-Side | Ads personalization consent     |
|                            | ad_storage                    | String   | Client-Side | Ads storage consent             |
|                            | analytics_storage             | String   | Client-Side | Analytics storage consent       |
|                            | functionality_storage         | String   | Client-Side | Functionality storage consent   |
|                            | personalization_storage       | String   | Client-Side | Personalization storage consent |
|                            | security_storage              | String   | Client-Side | Security storage consent        |

### Cross domain data
When cross-domain tracking is enabled, a cross_domain_session parameter and a cross_domain_id parameter will be added to standard payload:

| **Parameter name**         | **Sub-parameter**             | **Type** | **Added**   | **Field description**           |
|----------------------------|-------------------------------|----------|-------------|---------------------------------|
| session_data               | is_cross_domain_session       | String   | Client-Side | Is cross domain session         |
| event_data                 | cross_domain_id               | JSON     | Client-Side | Cross domain id                 |

</details>

<details><summary>Request payload additional data parameters.</summary>

### Ecommerce data
When add ecommerce data is enable, an ecommerce parameter will be added to standard payload:

| **Parameter name**         | **Sub-parameter**             | **Type** | **Added**   | **Field description**           |
|----------------------------|-------------------------------|----------|-------------|---------------------------------|
| ecommerce                  |                               | JSON     | Client-Side | Ecommerce data                  |

### Add dataLater data
When add ecommerce data is enable, a dataLayer parameter will be added to standard payload: 

| **Parameter name**         | **Sub-parameter**             | **Type** | **Added**   | **Field description**           |
|----------------------------|-------------------------------|----------|-------------|---------------------------------|
| dataLayer                  |                               | JSON     | Client-Side | DataLayer data                  |

</details>



# Basic settings
## Configuration variable
The Nameless Analytics Client-side tracker tag inherits configuration settings from [Nameless Analytics Client-side tracker configuration variable](https://github.com/tommasomoretti/nameless-analytics-client-side-tracker-configuration-variable/). 

<img src="https://github.com/user-attachments/assets/f39691cb-8b2c-4ba8-bfc3-2ca470d27922" alt="Basic settings" />

This variable will handle settings like:
- [set requests endpoint domain name and path](https://github.com/tommasomoretti/nameless-analytics-client-side-tracker-configuration-variable/#basic-settings)
- [set user level parameters](https://github.com/tommasomoretti/nameless-analytics-client-side-tracker-configuration-variable/#user-parameters)
- [set session level parameters](https://github.com/tommasomoretti/nameless-analytics-client-side-tracker-configuration-variable/#session-parameters)
- [set common event parameters](https://github.com/tommasomoretti/nameless-analytics-client-side-tracker-configuration-variable/#event-parameters)
- [respect Google Consent Mode](https://github.com/tommasomoretti/nameless-analytics-client-side-tracker-configuration-variable/#respect-google-consent-mode)
- [enable cross-domain tracking](https://github.com/tommasomoretti/nameless-analytics-client-side-tracker-configuration-variable/#enable-cross-domain-tracking)
- [customize source and campaigns url parameters](https://github.com/tommasomoretti/nameless-analytics-client-side-tracker-configuration-variable/#customize-source-and-campaigns-url-parameters)
- [change default JavaScript page view event names](https://github.com/tommasomoretti/nameless-analytics-client-side-tracker-configuration-variable/#change-default-JavaScript-page-view-event-names)
- [load main library from custom location](https://github.com/tommasomoretti/nameless-analytics-client-side-tracker-configuration-variable/#load-main-library-from-custom-location)
- [add current dataLayer state](https://github.com/tommasomoretti/nameless-analytics-client-side-tracker-configuration-variable/#add-current-dataLayer-state)
- [show logs in JavaScript console](https://github.com/tommasomoretti/nameless-analytics-client-side-tracker-configuration-variable/#enable-logs-in-javascript-console)



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
  - total_page_load_time: performance.timing.loadEventEnd - performance.timing.navigationStart </br></br>

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

[Server-side event parameters](https://github.com/tommasomoretti/nameless-analytics-server-side-client-tag/#addoverride-event-parameters) overrides [Specific event parameters](#addoverride-event-parameters) overrides [Shared event parameters](https://github.com/tommasomoretti/nameless-analytics-client-side-tracker-configuration-variable/#add-shared-event-parameters) overrides [dataLayer parameters](#add-event-parameters-from-datalayer) overrides [Standard parameters](#standard-request-payload)

### Add/override event parameters
Add or overwrite parameters for a specific event. Values accepted: strings, Integers, float and json. Page_id and event_id parameters cannot be overwritten.

<img src="https://github.com/user-attachments/assets/b1401824-a5eb-4082-bd29-2a83ccf819d0" alt="Add/override event parameters" />

These parameters can override:
- default event parameters
- dataLayer event parameters added in Nameless Analytics Client-side tracker tag
- shared event parameters added in Nameless Analytics Client-side configuration variable

These parameters can be overridden by:
- event parameter added in Nameless Analytics Server-side client tag

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
Add ecommerce data from as a JSON object inside ecommerce field. 

Please note: 
- By default, the table function queries extract data from standard GA4 ecommerce data structure
- The data model can be customized to support any ecommerce data structure by modifying the relative JSON paths in the user, session, ecommerce, product and funnels table function queries

### From dataLayer
To add ecommerce data from dataLayer, create a tag with this settings:

<img src="https://github.com/user-attachments/assets/73761561-879c-4dd1-93be-d4ad0bd245a0" alt="Send ecommerce data from dataLayer" />

and a trigger that matches all ecommerce event names: view_promotion|select_promotion|view_item_list|select_item|view_item|add_to_wishlist|add_to_cart|remove_from_cart|view_cart|begin_checkout|add_shipping_info|add_payment_info|purchase|refund

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

Create a custom variable that return a JSON value with custom ecommerce schema (remember to modify the table function queries accordingly) and a trigger that matches all ecommerce custom event names.

## Disable logs in JavaScript console for this event
Disable console log for this specific event when [Enable logs in JavaScript console](https://github.com/tommasomoretti/nameless-analytics-client-side-tracker-configuration-variable/#enable-logs-in-javascript-console) is enabled in the Nameless Analytics Client-side config variable. 

---

Reach me at: [Email](mailto:hello@tommasomoretti.com) | [Website](https://tommasomoretti.com/?utm_source=github.com&utm_medium=referral&utm_campaign=nameless_analytics) | [Twitter](https://twitter.com/tommoretti88) | [Linkedin](https://www.linkedin.com/in/tommasomoretti/)
