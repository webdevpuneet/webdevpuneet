const walletConnectButton = {
  id: 'wallet-connect-button',
  title: 'Web3 Wallet Connect Button',
  lastmod: '2026-08-08',
  category: 'buttons',
  html: `<div class="demo-wrap">
  <div class="wallet-widget">
    <button class="connect-btn" id="connect-btn">
      <svg class="wallet-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-1"/><path d="M17 12a2 2 0 1 0 4 0 2 2 0 0 0-4 0Z"/></svg>
      <span id="connect-label">Connect Wallet</span>
      <span class="chevron" id="chevron">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
      </span>
    </button>

    <!-- Provider picker -->
    <div class="dropdown provider-dropdown" id="provider-dropdown">
      <p class="dropdown-title">Connect a wallet</p>
      <button class="provider-row" data-provider="MetaMask">
        <span class="provider-icon mm">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4l7 5-2 5-5-3z"/><path d="M20 4l-7 5 2 5 5-3z"/><path d="M9 15l3 5 3-5"/></svg>
        </span>
        <span class="provider-name">MetaMask</span>
        <span class="provider-tag">Popular</span>
      </button>
      <button class="provider-row" data-provider="Coinbase Wallet">
        <span class="provider-icon cb">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><rect x="9" y="9" width="6" height="6" rx="1"/></svg>
        </span>
        <span class="provider-name">Coinbase Wallet</span>
      </button>
      <button class="provider-row" data-provider="WalletConnect">
        <span class="provider-icon wc">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 12a6 6 0 0 1 12 0"/><path d="M3 12a9 9 0 0 1 18 0"/><circle cx="12" cy="15" r="1.5" fill="currentColor" stroke="none"/></svg>
        </span>
        <span class="provider-name">WalletConnect</span>
      </button>
      <p class="dropdown-footnote">By connecting, you agree to the Terms of Service.</p>
    </div>

    <!-- Connected account menu -->
    <div class="dropdown account-dropdown" id="account-dropdown">
      <div class="account-summary">
        <span class="account-avatar"></span>
        <div class="account-meta">
          <span class="account-address" id="account-address-full">0x71C7656EC7ab88b098defB751B7401B5f6d8976</span>
          <span class="network-badge"><span class="network-dot"></span>Ethereum</span>
        </div>
      </div>
      <button class="account-action" id="copy-address">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
        <span id="copy-label">Copy Address</span>
      </button>
      <button class="account-action danger" id="disconnect-btn">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
        Disconnect
      </button>
    </div>
  </div>
</div>`,

  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #0f172a; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 24px; }

.demo-wrap { position: relative; }
.wallet-widget { position: relative; }

.connect-btn {
  display: flex; align-items: center; gap: 9px;
  background: #6366f1; color: #fff;
  border: none; border-radius: 12px;
  padding: 11px 16px;
  font-family: inherit; font-size: 14px; font-weight: 600;
  cursor: pointer;
  transition: background 0.15s, transform 0.1s;
}
.connect-btn:hover { background: #4f46e5; }
.connect-btn:active { transform: scale(0.98); }
.connect-btn.connected {
  background: #1e293b; color: #e2e8f0;
  border: 1.5px solid #334155;
}
.connect-btn.connected:hover { border-color: #6366f1; }
.connect-btn.connecting { background: #4338ca; cursor: wait; }

.wallet-icon { flex-shrink: 0; }
.chevron { display: flex; margin-left: 2px; transition: transform 0.2s; }
.chevron.open { transform: rotate(180deg); }

.spinner {
  width: 14px; height: 14px;
  border: 2px solid rgba(255,255,255,0.35);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }

.address-pill {
  display: flex; align-items: center; gap: 7px;
}
.status-dot {
  width: 7px; height: 7px; border-radius: 50%;
  background: #22c55e;
  box-shadow: 0 0 0 3px rgba(34,197,94,0.2);
}

/* — Dropdowns — */
.dropdown {
  position: absolute;
  top: calc(100% + 10px);
  left: 0;
  width: 268px;
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 14px;
  box-shadow: 0 20px 48px rgba(0,0,0,0.4);
  padding: 14px;
  opacity: 0;
  transform: translateY(-6px) scale(0.98);
  pointer-events: none;
  transition: opacity 0.16s, transform 0.16s;
  z-index: 50;
}
.dropdown.open { opacity: 1; transform: translateY(0) scale(1); pointer-events: all; }

.dropdown-title { font-size: 12px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.04em; padding: 2px 8px 10px; }
.dropdown-footnote { font-size: 11px; color: #64748b; padding: 10px 8px 0; line-height: 1.5; }

.provider-row {
  width: 100%;
  display: flex; align-items: center; gap: 12px;
  background: transparent; border: none;
  padding: 10px 8px; border-radius: 10px;
  font-family: inherit; font-size: 13.5px; font-weight: 600; color: #e2e8f0;
  cursor: pointer;
  transition: background 0.12s;
}
.provider-row:hover { background: #273449; }

.provider-icon {
  width: 34px; height: 34px; border-radius: 9px;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}
.provider-icon.mm { background: #f59e0b22; color: #f59e0b; }
.provider-icon.cb { background: #3b82f622; color: #3b82f6; }
.provider-icon.wc { background: #6366f122; color: #818cf8; }

.provider-name { flex: 1; text-align: left; }
.provider-tag {
  font-size: 10px; font-weight: 700; color: #6366f1;
  background: #6366f11f; padding: 3px 8px; border-radius: 20px;
}

/* — Account dropdown — */
.account-summary { display: flex; align-items: center; gap: 12px; padding: 6px 8px 14px; border-bottom: 1px solid #334155; margin-bottom: 8px; }
.account-avatar {
  width: 38px; height: 38px; border-radius: 50%; flex-shrink: 0;
  background: conic-gradient(from 120deg, #6366f1, #a855f7, #22d3ee, #6366f1);
}
.account-meta { display: flex; flex-direction: column; gap: 5px; min-width: 0; }
.account-address { font-size: 13px; font-weight: 700; color: #f1f5f9; font-family: ui-monospace, monospace; }
.network-badge { display: inline-flex; align-items: center; gap: 5px; font-size: 11px; color: #94a3b8; }
.network-dot { width: 6px; height: 6px; border-radius: 50%; background: #22c55e; }

.account-action {
  width: 100%;
  display: flex; align-items: center; gap: 10px;
  background: transparent; border: none;
  padding: 10px 8px; border-radius: 10px;
  font-family: inherit; font-size: 13px; font-weight: 600; color: #cbd5e1;
  cursor: pointer;
  transition: background 0.12s;
}
.account-action:hover { background: #273449; }
.account-action.danger { color: #f87171; }
.account-action.danger:hover { background: #f8717118; }`,

  js: `const connectBtn = document.getElementById('connect-btn');
const connectLabel = document.getElementById('connect-label');
const chevron = document.getElementById('chevron');
const providerDropdown = document.getElementById('provider-dropdown');
const accountDropdown = document.getElementById('account-dropdown');
const copyBtn = document.getElementById('copy-address');
const copyLabel = document.getElementById('copy-label');
const disconnectBtn = document.getElementById('disconnect-btn');
const fullAddress = document.getElementById('account-address-full').textContent.trim();

let state = 'disconnected'; // disconnected | picking | connecting | connected

function truncate(addr) {
  return addr.slice(0, 6) + '...' + addr.slice(-4);
}

function closeDropdowns() {
  providerDropdown.classList.remove('open');
  accountDropdown.classList.remove('open');
  chevron.classList.remove('open');
}

function renderButton() {
  connectBtn.classList.remove('connecting');
  if (state === 'disconnected' || state === 'picking') {
    connectBtn.classList.remove('connected');
    connectLabel.innerHTML = 'Connect Wallet';
  } else if (state === 'connecting') {
    connectBtn.classList.add('connecting');
    connectLabel.innerHTML = '<span class="address-pill"><span class="spinner"></span>Connecting&hellip;</span>';
  } else if (state === 'connected') {
    connectBtn.classList.add('connected');
    connectLabel.innerHTML = '<span class="address-pill"><span class="status-dot"></span>' + truncate(fullAddress) + '</span>';
  }
}

function toggleProviderPicker() {
  if (state === 'connected') {
    const willOpen = !accountDropdown.classList.contains('open');
    closeDropdowns();
    if (willOpen) {
      accountDropdown.classList.add('open');
      chevron.classList.add('open');
    }
    return;
  }
  if (state === 'connecting') return;
  const willOpen = !providerDropdown.classList.contains('open');
  closeDropdowns();
  if (willOpen) {
    providerDropdown.classList.add('open');
    chevron.classList.add('open');
    state = 'picking';
  } else {
    state = 'disconnected';
  }
}

function selectProvider(name) {
  closeDropdowns();
  state = 'connecting';
  renderButton();
  setTimeout(() => {
    state = 'connected';
    renderButton();
  }, 1000);
}

async function copyAddress() {
  try {
    await navigator.clipboard.writeText(fullAddress);
    copyLabel.textContent = 'Copied!';
    setTimeout(() => { copyLabel.textContent = 'Copy Address'; }, 1500);
  } catch (err) {
    copyLabel.textContent = 'Copy failed';
    setTimeout(() => { copyLabel.textContent = 'Copy Address'; }, 1500);
  }
}

function disconnect() {
  state = 'disconnected';
  closeDropdowns();
  renderButton();
}

connectBtn.addEventListener('click', toggleProviderPicker);

document.querySelectorAll('.provider-row').forEach((row) => {
  row.addEventListener('click', () => selectProvider(row.dataset.provider));
});

copyBtn.addEventListener('click', copyAddress);
disconnectBtn.addEventListener('click', disconnect);

document.addEventListener('click', (e) => {
  if (!e.target.closest('.wallet-widget')) closeDropdowns();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeDropdowns();
});

renderButton();`,

  seo: {
    title: 'Web3 Wallet Connect Button — Free HTML CSS JS Snippet',
    description: 'Connect Wallet button with a mock provider picker, simulated connect delay, and copy-to-clipboard address. Exports to React, Vue, Angular & Tailwind.',
    about: {
      title: 'Web3 Wallet Connect Button — Provider Picker, Simulated Connection State & Account Dropdown',
      description: `Every decentralized application (dApp) needs some version of the "Connect Wallet" button — the entry point through which a user links their browser-based crypto wallet to a website so it can read their address, network, and balances, and request transaction signatures. This snippet builds the complete front-end interaction for that flow: a provider picker, a simulated connecting state, and a connected account menu with copy-to-clipboard and disconnect actions — entirely in vanilla HTML, CSS, and JS, with no real blockchain calls, since this is a UI pattern demo rather than a working Web3 integration.

**The four-state button**

The button cycles through four states tracked by a single \`state\` variable: \`disconnected\` (shows "Connect Wallet"), \`picking\` (the provider dropdown is open), \`connecting\` (a spinner replaces the label for roughly one second to simulate the real latency of a wallet extension responding to a connection request), and \`connected\` (the button itself becomes the truncated address with a green status dot). Each state transition calls \`renderButton()\`, which swaps the button's inner HTML and CSS classes to reflect the current state — this centralizes all visual logic in one function rather than scattering conditional class toggles across multiple event handlers.

**Provider selection without real trademarked assets**

Clicking the button while disconnected opens a dropdown listing three common wallet providers by name — MetaMask, Coinbase Wallet, and WalletConnect — each represented with a simple inline SVG glyph and a distinct accent color rather than the providers' actual trademarked logos, since reproducing real brand marks isn't appropriate for a generic demo component. Selecting any row calls \`selectProvider()\`, which immediately transitions to the \`connecting\` state and schedules a \`setTimeout\` that resolves to \`connected\` after 1000ms — standing in for the real async round-trip where a browser extension like MetaMask would pop up its own permission prompt and the page would \`await\` a promise from \`window.ethereum.request({ method: 'eth_requestAccounts' })\`.

**Truncated address and network badge**

Once connected, the button displays \`truncate(fullAddress)\`, which slices the first 6 and last 4 characters of the mock address (\`0x71C7656EC7ab88b098defB751B7401B5f6d8976\` becomes \`0x71C7...8976\`) — the universal convention for displaying Ethereum-style addresses in constrained UI space, since full 42-character addresses are unreadable inline. The account dropdown additionally shows the network the wallet is connected to via a small badge with a colored status dot, which matters because the same address can hold entirely different assets on different chains (Ethereum mainnet vs. an L2 like Arbitrum), and users need to see at a glance which network a dApp believes they're on before approving any transaction.

**Real clipboard copy, no fake behavior**

The "Copy Address" action in the connected account menu uses the genuine browser \`Clipboard API\` — \`navigator.clipboard.writeText(fullAddress)\` — rather than faking the copy interaction, so this piece of the demo is fully functional exactly as it would be in production. The button label briefly changes to "Copied!" for 1.5 seconds via a \`setTimeout\`-driven revert, giving the user immediate, unambiguous confirmation that the action succeeded.

**Why this matters for 2026 trust-driven UX**

Wallet-connection flows sit at the highest-stakes trust boundary in any product: a user is about to grant a website visibility into their on-chain identity and, eventually, transaction-signing permission. Interfaces here benefit enormously from **trust-driven UX** principles — visible, unambiguous state (never leave the user wondering "am I connected or not?"), clearly labeled network context, and a disconnect action that's always one click away. This snippet's explicit state machine, visible spinner during the async gap, and persistent status dot are all in service of that same principle: never leave connection state ambiguous.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        {
          title: 'Click Connect Wallet to open the provider picker',
          text: 'toggleProviderPicker() opens #provider-dropdown and transitions state to \'picking\'. The dropdown lists MetaMask, Coinbase Wallet, and WalletConnect as mock options, each a .provider-row button with a data-provider attribute.',
        },
        {
          title: 'Select a provider to simulate connecting',
          text: 'Clicking any .provider-row calls selectProvider(name), which closes the dropdown, sets state to \'connecting\' (showing a spinning .spinner element in the button), and after a 1000ms setTimeout transitions to \'connected\', rendering the truncated address.',
        },
        {
          title: 'Open the account menu once connected',
          text: 'Clicking the connected button toggles #account-dropdown instead of the provider picker, showing the full address, a conic-gradient avatar, and an "Ethereum" network badge with a green status dot.',
        },
        {
          title: 'Copy the address with the real Clipboard API',
          text: 'The "Copy Address" row calls copyAddress(), which awaits navigator.clipboard.writeText(fullAddress) and briefly changes the label to "Copied!" for 1.5 seconds as confirmation, falling back to a "Copy failed" message if the clipboard write throws.',
        },
        {
          title: 'Disconnect to reset state',
          text: 'Clicking "Disconnect" calls disconnect(), which resets state to \'disconnected\', closes all dropdowns, and re-renders the button back to its original "Connect Wallet" label.',
        },
        {
          title: 'Wire in a real Web3 provider',
          text: 'Replace the setTimeout in selectProvider() with an actual await window.ethereum.request({ method: "eth_requestAccounts" }) call for MetaMask-compatible wallets, or integrate the official WalletConnect or Coinbase Wallet SDKs for their respective flows, then set fullAddress from the real returned account.',
        },
      ],
    },
    features: [
      'Single state variable (disconnected/picking/connecting/connected) drives all button and dropdown rendering',
      'Provider picker lists three wallets with distinct inline SVG glyphs and accent colors — no trademarked logo images',
      'Simulated 1000ms connecting delay with a CSS spinner standing in for real wallet-extension round-trip latency',
      'truncate() formats a full 42-character address to the standard 0x71C7...8976 display convention',
      'Real Clipboard API integration: navigator.clipboard.writeText() with a "Copied!" confirmation state',
      'Network badge with colored status dot communicates which chain the mock connection represents',
      'Outside-click and Escape-key handlers close open dropdowns for standard menu accessibility',
      'renderButton() centralizes all state-to-markup mapping in one function instead of scattered conditionals',
    ],
    useCases: [
      {
        icon: 'APP',
        title: 'dApp landing pages and NFT marketplace headers',
        desc: 'Nearly every decentralized application needs a wallet connection entry point in its header. This snippet provides the complete front-end interaction shell — provider picker, connecting state, connected account menu — ready to wire up to a real Web3 provider library like ethers.js, wagmi, or the official WalletConnect SDK.',
      },
      {
        icon: 'FLOW',
        title: 'Multi-wallet onboarding flows for crypto-native products',
        desc: 'Offering multiple wallet options (browser extension wallets, mobile wallets via WalletConnect, exchange-linked wallets like Coinbase Wallet) is standard practice since users have no single dominant wallet choice. The provider dropdown pattern here generalizes directly to real multi-provider connection flows.',
      },
      {
        icon: 'DESIGN',
        title: 'Trust-focused account menus showing network and address context',
        desc: 'Displaying the connected network alongside the address — not just the address alone — prevents a common source of user error and lost funds: approving a transaction while believing you\'re on the wrong network. This pattern belongs in any interface handling financial or blockchain state, alongside components like a [Toast Notification](/ui-snippets/toast-notification/) for transaction confirmations.',
      },
      {
        icon: 'CODE',
        title: 'Prototyping Web3 UI flows before SDK integration',
        desc: 'Frontend teams can build and user-test the entire wallet-connect visual flow — including edge cases like a slow connection or a failed clipboard copy — before backend/SDK integration is ready, since the state machine here is intentionally decoupled from any real blockchain calls.',
      },
      {
        icon: 'LEARN',
        title: 'Teaching state-machine driven button rendering',
        desc: 'The four-state button (disconnected/picking/connecting/connected) is a clean, minimal example of driving all UI from one explicit state variable rather than a tangle of independent boolean flags, a pattern that scales cleanly to far more complex multi-step flows.',
      },
      {
        icon: 'FORM',
        title: 'Account settings pages showing linked wallet address',
        desc: 'Settings and profile pages that display a user\'s linked wallet address for payouts or verification can reuse the truncated-address-plus-copy-button pattern directly, since the same 0x71C7...8976 truncation and clipboard-copy interaction apply outside the connect flow too.',
      },
    ],
    faqs: [
      {
        q: 'Does this snippet actually connect to a real crypto wallet?',
        a: "No — this is a UI pattern demo with a hardcoded mock address and a setTimeout standing in for the real connection round-trip. To connect a real wallet, replace the setTimeout inside selectProvider() with an actual call such as await window.ethereum.request({ method: 'eth_requestAccounts' }) for MetaMask-compatible browser wallets, or integrate the WalletConnect or Coinbase Wallet SDK for their respective connection flows, then read the real returned account address instead of the hardcoded fullAddress constant.",
      },
      {
        q: 'Why is the address truncated instead of shown in full?',
        a: "Ethereum-style addresses are 42 characters long (0x plus 40 hex characters), far too long to display inline in a button or compact menu without wrapping or truncating other UI. The convention adopted across virtually every wallet and dApp is to show the first 6 and last 4 characters — enough for a user to visually recognize their own address at a glance while keeping the UI compact. The full, untruncated address is always available in the account dropdown for copying.",
      },
      {
        q: 'Why not use real wallet logo images instead of generic SVG icons?',
        a: "MetaMask, Coinbase Wallet, and WalletConnect logos are trademarked brand assets with usage guidelines controlling exactly how and where they may be reproduced. A generic, reusable UI snippet shouldn't bundle or imply endorsement from real brands, so this component uses simple inline SVG glyphs with distinct accent colors as visual stand-ins. In a real product integrating an official wallet SDK, you would typically use that SDK's provided icon assets under its actual usage terms.",
      },
      {
        q: 'How does the Copy Address button work, and does it need special permissions?',
        a: "It calls the standard browser Clipboard API: navigator.clipboard.writeText(fullAddress). This API requires a secure context (HTTPS or localhost) and, in most browsers, a direct user gesture like a click — which this implementation satisfies since it's called from a click event handler. No special permission prompt is needed for writing to the clipboard, unlike reading from it, which some browsers do gate behind a permission request.",
      },
      {
        q: 'How would I show a real balance or ENS name instead of just the address?',
        a: "After a real wallet connects, use a library like ethers.js or viem to call provider.getBalance(address) for the native token balance, and provider.lookupAddress(address) (or an ENS-specific library call) to resolve a human-readable .eth name if one exists. Render the ENS name in place of the truncated address when available, since users generally find it far more memorable and trustworthy than a raw hex string.",
      },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet into an AI coding assistant like Claude and ask it to walk through the four-state model (disconnected/picking/connecting/connected) and exactly how renderButton() maps each state to markup, plus why the outside-click and Escape-key handlers are attached at the document level rather than on the dropdowns themselves. It's a great starting point to extend with real Web3 integration — ask the assistant to wire selectProvider() up to an actual window.ethereum.request call for MetaMask, add proper error handling for the case where a user rejects the connection request in their wallet extension, or add a "wrong network" warning state that appears when the connected wallet's chain ID doesn't match the dApp's expected network.`,
      prompt: `Build a "Connect Wallet" button UI in plain HTML, CSS, and JavaScript that simulates a typical Web3 dApp wallet-connection flow, without making any real blockchain or extension calls.

Requirements:
- A single button that cycles through four distinct visual states driven by one explicit state variable: disconnected ("Connect Wallet"), a provider-picking state where a dropdown is open, a connecting state with a visible loading spinner replacing the button label, and a connected state showing a truncated mock address plus a small colored status indicator.
- Clicking the button while disconnected opens a dropdown listing at least three mock wallet provider options, each with a distinct simple icon (do not use real trademarked logo images) and provider name.
- Selecting a provider closes the dropdown, enters the connecting state for roughly one second (simulated delay), then transitions to the connected state showing a truncated version of a hardcoded mock address (first 6 and last 4 characters, e.g. 0x71C7...8976) plus a network badge (e.g. "Ethereum") with a colored dot.
- Clicking the button again while connected opens a second dropdown (not the provider picker) showing the full mock address, the network badge, a "Copy Address" action, and a "Disconnect" action.
- Copy Address must use the real browser Clipboard API to copy the full address, and must show a brief "Copied!" confirmation state on the button/label before reverting.
- Disconnect must reset all state back to the initial disconnected button and close any open dropdown.
- Clicking anywhere outside the widget, or pressing Escape, must close any open dropdown without changing the connection state.`,
    },
  },
};

export default walletConnectButton;
