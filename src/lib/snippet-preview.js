import { cdnTagsHtml } from '@/lib/snippet-exporters';

// Injected into every preview srcdoc — intercepts console.* and window errors,
// forwards them to the parent via postMessage so a console panel can display them.
// (Harmless no-op when nothing is listening, e.g. on a standalone embed page.)
export const CONSOLE_BRIDGE = `<script>(function(){
  var NOISE=/precompile your scripts for production|You are using the in-browser Babel|Script error\\.?$|cdn\\.tailwindcss\\.com should not be used in production/i;
  var send=function(level,args){
    var text=Array.from(args).map(function(a){
      try{
        if(a instanceof Error)return a.message||(a.name||'Error');
        if(typeof a==='object'){var s=JSON.stringify(a,null,2);return(s==='{}'||s==='null')?String(a):s;}
        return String(a);
      }catch(e){return String(a);}
    });
    if(NOISE.test(text.join(' ')))return;
    try{window.parent.postMessage({type:'__console__',level:level,args:text},'*');}catch(e){}
  };
  ['log','warn','error','info'].forEach(function(l){var o=console[l];console[l]=function(){send(l,arguments);o.apply(console,arguments);};});
  window.addEventListener('error',function(e){if(!e.message||NOISE.test(e.message))return;send('error',[e.message+(e.filename?' ('+e.filename+':'+e.lineno+')':'')]);});
  window.addEventListener('unhandledrejection',function(e){send('error',['Unhandled promise rejection: '+(e.reason&&e.reason.message||e.reason)]);});
}());<\/script>`;

// Builds the full HTML document used as a preview iframe's srcDoc. Shared by
// the in-app live editor (ExportTester) and the standalone embed page so both
// render a snippet identically.
export function buildPreviewSrcdoc(html, css, js, useTailwind = false, cdnUrls = []) {
  const twScript = useTailwind ? '<script src="https://cdn.tailwindcss.com"><\/script>' : '';
  const cdn = cdnTagsHtml(cdnUrls, '');
  return `<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">${CONSOLE_BRIDGE}${twScript}${cdn}<style>*{box-sizing:border-box}body{margin:0;font-family:system-ui,sans-serif;background:#fff}${css}</style></head><body>${html}${js ? `<script>${js}<\/script>` : ''}</body></html>`;
}
