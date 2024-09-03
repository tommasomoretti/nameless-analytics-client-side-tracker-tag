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
          if(data.config_variable.enable_logs){console.log('  Event name: ' + response_json.data.event_name)}
          if(data.config_variable.enable_logs){console.log('  Payload data: ', response_json.data)}
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
        const consent_values = get_consent_value(window.dataLayer);
        const analytics_storage_value = (consent_values.analytics_storage == 'granted') ? true : false;
        const consent_granted_or_not_needed = (respect_consent_mode) ? analytics_storage_value : true;

          // console.log('respect_consent_mode', respect_consent_mode);
          // console.log('analytics_storage_value', analytics_storage_value);
          // console.log('consent_granted_or_not_needed', consent_granted_or_not_needed);

        if (domain_matches && !is_self && (consent_granted_or_not_needed || Object.entries(consent_values) == 0)) {
          // Get user data from Server-side GTM 
          const user_data = await get_user_data(saved_full_endpoint, {event_name: 'get_user_data', from_measurement_protocol: 'No'});
          const client_id = user_data.client_id;
          const session_id = user_data.session_id;

          console.log('CROSS-DOMAIN');

          // Client ID is valid and Session ID is valid 
          if (client_id !== 'undefined' && session_id !== 'undefined_undefined') {
            console.log('  👍🏻 Valid Client ID:', client_id);
            console.log('  👍🏻 Valid Session ID:', session_id);
            console.log('  🟢 Cross-domain will be applied.');
            link_url.searchParams.set('na_id', session_id);
          // Client ID invalid and Session ID is valid
          } else if (client_id === 'undefined' && session_id !== 'undefined_undefined') {
            console.log('  👎🏻 Invalid Client ID:', client_id);
            console.log('  👍🏻 Valid Session ID:', session_id);
            console.log('  🟢 Cross-domain will be applied. Client ID will be derived from Session ID');
            link_url.searchParams.set('na_id', session_id);
            // Client ID is valid and Session ID is invalid
          } else if (client_id !== 'undefined' && session_id === 'undefined_undefined') {
            console.log('  👍🏻 Valid Client ID:', client_id);
            console.log('  👎🏻 Invalid Session ID: ', session_id);
            console.log('  🔴 No cross-domain will be applied.');
          // Client ID is invalid and Session ID is invalid
          } else {
            console.log('  👎🏻 Invalid Client ID:', client_id);
            console.log('  👎🏻 Invalid Session ID: ', session_id);
            console.log('  🔴 No cross-domain will be applied.');
          }
          
          console.log('  Redirect to: ' + link_url.href);
        }
      }

      if (target.getAttribute("target") === "_blank") {
        //window.open(link_url.href, '_blank')
        var link = document.createElement('a');
        link.href = link_url.href;
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        location.href = link_url.href;
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
function get_consent_value(dataLayer) {
  let consent_values = {}

  for (let i = dataLayer.length - 1; i >= 0; i--) {
    const item = dataLayer[i];
    if (item[0] === "consent" && (item[1] === "default" || item[1] === "update")) {
      const consent_data = item[2];
      if (consent_data) {
        consent_values.ad_personalization = consent_data.ad_personalization !== undefined ? consent_data.ad_personalization : consent_values.ad_personalization;
        consent_values.ad_storage = consent_data.ad_storage !== undefined ? consent_data.ad_storage : consent_values.ad_storage;
        consent_values.ad_user_data = consent_data.ad_user_data !== undefined ? consent_data.ad_user_data : consent_values.ad_user_data;
        consent_values.analytics_storage = consent_data.analytics_storage !== undefined ? consent_data.analytics_storage : consent_values.analytics_storage;
        consent_values.functionality_storage = consent_data.functionality_storage !== undefined ? consent_data.functionality_storage : consent_values.functionality_storage;
        consent_values.personalization_storage = consent_data.personalization_storage !== undefined ? consent_data.personalization_storage : consent_values.personalization_storage;
        consent_values.security_storage = consent_data.security_storage !== undefined ? consent_data.security_storage : consent_values.security_storage;
        break;
      }
    }
  }

  return consent_values
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


//----------------------------------------------------------------------------------------------------------------------------------------------------


// Page load time 
function get_page_load_time(respect_consent_mode) {
  const consent_values = get_consent_value(window.dataLayer);
  const analytics_storage_value = (consent_values.analytics_storage == 'granted') ? true : false;
  const consent_granted_or_not_needed = (respect_consent_mode) ? analytics_storage_value : true;

  console.log('respect_consent_mode', respect_consent_mode);
  console.log('consent_values', consent_values);
  console.log('analytics_storage_value', analytics_storage_value);
  console.log('consent_granted_or_not_needed', consent_granted_or_not_needed);

  if (consent_granted_or_not_needed || Object.entries(consent_values) == 0) {
    const dom_interactive = performance.timing.domInteractive
    const response_start = performance.timing.responseStart
    const dom_complete = performance.timing.domComplete
    const dom_loading = performance.timing.domLoading
    const load_event_end = performance.timing.loadEventEnd
    const navigation_start = performance.timing.navigationStart
    
    const time_to_dom_interactive = dom_interactive - response_start
    const time_to_dom_complete = dom_complete - response_start
    const page_render_time = dom_complete - dom_loading
    const total_page_load_time = load_event_end - navigation_start
    
    // console.log('time_to_dom_interactive:', time_to_dom_interactive)
    // console.log('time_to_dom_complete:', time_to_dom_complete)
    // console.log('page_render_time:', page_render_time)
    // console.log('total_page_load_time:', total_page_load_time)
    
    window.dataLayer.push({
      'event': 'page_load_time',
      'time_to_dom_interactive': time_to_dom_interactive,
      'time_to_dom_complete': time_to_dom_complete,
      'page_render_time': page_render_time,
      'total_page_load_time': total_page_load_time  
    })
  } else {
    console.log('Consent denied')
  }
}

function set_page_load_time_listener(respect_consent_mode){
  window.addEventListener('load', function() {
      setTimeout(get_page_load_time(respect_consent_mode), 100);
  });
}


//----------------------------------------------------------------------------------------------------------------------------------------------------


// Page closed 
// let eventPushed = false; // Variabile di stato per tracciare se l'evento è già stato pushato
// let timeoutId = null; // Variabile per memorizzare l'ID del timeout

// // Funzione per pushare l'evento di chiusura della pagina in dataLayer
// function pushPageClosedEvent(eventType) {
//   if (!eventPushed) {
//     window.dataLayer.push({
//       'event': 'page_closed',
//       'triggered_event': eventType
//     });
//     eventPushed = true; // Imposta la variabile a true per evitare futuri push
//     console.log(`🐷 Evento pushato: ${eventType}`);
//   }
// }

// // Listener per l'evento 'beforeunload'
// window.addEventListener('beforeunload', function () {
//   clearTimeout(timeoutId); // Cancella eventuali timeout esistenti
//   pushPageClosedEvent('beforeunload');
//   // console.log('🐷 beforeunload');
// });

// // Listener per l'evento 'navigate'
// if (window.navigation) {
//   window.navigation.addEventListener('navigate', (event) => {
//     if (!eventPushed) { // Esegui solo se l'evento non è già stato pushato
//       timeoutId = setTimeout(() => {
//         pushPageClosedEvent('navigate');
//         eventPushed = false; // Resetta dopo l'evento per permettere nuovi push
//         // console.log('🐷 navigate');
//       }, 50); // Throttle di 50ms per evitare duplicati
//     }
//     resetEventPushedIfVirtualPageChange(event);
//   });
// }

// // Listener per l'evento 'popstate'
// window.addEventListener('popstate', function (event) {
//   if (!eventPushed) { // Esegui solo se l'evento non è già stato pushato
//     timeoutId = setTimeout(() => {
//       pushPageClosedEvent('popstate');
//       eventPushed = false; // Resetta dopo l'evento per permettere nuovi push
//       // console.log('🐷 popstate');
//     }, 50); // Throttle di 50ms per evitare duplicati
//   }
//   resetEventPushedIfVirtualPageChange(event);
// });

// // Funzione per resettare 'eventPushed' in caso di cambio pagina virtuale
// function resetEventPushedIfVirtualPageChange(event) {
//   if (isVirtualPageChange(event)) {
//     eventPushed = false;
//     console.log('Reset eventPushed: cambio pagina virtuale rilevato');
//   }
// }

// // Funzione fittizia per determinare se l'evento rappresenta un cambio pagina virtuale
// function isVirtualPageChange(event) {
//   // Aggiungi qui la logica per determinare un cambio pagina virtuale
//   // Ad esempio, verifica l'URL o l'evento state
//   return event.type === 'popstate' || (window.navigation && event.type === 'navigate');
// }
