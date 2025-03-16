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
const makeString = require('makeString');
const makeNumber = require('makeNumber');
const getQueryParameters = require('getQueryParameters');
const getContainerVersion = require('getContainerVersion');
const copyFromDataLayer = require('copyFromDataLayer');
const copyFromWindow = require('copyFromWindow'); 
const Object = require('Object');
const generateRandom = require('generateRandom');
const addEventCallback = require('addEventCallback');


// ------------------------------------------------------------------------------------------------------------------------------------------------------

const config = data.config_variable;

// External script
const script_url = (config.load_main_library_from_custom_location) ? config.custom_library_location : 'https://cdn.jsdelivr.net/gh/tommasomoretti/nameless-analytics-client-side-tracker-tag@main/nameless_analytics.js';
// const script_url = (config.load_main_library_from_custom_location) ? config.custom_library_location : 'https://cdn.jsdelivr.net/gh/tommasomoretti/nameless-analytics-client-side-tracker-tag@main/nameless_analytics.min.js';
const ua_parser_url = 'https://cdn.jsdelivr.net/npm/ua-parser-js/src/ua-parser.min.js';

const timestamp = getTimestampMillis();
const datalayer = copyFromWindow('dataLayer');
const datalayer_event_name = copyFromDataLayer('event', 2);
const datalayer_unique_event_id = copyFromDataLayer('gtm.uniqueEventId', 2);

const enable_logs = (data.disable_this_log) ? false : config.enable_logs;
const respect_consent_mode = config.respect_consent_mode;
const tracking_anonymization = config.tracking_anonymization;

const event_name = (data.event_type == 'standard') ? data.standard_event_name : data.custom_event_name;
const pv_event_name = (config.change_default_page_view_event_names) ? config.page_view_event_name : 'gtm.js';
const vpv_event_name = (config.change_default_page_view_event_names) ? config.virtual_page_view_event_name : 'gtm.historyChange';

const hostname = getUrl('host');
const referrer_hostname = getReferrerUrl('host');

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
  if(enable_logs){log('  👉 Enable cross-domain tracking:', (config.enable_cross_domain_tracking) ? 'Yes' : 'No');}
  if (config.enable_cross_domain_tracking) {
    set_cross_domain_listener(full_endpoint);
  }
  
  // Check if respect consent mode
  if(enable_logs){log('  👉 Respect consent choises? ' + ((respect_consent_mode) ? 'Yes' : 'No'));}
  
  if(respect_consent_mode){ // Respect consent mode
    if(enable_logs){log('    👉 Checking consent mode...');}
    
    // Consent denied
    if (!isConsentGranted("analytics_storage")){            
      if(enable_logs){log('      🔴 analytics_storage denied');}
      let consent_listener_called = false;
              
      // Create temporary client_id and session_id
      var temp_client_id = '';
      var temp_session_id = '';
      const temp_client_id_status = templateStorage.getItem('temp_client_id') || false;
      const temp_session_id_status = templateStorage.getItem('temp_session_id') || false;
      
      if(!temp_client_id_status) {
        temp_client_id = generate_alphanumeric();
        templateStorage.setItem('temp_client_id', temp_client_id);
      } else {
        temp_client_id = temp_client_id_status;
      }

      if(!temp_session_id_status) {
        temp_session_id = temp_client_id + '_' + generate_alphanumeric();
        templateStorage.setItem('temp_session_id', temp_session_id);
      } else {
        temp_session_id = temp_session_id_status;
      }
      
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
        if(queryPermission('access_globals', 'execute', 'send_data')) {
          callInWindow('send_data', full_endpoint, build_payload(temp_client_id, temp_session_id), data, enable_logs);
        }
      });
      
    // Consent granted  
    } else if(isConsentGranted("analytics_storage")) {
      if(enable_logs){log('      🟢 analytics_storage granted');}
      
      // Send requests
      if(queryPermission('access_globals', 'execute', 'send_data')) {
        callInWindow('send_data', full_endpoint, build_payload(), data, enable_logs);
      }
    }
  } else { // Do not respect consent mode

    // Server side user_id, client_id, session_id and user_id anonimization. Only if respect_consent_mode = No
      if(enable_logs){log('    👉 Tracking anonimization:', (tracking_anonymization) ? 'Enabled' : 'Disabled');}
    
    // Send requests
    if(queryPermission('access_globals', 'execute', 'send_data')) {
      callInWindow('send_data', full_endpoint, build_payload(), data, enable_logs);
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
      callInWindow('set_cross_domain_listener', full_endpoint, domains, respect_consent_mode, config.enable_logs);
      templateStorage.setItem('cross_domain_listener', true);

      if(enable_logs){log('    👉 Cross-domain enabled for this domains:', domains.join(', '));}
    }
  }
}


