![Na logo beta](https://github.com/tommasomoretti/nameless-analytics/assets/29273232/7d4ded5e-4b79-46a2-b089-03997724fd10)

# Nameless Analytics client-side tracker tag
The Nameless Analytics Client-side tracker tag is a highly customizable GTM custom template designed to send requests to the [Nameless Analytics Server-side client tag](https://github.com/tommasomoretti/nameless-analytics-server-side-client-tag). 

The common event configuration settings are inherited from the [Nameless Analytics Client-side configuration variable](https://github.com/tommasomoretti/nameless-analytics-client-side-config-variable).

Read more about:
- [Client-side configuration variable](#client-side-configuration-variable)
  - [Basic settings](#basic-settings)
    - [Endpoint domain name](#endpoint-domain-name)
    - [Endpoint path](#endpoint-path)
  - [Parameters](#parameters)
    - [Add shared event parameters](#add-shared-event-parameters)
    - [Add user ID](#add-user-id)
  - [Advanced settings](#advanced-settings)
    - [Respect Google Consent Mode](#respect-google-consent-mode)
  - [Tracking](#tracking)
    - [Cross Domain](#cross-domain)
    - [Customize source and campaign URL parameters](#customize-source-and-campaign-url-parameters)
  - [Logs](#logs)
    - [Enable Logs](#enable-logs)
- [Client-side tracker tag](#client-side-tracker-tag)
- [Payload values](#payload-values)
- [Troubleshooting and things to keep in mind](#troubleshooting-and-things-to-keep-in-mind)


## Tag UI
This is the UI of the Client-side Tracker Tag.

<img width="1265" alt="Screenshot 2024-11-03 alle 15 32 46" src="https://github.com/user-attachments/assets/598813d3-1956-487d-bfc9-83a27465cc76">

### Event data
Here is how to declare the event_name. You can add custom parameters or overwrite standard parameters (page_id and event_id parameters cannot be overwritten).
You can retrieve the dataLayer values from the event that triggered the tag. Those values will be added to the payload automatically.



## Payload values
Here a list of all the standard event parameters:

| Event parameter |                         | Example value                                    | Description                                                                              |
|-----------------|-------------------------|--------------------------------------------------|------------------------------------------------------------------------------------------|
| event_date      |                         | 2024-08-02                                       | Event date                                                                               |
| event_timestamp |                         | 1722607958646                                    | Event timestamp                                                                          |
| event_name      |                         | page_view                                        | Event name                                                                               |
| client_id       |                         | 5345554776                                       | Random number between 1000000000 and 9999999999                                          |
| session_id      |                         | 5345554776_8827389674                            | Client id + Random number between 1000000000 and 9999999999                              |
| event_data      | event_id                | 5345554776_8827389674_2783697471_1333783653      | Client id + Session id + Page id value + Random number between 1000000000 and 9999999999 |
|                 | event_type              | page_view                                        | Event type                                                                               |
|                 | channel_grouping        | direct                                           | Channel grouping                                                                         |
|                 | source                  | direct                                           | Source                                                                                   |
|                 | campaign                | null                                             | Campaign                                                                                 |
|                 | campaign_id             | null                                             | Campaign id                                                                              |
|                 | campaign_term           | null                                             | Campaign term                                                                            |
|                 | campaign_content        | null                                             | Campaign content                                                                         |
|                 | page_id                 | 5345554776_8827389674_2783697471                 | Client id + Session id + Random number between 1000000000 and 9999999999                 |
|                 | page_title              | Tommaso Moretti | Freelance digital data analyst | Page title                                                                               |
|                 | page_hostname_protocol  | https                                            | Page hostname protocol                                                                   |
|                 | page_hostname           | tommasomoretti.com                               | Page hostname                                                                            |
|                 | page_location           | /                                                | Page location                                                                            |
|                 | page_fragment           | null                                             | Page fragment                                                                            |
|                 | page_query              | null                                             | Page query                                                                               |
|                 | page_extension          | null                                             | Page extension                                                                           |
|                 | page_referrer           | null                                             | Page referrer                                                                            |
|                 | cs_container_id         | GTM-PW7349P                                      | Client-side Google Tag Manager container ID                                              |
|                 | browser_name            | Chrome                                           | Browser name                                                                             |
|                 | browser_language        | it-IT                                            | Browser language                                                                         |
|                 | browser_version         | 127.0.0.0                                        | Browser version                                                                          |
|                 | device_type             | desktop                                          | Device type                                                                              |
|                 | device_vendor           | Apple                                            | Device vendor                                                                            |
|                 | device_model            | Macintosh                                        | Device model                                                                             |
|                 | os_name                 | Mac OS                                           | OS name                                                                                  |
|                 | os_version              | 10.15.7                                          | OS version                                                                               |
|                 | screen_size             | 1512x982                                         | Screen size                                                                              |
|                 | viewport_size           | 1512x823                                         | Viewport size                                                                            |
|                 | country                 | IT                                               | Country                                                                                  |
|                 | city                    | venice                                           | City                                                                                     |
|                 | ss_hostname             | gtm.tommasomoretti.com                           | Server-side Google Tag Manager hostname                                                  |
|                 | ss_container_id         | GTM-KQG9ZNG                                      | Server-side Google Tag Manager container ID                                              |
| consent_data    | ad_user_data            | false                                            | Consent Mode ad_user_data value                                                          |
|                 | ad_personalization      | false                                            | Consent Mode ad_personalization                                                          |
|                 | ad_storage              | false                                            | Consent Mode ad_storage                                                                  |
|                 | analytics_storage       | true                                             | Consent Mode analytics_storage                                                           |
|                 | functionality_storage   | false                                            | Consent Mode functionality_storage value                                                 |
|                 | personalization_storage | false                                            | Consent Mode personalization_storage value                                               |
|                 | security_storage        | false                                            | Consent Mode security_storage value                                                      |



## Temporary cookie value
Lorem ipsum



## Troubleshooting and things to keep in mind
Lorem ipsum

---

Reach me at: [Email](mailto:hello@tommasomoretti.com) | [Website](https://tommasomoretti.com/?utm_source=github.com&utm_medium=referral&utm_campaign=nameless_analytics) | [Twitter](https://twitter.com/tommoretti88) | [Linkedin](https://www.linkedin.com/in/tommasomoretti/)
