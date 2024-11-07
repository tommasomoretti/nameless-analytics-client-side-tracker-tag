// Send hits
function send_data(full_endpoint, payload, data) {
  const timestamp = payload.event_timestamp
  const formatted_datetime = format_datetime(timestamp)
  const ua_info = parse_user_agent()

  payload.event_date = formatted_datetime.split("T")[0],
  payload.event_datetime = formatted_datetime,
  payload.event_data.user_agent = ua_info.ua,
  payload.event_data.browser_name = ua_info.browser.name,
  payload.event_data.browser_language = ua_info.browser.language,
  payload.event_data.browser_version = ua_info.browser.version,
  payload.event_data.device_type = ua_info.device.type || "desktop",
  payload.event_data.device_vendor = ua_info.device.vendor,
  payload.event_data.device_model = ua_info.device.model,
  payload.event_data.os_name = ua_info.os.name,
  payload.event_data.os_version = ua_info.os.version,
  payload.event_data.screen_size = window.screen.width + "x" + window.screen.height
  payload.event_data.wiewport_size = window.innerWidth + "x" + window.innerHeight

  if(data.config_variable.enable_logs){console.log('SENDING REQUEST...')} 
  
  if (full_endpoint.split('/')[2] != 'undefined'){
    try {
      fetch(full_endpoint, {
        method: 'POST',
        credentials: 'include',
        mode: 'cors',
        keepalive: true,
        body: JSON.stringify(payload)
      })
      .then((response) => response.json())
      .then((response_json) => {
        if (response_json.status_code === 200){
          if(data.config_variable.enable_logs){console.log('  👉 Event name: ' + response_json.data.event_name)}
          if(data.config_variable.enable_logs){console.log('  👉 Payload data: ', response_json.data)}
          if(data.config_variable.enable_logs){console.log('  ' + response_json.response)}
          return data.gtmOnSuccess()
        } else {
          if(data.config_variable.enable_logs){console.log('  ' + response_json.response)}
          return data.gtmOnFailure()
        }
      }) 
    } catch(error) {
      if(data.config_variable.enable_logs){console.log('  🔴 Error while fetch')}
      return data.gtmOnFailure()
    }
  } else {
    if(data.config_variable.enable_logs){console.log('  🔴 This website is not authorized to send Nameless Analytics requests.')}
  }
}


