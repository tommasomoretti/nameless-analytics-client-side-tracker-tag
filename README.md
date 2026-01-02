# Nameless Analytics | Client-side Tracker Tag

The Nameless Analytics Client-side Tracker Tag is a highly customizable GTM custom template designed to send requests to the [Nameless Analytics Server-side Client Tag](https://github.com/nameless-analytics/nameless-analytics-server-side-client-tag). 

For an overview of how Nameless Analytics works [start from here](https://github.com/nameless-analytics/nameless-analytics/#technical-architecture).

Tag:
* [Nameless Analytics Client-side Tracker Tag UI](#nameless-analytics-client-side-tracker-tag-ui)

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

[Nameless Analytics Server-side Client Tag](https://github.com/nameless-analytics/nameless-analytics-server-side-client-tag/#addoverride-event-level-parameters) override [Specific event parameters](#addoverride-event-level-parameters) override [Shared event parameters](https://github.com/nameless-analytics/nameless-analytics-client-side-tracker-configuration-variable/#add-shared-event-parameters) override [dataLayer parameters](#add-event-parameters-from-datalayer) override [Standard parameters](https://github.com/nameless-analytics/nameless-analytics/#request-payload-data)

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
The Nameless Analytics Client-side Tracker Tag inherits configuration settings from [Nameless Analytics Client-side Tracker Configuration Variable](https://github.com/nameless-analytics/nameless-analytics-client-side-tracker-configuration-variable/). 

This variable will handle settings like:
- [set requests endpoint domain name and path](https://github.com/nameless-analytics/nameless-analytics-client-side-tracker-configuration-variable/#server-side-endpoint-settings)
- [set user level parameters](https://github.com/nameless-analytics/nameless-analytics-client-side-tracker-configuration-variable/#user-parameters)
- [set session level parameters](https://github.com/nameless-analytics/nameless-analytics-client-side-tracker-configuration-variable/#session-parameters)
- [set common event parameters](https://github.com/nameless-analytics/nameless-analytics-client-side-tracker-configuration-variable/#event-parameters)
- [respect Google Consent Mode](https://github.com/nameless-analytics/nameless-analytics-client-side-tracker-configuration-variable/#respect-google-consent-mode)
- [enable cross-domain tracking](https://github.com/nameless-analytics/nameless-analytics-client-side-tracker-configuration-variable/#enable-cross-domain-tracking)
- [customize source and campaigns URL parameters](https://github.com/nameless-analytics/nameless-analytics-client-side-tracker-configuration-variable/#override-default-source-and-campaigns-url-query-parameters)
- [change default JavaScript page view event names](https://github.com/nameless-analytics/nameless-analytics-client-side-tracker-configuration-variable/#override-default-javascript-page-view-event-names)
- [load main library from custom location](https://github.com/nameless-analytics/nameless-analytics-client-side-tracker-configuration-variable/#load-javascript-libraries-in-first-party-mode)
- [add current dataLayer state](https://github.com/nameless-analytics/nameless-analytics-client-side-tracker-configuration-variable/#add-current-datalayer-state)
- [show logs in JavaScript console](https://github.com/nameless-analytics/nameless-analytics-client-side-tracker-configuration-variable/#enable-logs-in-javascript-console)

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
Disable console log for this specific event when [Enable logs in JavaScript console](https://github.com/nameless-analytics/nameless-analytics-client-side-tracker-configuration-variable/#enable-logs-in-javascript-console) is enabled in the Nameless Analytics Client-side Tracker Configuration Variable. 

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