// ------------------------------------------------------------------------------------------------------------------------------------------------------


// Build the payload
function build_payload(temp_client_id, temp_session_id){  
  // Save event info in template storage
  const event_storage_name = '_nameless_analytics';
  const current_event_storage_value = JSON.parse(templateStorage.getItem(event_storage_name));

  set_event_data_in_template_storage(event_storage_name, current_event_storage_value);
  
  const updated_event_storage_value = JSON.parse(templateStorage.getItem(event_storage_name));
      
  const payload = {};
  if(temp_client_id){payload.temp_client_id = temp_client_id;}
  if(temp_session_id){payload.temp_session_id = temp_session_id;}
  payload.event_name = event_name;
  payload.user_id = config.user_id;
  payload.event_timestamp = timestamp;
  payload.event_origin = 'Website';

  const event_info = updated_event_storage_value.pop();
  
  // Add all dataLayer data
  if(config.add_all_data_from_dataLayer){
    // Ensure dataLayer has only events until current event  
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
  } else {
    payload.datalayer = null;
  }

  // Add event data from dataLayer
  if(data.add_parameters_from_dataLayer){
    const current_event_pushes = datalayer.filter(item => item.event === datalayer_event_name);
    const last_current_event_push = current_event_pushes.length > 0 ? current_event_pushes[current_event_pushes.length - 1] : null;
    
    for (var key of Object.keys(last_current_event_push)) {
      if (key != 'event' && key != 'gtm.start' && key != 'gtm.uniqueEventId' && key != 'page_id' && key != 'event_id') {
        event_info[key] = last_current_event_push[key];
      } 
    }
  } 
  
  // Add event data from configuration variable
  if(config.add_common_event_params){
  const config_event_params = config.common_event_params;
    if(config_event_params != undefined){
      for (let i = 0; i < config_event_params.length; i++) {
        const param_name = config_event_params[i].param_name;
        const param_value = config_event_params[i].param_value;
        
        if (param_name !== 'event_id' && param_name !== 'page_id') {
          event_info[param_name] = param_value;
        }
      }
    }
  }

  // Add event data from tag fields
  if (data.add_parameters) {
    const event_params = data.add_event_params;
    
    if (event_params !== undefined) {
      for (let i = 0; i < event_params.length; i++) {
        const param_name = event_params[i].param_name;
        const param_value = event_params[i].param_value;
        
        if (param_name !== 'event_id' && param_name !== 'page_id') {
          event_info[param_name] = param_value;
        }
      }
    }
  }
  
  // Add consent data
  const consent_info = {
    respect_consent_mode: (respect_consent_mode) ? 'Yes' : 'No',
    tracking_anonimization: (respect_consent_mode)? null : ((tracking_anonymization) ? 'Yes' : 'No'),
    consent_type: (queryPermission('access_globals', 'execute', 'get_last_consent_values')) ? ((callInWindow('get_last_consent_values').consent_type == 'default') ? 'Default' : 'Update') : null,
    ad_user_data: (isConsentGranted('ad_user_data')) ? 'Granted' : 'Denied',
    ad_personalization: (isConsentGranted('ad_personalization'))? 'Granted' : 'Denied',
    ad_storage: (isConsentGranted("ad_storage"))? 'Granted' : 'Denied',
    analytics_storage: (isConsentGranted("analytics_storage"))? 'Granted' : 'Denied',
    functionality_storage: (isConsentGranted("functionality_storage"))? 'Granted' : 'Denied',
    personalization_storage: (isConsentGranted("personalization_storage"))? 'Granted' : 'Denied',
    security_storage: (isConsentGranted("security_storage"))? 'Granted' : 'Denied'
  };

  payload.event_data = event_info;
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
      cross_domain_id: cross_domain_id
    }];
        
    templateStorage.setItem(storage_name, JSON.stringify(event_info));
  } else if (!storage_value) {
    if(enable_logs){log('🔴 This event is been fired before a page view event. The first event ever must be a page view. Request aborted.');}
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
      cross_domain_id: cross_domain_id
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