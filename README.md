<img src="https://github.com/user-attachments/assets/93640f49-d8fb-45cf-925e-6b7075f83927#gh-light-mode-only" alt="Light Mode" />
<img src="https://github.com/user-attachments/assets/71380a65-3419-41f4-ba29-2b74c7e6a66b#gh-dark-mode-only" alt="Dark Mode" />

---

# Nameless Analytics Client-side Tracker Tag

The Nameless Analytics Client-side Tracker Tag is a highly customizable GTM custom template designed to send requests to the [Nameless Analytics Server-side Client Tag](https://github.com/tommasomoretti/nameless-analytics-server-side-client-tag). 

For an overview of how Nameless Analytics works [start from here](https://github.com/tommasomoretti/nameless-analytics/#technical-architecture-and-data-flow).

Tag:
* [Nameless Analytics Client-side Tracker Tag UI](#nameless-analytics-client-side-tracker-tag-ui)
* [Request payload data](#request-payload-data)

Data:
* Event data
  * [Event name](#event-name)
    * [Standard event name](#standard-event-name)
    * [Custom event name](#custom-event-name)
  * [Event parameters](#event-parameters)
    * [Add/override event level parameters](#addoverride-event-level-parameters)
    * [Remove event level parameters](#remove-event-level-parameters)
    * [Add event level parameters from dataLayer](#add-event-parameters-from-datalayer)

Settings:
* Configuration variable settings
  * [Configuration variable](#configuration-variable)
* Advanced settings
  * [Add ecommerce data from dataLayer](#add-ecommerce-data-from-datalayer)
  * [Disable logs in JavaScript console for this event](#disable-logs-in-javascript-console-for-this-event)

Execution messages:
* [Success messages](#success-messages) 
* [Error messages](#error-messages) 

</br>



## Nameless Analytics Client-side Tracker Tag UI
This is the UI of the Nameless Analytics Client-side Tracker Tag.

<img src="https://github.com/user-attachments/assets/042ccafa-7ec5-4366-b8d5-30e82d1a530f" alt="Nameless Analytics Client-side Tracker Tag UI"/>

</br>
</br>



### Request payload data
The request data is sent via a POST request in JSON format.

Data is structured into:
* User data: data related to users.
* Session data: data related to sessions.
* Page data: data related to pages.
* Event data: data related to events.
* dataLayer data.
* Ecommerce data.

<details><summary>Request payload example with only standard parameters and no customization at all</summary>

</br>

```json
{
  "user_date": "2025-12-05",
  "client_id": "lZc919IBsqlhHks",
  "user_data": {
    "user_campaign_id": null,
    "user_country": "IT",
    "user_device_type": "desktop",
    "user_channel_grouping": "gtm_debugger",
    "user_source": "tagassistant.google.com",
    "user_first_session_timestamp": 1764955391487,
    "user_campaign_content": null,
    "user_campaign": null,
    "user_campaign_click_id": null,
    "user_tld_source": "google.com",
    "user_language": "it-IT",
    "user_campaign_term": null,
    "user_last_session_timestamp": 1765022517600
  },
  "session_date": "2025-12-06",
  "session_id": "lZc919IBsqlhHks_1KMIqneQ7dsDJU",
  "session_data": {
    "session_number": 2,
    "cross_domain_session": "No",
    "session_channel_grouping": "gtm_debugger",
    "session_source": "tagassistant.google.com",
    "session_tld_source": "google.com",
    "session_campaign": null,
    "session_campaign_id": null,
    "session_campaign_click_id": null,
    "session_campaign_term": null,
    "session_campaign_content": null,
    "session_device_type": "desktop",
    "session_country": "IT",
    "session_language": "it-IT",
    "session_hostname": "tommasomoretti.com",
    "session_browser_name": "Chrome",
    "session_landing_page_category": "Homepage",
    "session_landing_page_location": "/",
    "session_landing_page_title": "Tommaso Moretti | Freelance digital data analyst",
    "session_exit_page_category": "Homepage",
    "session_exit_page_location": "/",
    "session_exit_page_title": "Tommaso Moretti | Freelance digital data analyst",
    "session_start_timestamp": 1765022517600,
    "session_end_timestamp": 1765023618088
  },
  "page_date": "2025-12-06",
  "page_id": "lZc919IBsqlhHks_1KMIqneQ7dsDJU-WVTWEorF69ZEk3y",
  "page_data": {
    "page_title": "Tommaso Moretti | Freelance digital data analyst",
    "page_hostname_protocol": "https",
    "page_hostname": "tommasomoretti.com",
    "page_location": "/",
    "page_fragment": null,
    "page_query": "gtm_debug=1765021707758",
    "page_extension": null,
    "page_referrer": "https://tagassistant.google.com/",
    "page_timestamp": 1765023618088,
    "page_category": "Homepage",
    "page_language": "it"
  },
  "event_date": "2025-12-06",
  "event_timestamp": 1765023618088,
  "event_id": "lZc919IBsqlhHks_1KMIqneQ7dsDJU-WVTWEorF69ZEk3y_XIkjlUOkXKn99IV",
  "event_name": "page_view",
  "event_origin": "Website",
  "event_data": {
    "event_type": "page_view",
    "channel_grouping": "gtm_debugger",
    "source": "tagassistant.google.com",
    "campaign": null,
    "campaign_id": null,
    "campaign_click_id": null,
    "campaign_term": null,
    "campaign_content": null,
    "user_agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko)Chrome/142.0.0.0 Safari/537.36",
    "browser_name": "Chrome",
    "browser_language": "it-IT",
    "browser_version": "142.0.0.0",
    "device_type": "desktop",
    "device_vendor": "Apple",
    "device_model": "Macintosh",
    "os_name": "Mac OS",
    "os_version": "10.15.7",
    "screen_size": "1512x982",
    "viewport_size": "1512x823",
    "country": "IT",
    "city": "venice",
    "tld_source": "google.com"
  },
  "consent_data": {
    "consent_type": "Update",
    "respect_consent_mode": "Yes",
    "ad_user_data": "Denied",
    "ad_personalization": "Denied",
    "ad_storage": "Denied",
    "analytics_storage": "Granted",
    "functionality_storage": "Denied",
    "personalization_storage": "Granted",
    "security_storage": "Denied"
  },
  "gtm_data": {
    "cs_hostname": "tommasomoretti.com",
    "cs_container_id": "GTM-PW7349P",
    "cs_tag_name": null,
    "cs_tag_id": 277,
    "ss_hostname": "gtm.tommasomoretti.com",
    "ss_container_id": "GTM-KQG9ZNG",
    "ss_tag_name": "NA",
    "ss_tag_id": null,
    "processing_event_timestamp": 1765023618275,
    "content_length": 1605
  }
}
```
</details>

<details><summary>Standard payload details</summary>

</br>

| **Parameter name** | **Sub-parameter**             | **Type** | **Added**   | **Field description**                    |
|--------------------|-------------------------------|----------|-------------|------------------------------------------|
| user_date          |                               | String   | Server-Side | User data collection date                |
| client_id          |                               | String   | Server-Side | Unique client identifier                 |
| user_data          | user_campaign_id              | String   | Server-Side | User campaign ID                         |
|                    | user_country                  | String   | Server-Side | User country                             |
|                    | user_device_type              | String   | Server-Side | User device type                         |
|                    | user_channel_grouping         | String   | Server-Side | User channel grouping                    |
|                    | user_source                   | String   | Server-Side | User source                              |
|                    | user_first_session_timestamp  | Integer  | Server-Side | Timestamp of user's first session        |
|                    | user_campaign_content         | String   | Server-Side | User campaign content                    |
|                    | user_campaign                 | String   | Server-Side | User campaign name                       |
|                    | user_campaign_click_id        | String   | Server-Side | User campaign click identifier           |
|                    | user_tld_source               | String   | Server-Side | User top-level domain source             |
|                    | user_language                 | String   | Server-Side | User language                            |
|                    | user_campaign_term            | String   | Server-Side | User campaign term                       |
|                    | user_last_session_timestamp   | Integer  | Server-Side | Timestamp of user's last session         |
| session_date       |                               | String   | Server-Side | Session date                             |
| session_id         |                               | String   | Server-Side | Unique session identifier                |
| session_data       | session_number                | Integer  | Server-Side | Session number for the user              |
|                    | cross_domain_session          | String   | Server-Side | Indicates if the session is cross-domain |
|                    | session_channel_grouping      | String   | Server-Side | Channel grouping for the session         |
|                    | session_source                | String   | Server-Side | Session source                           |
|                    | session_tld_source            | String   | Server-Side | Session top-level domain source          |
|                    | session_campaign              | String   | Server-Side | Session campaign name                    |
|                    | session_campaign_id           | String   | Server-Side | Session campaign ID                      |
|                    | session_campaign_click_id     | String   | Server-Side | Session campaign click ID                |
|                    | session_campaign_term         | String   | Server-Side | Session campaign term                    |
|                    | session_campaign_content      | String   | Server-Side | Session campaign content                 |
|                    | session_device_type           | String   | Server-Side | Device type used in session              |
|                    | session_country               | String   | Server-Side | Session country                          |
|                    | session_language              | String   | Server-Side | Session language                         |
|                    | session_hostname              | String   | Server-Side | Website hostname for session             |
|                    | session_browser_name          | String   | Server-Side | Browser name used in session             |
|                    | session_landing_page_category | String   | Server-Side | Landing page category                    |
|                    | session_landing_page_location | String   | Server-Side | Landing page path                        |
|                    | session_landing_page_title    | String   | Server-Side | Landing page title                       |
|                    | session_exit_page_category    | String   | Server-Side | Exit page category                       |
|                    | session_exit_page_location    | String   | Server-Side | Exit page path                           |
|                    | session_exit_page_title       | String   | Server-Side | Exit page title                          |
|                    | session_start_timestamp       | Integer  | Server-Side | Session start timestamp                  |
|                    | session_end_timestamp         | Integer  | Server-Side | Session end timestamp                    |
| page_date          |                               | String   | Client-Side | Page data date                           |
| page_id            |                               | String   | Client-Side | Unique page identifier                   |
| page_data          | page_title                    | String   | Client-Side | Page title                               |
|                    | page_hostname_protocol        | String   | Client-Side | Page hostname protocol (http/https)      |
|                    | page_hostname                 | String   | Client-Side | Page hostname                            |
|                    | page_location                 | String   | Client-Side | Page path                                |
|                    | page_fragment                 | String   | Client-Side | URL fragment                             |
|                    | page_query                    | String   | Client-Side | URL query string                         |
|                    | page_extension                | String   | Client-Side | Page file extension                      |
|                    | page_referrer                 | String   | Client-Side | Referrer URL                             |
|                    | page_timestamp                | Integer  | Client-Side | Page view timestamp                      |
|                    | page_category                 | String   | Client-Side | Page category                            |
|                    | page_language                 | String   | Client-Side | Page language                            |
| event_date         |                               | String   | Client-Side | Event date                               |
| event_timestamp    |                               | Integer  | Client-Side | Event timestamp                          |
| event_id           |                               | String   | Client-Side | Unique event identifier                  |
| event_name         |                               | String   | Client-Side | Event name                               |
| event_origin       |                               | String   | Client-Side | Event origin (e.g., Website)             |
| event_data         | event_type                    | String   | Client-Side | Event type                               |
|                    | channel_grouping              | String   | Client-Side | Channel grouping for the event           |
|                    | source                        | String   | Client-Side | Event traffic source                     |
|                    | campaign                      | String   | Client-Side | Event campaign                           |
|                    | campaign_id                   | String   | Client-Side | Event campaign ID                        |
|                    | campaign_click_id             | String   | Client-Side | Event campaign click ID                  |
|                    | campaign_term                 | String   | Client-Side | Event campaign term                      |
|                    | campaign_content              | String   | Client-Side | Event campaign content                   |
|                    | user_agent                    | String   | Client-Side | Browser user agent string                |
|                    | browser_name                  | String   | Client-Side | Browser name                             |
|                    | browser_language              | String   | Client-Side | Browser language                         |
|                    | browser_version               | String   | Client-Side | Browser version                          |
|                    | device_type                   | String   | Client-Side | Device type                              |
|                    | device_vendor                 | String   | Client-Side | Device manufacturer                      |
|                    | device_model                  | String   | Client-Side | Device model                             |
|                    | os_name                       | String   | Client-Side | Operating system name                    |
|                    | os_version                    | String   | Client-Side | Operating system version                 |
|                    | screen_size                   | String   | Client-Side | Screen resolution                        |
|                    | viewport_size                 | String   | Client-Side | Browser viewport size                    |
|                    | country                       | String   | Server-Side | Event geolocation country                |
|                    | city                          | String   | Server-Side | Event geolocation city                   |
|                    | tld_source                    | String   | Client-Side | Event top-level domain source            |
| consent_data       | consent_type                  | String   | Client-Side | Consent update type                      |
|                    | respect_consent_mode          | String   | Client-Side | Whether Consent Mode is respected        |
|                    | ad_user_data                  | String   | Client-Side | Ad user data consent                     |
|                    | ad_personalization            | String   | Client-Side | Ad personalization consent               |
|                    | ad_storage                    | String   | Client-Side | Ad storage consent                       |
|                    | analytics_storage             | String   | Client-Side | Analytics storage consent                |
|                    | functionality_storage         | String   | Client-Side | Functionality storage consent            |
|                    | personalization_storage       | String   | Client-Side | Personalization storage consent          |
|                    | security_storage              | String   | Client-Side | Security storage consent                 |
| gtm_data           | cs_hostname                   | String   | Client-Side | Client-side container hostname           |
|                    | cs_container_id               | String   | Client-Side | Client-side container ID                 |
|                    | cs_tag_name                   | String   | Client-Side | Client-side tag name                     |
|                    | cs_tag_id                     | Integer  | Client-Side | Client-side tag ID                       |
|                    | ss_hostname                   | String   | Server-Side | Server-side container hostname           |
|                    | ss_container_id               | String   | Server-Side | Server-side container ID                 |
|                    | ss_tag_name                   | String   | Server-Side | Server-side tag name                     |
|                    | ss_tag_id                     | String   | Server-Side | Server-side tag ID                       |
|                    | processing_event_timestamp    | Integer  | Server-Side | Event processing timestamp               |
|                    | content_length                | Integer  | Server-Side | Request content length                   |
</details>

<details><summary>Request payload additional data parameters</summary>

#### Add dataLayer data
When the "Add current dataLayer state" option in the Nameless Analytics Client-side Tracker Configuration Variable is enabled, a `dataLayer` parameter will be added to the standard payload: 

| **Parameter name** | **Sub-parameter** | **Type** | **Added**   | **Field description** |
|--------------------|-------------------|----------|-------------|-----------------------|
| dataLayer          |                   | JSON     | Client-Side | DataLayer data        |

#### Ecommerce data
When "Add ecommerce data" in the Nameless Analytics Client-side Tracker Tag is enabled, an `ecommerce` parameter will be added to the standard payload:

| **Parameter name** | **Sub-parameter** | **Type** | **Added**   | **Field description** |
|--------------------|-------------------|----------|-------------|-----------------------|
| ecommerce          |                   | JSON     | Client-Side | Ecommerce data        |

#### Cross-domain data
When "Enable cross-domain tracking" in the Nameless Analytics Client-side Tracker Configuration Variable is enabled, the `is_cross_domain_session` and `cross_domain_id` parameters will be added to the standard payload:

| **Parameter name** | **Sub-parameter**       | **Type** | **Added**   | **Field description**   |
|--------------------|-------------------------|----------|-------------|-------------------------|
| event_data         | cross_domain_id         | JSON     | Client-Side | Cross domain id         |
| session_data       | is_cross_domain_session | String   | Server-Side | Is cross domain session |
</details>

</br>

Per garantire l'integrità dei dati, il  Nameless Analytics Client-side Tracker Tag utilizza una coda di esecuzione sequenziale. Anche se più eventi vengono attivati contemporaneamente (es. click rapidi), le richieste vengono inviate una alla volta nel corretto ordine cronologico.

</br>



## Event data
### Event name
Choose between standard event names or custom event names. 

Please note:
- <u>Always trigger a `page_view` event as the very first event on every page load.</u> </br>
  **Any event triggered before a `page_view` will be rejected.**
- Use standard event names whenever possible.
- Follow naming conventions for event names and event parameters.

#### Standard event name
Choose a standard event name for the event:

* page_view: Send this event when a page is viewed. Use this event for both standard and virtual page views. This is the only mandatory event.
* consent_given: Send this event when the user gives consent to improve the accuracy of consent metrics.
* page_load_time: Send this event when a page is loaded (on the `gtm.load` JavaScript event) with these parameters:
  * time_to_dom_interactive: `performance.timing.domInteractive - performance.timing.responseStart`
  * page_render_time: `performance.timing.domComplete - performance.timing.domLoading`
  * time_to_dom_complete: `performance.timing.domComplete - performance.timing.responseStart`
  * total_page_load_time: `performance.timing.loadEventEnd - performance.timing.navigationStart` 
* page_closed: Send this event when a page is closed to improve the accuracy of `time_on_page`, `session_duration`, and other metrics.

#### Custom event name
Choose a custom event name for the event.

To maintain consistency between events, it is highly recommended to use _snake_case_ notation style (with underscores between words) to create descriptive, easily interpretable names. 

Examples:
* button_clicked
* form_submitted
* video_played

Avoid
* Spaces: button clicked
* Hyphens: button-clicked
* CamelCase: ButtonClicked


### Event parameters
Add event parameters for a specific event. The parameters will be added in the event_data object in the payload. 

Please note: if a parameter has the same name as another, it can override or be overridden depending on where it was set.

This is the hierarchy of event parameter importance:

[Nameless Analytics Server-side Client Tag](https://github.com/tommasomoretti/nameless-analytics-server-side-client-tag/#addoverride-event-level-parameters) override [Specific event parameters](#addoverride-event-level-parameters) override [Shared event parameters](https://github.com/tommasomoretti/nameless-analytics-client-side-tracker-configuration-variable/#add-shared-event-parameters) override [dataLayer parameters](#add-event-parameters-from-datalayer) override [Standard parameters](#request-payload-data)

#### Add/override event level parameters
Add or overwrite parameters for a specific event. Accepted values: strings, integers, floats, and JSON. The `page_id` and `event_id` parameters cannot be overwritten.

These parameters can override:
- default event parameters
- dataLayer event parameters added in Nameless Analytics Client-side Tracker Tag
- shared event parameters added in Nameless Analytics Client-side Tracker Configuration Variable

These parameters can be overridden by:
- event parameter added in Nameless Analytics Server-side Client Tag

#### Remove event level parameters
Remove event level parameters in event_data object in the payload.

#### Add event parameters from dataLayer
Retrieve current dataLayer values from the dataLayer.push() event that triggered the tag.

These parameters can override:
- default event parameters

These parameters can be overridden by:
- shared event parameters added in Nameless Analytics Client-side Tracker Configuration Variable
- event parameters added in Nameless Analytics Client-side Tracker Tag
- event parameters added in Nameless Analytics Server-side Client Tag

</br>



## Configuration variable settings
### Configuration Variable
The Nameless Analytics Client-side Tracker Tag inherits configuration settings from [Nameless Analytics Client-side Tracker Configuration Variable](https://github.com/tommasomoretti/nameless-analytics-client-side-tracker-configuration-variable/). 

This variable will handle settings like:
- [set requests endpoint domain name and path](https://github.com/tommasomoretti/nameless-analytics-client-side-tracker-configuration-variable/#server-side-endpoint-settings)
- [set user level parameters](https://github.com/tommasomoretti/nameless-analytics-client-side-tracker-configuration-variable/#user-parameters)
- [set session level parameters](https://github.com/tommasomoretti/nameless-analytics-client-side-tracker-configuration-variable/#session-parameters)
- [set common event parameters](https://github.com/tommasomoretti/nameless-analytics-client-side-tracker-configuration-variable/#event-parameters)
- [respect Google Consent Mode](https://github.com/tommasomoretti/nameless-analytics-client-side-tracker-configuration-variable/#respect-google-consent-mode)
- [enable cross-domain tracking](https://github.com/tommasomoretti/nameless-analytics-client-side-tracker-configuration-variable/#enable-cross-domain-tracking)
- [customize source and campaigns URL parameters](https://github.com/tommasomoretti/nameless-analytics-client-side-tracker-configuration-variable/#override-default-source-and-campaigns-url-query-parameters)
- [change default JavaScript page view event names](https://github.com/tommasomoretti/nameless-analytics-client-side-tracker-configuration-variable/#override-default-javascript-page-view-event-names)
- [load main library from custom location](https://github.com/tommasomoretti/nameless-analytics-client-side-tracker-configuration-variable/#load-javascript-libraries-in-first-party-mode)
- [add current dataLayer state](https://github.com/tommasomoretti/nameless-analytics-client-side-tracker-configuration-variable/#add-current-datalayer-state)
- [show logs in JavaScript console](https://github.com/tommasomoretti/nameless-analytics-client-side-tracker-configuration-variable/#enable-logs-in-javascript-console)

</br>



## Advanced settings
### Add ecommerce data from dataLayer
Add ecommerce data as a JSON object inside the ecommerce field.

Please note: 
- By default, the table function queries extract data from standard GA4 ecommerce data structure
- The data model can be customized to support any ecommerce data structure by modifying the relative JSON paths in the user, session, ecommerce, product and funnels table function queries

To add ecommerce data, create a tag with {{Event}} as [custom event name](#custom-event-name) and a trigger that matches all ecommerce event names: 

* view_promotion
* select_promotion
* view_item_list
* select_item
* view_item
* add_to_wishlist
* add_to_cart
* remove_from_cart
* view_cart
* begin_checkout
* add_shipping_info
* add_payment_info
* purchase
* refund

Push ecommerce data into the dataLayer as follows:

```javascript
dataLayer.push({ ecommerce: null });
dataLayer.push({
  event: "purchase",
  ecommerce: {
    // Ecommerce data
  }
});
```


### Disable logs in JavaScript console for this event
Disable console log for this specific event when [Enable logs in JavaScript console](https://github.com/tommasomoretti/nameless-analytics-client-side-tracker-configuration-variable/#enable-logs-in-javascript-console) is enabled in the Nameless Analytics Client-side Tracker Configuration Variable. 

</br>



## Execution messages
### Success messages
When logs are enabled, the following success and status messages may appear in the browser console:

| **Message** | **Description** |
|:---|:---|
| `[event_name] > 🟢 Request claimed successfully` | Generic closure message indicating the event was sent successfully. |
| `cross-domain > 🟢 Valid user data. Cross-domain URL link decoration will be applied` | Indicating that link decoration with `na_id` is performed correctly. |

### Error messages
These messages appear in the browser console when an issue prevents the correct execution of the tag:

| **Message** | **Context / Cause** |
|:---|:---|
| `[event_name] > 🔴 Tag execution failed.` | Generic closure message indicating the event was not sent. |
| `[event_name] > 🔴 This website is not authorized to send Nameless Analytics requests.` | The endpoint URL in the Nameless Analytics Client-side Tracker Configuration Variable is not correctly configured. |
| `[event_name] > 🔴 Error while fetch: [URL]` | Network reachability issue for Nameless Analytics server-side endpoint: DNS error, server down, or CORS policy violation. |

| `cross-domain > 🔴 Invalid user data. No cross-domain URL link decoration will be applied.` | Indicating that link decoration with `na_id` is not performed correctly. |
| `cross-domain > 🔴 Error fetching user data: [error]` | The cross-domain listener failed to retrieve IDs from the server. |

---

Reach me at: [Email](mailto:hello@tommasomoretti.com) | [Website](https://tommasomoretti.com/?utm_source=github.com&utm_medium=referral&utm_campaign=nameless_analytics) | [Twitter](https://twitter.com/tommoretti88) | [LinkedIn](https://www.linkedin.com/in/tommasomoretti/)
