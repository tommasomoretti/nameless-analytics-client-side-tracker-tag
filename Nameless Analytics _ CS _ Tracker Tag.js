const log = require('logToConsole');
const getTimestampMillis = require('getTimestampMillis');
const queryPermission = require('queryPermission');
const injectScript = require('injectScript');
const callInWindow = require('callInWindow');
const getUrl = require('getUrl');
const readTitle = require('readTitle');
const getReferrerUrl = require('getReferrerUrl');
const isConsentGranted = require('isConsentGranted');
const addConsentListener = require('addConsentListener');
const templateStorage = require('templateStorage');
const JSON = require('JSON');
const getQueryParameters = require('getQueryParameters');
const getContainerVersion = require('getContainerVersion');
const copyFromDataLayer = require('copyFromDataLayer');
const copyFromWindow = require('copyFromWindow'); 
const Object = require('Object');
const generateRandom = require('generateRandom');

// ------------------------------------------------------------------------------------------------------------------------------------------------------

const config = data.config_variable;

const hostname = getUrl('host');
const referrer_hostname = getReferrerUrl('host');

// External scripts
const library_path = 'https://' + hostname + config.custom_library_location;
const script_url = (config.load_main_library_from_custom_location) ? library_path + '/nameless_analytics.min.js' : 'https://cdn.jsdelivr.net/gh/tommasomoretti/nameless-analytics-client-side-tracker-tag@main/nameless_analytics.js';
const ua_parser_url = (config.load_main_library_from_custom_location) ? library_path + '/ua-parser.min.js' : 'https://cdn.jsdelivr.net/npm/ua-parser-js/src/ua-parser.min.js';

const timestamp = getTimestampMillis();
const datalayer = copyFromWindow('dataLayer');
const datalayer_event_name = copyFromDataLayer('event', 2);
const datalayer_unique_event_id = copyFromDataLayer('gtm.uniqueEventId', 2);

// Logs
let enable_logs = false;

if (config.enable_logs) {
  if (config.enable_logs_debug_mode_only) {
    enable_logs = getContainerVersion().debugMode === true;
  } else {
    enable_logs = true;
  }

  if (enable_logs && data.disable_this_log) {
    enable_logs = false;
  }
}

const respect_consent_mode = config.respect_consent_mode;

const event_name = (data.event_type == 'standard') ? data.standard_event_name : data.custom_event_name;
const pv_event_name = (config.change_default_page_view_event_name) ? config.page_view_event_name : 'gtm.js';
const vpv_event_name = (config.change_default_virtual_page_view_event_name) ? config.virtual_page_view_event_name : 'gtm.historyChange';

const utm_source = (config.set_custom_utm_parameters_names) ? getQueryParameters(config.custom_source_name) : getQueryParameters('utm_source');
const utm_campaign = (config.set_custom_utm_parameters_names) ? getQueryParameters(config.custom_campaign_name) : getQueryParameters('utm_campaign');
const utm_id = (config.set_custom_utm_parameters_names) ? getQueryParameters(config.custom_id_name) : getQueryParameters('utm_id');
const utm_term = (config.set_custom_utm_parameters_names) ? getQueryParameters(config.custom_term_name) : getQueryParameters('utm_term');
const utm_content = (config.set_custom_utm_parameters_names) ? getQueryParameters(config.custom_content_name) : getQueryParameters('utm_content');

// const gclid = getQueryParameters('gclid'); // Google
// const dclid = getQueryParameters('dclid'); // Google
// const gclsrc = getQueryParameters('gclsrc'); // Google
// const wbraid = getQueryParameters('wbraid'); // Google
// const gbraid = getQueryParameters('gbraid'); // Google
// const msclkid = getQueryParameters('msclkid'); // Bing
// const fbclid = getQueryParameters('fbclid'); // Facebook 
// const ttclid = getQueryParameters('ttclid'); // TikTok 
// const twclid = getQueryParameters('twclid'); // X
// const _pin_click_id = getQueryParameters('_pin_click_id'); // Pinterest
// const li_fat_id = getQueryParameters('li_fat_id'); // Linkedin

const source = (referrer_hostname == hostname) ? null : ((utm_source) ? utm_source : ((referrer_hostname == '') ? 'direct' : referrer_hostname));
const campaign = utm_campaign || null;
// const campaign = utm_campaign || gclid || dclid || gclsrc || wbraid || gbraid || msclkid || fbclid || ttclid || twclid || _pin_click_id || li_fat_id || null;
const campaign_id = utm_id || null;
const campaign_term = utm_term || null;
const campaign_content = utm_content || null;

const alphanumeric_page_id = generate_alphanumeric();
const alphanumeric_event_id = generate_alphanumeric();
const cross_domain_id = getQueryParameters('na_id');

