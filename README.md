![Na logo beta](https://github.com/tommasomoretti/nameless-analytics/assets/29273232/7d4ded5e-4b79-46a2-b089-03997724fd10)

# Client-side tracker tag
The Nameless Analytics Client-side tracker tag is a highly customizable GTM custom template designed to send requests to the [Nameless Analytics Server-side client tag](https://github.com/tommasomoretti/nameless-analytics-server-side-client-tag). 

Start from here:
- [Client-side tracker tag UI](#tag-ui)
- [Basic settings](#basic-settings)
  - [Configuration variable](#event-data)
- [Event data](#event-data)
  - [Event name](#event-type)
  - [Event parameters](#event-parameters)
    - [Add/override event parameters](#add_override_event_parameters)
    - [Add event parameters from dataLayer](#add-event-parameters-from-datalayer)
- [Advanced settings](#advanced-settings)
  - [Disable logs in JavaScript console for this event](#disable-logs-in-javascript-console-for-this-event)



## Tag UI
This is the UI of the Client-side tracker tag.

<img width="1265" alt="client-side-tracker-tag" src="https://github.com/user-attachments/assets/9fe75b06-041a-4b29-8313-ead49ca254e0">



## Basic settings
The Nameless Analytics Client-side tracker tag inherits configuration settings from [Nameless Analytics Client-side configuration variable](https://github.com/tommasomoretti/nameless-analytics-client-side-config-variable). This variable will handle settings like endpoint domain name and path, common event parameters, user ID, user consent mode, cross-domain, traffic source parameters and logging in JavaScript console.


## Event data

### Event Type
Choose between standard event name or custom event name. Always use standard event names when possible.

<img width="1265" alt="Screenshot 2024-11-21 alle 16 45 27" src="https://github.com/user-attachments/assets/7f082fa2-3fc9-40a0-b22e-7c1063f53c2b">

### Event parameters
#### Add/override event parameters
Add custom parameters or overwrite standard parameters in the context of the event. Page_id and event_id parameters cannot be overwritten. 

<img width="1265" alt="Screenshot 2024-11-21 alle 17 04 29" src="https://github.com/user-attachments/assets/6749a1e5-dca6-4ff0-a54d-0537ebdddf4a">

Here a list of all the standard event parameters:

| Event Parameter            | Value                                              | Description                                              |
|----------------------------|----------------------------------------------------|----------------------------------------------------------|
| event_name                 | page_view                                          | Name of the event                                        |
| user_id                    | abcd                                               | ID of the user                                           |
| event_timestamp            | 1732279797314                                      | Timestamp of the event                                   |
| from_measurement_protocol  | No                                                 | Whether the event came from the Measurement Protocol     |
| event_date                 | 2024-11-22                                         | Date of the event                                        |
| event_datetime             | 2024-11-22T12:49:57.314000                         | Datetime of the event                                    |
| client_id                  | Lxt3Tvvy28gGcbp                                    | ID of the client                                         |
| session_id                 | Lxt3Tvvy28gGcbp_oTTWe4cEKBOlqex                    | ID of the session                                        |
| received_event_timestamp   | 1732279797603                                      | Timestamp when the event was received                    |
| content_length             | 1410                                               | Length of the event content                              |

### Event Data
| Parameter                  | Value                                              | Description                                              |
|----------------------------|----------------------------------------------------|----------------------------------------------------------|
| event_id                   | Lxt3Tvvy28gGcbp_oTTWe4cEKBOlqex-8sXAXZWpkuw9osP_1wU9MsrRZR8AKxG | ID of the event                             |
| event_type                 | page_view                                          | Type of the event                                        |
| channel_grouping           | direct                                             | Channel grouping                                         |
| source                     | direct                                             | Traffic source                                           |
| campaign                   | null                                               | Campaign name                                            |
| campaign_id                | null                                               | Campaign ID                                              |
| campaign_term              | null                                               | Campaign term                                            |
| campaign_content           | null                                               | Campaign content                                         |
| page_id                    | Lxt3Tvvy28gGcbp_oTTWe4cEKBOlqex-8sXAXZWpkuw9osP     | ID of the page                                          |
| page_title                 | Tommaso Moretti | Freelance digital data analyst   | Title of the page                                        |
| page_hostname_protocol     | https                                              | Protocol of the page hostname                            |
| page_hostname              | tommasomoretti.com                                 | Hostname of the page                                     |
| page_location              | /                                                  | Location of the page                                     |
| page_fragment              | null                                               | Fragment of the page URL                                 |
| page_query                 | null                                               | Query parameters of the page                             |
| page_extension             | null                                               | File extension of the page                               |
| page_referrer              | null                                               | Referrer of the page                                     |
| cs_container_id            | GTM-PW7349P                                        | Client-side Google Tag Manager container ID              |
| content_group              | Homepage                                           | Content group                                            |
| user_agent                 | Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36 | User agent string                     |
| browser_name               | Chrome                                             | Name of the browser                                      |
| browser_language           | it-IT                                              | Language of the browser                                  |
| browser_version            | 131.0.0.0                                          | Version of the browser                                   |
| device_type                | desktop                                            | Type of the device                                       |
| device_vendor              | Apple                                              | Vendor of the device                                     |
| device_model               | Macintosh                                          | Model of the device                                      |
| os_name                    | Mac OS                                             | Operating system name                                    |
| os_version                 | 10.15.7                                            | Version of the operating system                          |
| screen_size                | 1512x982                                           | Screen size of the device                                |
| viewport_size              | 1512x823                                           | Viewport size of the device                              |
| country                    | IT                                                 | Country of the user                                      |
| city                       | treviso                                            | City of the user                                         |
| ss_hostname                | gtm.tommasomoretti.com                             | Server-side Google Tag Manager hostname                  |
| ss_container_id            | GTM-KQG9ZNG                                        | Server-side Google Tag Manager container ID              |

### Consent Data
| Parameter                  | Value                                              | Description                                              |
|----------------------------|----------------------------------------------------|----------------------------------------------------------|
| consent_type               | default                                            | Type of consent                                          |
| tracking_accuracy          | Enhanced                                           | Tracking accuracy                                        |
| respect_consent_mode       | true                                               | Whether consent mode is respected                        |
| ad_user_data               | false                                              | Whether ad user data is allowed                          |
| ad_personalization         | false                                              | Whether ad personalization is allowed                    |
| ad_storage                 | false                                              | Whether ad storage is allowed                            |
| analytics_storage          | true                                               | Whether analytics storage is allowed                     |
| functionality_storage      | false                                              | Whether functionality storage is allowed                 |
| personalization_storage    | false                                              | Whether personalization storage is allowed               |
| security_storage           | false                                              | Whether security storage is allowed                      |


#### Add event parameters from dataLayer
Retrieve the dataLayer values from the dataLayer push that triggered the tag. Those values will be added to the payload automatically.


## Advanced settings
### Disable logs in JavaScript console for this event
Disable console log for this specific event if Enable logs in JavaScript console is enabled in the Nameless Analytics Client-side config variable. 

---

Reach me at: [Email](mailto:hello@tommasomoretti.com) | [Website](https://tommasomoretti.com/?utm_source=github.com&utm_medium=referral&utm_campaign=nameless_analytics) | [Twitter](https://twitter.com/tommoretti88) | [Linkedin](https://www.linkedin.com/in/tommasomoretti/)
