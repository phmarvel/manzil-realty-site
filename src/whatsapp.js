// MNZ-4 WhatsApp contact button: wa.me links with a message in the page's language.
// The pure functions import only data, so they run in Node tests; the page wiring is in initWhatsapp().
import { agents, neighbourhoods, whatsapp, whatsappText } from './data/demo.js';
import { getLang, onLang, t, pick } from './i18n.js';

const fill = (s, vars) => s.replace(/\{(\w+)\}/g, (m, k) => vars[k] ?? m);

export function buildWaLink(number, text) {
  return `https://wa.me/${String(number).replace(/\D/g, '')}?text=${encodeURIComponent(text)}`;
}

// Message for the agency (about the neighbourhood being browsed, when there is one) or for one agent.
export function waMessage({ lang, agentId, hood } = {}) {
  const s = whatsappText[lang];
  const agent = agents.find((a) => a.id === agentId);
  if (agent) return fill(s.agentMsg, { name: agent.name[lang], areas: agent.areas[lang] });
  const h = neighbourhoods.find((n) => n.id === hood);
  return h ? fill(s.hood, { hood: h.name[lang] }) : s.general;
}

export const waAgencyHref = (lang, hood) => buildWaLink(whatsapp.agency, waMessage({ lang, hood }));
export const waAgentHref = (agent, lang) => buildWaLink(whatsapp.agents[agent.id], waMessage({ lang, agentId: agent.id }));

// Agent-card button, rendered by main.js with the card (cards are rebuilt on every language switch).
export function waCardLink(agent) {
  const name = pick(agent.name);
  return `<a class="btn btn-wa mt-6 w-full" href="${waAgentHref(agent, getLang())}" target="_blank" rel="noopener" data-wa="agent" data-agent="${agent.id}"><svg class="size-5 shrink-0" aria-hidden="true"><use href="#i-whatsapp"/></svg><span>${t('whatsapp.agent', { name })}</span><span class="sr-only">. ${t('whatsapp.opens')}</span></a>`;
}

let hoodState = null;
function refresh() {
  const hood = hoodState?.hood || undefined;
  document.querySelectorAll('[data-wa="agency"]').forEach((a) => { a.href = waAgencyHref(getLang(), hood); });
}

export async function initWhatsapp() {
  document.addEventListener('pointerdown', (e) => { if (e.target.closest('[data-wa="agency"]')) refresh(); }, true);
  document.addEventListener('focusin', (e) => { if (e.target.closest('[data-wa="agency"]')) refresh(); });
  document.addEventListener('mouseover', (e) => { if (e.target.closest('[data-wa="agency"]')) refresh(); });
  onLang(refresh);
  refresh();
  ({ state: hoodState } = await import('./filters.js')); // the neighbourhood being browsed; already loaded by main.js
  refresh();
}