if(enable_logs){log('NAMELESS ANALYTICS');}
if(enable_logs){log('TRACKER TAG CONFIGURATION');}

if(!config.is_na_config_variable){
  if(enable_logs){log('  🔴 Tracker configuration error:', event_name, 'event has invalid Nameless Analytics Client-Side tracker configuration variable.');}
  data.gtmOnFailure();
  return;
}

// Load external libraries
if (queryPermission('inject_script', ua_parser_url)) {
  injectScript(
    ua_parser_url, 
    () => { //Injection succeed
        
      // Inject main script
      if (queryPermission('inject_script', script_url)) {
        injectScript(
          script_url,
          () => { // Injection succeed
            
            const endpoint_domain_name = config.endpoint_domain_name;            
            const endpoint_path = config.endpoint_path;
            const full_endpoint = 'https://' + endpoint_domain_name + endpoint_path;
            
            send_request(full_endpoint);  
          },
          () => { // External script not loaded
            if(enable_logs){log('  🔴 Main script not loaded');}
            data.gtmOnFailure();
          }, script_url // cache the external js
        );
      } else { // Incorrect script path
        if(enable_logs){log('  🔴 Main script, incorrect path');}
        data.gtmOnFailure();
      }
    },
    () => { // External script not loaded
      if(enable_logs){log('    🔴 UA parser script not loaded');}
      data.gtmOnFailure();
    }, ua_parser_url // cache the external js
  );
} else { // Incorrect script path
  if(enable_logs){log('    🔴 UA parser script, incorrect path');}
  data.gtmOnFailure();
} 


// ------------------------------------------------------------------------------------------------------------------------------------------------------


// Send request
function send_request(full_endpoint){
  // Enable cross-domain
  if(enable_logs){log('  👉 Enable cross-domain tracking?', (config.enable_cross_domain_tracking) ? 'Yes' : 'No');}
  if (config.enable_cross_domain_tracking) {
    set_cross_domain_listener(full_endpoint);
  }
  
  // Check if respect consent mode
  if(enable_logs){log('  👉 Respect consent choises? ' + ((respect_consent_mode) ? 'Yes' : 'No'));}
  
  // Respect consent mode
  if(respect_consent_mode){
    if(enable_logs){log('    👉 Checking consent mode...');}
    
    const consent_type = callInWindow('get_last_consent_values').consent_type;
    
    // Check if consent mode is present
    if(consent_type == 'Consent mode not present'){
      if(enable_logs){log('      🔴 Consent mode not present. Request aborted.');}
      data.gtmOnSuccess();
    } else if (consent_type == 'Default' || consent_type == 'Update') {
      // Consent denied
      if (!isConsentGranted("analytics_storage")){            
        if(enable_logs){log('      🔴 analytics_storage denied');}
        
        var consent_listener_called = false;
        
        // Add consent listener
        addConsentListener("analytics_storage", (consent_type, consent_status) => {        
          // When consent is denied  
          if (consent_listener_called || !consent_status) {
            return; 
          }
  
          // When consent is granted
          consent_listener_called = true;
                  
          if(enable_logs){log('      🟢 analytics_storage granted');}
          
          // Send pending requests when consent is granted
          if(queryPermission('access_globals', 'execute', 'send_queued_requests')) {
            callInWindow('send_queued_requests', full_endpoint, build_payload(), data, enable_logs, config.add_page_status_code);
          }
        });
        
      // Consent granted  
      } else if(isConsentGranted("analytics_storage")) {
        if(enable_logs){log('      🟢 analytics_storage granted');}
              
        // Send requests
        if(queryPermission('access_globals', 'execute', 'send_queued_requests')) {
          callInWindow('send_queued_requests', full_endpoint, build_payload(), data, enable_logs, config.add_page_status_code);
        }
      }
    }
    
  // Do not respect consent mode
  } else {   
    // Send requests
    if(queryPermission('access_globals', 'execute', 'send_queued_requests')) {
      callInWindow('send_queued_requests', full_endpoint, build_payload(), data, enable_logs, config.add_page_status_code);
    }
  }
}


// ------------------------------------------------------------------------------------------------------------------------------------------------------


// Set cross-domain listener
function set_cross_domain_listener(full_endpoint) {
  var cross_domain_listener_status = templateStorage.getItem('cross_domain_listener') || false;
  const domains = config.cross_domain_domains.map(obj => obj.domain);
  
  if (!cross_domain_listener_status) {
    if(queryPermission('access_globals', 'execute', 'set_cross_domain_listener')) {
      callInWindow('set_cross_domain_listener', full_endpoint, domains, respect_consent_mode, enable_logs);
      templateStorage.setItem('cross_domain_listener', true);

      if(enable_logs){log('    👉 Cross-domain enabled for this domains:', domains.join(', '));}
    }
  }
}