// Format timestamp into date 
function format_datetime(timestamp) {
  const date = new Date(timestamp)

  const year = date.getUTCFullYear()
  const month = String(date.getUTCMonth() + 1).padStart(2, '0')
  const day = String(date.getUTCDate()).padStart(2, '0')
  const hours = String(date.getUTCHours()).padStart(2, '0')
  const minutes = String(date.getUTCMinutes()).padStart(2, '0')
  const seconds = String(date.getUTCSeconds()).padStart(2, '0')
  const milliseconds = String(date.getUTCMilliseconds()).padStart(3, '0')

  const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}000`

  return formattedDate
}


// Parse user agent
const parse_user_agent = function () {
  var uap = new UAParser()
  var uap_res = uap.getResult()
  
  uap_res.browser.language = navigator.language  
  return uap_res
}


//----------------------------------------------------------------------------------------------------------------------------------------------------


// Channel grouping
function get_channel_grouping(source, campaign) {
  const organic_search_source = new RegExp('google|bing|yahoo|baidu|yandex|duckduckgo|ask|aol|ecosia');
  const social_source = new RegExp('facebook|messenger|instagram|tiktok|t\\.co|twitter|linkedin|pinterest|youtube|whatsapp|wechat');
  const email_source = new RegExp('email|e-mail|e_mail|e mail');

  if (source == null) {
    return 'internal_traffic';
  } else if (source == 'direct') {
    return 'direct';
  } else if (source === 'tagassistant.google.com') {
    return 'gtm_debugger';
  } else if (organic_search_source.test(source) && (!campaign || campaign === '')) {
    return 'organic_search';
  } else if (organic_search_source.test(source) && campaign && campaign !== '') {
    return 'paid_search';
  } else if (social_source.test(source) && (!campaign || campaign === '')) {
    return 'organic_social';
  } else if (social_source.test(source) && campaign && campaign !== '') {
    return 'paid_social';
  } else if (email_source.test(source) && campaign && campaign !== '') {
    return 'email';
  } else if (!organic_search_source.test(source) && !social_source.test(source) && !email_source.test(source) && source != "" && (!campaign || campaign === '')) {
    return 'referral';
  } else if (!organic_search_source.test(source) && !social_source.test(source) && !email_source.test(source) && source != "" && campaign && campaign !== '') {
    return 'affiliate';
  } else {
    return 'undefined';
  }
}


//----------------------------------------------------------------------------------------------------------------------------------------------------


// Cross-domain
function set_cross_domain_listener(full_endpoint, cross_domain_domains, respect_consent_mode) {
  const saved_full_endpoint = full_endpoint;
  const saved_cross_domain_domains = cross_domain_domains;

  let listener = async function(event) {
    var target = (event.target.getAttribute("href")) ? event.target : event.target.closest('a');
    if (target && target.getAttribute("href")) {
      event.preventDefault();

      var original_href = target.getAttribute("href");
      var link_url = new URL(original_href);
      var link_hostname = link_url.hostname;

      const domain_matches = saved_cross_domain_domains.some(domain => link_hostname === domain || link_hostname.endsWith(`.${domain}`));
      const is_self = link_hostname.includes(window.location.hostname);
      const url_junk = /^(mailto:|tel:)/.test(link_url.href);

      if (!url_junk) {
        window.dataLayer = window.dataLayer || [];
        const consent_values = get_last_consent_values();
        const analytics_storage_value = (consent_values.analytics_storage == true || consent_values.analytics_storage == null) ? true : false;
        const consent_granted_or_not_needed = (respect_consent_mode) ? analytics_storage_value : true;

        if (domain_matches && !is_self && (consent_granted_or_not_needed || Object.entries(consent_values) == 0)) {
          // Get user data from Server-side GTM 
          const user_data = await get_user_data(saved_full_endpoint, {event_name: 'get_user_data', from_measurement_protocol: 'No'});
          const client_id = user_data.client_id;
          const session_id = user_data.session_id;

          console.log('CROSS-DOMAIN');

          // Client ID is valid and Session ID is valid 
          if (client_id !== 'undefined' && session_id !== 'undefined_undefined') {
            console.log('  👍Valid Client ID:', client_id);
            console.log('  👍 Valid Session ID:', session_id);
            console.log('  🟢 Cross-domain will be applied.');
            link_url.searchParams.set('na_id', session_id);
          // Client ID invalid and Session ID is valid
          } else if (client_id === 'undefined' && session_id !== 'undefined_undefined') {
            console.log('  👎 Invalid Client ID:', client_id);
            console.log('  👍 Valid Session ID:', session_id);
            console.log('  🟢 Cross-domain will be applied. Client ID will be derived from Session ID');
            link_url.searchParams.set('na_id', session_id);
            // Client ID is valid and Session ID is invalid
          } else if (client_id !== 'undefined' && session_id === 'undefined_undefined') {
            console.log('  👍 Valid Client ID:', client_id);
            console.log('  👎 Invalid Session ID: ', session_id);
            console.log('  🔴 No cross-domain will be applied.');
          // Client ID is invalid and Session ID is invalid
          } else {
            console.log('  👎 Invalid Client ID:', client_id);
            console.log('  👎 Invalid Session ID: ', session_id);
            console.log('  🔴 No cross-domain will be applied.');
          }
          
          console.log('  Redirect to: ' + link_url.href);
        }
      }

      if (target.getAttribute("target") === "_blank") {
        target.href = link_url.href + '&merda=true'
        // Creare un link temporaneo per aprire l'URL in una nuova scheda, supportando Safari mobile
        // window.open(link_url.href, '_blank', target.hasAttribute('rel') ? target.getAttribute('rel') : 'noopener');
        target.click()
      } else {
        window.location.href = link_url.href;
      }

    }
  };
  
  document.querySelectorAll('a').forEach(function(element) {
    element.addEventListener('click', listener);
    element.childNodes.forEach(function(child) {
      child.addEventListener('click', listener);
    })
  })
}


// Retreive last value of analytics_storage 
function get_last_consent_values() {
  if (typeof google_tag_data !== 'undefined' && google_tag_data) {
    const used_default = google_tag_data.ics.usedDefault; // Is default consent set?
    const used_update = google_tag_data.ics.usedUpdate; // Is consent update?
    const raw_consent_data = google_tag_data.ics.entries; // Consent values

    const consents = {
      consent_type: (!used_default && !used_update) ? "Consent mode not present" : ((used_default && !used_update) ? "default" : "update"),
      ad_user_data: (used_default) ? (raw_consent_data.ad_user_data.update || raw_consent_data.ad_user_data.default) : null,
      ad_personalization: (used_default) ? (raw_consent_data.ad_personalization.update || raw_consent_data.ad_personalization.default) : null,
      ad_storage: (used_default) ? (raw_consent_data.ad_storage.update || raw_consent_data.ad_storage.default) : null,
      analytics_storage: (used_default) ? (raw_consent_data.analytics_storage.update || raw_consent_data.analytics_storage.default) : null,
      functionality_storage: (used_default) ? (raw_consent_data.functionality_storage.update || raw_consent_data.functionality_storage.default) : null,
      personalization_storage: (used_default) ? (raw_consent_data.personalization_storage.update || raw_consent_data.personalization_storage.default) : null,
      security_storage: (used_default) ? (raw_consent_data.security_storage.update || raw_consent_data.security_storage.default) : null,
    };
    return consents;
  } else {
    return 'No GTM found';
  }
}


// Ask to Server-side GTM the values of the client_id, session_id and page_id
async function get_user_data(saved_full_endpoint, payload) {
  if (saved_full_endpoint.split('/')[2].split('.')[1] != 'undefined'){
    try {
      const response = await fetch(saved_full_endpoint, {
        method: 'POST',
        credentials: 'include',
        mode: 'cors',
        keepalive: true,
        body: JSON.stringify(payload)
      });
  
      const response_json = await response.json();
      if (response_json.status_code === 200) {
        return response_json.data;
      } else {
        console.log(response_json.response)
      }
    } catch (error) {
      console.log("🔴 Error while fetch")
      return {}
    }
  } else {
    console.log("🔴 Undefined endpoint domain")
    return {}
  }
}
