const { chromium } = require('playwright');
(async()=>{
 const b=await chromium.launch(); const p=await b.newPage({viewport:{width:1700,height:900}});
 const errs=[]; p.on('pageerror',e=>errs.push(String(e))); p.on('console',m=>{if(m.type()==='error')errs.push(m.text())});
 await p.goto('http://localhost:3000/ui-snippets/cooldown-ring-button/',{waitUntil:'networkidle'});
 await p.waitForTimeout(3000);
 console.log('btn', await p.locator('button[aria-label="AI Prompt"]').count());
 console.log('fork', await p.locator('button[aria-label="Fork this snippet"]').count());
 console.log(errs.slice(0,5).join('\n').slice(0,1500));
 await b.close();})();
