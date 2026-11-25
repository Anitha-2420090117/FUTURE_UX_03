// ClientLoop: CRM dashboard prototype. All data is mock / fictional.
const STAGES = [
  { id: 'new',       name: 'New lead',  color: '#2b7fe0' },
  { id: 'contacted', name: 'Contacted', color: '#e8920c' },
  { id: 'proposal',  name: 'Proposal',  color: '#4f46e5' },
  { id: 'won',       name: 'Won',       color: '#16a37a' },
  { id: 'lost',      name: 'Lost',      color: '#d9435a' },
];
const DEALS = [
  { id: 1, name: 'Website revamp',    co: 'Orbit Fitness',     val: 2.4, due: 'Today',    stage: 'new',       own: 'PS', c: '#6d5ef5' },
  { id: 2, name: 'Brand refresh',     co: 'Greenleaf Cafe',    val: 1.1, due: 'Tomorrow', stage: 'new',       own: 'RK', c: '#16a37a' },
  { id: 3, name: 'SEO retainer',      co: 'Nimbus Dental',     val: 0.9, due: 'Wed',      stage: 'contacted', own: 'PS', c: '#6d5ef5' },
  { id: 4, name: 'Social media 6 mo', co: 'Kestrel Logistics', val: 2.8, due: 'Overdue',  stage: 'contacted', own: 'AM', c: '#e8920c' },
  { id: 5, name: 'Campaign launch',   co: 'Lumina Foods',      val: 3.8, due: 'Overdue',  stage: 'proposal',  own: 'PS', c: '#6d5ef5' },
  { id: 6, name: 'App design',        co: 'Zenith Edu',        val: 5.2, due: 'Fri',      stage: 'proposal',  own: 'RK', c: '#16a37a' },
  { id: 7, name: 'Annual retainer',   co: 'Bluepeak Realty',   val: 4.2, due: 'Done',     stage: 'won',       own: 'PS', c: '#6d5ef5' },
  { id: 8, name: 'Landing pages',     co: 'Atlas Travel',      val: 1.6, due: 'Done',     stage: 'won',       own: 'AM', c: '#e8920c' },
  { id: 9, name: 'Video series',      co: 'Pinecrest Homes',   val: 2.0, due: 'Closed',   stage: 'lost',      own: 'RK', c: '#16a37a' },
];
const CLIENTS = [
  { n: 'Lumina Foods',      i: 'LF', c: '#e8920c', ind: 'Food & Beverage',  s: 'risk',   h: 1, v: '₹3.8L', o: 'PS', l: '9 days ago' },
  { n: 'Kestrel Logistics', i: 'KL', c: '#2b7fe0', ind: 'Logistics',        s: 'risk',   h: 1, v: '₹2.8L', o: 'AM', l: '6 days ago' },
  { n: 'Bluepeak Realty',   i: 'BR', c: '#16a37a', ind: 'Real estate',      s: 'active', h: 3, v: '₹4.2L', o: 'PS', l: 'Today' },
  { n: 'Atlas Travel',      i: 'AT', c: '#4f46e5', ind: 'Travel',           s: 'active', h: 3, v: '₹1.6L', o: 'AM', l: '2 days ago' },
  { n: 'Orbit Fitness',     i: 'OF', c: '#d9435a', ind: 'Health & fitness', s: 'active', h: 2, v: '₹2.4L', o: 'PS', l: 'Yesterday' },
  { n: 'Zenith Edu',        i: 'ZE', c: '#0e8f8a', ind: 'Education',        s: 'active', h: 2, v: '₹5.2L', o: 'RK', l: '3 days ago' },
  { n: 'Nimbus Dental',     i: 'ND', c: '#6d5ef5', ind: 'Healthcare',       s: 'onhold', h: 2, v: '₹0.9L', o: 'PS', l: '12 days ago' },
  { n: 'Greenleaf Cafe',    i: 'GC', c: '#16a37a', ind: 'Hospitality',      s: 'active', h: 3, v: '₹1.1L', o: 'RK', l: '4 days ago' },
];
const STATUS = { active: 'Active', risk: 'At risk', onhold: 'On hold' };
const TASKS = [
  { g: 'Overdue',  cls: 'w-late',  items: [
    { t: 'Send revised proposal', who: 'Lumina Foods', w: 'Fri 23 Oct' },
    { t: 'Follow up on unpaid invoice', who: 'Kestrel Logistics', w: 'Sat 24 Oct' } ] },
  { g: 'Today',    cls: 'w-today', items: [
    { t: 'Discovery call', who: 'Orbit Fitness', w: '4:00 PM' },
    { t: 'Renewal check-in call', who: 'Bluepeak Realty', w: '6:00 PM' },
    { t: 'Share case study deck', who: 'Zenith Edu', w: 'EOD', done: true } ] },
  { g: 'Upcoming', cls: 'w-later', items: [
    { t: 'Send brand questionnaire', who: 'Greenleaf Cafe', w: 'Tue 27 Oct' },
    { t: 'Re-engage after pause', who: 'Nimbus Dental', w: 'Wed 28 Oct' },
    { t: 'Quarterly review meeting', who: 'Atlas Travel', w: 'Fri 30 Oct' } ] },
];