// ------------------------------------------------------------------------------------------------------------------------------------------------------


// Build the payload
function build_payload(){  
  // Save event info in template storage
  const event_storage_name = '_nameless_analytics';
  const current_event_storage_value = JSON.parse(templateStorage.getItem(event_storage_name));

  set_event_data_in_template_storage(event_storage_name, current_event_storage_value);
  
  const updated_event_storage_value = JSON.parse(templateStorage.getItem(event_storage_name));

  const user_info = {};
  const session_info = {};
  const event_info = updated_event_storage_value.pop();
        
  const payload = {};
    
  payload.event_name = event_name;
  payload.event_id = event_info.event_id;
  Object.delete(event_info, 'event_id');
    
  payload.event_timestamp = timestamp;
  payload.event_origin = 'Website';
  
  
  // DATALAYER DATA
  // Add current dataLayer state (configuration variable)
  if(config.add_current_datalayer_state){
    let datalayer_def = [];
    let found = false;
  
    for (let item of datalayer) {
      if (found) break;
      if (typeof item === "object" && item["gtm.uniqueEventId"] === datalayer_unique_event_id) {
        found = true;
      }
      datalayer_def.push(item);
    }
    payload.datalayer = datalayer_def;
  }
  
  
  // ECOMMERCE DATA
  // Add ecommerce data from dataLayer or custom variable
  if(data.add_ecommerce) {
    if(data.ecommerce_method == 'from_datalayer'){
      payload.ecommerce = copyFromDataLayer('ecommerce', 2);
    } else {
      payload.ecommerce = data.ecommerce_custom_variable || null;
    }
  }
  
  
  // USER DATA
  // Add user id (configuration variable)
  if(config.add_user_id){user_info.user_id = config.user_id;}
  
  // Add user parameters (configuration variable)
  if(config.add_user_params){
    const config_user_params = config.user_params;
    
    if(config_user_params != undefined){
      for (let i = 0; i < config_user_params.length; i++) {
        const param_name = config_user_params[i].param_name;
        const param_value = config_user_params[i].param_value;
        
        user_info[param_name] = param_value;
      }
    }
  }
  
  // Add user info to payload
  payload.user_data = user_info;

  
  // SESSION DATA
  // Add session parameters (configuration variable)
  if(config.add_session_params){
    const config_session_params = config.session_params;
    
    if(config_session_params != undefined){
      for (let i = 0; i < config_session_params.length; i++) {
        const param_name = config_session_params[i].param_name;
        const param_value = config_session_params[i].param_value;
        
        session_info[param_name] = param_value;
      }
    }
  }
  
  // Add session info to payload
  payload.session_data = session_info;
  
  
  // EVENT DATA
  // Add event parameters from dataLayer (tag fields)
  if(data.add_parameters_from_dataLayer){
    const current_event_pushes = datalayer.filter(item => item.event === datalayer_event_name);
    const last_current_event_push = current_event_pushes.length > 0 ? current_event_pushes[current_event_pushes.length - 1] : null;
    
    for (var key of Object.keys(last_current_event_push)) {
      if (key != 'event' && key != 'gtm.start' && key != 'gtm.uniqueEventId' && key != 'event_id' && key != 'page_id' && key != 'source' && key != 'campaign' && key != 'campaign_id' && key != 'campaign_term' && key != 'campaign_content' && key != 'ecommerce') {
        event_info[key] = last_current_event_push[key];
      }
    }
  } 
  
  // Add common event parameters (configuration variable)
  if(config.add_common_event_params){
    const config_event_params = config.common_event_params;
    
    if(config_event_params != undefined){
      for (let i = 0; i < config_event_params.length; i++) {
        const param_name = config_event_params[i].param_name;
        const param_value = config_event_params[i].param_value;
        
        event_info[param_name] = param_value;
      } 
   }
  }
  

  // PAGE DATA
  // Add page category (configuration variable)
    event_info.page_category = config.page_category;
  
  // Add page data if virtual page view event name != gtm.historyChange
  if (config.page_title != undefined && config.page_location != undefined) {
    event_info.page_title = config.page_title;
    event_info.page_location = config.page_location;
    event_info.page_fragment = config.page_fragment;
    event_info.page_query = config.page_query;
    event_info.page_extension = config.page_extension;
  }
     
  
  // Add event parameters (tag fields)
  if (data.add_parameters) {
    const event_params = data.add_event_params;
    
    if (event_params !== undefined) {
      for (let i = 0; i < event_params.length; i++) {
        const param_name = event_params[i].param_name;
        const param_value = event_params[i].param_value;
        
        event_info[param_name] = param_value;
      }
    }
  }
  
  // Remove event data (tag fields)
  if (data.remove_parameters) {
    const event_params = data.remove_event_params;
    
    if (event_params !== undefined) {
      for (let i = 0; i < event_params.length; i++) {
        const param_name = event_params[i].param_name;
        
        Object.delete(event_info.event_data, param_name);
      }
    }
  } 
  
  // Add event info to payload
  payload.event_data = event_info;
  
  
  // CONSENT DATA
  // Add consent data
  const consents = callInWindow('get_last_consent_values');
  
  const consent_info = {
    consent_type: consents.consent_type,
    respect_consent_mode: (respect_consent_mode) ? 'Yes' : 'No',
    ad_user_data: (consents.ad_user_data) ? 'Granted' : ((consents.ad_user_data == null) ? null : 'Denied'),
    ad_personalization: (consents.ad_personalization) ? 'Granted' : ((consents.ad_personalization == null) ? null : 'Denied'),
    ad_storage: (consents.ad_storage) ? 'Granted' : ((consents.ad_storage == null) ? null : 'Denied'),
    analytics_storage: (consents.analytics_storage) ? 'Granted' : ((consents.analytics_storage == null) ? null : 'Denied'),
    functionality_storage: (consents.functionality_storage) ? 'Granted' : ((consents.functionality_storage == null) ? null : 'Denied'),
    personalization_storage: (consents.personalization_storage) ? 'Granted' : ((consents.personalization_storage == null) ? null : 'Denied'),
    security_storage: (consents.security_storage) ? 'Granted' : ((consents.security_storage == null) ? null : 'Denied')
  };
  
  // Add consent info to payload
  payload.consent_data = consent_info;
  
  return payload;
}


