![Na logo beta](https://github.com/tommasomoretti/nameless-analytics/assets/29273232/7d4ded5e-4b79-46a2-b089-03997724fd10)

---

# Client-side tracker tag
The Nameless Analytics Client-side tracker tag is a highly customizable GTM custom template designed to send requests to the [Nameless Analytics Server-side client tag](https://github.com/tommasomoretti/nameless-analytics-server-side-client-tag). 

For an overview of how Nameless Analytics works [start from here](https://github.com/tommasomoretti/nameless-analytics#how-it-works).

Start from here:
- [Client-side tracker tag UI](#tag-ui-and-default-payload)
- [Request payload](#request-payload)
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



## Request payload
This is the request payload with only standard parameters and no customization at all.

```json
{
  "event_name": "page_view",
  "event_id": "bm0nQaxTjBSf5Ag_sJ3UilMZloKTSEb-zN0WfbrVyWS5zYN_LHBTER67z2lV3Ac",
  "event_date": "2025-06-12",
  "event_datetime": "2025-06-12T13:26:05.138000",
  "event_timestamp": 1749734765138,
  "event_origin": "Website",
  "processing_event_timestamp": 1749734765882,
  "content_length": 1395,
  "client_id": "bm0nQaxTjBSf5Ag",
  "user_data": {
    "user_campaign_id": null,
    "user_country": "IT",
    "user_device_type": "desktop",
    "user_channel_grouping": "gtm_debugger",
    "user_source": "tagassistant.google.com",
    "user_first_session_timestamp": 1749632541988,
    "user_date": "2025-06-11",
    "user_campaign": null,
    "user_language": "it-IT",
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
    "session_device_type": "desktop",
    "session_country": "IT",
    "session_language": "it-IT",
    "session_hostname": "tommasomoretti.com",
    "session_browser_name": "Chrome",
    "session_landing_page_category": null,
    "session_landing_page_location": "/",
    "session_landing_page_title": "Tommaso Moretti | Freelance digital data analyst",
    "session_exit_page_location": "/",
    "session_exit_page_title": "Tommaso Moretti | Freelance digital data analyst",
    "session_end_timestamp": 1749734765138,
    "session_start_timestamp": 1749734755749
  },
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

| **Parameter name**           | **Sub-parameter**                  | **Type**       | **Added**     | **Field description**                                      |
|------------------------------|------------------------------------|----------------|---------------|------------------------------------------------------------|
| event_date                   |                                    | Client-side    | Client-side   | Data dell'evento                                           |
| event_datetime               |                                    | Client-side    | Client-side   | Data e ora dell'evento                                     |
| event_timestamp              |                                    | Client-side    | Client-side   | Timestamp dell'evento                                      |
| event_origin                 |                                    | Client-side    | Client-side   | Origine dell'evento                                        |
| content_length               |                                    | Client-side    | Client-side   | Lunghezza del contenuto                                    |
| event_id                     |                                    | Client-side    | Client-side   | Identificativo univoco dell’evento                         |
| event_name                   |                                    | Client-side    | Client-side   | Nome dell’evento                                           |
| processing_event_timestamp   |                                    | Server-side    | Server-side   | Timestamp di elaborazione dell’evento                      |
| client_id                    |                                    | Server-side    | Server-side   | Identificativo client                                      |
| session_id                   |                                    | Server-side    | Server-side   | Identificativo sessione                                    |
| event_data                   | event_type                         | Client-side    | Client-side   | Tipo di evento                                             |
|                              | channel_grouping                   | Client-side    | Client-side   | Raggruppamento canale                                      |
|                              | source                             | Client-side    | Client-side   | Fonte di traffico                                          |
|                              | campaign                           | Client-side    | Client-side   | Campagna                                                   |
|                              | campaign_id                        | Client-side    | Client-side   | ID campagna                                                |
|                              | campaign_term                      | Client-side    | Client-side   | Termine campagna                                           |
|                              | campaign_content                   | Client-side    | Client-side   | Contenuto campagna                                         |
|                              | page_id                            | Client-side    | Client-side   | Identificativo univoco della pagina                        |
|                              | page_title                         | Client-side    | Client-side   | Titolo della pagina                                        |
|                              | page_hostname_protocol             | Client-side    | Client-side   | Protocollo dell’hostname pagina                            |
|                              | page_hostname                      | Client-side    | Client-side   | Hostname della pagina                                      |
|                              | page_location                      | Client-side    | Client-side   | Percorso della pagina                                      |
|                              | page_fragment                      | Client-side    | Client-side   | Frammento URL                                              |
|                              | page_query                         | Client-side    | Client-side   | Query URL                                                  |
|                              | page_extension                     | Client-side    | Client-side   | Estensione della risorsa                                   |
|                              | page_referrer                      | Client-side    | Client-side   | Referrer della pagina                                      |
|                              | page_language                      | Client-side    | Client-side   | Lingua della pagina                                        |
|                              | cs_container_id                    | Client-side    | Client-side   | ID contenitore CS                                          |
|                              | user_agent                         | Client-side    | Client-side   | User agent                                                 |
|                              | browser_name                       | Client-side    | Client-side   | Nome del browser                                           |
|                              | browser_language                   | Client-side    | Client-side   | Lingua del browser                                         |
|                              | browser_version                    | Client-side    | Client-side   | Versione del browser                                       |
|                              | device_type                        | Client-side    | Client-side   | Tipo di dispositivo                                        |
|                              | device_vendor                      | Client-side    | Client-side   | Produttore del dispositivo                                 |
|                              | device_model                       | Client-side    | Client-side   | Modello del dispositivo                                    |
|                              | os_name                            | Client-side    | Client-side   | Sistema operativo                                          |
|                              | os_version                         | Client-side    | Client-side   | Versione del sistema operativo                             |
|                              | screen_size                        | Client-side    | Client-side   | Risoluzione dello schermo                                  |
|                              | viewport_size                      | Client-side    | Client-side   | Dimensione del viewport                                    |
|                              | country                            | Server-side    | Server-side   | Paese (geo da evento)                                      |
|                              | city                               | Server-side    | Server-side   | Città (geo da evento)                                      |
|                              | ss_hostname                        | Server-side    | Server-side   | Hostname del server-side container                         |
|                              | ss_container_id                    | Server-side    | Server-side   | ID del server-side container                               |
| user_data                    | user_campaign_id                   | Server-side    | Server-side   | ID campagna utente                                         |
|                              | user_country                       | Server-side    | Server-side   | Paese dell’utente                                          |
|                              | user_device_type                   | Server-side    | Server-side   | Tipo di dispositivo utente                                 |
|                              | user_channel_grouping              | Server-side    | Server-side   | Raggruppamento canale utente                               |
|                              | user_source                        | Server-side    | Server-side   | Fonte di traffico utente                                   |
|                              | user_first_session_timestamp       | Server-side    | Server-side   | Timestamp della prima sessione                             |
|                              | user_date                          | Server-side    | Server-side   | Data della prima sessione                                  |
|                              | user_campaign                      | Server-side    | Server-side   | Campagna dell’utente                                       |
|                              | user_language                      | Server-side    | Server-side   | Lingua dell’utente                                         |
|                              | user_last_session_timestamp        | Server-side    | Server-side   | Timestamp dell’ultima sessione                             |
| session_data                 | session_date                       | Server-side    | Server-side   | Data della sessione                                        |
|                              | session_number                     | Server-side    | Server-side   | Numero progressivo della sessione                          |
|                              | cross_domain_session               | Server-side    | Server-side   | Indicatore di sessione cross-domain                        |
|                              | session_channel_grouping           | Server-side    | Server-side   | Raggruppamento canale della sessione                       |
|                              | session_source                     | Server-side    | Server-side   | Fonte della sessione                                       |
|                              | session_campaign                   | Server-side    | Server-side   | Campagna della sessione                                    |
|                              | session_campaign_id                | Server-side    | Server-side   | ID campagna della sessione                                 |
|                              | session_device_type                | Server-side    | Server-side   | Tipo di dispositivo della sessione                         |
|                              | session_country                    | Server-side    | Server-side   | Paese della sessione                                       |
|                              | session_language                   | Server-side    | Server-side   | Lingua della sessione                                      |
|                              | session_hostname                   | Server-side    | Server-side   | Hostname della sessione                                    |
|                              | session_landing_page_category      | Server-side    | Server-side   | Categoria della pagina di atterraggio                      |
|                              | session_landing_page_location      | Server-side    | Server-side   | Percorso della pagina di atterraggio                       |
|                              | session_landing_page_title         | Server-side    | Server-side   | Titolo della pagina di atterraggio                         |
|                              | session_exit_page_location         | Server-side    | Server-side   | Percorso della pagina di uscita                            |
|                              | session_exit_page_title            | Server-side    | Server-side   | Titolo della pagina di uscita                              |
|                              | session_end_timestamp              | Server-side    | Server-side   | Timestamp di fine sessione                                 |
|                              | session_start_timestamp            | Server-side    | Server-side   | Timestamp di inizio sessione                               |
| consent_data                 | respect_consent_mode               | Client-side    | Client-side   | Rispetto della modalità di consenso                        |
|                              | consent_type                       | Client-side    | Client-side   | Tipo di consenso                                           |
|                              | ad_user_data                       | Client-side    | Client-side   | Consenso dati utente per annunci                           |
|                              | ad_personalization                 | Client-side    | Client-side   | Consenso personalizzazione annunci                         |
|                              | ad_storage                         | Client-side    | Client-side   | Consenso archiviazione annunci                             |
|                              | analytics_storage                  | Client-side    | Client-side   | Consenso archiviazione analitica                           |
|                              | functionality_storage              | Client-side    | Client-side   | Consenso archiviazione funzionalità                        |
|                              | personalization_storage            | Client-side    | Client-side   | Consenso archiviazione personalizzazione                   |
|                              | security_storage                   | Client-side    | Client-side   | Consenso archiviazione sicurezza                           |




## Basic settings
### Configuration variable
The Nameless Analytics Client-side tracker tag inherits configuration settings from [Nameless Analytics Client-side configuration variable](https://github.com/tommasomoretti/nameless-analytics-client-side-config-variable). 

This variable will handle settings like:
- [set tag behavior with consent mode](https://github.com/tommasomoretti/nameless-analytics-client-side-config-variable/blob/main/README.md#respect-google-consent-mode)
- [set user level parameters]()
- [set session level parameters]()
- [set common event parameters](https://github.com/tommasomoretti/nameless-analytics-client-side-config-variable/blob/main/README.md#event-data)
- [add last dataLayer status to the request]()
- [add page status code to the requests]()
- [set requests endpoint domain name and path](https://github.com/tommasomoretti/nameless-analytics-client-side-config-variable/blob/main/README.md#basic-settings)
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
