// Nameless analytics CS tracker tag

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
const generateRandom = require('generateRandom');
const makeString = require('makeString');
const getQueryParameters = require('getQueryParameters');
const getContainerVersion = require('getContainerVersion');
const copyFromDataLayer = require('copyFromDataLayer');


const timestamp = getTimestampMillis();

const config = data.config_variable;

const dl_event_name = copyFromDataLayer('event', 2);
const pv_event_name = 'gtm.js'; // Change this if you do not trigger pv on All Pages (gtm.js)
const vpv_event_name = 'gtm.historyChange'; // Change this if your site not use history.pushState or history.replaceState

const script_url = 'https://cdn.jsdelivr.net/gh/tommasomoretti/nameless-analytics-client-tag@main/nameless_analytics.js';
const ua_parser_url = 'https://cdn.jsdelivr.net/npm/ua-parser-js/src/ua-parser.min.js';

const hostname = getUrl('host');
const referrer_hostname = getReferrerUrl('host');

const utm_source = getQueryParameters('utm_source');
const utm_campaign = getQueryParameters('utm_campaign');
const utm_id = getQueryParameters('utm_id');
const utm_term = getQueryParameters('utm_term');
const utm_content = getQueryParameters('utm_content');

const gclid = getQueryParameters('gclid');
const dclid = getQueryParameters('dclid');
const gclsrc = getQueryParameters('gclsrc');
const wbraid = getQueryParameters('wbraid');
const gbraid = getQueryParameters('gbraid');

const cross_domain_id = getQueryParameters('na_id');

const source = (referrer_hostname == hostname) ? null : ((utm_source) ? utm_source : ((referrer_hostname == '') ? 'direct' : referrer_hostname));
const campaign = utm_campaign || gclid || dclid || gclsrc || wbraid || gbraid || null;
const campaign_id = utm_id || null;
const campaign_term = utm_term || null;
const campaign_content = utm_content || null;


if(config.enable_logs){log('NAMELESS ANALYTICS');}

// Load external libraries
// Inject UA Parser JS
if(config.enable_logs){log('LOADING LIBRARIES...');}
if (queryPermission('inject_script', ua_parser_url)) {
  injectScript(
    ua_parser_url, 
    () => { //Injection succeed 
      if(config.enable_logs){log('  🟢 UA parser script loaded.');}

      // Inject main script
      if (queryPermission('inject_script', script_url)) {
        injectScript(
          script_url,
          () => { // Injection succeed      
            if(config.enable_logs){log('  🟢 Main script loaded.');}
            
            const endpoint_domain_name = config.endpoint_domain_name;
            if(config.enable_logs){log('TAG CONFIGURATION');}
            if(config.enable_logs){log('  👉 Endpoint hostname:', endpoint_domain_name);}
            
            const endpoint_path = config.endpoint_path;
            if(config.enable_logs){log('  👉 Endpoint path:', endpoint_path);}
            const full_endpoint = 'https://' + endpoint_domain_name + "/" + endpoint_path;
                  
            send_request(full_endpoint);    
          },
          () => { // External script not loaded
            if(config.enable_logs){log('  🔴 Main script not loaded');}
            data.gtmOnFailure();
          }, script_url // cache the external js
        );
      } else { // Incorrect script path
        if(config.enable_logs){log('  🔴 Main script, incorrect path');}
        data.gtmOnFailure();
      }
    },
    () => { // External script not loaded
      if(config.enable_logs){log('    🔴 UA parser script not loaded');}
      data.gtmOnFailure();
    }, ua_parser_url // cache the external js
  );
} else { // Incorrect script path
  if(config.enable_logs){log('    🔴 UA parser script, incorrect path');}
  data.gtmOnFailure();
} 


// set cross-domain listener
function set_cross_domain_listener(full_endpoint) {
  if (config.enable_cross_domain_tracking) {
    var cross_domain_listener_status = templateStorage.getItem('cross_domain_listener') || false;
    const domains = config.cross_domain_domains.map(obj => obj.domain);
    if(config.enable_logs){log('  👉 Cross-domain enabled for this domains: ', domains);}
    
    if (!cross_domain_listener_status) {
      if(queryPermission('access_globals', 'execute', 'set_cross_domain_listener')) {
        callInWindow('set_cross_domain_listener', full_endpoint, domains);
        templateStorage.setItem('cross_domain_listener', true);
      }
    }
  } else {
    if(config.enable_logs){log('  👉 Cross-domain disabled.');}
  }
}


