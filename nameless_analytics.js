// Send hits
function send_data(full_endpoint, payload, data, enable_logs, push_user_data_into_dataLayer) {
  const timestamp = payload.event_timestamp;
  const formatted_datetime = format_datetime(timestamp);
  const ua_info = parse_user_agent();

  payload.event_date = formatted_datetime.date;
  payload.event_datetime = formatted_datetime.date_time_micros;
  payload.event_data.user_agent = ua_info.ua;
  payload.event_data.browser_name = ua_info.browser.name;
  payload.event_data.browser_language = ua_info.browser.language;
  payload.event_data.browser_version = ua_info.browser.version;
  payload.event_data.device_type = ua_info.device.type || "desktop";
  payload.event_data.device_vendor = ua_info.device.vendor;
  payload.event_data.device_model = ua_info.device.model;
  payload.event_data.os_name = ua_info.os.name;
  payload.event_data.os_version = ua_info.os.version;
  payload.event_data.screen_size = window.screen.width + "x" + window.screen.height;
  payload.event_data.viewport_size = window.innerWidth + "x" + window.innerHeight;
  payload.event_data.page_language = document.documentElement.lang;

  if (enable_logs) {
    console.log('SENDING REQUEST...');
  }

  if (full_endpoint.split('/')[2] !== 'undefined') {
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
        if (response_json.status_code === 200) {
          if (enable_logs) {
            console.log('  👉 Event name: ' + response_json.data.event_name);
            console.log('  👉 Payload data: ', response_json.data);
            console.log('  ' + response_json.response);
          }

          let was_pushed = window.was_pushed || false;
          let last_client_id = window.last_client_id || null;
          let last_session_id = window.last_session_id || null;
          let last_page_id = window.last_page_id || null;

          const current_client_id = response_json.data.client_id;
          const current_session_id = response_json.data.session_id;
          const current_page_id = response_json.data.event_data.page_id.split('-')[1];

          if (push_user_data_into_dataLayer && !was_pushed){           
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
              event: 'na_user_data',
              client_id: current_client_id,
              session_id: current_session_id,
              page_id: current_page_id
            });
            
            window.was_pushed = true;
            window.last_client_id = current_client_id;
            window.last_session_id = current_session_id;
            window.last_page_id = current_page_id;
          } else if (push_user_data_into_dataLayer && (current_client_id !== last_client_id || current_session_id !== last_session_id)) { // Only when a cookie expire within a session
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
              event: 'na_user_data',
              client_id: current_client_id,
              session_id: current_session_id,
              page_id: current_page_id
            });
            
            window.was_pushed = true;
            window.last_client_id = current_client_id;
            window.last_session_id = current_session_id;
            window.last_page_id = current_page_id;  
          } 

          return data.gtmOnSuccess();
        } else {
          if (enable_logs) {
            console.log('  ' + response_json.response);
          }
          return data.gtmOnFailure();
        }
      });
    } catch (error) {
      if (enable_logs) {
        console.log('  🔴 Error while fetch');
      }
      return data.gtmOnFailure();
    }
  } else {
    if (enable_logs) {
      console.log('  🔴 This website is not authorized to send Nameless Analytics requests.');
    }
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

  const formatted_date = {
    date: `${year}-${month}-${day}`,
    date_time: `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`,
    date_time_millis: `${year}-${month}-${day}T${hours}:${minutes}:${seconds}` + `.${milliseconds}`,
    date_time_micros: `${year}-${month}-${day}T${hours}:${minutes}:${seconds}` + `.${milliseconds}000`,
    year: year,
    month: month,
    day: day,
    hours: hours,
    minutes: minutes,
    seconds: seconds,
    milliseconds: `.${milliseconds}`,
    microseconds: `.${milliseconds}000`
  }

  return formatted_date
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
  const patterns = {
    search_engine: new RegExp('360\\.cn|alice|aol|ar\\.search\\.yahoo\\.com|ask|bing|google|yahoo|yandex|baidu|duckduckgo|sogou|naver|seznam', 'i'),
    social: new RegExp('facebook|twitter|instagram|pinterest|linkedin|reddit|vk\\.com|tiktok|snapchat|tumblr|wechat|whatsapp', 'i'),
    shopping: new RegExp('amazon|ebay|etsy|shopify|stripe|walmart|mercadolibre|alibaba|naver\\.shopping', 'i'),
    video: new RegExp('youtube|vimeo|netflix|twitch|dailymotion|hulu|disneyplus|wistia|youku', 'i'),
    ai: new RegExp('chatgpt|gemini|bard|claude|alexa|siri|assistant|\\.ai([/]|$)', 'i'),
    email: new RegExp('email|e-mail|newsletter|mailchimp|sendgrid|sparkpost', 'i')
  };

  if (!source) return 'internal_traffic';
  if (source === 'direct') return 'direct';
  if (source === 'tagassistant.google.com') return 'gtm_debugger';
  if (patterns.search_engine.test(source)) {return campaign ? 'paid_search_engine' : 'organic_search_engine';}
  if (patterns.social.test(source)) {return campaign ? 'paid_social' : 'organic_social';}
  if (patterns.shopping.test(source)) {return campaign ? 'paid_shopping' : 'organic_shopping';}
  if (patterns.video.test(source)) { return campaign ? 'paid_video' : 'organic_video';}
  if (patterns.ai.test(source)) return 'ai';
  if (patterns.email.test(source)) { return campaign ? 'email' : 'undefined';}
  if (!campaign) return 'referral';
  if (campaign) return 'affiliate';

  return 'undefined';
}


