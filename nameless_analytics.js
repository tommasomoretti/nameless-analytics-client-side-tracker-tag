// Send hits
function send_data(full_endpoint, payload, data) {
  const timestamp = payload.event_timestamp
  payload.event_date = format_datetime(timestamp).split("T")[0]
  payload.event_data.browser_name = parse_user_agent().browser.name,
  payload.event_data.browser_language = parse_user_agent().browser.language,
  payload.event_data.browser_version = parse_user_agent().browser.version,
  payload.event_data.device_type = parse_user_agent().device.type || "desktop",
  payload.event_data.device_vendor = parse_user_agent().device.vendor,
  payload.event_data.device_model = parse_user_agent().device.model,
  payload.event_data.os_name = parse_user_agent().os.name,
  payload.event_data.os_version = parse_user_agent().os.version,
  payload.event_data.screen_size = window.screen.width + "x" + window.screen.height
  payload.event_data.wiewport_size = window.innerWidth + "x" + window.innerHeight

  if(data.config_variable.enable_logs){console.log('SENDING REQUEST...')} 
  
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
  .catch((error) => {
    if(data.config_variable.enable_logs){console.log(error)}
    return data.gtmOnFailure()
  })
}


//----------------------------------------------------------------------------------------------------------------------------------------------------


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


//----------------------------------------------------------------------------------------------------------------------------------------------------


// Parse user agent
function parse_user_agent() {
  var uap = new UAParser()
  var uap_res = uap.getResult()
  
  uap_res.browser.language = navigator.language  
  return uap_res
}


//----------------------------------------------------------------------------------------------------------------------------------------------------


// Channel grouping
function get_channel_grouping(source, campaign) {
  const organic_search_source = new RegExp('google|bing|yahoo|baidu|yandex|duckduckgo|ask|aol|ecosia')
  const social_source = new RegExp('facebook|messenger|instagram|tiktok|t\.co|twitter|linkedin|pinterest|youtube|whatsapp|wechat')
  const email_source = new RegExp('email|e-mail|e_mail|e mail')
    
  if (source == null) {
    return null
  } else if (source == 'direct' && campaign == null) {
    return 'direct'
  } else if (source == 'tagassistant.google.com'){
    return 'gtm_debugger'
  } else if (organic_search_source.test(source) && campaign == null) {
    return 'organic_search'
  } else if (organic_search_source.test(source) && campaign !== null) {
    return 'paid_search'
  } else if (social_source.test(source) && campaign == null) {
    return 'organic_social'
  } else if (social_source.test(source) && campaign != null) {
    return 'paid_social'
  } else if (email_source.test(source) && campaign != null) {
    return 'email'
  } else if (source != null && campaign == null) {
    return 'referral'
  } else if (source != null && campaign != null) {
    return 'affiliate'
  } else {
    return 'undefined'
  }
}


//----------------------------------------------------------------------------------------------------------------------------------------------------


// Cross-domain
function set_cross_domain_listener(full_endpoint, cross_domain_domains) {
  const saved_full_endpoint = full_endpoint;
  const saved_cross_domain_domains = cross_domain_domains;

  let listener = async function(event) {
    var target = event.target.closest('a');  // Utilizza closest per trovare il link più vicino
    if (target && target.getAttribute("href")) {
      event.preventDefault();

      var originalHref = target.getAttribute("href");  // Mantieni il valore originale del link
      var link_url = new URL(originalHref);
      var link_hostname = link_url.hostname

      const domain_matches = saved_cross_domain_domains.some(domain => link_hostname === domain || link_hostname.endsWith(`.${domain}`));
      const is_self = link_hostname.includes(window.location.hostname)

      console.log('CROSS-DOMAIN DATA')
      console.log(' Clicked hostname: ' + link_hostname)
      console.log(' Is self? ' + is_self)
      console.log(' Is allowed? ' + domain_matches)
      console.log(' Analytics storage value: ' + get_consent_value(window.dataLayer))

      if (domain_matches && !is_self && get_consent_value(window.dataLayer)) {
        console.log('  Cross domain ok')
        
        const session_id = await get_session_id(saved_full_endpoint, {event_name: 'get_user_data'});
        if (!session_id) {return;}
        else if(session_id && session_id != 'undefined_undefined'){
          link_url.searchParams.set('na_id', session_id);
        }
      } else (
        console.log('  Cross-domain not needed')
      )

      const updatedHref = link_url.toString();

      if (target.getAttribute("target") === "_blank") {
        window.open(updatedHref, '_blank', target.getAttribute("rel") ? 'noopener' : '');
        console.log('    Redirect to: ' + updatedHref)
      } else {
        location.href = updatedHref;
        console.log('    Redirect to: ' + updatedHref)
      }
    }
  };
  document.addEventListener('click', listener);
}

function get_consent_value(dataLayer) {
  let consent_values = {
    // ad_personalization: null,
    // ad_storage: null,
    // ad_user_data: null,
    analytics_storage: null,
    // functionality_storage: null,
    // personalization_storage: null,
    // security_storage: null
  }
  for (let i = dataLayer.length - 1; i >= 0; i--) {
    const item = dataLayer[i];
    if (item[0] === "consent" && (item[1] === "default" || item[1] === "update")) {
      const consent_data = item[2];
      if (consent_data) {
        // consent_values.ad_personalization = consentData.ad_personalization !== undefined ? consentData.ad_personalization : consentValues.ad_personalization;
        // consent_values.ad_storage = consentData.ad_storage !== undefined ? consentData.ad_storage : consentValues.ad_storage;
        // consent_values.ad_user_data = consentData.ad_user_data !== undefined ? consentData.ad_user_data : consentValues.ad_user_data;
        consent_values.analytics_storage = consent_data.analytics_storage !== undefined ? consent_data.analytics_storage : consent_values.analytics_storage;
        // consent_values.functionality_storage = consentData.functionality_storage !== undefined ? consentData.functionality_storage : consentValues.functionality_storage;
        // consent_values.personalization_storage = consentData.personalization_storage !== undefined ? consentData.personalization_storage : consentValues.personalization_storage;
        // consent_values.security_storage = consentData.security_storage !== undefined ? consentData.security_storage : consentValues.security_storage;

        break;
      }
    }
  }
  if (consent_values.analytics_storage === 'granted') {
    return true;
  } else {
    return false
  }
}

async function get_session_id(saved_full_endpoint, payload) {
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
      console.log('    Current session_id: ' + response_json.data.session_id)
      return response_json.data.session_id;
    } else {
      console.error('    Error: ', response_json.message);
      return "";
    }
  } catch (error) {
    console.error('    Error during fetch session_id: ', error);
    return "";
  }
}