const TITLES = {
  overview: ['Overview', 'Sunday, 25 October 2026'],
  pipeline: ['Lead pipeline', '9 deals · ₹23.9L total value'],
  clients:  ['Clients', '8 clients · 2 need attention'],
  profile:  ['Client profile', 'Lumina Foods'],
  tasks:    ['Tasks & follow-ups', '3 due today · 2 overdue'],
};
const $ = id => document.getElementById(id);

// Overview chart
const REV = [['May', 2.1], ['Jun', 3.4], ['Jul', 2.8], ['Aug', 4.6], ['Sep', 3.9], ['Oct', 5.8]];
$('bars').innerHTML = REV.map(([m, v]) => `<div><span style="height:${v * 22}px"></span>${m}<br><b style="color:var(--ink)">${v}</b></div>`).join('');

// Pipeline board with drag & drop
function renderBoard() {
  $('board').innerHTML = STAGES.map(s => {
    const deals = DEALS.filter(d => d.stage === s.id);
    const sum = deals.reduce((a, d) => a + d.val, 0).toFixed(1);
    return `<div class="col" data-stage="${s.id}">
      <div class="col-h"><span><i class="dot" style="background:${s.color}"></i>${s.name}</span><small>${deals.length}</small></div>
      <div class="col-sum">₹${sum}L</div>
      ${deals.map(d => `
        <div class="deal" draggable="true" data-id="${d.id}">
          <b>${d.name}</b><div class="co">${d.co}</div>
          <div class="row"><span class="val">₹${d.val}L</span>
            <span class="due ${d.due === 'Overdue' ? 'late' : ''}">${d.due}</span>
            <span class="av" style="background:${d.c};width:24px;height:24px;font-size:.62rem">${d.own}</span></div>
        </div>`).join('')}
    </div>`;
  }).join('');
  wireDnD();
}
function wireDnD() {
  document.querySelectorAll('.deal').forEach(el => {
    el.addEventListener('dragstart', e => { e.dataTransfer.setData('id', el.dataset.id); el.classList.add('drag'); });
    el.addEventListener('dragend', () => el.classList.remove('drag'));
  });
  document.querySelectorAll('.col').forEach(col => {
    col.addEventListener('dragover', e => { e.preventDefault(); col.classList.add('over'); });
    col.addEventListener('dragleave', () => col.classList.remove('over'));
    col.addEventListener('drop', e => {
      e.preventDefault();
      const d = DEALS.find(x => x.id == e.dataTransfer.getData('id'));
      if (d) { d.stage = col.dataset.stage; renderBoard(); }
    });
  });
}

// Clients table
$('clientRows').innerHTML = CLIENTS.map(c => `
  <tr onclick="location.hash='#profile'">
    <td><div class="cell"><div class="av" style="background:${c.c}">${c.i}</div><div><b>${c.n}</b><small>${c.ind}</small></div></div></td>
    <td><span class="pill p-${c.s}">${STATUS[c.s]}</span></td>
    <td><span class="health h${c.h}"><i></i><i></i><i></i></span></td>
    <td><b>${c.v}</b></td>
    <td>${c.o}</td>
    <td style="color:${c.l.includes('9') || c.l.includes('12') ? 'var(--red)' : 'var(--muted)'}">${c.l}</td>
  </tr>`).join('');

// Tasks
function renderTasks() {
  $('taskGroups').innerHTML = TASKS.map((g, gi) => `
    <div class="tgroup"><h4>${g.g} <span>${g.items.length}</span></h4>
    ${g.items.map((t, ti) => `
      <div class="task ${t.done ? 'done' : ''}">
        <div class="cb" onclick="toggleTask(${gi},${ti})">${t.done ? '✓' : ''}</div>
        <div class="tt"><b class="tt">${t.t}</b><small>${t.who}</small></div>
        <span class="when ${g.cls}">${t.w}</span>
      </div>`).join('')}</div>`).join('');
}
function toggleTask(g, t) { TASKS[g].items[t].done = !TASKS[g].items[t].done; renderTasks(); }

// Router
function route() {
  const v = (location.hash || '#overview').slice(1);
  const view = TITLES[v] ? v : 'overview';
  document.querySelectorAll('.view').forEach(x => x.classList.toggle('on', x.id === 'v-' + view));
  document.querySelectorAll('#nav a[data-v]').forEach(a => a.classList.toggle('on', a.dataset.v === (view === 'profile' ? 'clients' : view)));
  $('title').textContent = TITLES[view][0];
  $('subtitle').textContent = TITLES[view][1];
  window.scrollTo(0, 0);
}
window.addEventListener('hashchange', route);
renderBoard(); renderTasks(); route();