//----------------------------------------------------------------------------------------------------------------------------------------------------


// Cross-domain
function set_cross_domain_listener(full_endpoint, cross_domain_domains, respect_consent_mode, enable_logs) {
  const saved_full_endpoint = full_endpoint;
  const saved_cross_domain_domains = cross_domain_domains;

  let listener = function(event) {
    var target = event.target.closest('a');
    if (target && target.getAttribute("href")) {
      var original_href = target.getAttribute("href");
      var link_url = new URL(original_href);
      var link_hostname = link_url.hostname;
      var link_target = target.getAttribute("target");

      const domain_matches = saved_cross_domain_domains.some(domain => link_hostname === domain || link_hostname.endsWith(`.${domain}`));
      const is_self = link_hostname.includes(window.location.hostname);
      const url_junk = /^(#|javascript:|tel:|mailto:)/.test(link_url.href);

      if (!url_junk) {
        window.dataLayer = window.dataLayer || [];
        const consent_values = get_last_consent_values();
        const analytics_storage_value = (consent_values.analytics_storage == true || consent_values.analytics_storage == null) ? true : false;
        const consent_granted_or_not_needed = (respect_consent_mode) ? analytics_storage_value : true;

        let popupWindow = null;

        // If the link is not cross-domain
        if (!domain_matches || is_self) {
          return;
        }

        // If the link is cross-domain but consent is denied
        if (domain_matches && !consent_granted_or_not_needed) {
          return;
        }

        // If the link is cross-domain and consent is granted
        event.preventDefault();

        // Create new window if link has target: _blank 
        if (domain_matches && link_target === "_blank") {
          popupWindow = window.open("about:blank", "_blank");
        }

        get_user_data(saved_full_endpoint, { event_name: 'get_user_data', event_origin: 'Website' }, enable_logs)
          .then(user_data => {
            const client_id = user_data.client_id;
            const session_id = user_data.session_id;

            if (enable_logs) {
              console.log('CROSS-DOMAIN');
            }

            if (client_id !== 'undefined' && session_id !== 'undefined_undefined') {
              link_url.searchParams.set('na_id', session_id);
            } else if (client_id === 'undefined' && session_id !== 'undefined_undefined') {
              link_url.searchParams.set('na_id', session_id);
            }

            if (enable_logs) {console.log('  Redirect to: ' + link_url.href)}
            
            if (popupWindow) {
              popupWindow.location.href = link_url.href;
            } else {
              window.location.href = link_url.href;
            }
          })
          .catch(error => {
            console.error('Errore nel recupero dei dati utente:', error);
            if (popupWindow) {
              popupWindow.location.href = original_href;
            } else {
              window.location.href = original_href;
            }
          });
      }
    }
  };

  document.querySelectorAll('a').forEach(function(element) {
    element.addEventListener('click', listener);
  });
}


// Get last consent values
function get_last_consent_values() {
  if (typeof google_tag_data !== 'undefined' && google_tag_data) {
    const used_default = google_tag_data.ics.usedDefault;
    const used_update = google_tag_data.ics.usedUpdate;
    const raw_consent_data = google_tag_data.ics.entries;

    return {
      consent_type: (!used_default && !used_update) ? "Consent mode not present" : ((used_default && !used_update) ? "default" : "update"),
      ad_user_data: used_default ? (raw_consent_data.ad_user_data.update || raw_consent_data.ad_user_data.default) : null,
      ad_personalization: used_default ? (raw_consent_data.ad_personalization.update || raw_consent_data.ad_personalization.default) : null,
      ad_storage: used_default ? (raw_consent_data.ad_storage.update || raw_consent_data.ad_storage.default) : null,
      analytics_storage: used_default ? (raw_consent_data.analytics_storage.update || raw_consent_data.analytics_storage.default) : null,
      functionality_storage: used_default ? (raw_consent_data.functionality_storage.update || raw_consent_data.functionality_storage.default) : null,
      personalization_storage: used_default ? (raw_consent_data.personalization_storage.update || raw_consent_data.personalization_storage.default) : null,
      security_storage: used_default ? (raw_consent_data.security_storage.update || raw_consent_data.security_storage.default) : null,
    };
  } else {
    return 'No GTM found';
  }
}

// Ask user data to GTM Server-side
function get_user_data(saved_full_endpoint, payload, enable_logs) {
  if (saved_full_endpoint.split('/')[2].split('.')[1] !== 'undefined') {
    return fetch(saved_full_endpoint, {
      method: 'POST',
      credentials: 'include',
      mode: 'cors',
      keepalive: true,
      body: JSON.stringify(payload)
    })
      .then(response => response.json())
      .then(response_json => {
        if (response_json.status_code === 200) {
          return response_json.data;
        } else {
          if (enable_logs) {
            console.log(response_json.response);
          }
          return {};
        }
      })
      .catch(error => {
        if (enable_logs) {
          console.log("🔴 Error while fetch");
        }
        return {};
      });
  } else {
    if (enable_logs) {
      console.log("🔴 Undefined endpoint domain");
    }
    return Promise.resolve({});
  }
}