// Send request
function send_request(full_endpoint){
  if(queryPermission('access_globals', 'execute', 'set_cross_domain_listener')) {
    set_cross_domain_listener(full_endpoint);
  }
  
  log('RESPECT CONSENT CHOISES? ' + ((config.respect_consent_mode) ? 'Yes' : 'No'));
  // Respect consent mode
  if(config.respect_consent_mode){
    if(config.enable_logs){log('  Checking consent mode...');}
    // Consent denied
    if (!isConsentGranted("analytics_storage")){            
      if(config.enable_logs){log('    🔴 analytics_storage denied or not already extressed.');}
      let was_called = false;
      
      addConsentListener("analytics_storage", (consent_type, consent_status) => {
        // Listener added and consent changed from granted to denied  
        if (was_called || !consent_status) {
          return;
        }
        
        was_called = true;        
        if(queryPermission('access_globals', 'execute', 'send_data')) {
          if(config.enable_logs){log('    🟢 analytics_storage granted');}
          callInWindow('send_data', full_endpoint, build_payload(), data);
        }
        
      });
    // Consent granted  
    } else if(isConsentGranted("analytics_storage")) {
      if(queryPermission('access_globals', 'execute', 'send_data')) {
        if(config.enable_logs){log('    🟢 analytics_storage granted');}
        callInWindow('send_data', full_endpoint, build_payload(), data);
      }
    }
  } else {
     // Do not respect consent mode
    if(queryPermission('access_globals', 'execute', 'send_data')) {
      callInWindow('send_data', full_endpoint, build_payload(), data);
    }
  }
}


// Build the payload
function build_payload(){
  // Save event info in template storage
  const event_storage_name = '_nameless_analytics';
  const event_storage_value = JSON.parse(templateStorage.getItem(event_storage_name));
  set_event_info_in_storage(event_storage_name, event_storage_value);
  const update_event_storage_value = JSON.parse(templateStorage.getItem(event_storage_name)); 
    
  const payload = {};
  payload.event_name = data.event_name;
  payload.event_timestamp = timestamp;
  
  // Event info
  const event_info = update_event_storage_value.pop(); // Last event info
  
  const config_event_params = config.common_event_params;
  if(config_event_params != undefined){
    for (let i = 0; i < config_event_params.length; i++) {
      const name = config_event_params[i].param_name;
      const value = config_event_params[i].param_value;
      event_info[name] = value;
    } 
  }
  
  const event_params = data.event_params;
  if (event_params != undefined) {
    for (let i = 0; i < event_params.length; i++) {
      const name = event_params[i].param_name;
      const value = event_params[i].param_value;
      event_info[name] = value;
    }
  }
  
  
  // Consent info
  const consent_info = {
    // ad_user_data: isConsentGranted("ad_user_data"),
    // ad_personalization: isConsentGranted("ad_personalization"),
    ad_storage: isConsentGranted("ad_storage"),
    analytics_storage: isConsentGranted("analytics_storage"),
    functionality_storage: isConsentGranted("functionality_storage"),
    personalization_storage: isConsentGranted("personalization_storage"),
    security_storage: isConsentGranted("security_storage")
  };

  
  // Build the payload
  payload.event_data = event_info;
  payload.consent_data = consent_info;
  
  return payload;
}


// Save event info in template storage
function set_event_info_in_storage(storage_name, storage_value) {
  const channel_grouping = callInWindow('get_channel_grouping', referrer_hostname, source, campaign);
    
  if (dl_event_name == pv_event_name || dl_event_name == vpv_event_name) {
    const page_id = makeString(generateRandom(1000000000, 9999999999));
    const event_id = page_id + "_" + makeString(generateRandom(1000000000, 9999999999));
    
    const event_info = [{
      event_id: event_id,
      event_type: (dl_event_name == pv_event_name) ? 'page_view' : 'virtual_page_view',
      channel_grouping: channel_grouping,
      source: source,
      campaign: campaign,
      campaign_id: campaign_id,
      campaign_term: campaign_term,
      campaign_content: campaign_content,
      page_id: page_id,
      page_title: readTitle(),
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
  } else {
    const current_event_info = storage_value.pop(); // Last event info in template storage
    const full_page_id = current_event_info.page_id;
    const event_id = full_page_id + "_" + makeString(generateRandom(1000000000, 9999999999));
    
    log('  You are in the same page');
    log('  Event id: ' + event_id);
    
    const event_info = {
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
      page_hostname: hostname,
      page_location: getUrl('path'),
      page_fragment: getUrl('fragment') || null,
      page_query: getUrl('query') || null,
      page_extension: getUrl('extension') || null,
      page_referrer: (getReferrerUrl() == '') ? null : getReferrerUrl(),     
      cs_container_id: getContainerVersion().containerId,
      cross_domain_id: cross_domain_id
    };
    
    storage_value.push(event_info);
    
    templateStorage.setItem(storage_name, JSON.stringify(storage_value));
  }
}
