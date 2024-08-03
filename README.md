![Na logo beta](https://github.com/tommasomoretti/nameless-analytics/assets/29273232/7d4ded5e-4b79-46a2-b089-03997724fd10)

An open source analytics platform for power users based on [Google Tag Manager](https://marketingplatform.google.com/intl/it/about/tag-manager/) and [Google BigQuery](https://cloud.google.com/bigquery). 

Collect, analyze and activate your website data with a real-time analytics suite that respects users privacy, for free.



## Client-side configuration variable
Lorem ipsum



## Client-side main tag
Lorem ipsum


## Cross Domain
If ```enable_cross_domain_tracking``` option is enabled, the client-side tag will set a javascript event listener on every link click. 
  - When a user clicks on a link with a authorized domain for cross-domain, a javascript event listener sends a ```get_user_data``` request to the server. The server responds with the two cookie values and the javascript event listener decorates the URL with a parameter named ```na_id```. After that, the user is redirected to the destination website.
  - When the user lands on the destination website, the first tag that fires checks if there is a ```na_id``` parameter in the URL. If it is present, the hit will contain a ```cross_domain_id``` parameter, the server-side Client Tag will add it to the request and set back the cookies with those values.

    When ```enable_cross_domain_tracking``` option is enabled, ```analytics_storage``` is granted and a user clicks on an authorized link:
    
    <img width="1264" alt="Screenshot 2024-06-25 alle 13 44 37" src="https://github.com/tommasomoretti/nameless-analytics/assets/29273232/7f966853-9e95-4638-b831-03f6c9506267">
  
    When ```enable_cross_domain_tracking``` option is enabled, ```analytics_storage``` is granted and a user clicks on not autorized link:
    
    <img width="1263" alt="Screenshot 2024-06-25 alle 13 45 43" src="https://github.com/tommasomoretti/nameless-analytics/assets/29273232/207ce2cf-5a09-4e5f-a0c0-1450e4065631">
    
    When ```enable_cross_domain_tracking``` option is enabled, ```analytics_storage``` is granted and a user clicks on internal link:
    
    <img width="1262" alt="Screenshot 2024-06-25 alle 13 48 01" src="https://github.com/tommasomoretti/nameless-analytics/assets/29273232/e5152e8f-c757-4718-8e94-5dd28df19564">
    
    When ```enable_cross_domain_tracking``` option is enabled, ```analytics_storage``` is not granted and a user clicks on any link, no link decoration happens but the logs are still present in the console like above. 
    
    <img width="1263" alt="Screenshot 2024-06-26 alle 15 41 31" src="https://github.com/tommasomoretti/nameless-analytics/assets/29273232/1ee8a621-cf00-47b9-9c3a-dff38ac77e2a">
    <img width="1264" alt="Screenshot 2024-06-26 alle 15 42 51" src="https://github.com/tommasomoretti/nameless-analytics/assets/29273232/2d59516f-c8dc-4c20-8e41-8f2fc505b0e7">
    <img width="1264" alt="Screenshot 2024-06-26 alle 15 43 42" src="https://github.com/tommasomoretti/nameless-analytics/assets/29273232/e32d530a-bdb5-479c-9da9-7ec669a03cf5">

If ```enable_cross_domain_tracking``` option is disabled, the client-side tag will not set any listener.

For more details, see [Nameless Analytics client side tag](https://github.com/tommasomoretti/nameless-analytics-client-tag)


## Payload values
Here a list of all the standard parameters:

| Event parameter                      | Example value                                    | Description                                                                              |
|--------------------------------------|--------------------------------------------------|------------------------------------------------------------------------------------------|
| event_date                           | 2024-08-02                                       | Event date                                                                               |
| event_timestamp                      | 1722607958646                                    | Event timestamp                                                                          |
| event_name                           | page_view                                        | Event name                                                                               |
| client_id                            | 5345554776                                       | Random number between 1000000000 and 9999999999                                          |
| session_id                           | 5345554776_8827389674                            | Client id + Random number between 1000000000 and 9999999999                              |
| event_data.event_id                  | 5345554776_8827389674_2783697471_1333783653      | Client id + Session id + Page id value + Random number between 1000000000 and 9999999999 |
| event_data.event_type                | page_view                                        | Event type                                                                               |
| event_data.channel_grouping          | direct                                           | Channel grouping                                                                         |
| event_data.source                    | direct                                           | Source                                                                                   |
| event_data.campaign                  | null                                             | Campaign                                                                                 |
| event_data.campaign_id               | null                                             | Campaign id                                                                              |
| event_data.campaign_term             | null                                             | Campaign term                                                                            |
| event_data.campaign_content          | null                                             | Campaign content                                                                         |
| event_data.page_id                   | 5345554776_8827389674_2783697471                 | Client id + Session id + Random number between 1000000000 and 9999999999                 |
| event_data.page_title                | Tommaso Moretti | Freelance digital data analyst | Page title                                                                               |
| event_data.page_hostname_protocol    | https                                            | Page hostname protocol                                                                   |
| event_data.page_hostname             | tommasomoretti.com                               | Page hostname                                                                            |
| event_data.page_location             | /                                                | Page location                                                                            |
| event_data.page_fragment             | null                                             | Page fragment                                                                            |
| event_data.page_query                | null                                             | Page query                                                                               |
| event_data.page_extension            | null                                             | Page extension                                                                           |
| event_data.page_referrer             | null                                             | Page referrer                                                                            |
| event_data.cs_container_id           | GTM-PW7349P                                      | Client-side Google Tag Manager container ID                                              |
| event_data.browser_name              | Chrome                                           | Browser name                                                                             |
| event_data.browser_language          | it-IT                                            | Browser language                                                                         |
| event_data.browser_version           | 127.0.0.0                                        | Browser version                                                                          |
| event_data.device_type               | desktop                                          | Device type                                                                              |
| event_data.device_vendor             | Apple                                            | Device vendor                                                                            |
| event_data.device_model              | Macintosh                                        | Device model                                                                             |
| event_data.os_name                   | Mac OS                                           | OS name                                                                                  |
| event_data.os_version                | 10.15.7                                          | OS version                                                                               |
| event_data.screen_size               | 1512x982                                         | Screen size                                                                              |
| event_data.viewport_size             | 1512x823                                         | Viewport size                                                                            |
| event_data.country                   | IT                                               | Country                                                                                  |
| event_data.city                      | venice                                           | City                                                                                     |
| event_data.ss_hostname               | gtm.tommasomoretti.com                           | Server-side Google Tag Manager hostname                                                  |
| event_data.ss_container_id           | GTM-KQG9ZNG                                      | Server-side Google Tag Manager container ID                                              |
| consent_data.ad_user_data            | false                                            | Consent Mode ad_user_data value                                                          |
| consent_data.ad_personalization      | false                                            | Consent Mode ad_personalization                                                          |
| consent_data.ad_storage              | false                                            | Consent Mode ad_storage                                                                  |
| consent_data.analytics_storage       | true                                             | Consent Mode analytics_storage                                                           |
| consent_data.functionality_storage   | false                                            | Consent Mode functionality_storage value                                                 |
| consent_data.personalization_storage | false                                            | Consent Mode personalization_storage value                                               |
| consent_data.security_storage        | false                                            | Consent Mode security_storage value                                                      |



## Troubleshooting
Lorem ipsum


### Things to keep in mind

Lorem ipsum

---

Reach me at: [Email](mailto:hello@tommasomoretti.com) | [Website](https://tommasomoretti.com/?utm_source=github.com&utm_medium=referral&utm_campaign=nameless_analytics) | [Twitter](https://twitter.com/tommoretti88) | [Linkedin](https://www.linkedin.com/in/tommasomoretti/)