// ------------------------------------------------------------------------------------------------------------------------------------------------------


// Save event info in template storage
function set_event_data_in_template_storage(storage_name, storage_value) {
  const channel_grouping = (queryPermission('access_globals', 'execute', 'get_channel_grouping')) ? callInWindow('get_channel_grouping', source, campaign): null;
    
  if (datalayer_event_name == pv_event_name || datalayer_event_name == vpv_event_name) {  
    const page_id = alphanumeric_page_id;
    const event_id = page_id + "_" + alphanumeric_event_id;
  
    const event_info = [{
      event_id: event_id,
      event_type: (datalayer_event_name == pv_event_name) ? 'page_view' : 'virtual_page_view',
      channel_grouping: channel_grouping,
      source: source,
      campaign: campaign,
      campaign_id: campaign_id,
      campaign_term: campaign_term,
      campaign_content: campaign_content,
      page_id: page_id,
      page_title: readTitle(),
      page_hostname_protocol: getUrl('protocol'),
      page_hostname: hostname,
      page_location: getUrl('path'),
      page_fragment: getUrl('fragment') || null,
      page_query: getUrl('query') || null,
      page_extension: getUrl('extension') || null,
      page_referrer: (getReferrerUrl() == '') ? null : getReferrerUrl(),
      cs_container_id: getContainerVersion().containerId,
      cross_domain_id: (datalayer_event_name == pv_event_name) ? cross_domain_id : null
    }];
        
    templateStorage.setItem(storage_name, JSON.stringify(event_info));
  } else if (!storage_value) {
    if (event_name == 'page_view') {
      if(enable_logs){log('🔴 Page view fired on wrong event. Change default JavaScript page view event names in Nameless Analytics Client-Side tracker configuration variable. Request aborted.');}   
    } else {
      if(enable_logs){log('🔴', event_name, 'fired before a page view event. The first event on a page view ever must be page_view. Request aborted.');}
    }
    data.gtmOnSuccess();
  } else {
    const current_event_info = storage_value.pop();
    const full_page_id = current_event_info.page_id;
    const event_id = full_page_id + "_" + alphanumeric_event_id;
    
    const event_info = [{
      event_id: event_id,
      event_type: 'event',
      channel_grouping: channel_grouping,
      source: source,
      campaign: campaign,
      campaign_id: campaign_id,
      campaign_term: campaign_term,
      campaign_content: campaign_content,
      page_id: full_page_id,
      page_title: readTitle(),
      page_hostname_protocol: getUrl('protocol'),
      page_hostname: hostname,
      page_location: getUrl('path'),
      page_fragment: getUrl('fragment') || null,
      page_query: getUrl('query') || null,
      page_extension: getUrl('extension') || null,
      page_referrer: (getReferrerUrl() == '') ? null : getReferrerUrl(),     
      cs_container_id: getContainerVersion().containerId,
    }];
        
    templateStorage.setItem(storage_name, JSON.stringify(event_info));
  }
}

// Generate random alphanumeric ID 
function generate_alphanumeric() {
  var max_length = 15;
  var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var alphanumeric_id = '';
  for (var i = 0; i < max_length; i++) {
    alphanumeric_id += chars.charAt(generateRandom(0, chars.length));
  }
  return alphanumeric_id;
}