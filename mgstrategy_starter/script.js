/* ---------- Safe localStorage ---------- */
const storageKey = "mg_state";
function safeGet(k, f) {
  try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : f; } catch { return f; }
}
function safeSet(k, v) {
  try { localStorage.setItem(k, JSON.stringify(v)); } catch {}
}

/* ---------- Buckets ---------- */
const BUCKETS = [
  "Referrals & Network",
  "New Audience (Organic & Ads)",
  "Community & Events",
  "Trust & Credibility",
  "Platform",
  "Ops (Inventory & Systems)",
  "Marketing",
];
const bucketColorMap = {
  "Referrals & Network": "bg-lime-500",
  "New Audience (Organic & Ads)": "bg-blue-500",
  "Community & Events": "bg-yellow-500",
  "Trust & Credibility": "bg-red-500",
  Platform: "bg-purple-500",
  "Ops (Inventory & Systems)": "bg-gray-500",
  Marketing: "bg-pink-500",
};
const bucketColor = (b) => bucketColorMap[b] || "bg-gray-400";

/* ========== 12-Week tasks (clean slate) ========== */
const weeksData = [
  // (UNCHANGED) — all the tasks from your original file:
  // ---- WEEK 1 ----
  { week:1, bucket:"Referrals & Network", effort:"medium", description:"DM 30 IG followers with Founding Offer ($10 off or free gift) → use unique promo codes + log in referral sheet.", tags:[] },
  { week:1, bucket:"Referrals & Network", effort:"medium", description:"Message 5–7 personal contacts (personalized note, Founding Offer code).", tags:[] },
  { week:1, bucket:"Trust & Credibility", effort:"high", description:"Film/post Founder Intro Reel (story, values, what makes curation special).", tags:[] },
  { week:1, bucket:"Ops (Inventory & Systems)", effort:"medium", description:"Finalize unboxing set → design + print card, care guide, warranty insert.", tags:[] },
  { week:1, bucket:"Community & Events", effort:"medium", description:"Shortlist 3–5 local markets/pop-ups (Oct/Nov).", tags:[] },
  { week:1, bucket:"Ops (Inventory & Systems)", effort:"high", description:"Place inventory reorder (14–21 day lead).", tags:[] },
  { week:1, bucket:"Marketing", effort:"high", description:"Build 2 starter bundles on website (e.g., Reflection Duo, Anchor & Altar).", tags:[] },
  { week:1, bucket:"Platform", effort:"low", description:"Reserve TikTok handle (optional).", tags:[] },
  { week:1, bucket:"Marketing", effort:"medium", description:"Block 3 hrs content creation (batch 5 posts + schedule).", tags:[] },
  { week:1, bucket:"Ops (Inventory & Systems)", effort:"high", description:"Block 5 hrs inventory creation (jewelry/stock).", tags:[] },

  // ---- WEEK 2 ----
  { week:2, bucket:"Ops (Inventory & Systems)", effort:"medium", description:"Deliver any orders → send review ask (script + direct link).", tags:[] },
  { week:2, bucket:"Trust & Credibility", effort:"low", description:"Post first review to website + IG.", tags:[] },
  { week:2, bucket:"Platform", effort:"high", description:"Install Meta Pixel + GA4; verify events (ViewContent, AddToCart, Purchase).", tags:[] },
  { week:2, bucket:"Community & Events", effort:"high", description:"Apply/book 1 event ($300 budget max).", tags:[] },
  { week:2, bucket:"Community & Events", effort:"medium", description:"Join 2 FB/Meetup groups; intro yourself (no selling).", tags:[] },
  { week:2, bucket:"Ops (Inventory & Systems)", effort:"medium", description:"Start Sales Dashboard (orders, AOV, leads, spend).", tags:[] },
  { week:2, bucket:"Marketing", effort:"high", description:"Schedule 5 posts/week baseline (mix Proof, Education, Product, Founder).", tags:[] },
  { week:2, bucket:"Referrals & Network", effort:"low", description:"Keep referral codes live (track redemptions in sheet).", tags:[] },

  // ---- WEEK 3 ----
  { week:3, bucket:"Referrals & Network", effort:"medium", description:"Launch Referral Incentive (same Founding Offer codes → “Refer a friend” flow).", tags:[] },
  { week:3, bucket:"Trust & Credibility", effort:"medium", description:"BTS packaging Reel + repost any UGC.", tags:[] },
  { week:3, bucket:"Marketing", effort:"high", description:"Batch 5–7 Reels (product, benefits, how-to, founder moments).", tags:[] },
  { week:3, bucket:"Ops (Inventory & Systems)", effort:"medium", description:"Mid-month inventory check vs reorder ETA.", tags:[] },
  { week:3, bucket:"Community & Events", effort:"low", description:"Comment in 1 FB group thread (value, not pitch).", tags:[] },
  { week:3, bucket:"Marketing", effort:"medium", description:"Maintain 5 posts/week cadence.", tags:[] },
  { week:3, bucket:"Ops (Inventory & Systems)", effort:"high", description:"5 hrs inventory creation.", tags:[] },

  // ---- WEEK 4 ----
  { week:4, bucket:"Trust & Credibility", effort:"medium", description:"Add Founder photo + QA message to site (trust block).", tags:[] },
  { week:4, bucket:"Marketing", effort:"high", description:"Launch Welcome Flow (3–4 emails: story, benefits, soft offer, bundle upsell).", tags:[] },
  { week:4, bucket:"Ops (Inventory & Systems)", effort:"medium", description:"Sales dashboard active + reviewed.", tags:[] },
  { week:4, bucket:"Referrals & Network", effort:"low", description:"Push referral to buyers again (reminder DM/email).", tags:[] },
  { week:4, bucket:"Marketing", effort:"medium", description:"Schedule 5 posts/week.", tags:[] },
  { week:4, bucket:"Ops (Inventory & Systems)", effort:"high", description:"5 hrs inventory creation.", tags:[] },

  // ---- WEEK 5 ----
  { week:5, bucket:"Marketing", effort:"high", description:"Launch Meta test ($10/day; 2 creatives → product page).", tags:[] },
  { week:5, bucket:"Ops (Inventory & Systems)", effort:"medium", description:"QC new inventory (check defects, packaging flow).", tags:[] },
  { week:5, bucket:"Trust & Credibility", effort:"medium", description:"Publish UGC highlight Reel (Month-1 buyer).", tags:[] },
  { week:5, bucket:"Community & Events", effort:"high", description:"Booth prep checklist (table, signage, bags, pricing, lead form, QR code).", tags:[] },
  { week:5, bucket:"Marketing", effort:"medium", description:"Maintain 5 posts/week.", tags:[] },
  { week:5, bucket:"Ops (Inventory & Systems)", effort:"high", description:"5 hrs inventory creation.", tags:[] },

  // ---- WEEK 6 ----
  { week:6, bucket:"Community & Events", effort:"high", description:"Attend event → collect ≥20 leads (name/email/intent).", tags:[] },
  { week:6, bucket:"Trust & Credibility", effort:"medium", description:"Film Event Reels (setup, smiles, testimonials).", tags:[] },
  { week:6, bucket:"Marketing", effort:"high", description:"Newsletter #1 (event recap, review highlight, bundle plug).", tags:[] },
  { week:6, bucket:"Marketing", effort:"medium", description:"Monitor CPL/CPC daily; pause weak ad.", tags:[] },
  { week:6, bucket:"Marketing", effort:"medium", description:"Maintain 5 posts/week.", tags:[] },

  // ---- WEEK 7 ----
  { week:7, bucket:"Marketing", effort:"high", description:"Retarget IG engagers + site visitors (Add-to-Cart if any).", tags:[] },
  { week:7, bucket:"Referrals & Network", effort:"medium", description:"Launch “Founder’s Circle” perk (early access/freebie) to drive referrals.", tags:[] },
  { week:7, bucket:"Community & Events", effort:"medium", description:"Outreach to 1–2 yoga/wellness shops for consignment/test.", tags:[] },
  { week:7, bucket:"Ops (Inventory & Systems)", effort:"high", description:"Reorder if bestseller stock <50%.", tags:[] },
  { week:7, bucket:"Marketing", effort:"medium", description:"Maintain 5 posts/week.", tags:[] },
  { week:7, bucket:"Ops (Inventory & Systems)", effort:"high", description:"5 hrs inventory creation.", tags:[] },

  // ---- WEEK 8 ----
  { week:8, bucket:"Marketing", effort:"high", description:"Newsletter #2 (reviews + new drops).", tags:[] },
  { week:8, bucket:"Trust & Credibility", effort:"medium", description:"Publish 2–3 new reviews to site/IG.", tags:[] },
  { week:8, bucket:"Marketing", effort:"high", description:"Test creatives with event UGC; keep CTR ≥1%.", tags:[] },
  { week:8, bucket:"Ops (Inventory & Systems)", effort:"medium", description:"Document Top 3 learnings (ads/events).", tags:[] },
  { week:8, bucket:"Marketing", effort:"medium", description:"Maintain 5 posts/week.", tags:[] },
  { week:8, bucket:"Ops (Inventory & Systems)", effort:"high", description:"5 hrs inventory creation.", tags:[] },

  // ---- WEEK 9 ----
  { week:9, bucket:"Marketing", effort:"high", description:"Scale winning ad set ($15–20/day).", tags:[] },
  { week:9, bucket:"Community & Events", effort:"medium", description:"Apply for Month 4–5 events.", tags:[] },
  { week:9, bucket:"Referrals & Network", effort:"high", description:"Launch ambassador program (simple tiers, track via codes).", tags:[] },
  { week:9, bucket:"Referrals & Network", effort:"medium", description:"Upsell bundles to past buyers (DM/email).", tags:[] },
  { week:9, bucket:"Marketing", effort:"medium", description:"Maintain 5 posts/week.", tags:[] },
  { week:9, bucket:"Ops (Inventory & Systems)", effort:"high", description:"5 hrs inventory creation.", tags:[] },

  // ---- WEEK 10 ----
  { week:10, bucket:"Marketing", effort:"high", description:"Test Lookalike (1–3% of engagers/purchasers).", tags:[] },
  { week:10, bucket:"Trust & Credibility", effort:"medium", description:"Collect 3 new UGC assets (offer perk).", tags:[] },
  { week:10, bucket:"Ops (Inventory & Systems)", effort:"high", description:"Inventory reorder for Month 4.", tags:[] },
  { week:10, bucket:"Marketing", effort:"medium", description:"Maintain 5 posts/week.", tags:[] },
  { week:10, bucket:"Ops (Inventory & Systems)", effort:"high", description:"5 hrs inventory creation.", tags:[] },

  // ---- WEEK 11 ----
  { week:11, bucket:"Marketing", effort:"high", description:"IG/TikTok giveaway (email collection).", tags:[] },
  { week:11, bucket:"Marketing", effort:"medium", description:"Optimize ads (shift budget to winners).", tags:[] },
  { week:11, bucket:"Community & Events", effort:"medium", description:"Pitch 1–2 boutiques for placement.", tags:[] },
  { week:11, bucket:"Marketing", effort:"high", description:"Expand evergreen content bank to 30–40 posts.", tags:[] },
  { week:11, bucket:"Marketing", effort:"medium", description:"Maintain 5 posts/week.", tags:[] },
  { week:11, bucket:"Ops (Inventory & Systems)", effort:"high", description:"5 hrs inventory creation.", tags:[] },

  // ---- WEEK 12 ----
  { week:12, bucket:"Referrals & Network", effort:"medium", description:"Run review-ask campaign → push site to 10–15 reviews.", tags:[] },
  { week:12, bucket:"Ops (Inventory & Systems)", effort:"medium", description:"QA product performance (defect <2%, OTF ≥95%).", tags:[] },
  { week:12, bucket:"Ops (Inventory & Systems)", effort:"high", description:"Update dashboard with full quarter data.", tags:[] },
  { week:12, bucket:"Ops (Inventory & Systems)", effort:"medium", description:"Q2 goal-setting (sales, leads, events, budgets).", tags:[] },
  { week:12, bucket:"Marketing", effort:"medium", description:"Maintain 5 posts/week.", tags:[] },
  { week:12, bucket:"Ops (Inventory & Systems)", effort:"high", description:"5 hrs inventory creation.", tags:[] },
];
weeksData.forEach((t, i) => (t.id = `task-${i}`));

/* ========== Weekly details (goals/why/success/KPIs/dep) ========== */
const weeklyDetails = {
  1:{goal:"Go live with warm outreach, post first trust signal, and remove Month-2 bottlenecks.",why:"First buyers/reviews + set up systems (referral, unboxing, bundles).",prep:"",success:"≥10 DMs, 1 Reel live, 3 events shortlisted, reorder placed, unboxing finalized.",targets:{sales:"1–2", reviews:"0–1", leads:"3–5"},dependencies:"None.",top3:""},
  2:{goal:"Capture first reviews, book event, install tracking.",why:"Reviews = higher conv. rate, pixel enables ads, events secure leads.",prep:"",success:"1 review live, Pixel & GA verified, 1 event applied/booked, 2 groups joined.",targets:{sales:"1–2", reviews:"1–2", leads:"5–8"},dependencies:"Book event depends on Week 1 shortlist.",top3:""},
  3:{goal:"Extend warm circle via referrals; prep content bank; check inventory.",why:"Referrals multiply base, content bank saves time.",prep:"",success:"Referral live, 5+ Reels drafted, inventory confirmed.",targets:{sales:"2", reviews:"1", leads:"5"},dependencies:"None.",top3:""},
  4:{goal:"Finalize trust systems + welcome flow to prep for cold ads.",why:"Gate readiness ensures ads/events don’t waste money.",prep:"",success:"≥5 warm buyers, ≥2 reviews, 1 event booked, Pixel live.",targets:{sales:"2–3", reviews:"1–2", leads:"6–10"},dependencies:"Welcome flow depends on Pixel/GA.",top3:""},
  5:{goal:"Launch first cold test, prep booth, QC new stock.",why:"Prove strangers will buy + ensure event kit is pro.",prep:"",success:"Ads live, QC passed, booth kit packed.",targets:{sales:"1", leads:"8–12", cpl:"≤ $3.50"},dependencies:"Ads depend on Pixel/GA.",top3:""},
  6:{goal:"Execute first event + capture leads + social proof.",why:"Events = lead volume + credibility.",prep:"",success:"20+ leads, recap newsletter, best creative identified.",targets:{sales:"2", leads:"20–25", cpl:"≤ $3"},dependencies:"Booth prep done Week 5.",top3:""},
  7:{goal:"Convert attention via retargeting + referrals; test shops.",why:"Cheapest wins come from engaged traffic.",prep:"",success:"Retargeting live, 2 shop convos, stock check.",targets:{sales:"3", leads:"10", cpl:"≤ $3"},dependencies:"Retargeting needs traffic from Weeks 2–6.",top3:""},
  8:{goal:"Lock learnings, publish more proof, tighten ads.",why:"Checkpoint before scaling.",prep:"",success:"CPL ≤ $3, ≥1 event completed, ≥5 reviews.",targets:{sales:"3–4", leads:"10–15"},dependencies:"None.",top3:""},
  9:{goal:"Scale what works; launch ambassador program.",why:"Move from tests → growth engine.",prep:"",success:"Spend scaled, ≥3 ambassadors, 1–2 events applied.",targets:{sales:"4", leads:"10–15", cpa:"≤ $25"},dependencies:"Uses prior referral incentive.",top3:""},
  10:{goal:"Expand reach with lookalikes; reorder stock.",why:"Scale ads + avoid stockouts.",prep:"",success:"Lookalike live, 3 UGC assets, reorder placed.",targets:{sales:"4", leads:"10", cpa:"≤ $25"},dependencies:"Needs audience from Weeks 5–9.",top3:""},
  11:{goal:"Lead spike + retail channel testing.",why:"Giveaway grows list; boutiques expand footprint.",prep:"",success:"1 giveaway, 1 boutique convo, 30+ posts in bank.",targets:{sales:"3–4", leads:"15–25"},dependencies:"None.",top3:""},
  12:{goal:"Cement proof + set next-quarter targets.",why:"Prove repeatability.",prep:"",success:"CPA ≤ $25, 10–15 reviews, ambassador live.",targets:{sales:"4–6", reviews:"10–15 (total)"},dependencies:"None.",top3:""},
};

/* ---------- Months (concise) ---------- */
const monthsData = [
  { title:"Month 1 — Launch & Soft Sales",
    skills:["Website basics","packaging/QA","IG content cadence","email welcome flow"],
    tasks:["Website ready","Founding Offer","soft launch DMs","start reviews","Pixel & GA plan","shortlist events","inventory reorder","sales dashboard"],
    gate:"Gate (end of Month 1 / Week 4): warm ≥5, reviews ≥2, 1 event booked, Pixel live."
  },
  { title:"Month 2 — Cold Sales & Community Exposure",
    skills:["Meta Ads basics","tracking CPL/CPC","event lead capture"],
    tasks:["Launch $10/day test","attend 1 event","retargeting","UGC highlight","newsletter rhythm","shop outreach"],
    gate:"Gate (end of Month 2 / Week 8): CPL ≤ $3, ≥1 event completed, ≥5 reviews."
  },
  { title:"Month 3 — Validation & Scaling",
    skills:["Interpreting ad metrics","referral/ambassador ops","conversion tracking"],
    tasks:["Scale winning ad sets","launch ambassador program","lookalikes","boutique pitches","30–40 evergreen posts"],
    gate:"Gate (end of Month 3 / Week 12): CPA ≤ $25, 10–15 reviews total, ambassador live."
  },
];

const initialStateFactory = () => {
  const currentSchemaVersion = 8;
  const canonicalTasks = weeksData.map((t) => ({
    ...t, completed:false, dueDay:t.dueDay||"", estimate:t.estimate||"", link:t.link||"",
  }));
  return {
    schemaVersion: currentSchemaVersion,
    tasks: canonicalTasks,
    currentWeek: 1,
    expandedWeek: null,
    kpis: {},
    budgets: { ads: 0, events: 0 },
    inventorySimple: [],
    eventPipeline: { prospects: [], applied: [], confirmed: [], thisMonth: [], past: [] },
    monthlyGoals: [
      { id:"goal-1", month:1, text:"Hit 5 warm buyers and 2 reviews", completed:false },
      { id:"goal-2", month:2, text:"Complete 1 event and keep CPL ≤ $3", completed:false },
      { id:"goal-3", month:3, text:"Reach 10–15 total reviews and CPA ≤ $25", completed:false },
    ],
    weeklyDetails: JSON.parse(JSON.stringify(weeklyDetails)),
    editableMonths: JSON.parse(JSON.stringify(monthsData)),
  };
};

const validateAndMergeState = (state, def) => {
  const newState = { ...def, ...state };
  if (state && Array.isArray(state.tasks)) {
    newState.tasks = state.tasks.map(task => {
      const defaultTask = def.tasks.find(t => t.id === task.id) || { completed:false, dueDay:"", estimate:"", link:"" };
      return { ...defaultTask, ...task };
    });
  }
  newState.monthlyGoals   = state.monthlyGoals   || def.monthlyGoals;
  newState.eventPipeline  = state.eventPipeline  || def.eventPipeline;
  newState.inventorySimple= state.inventorySimple|| def.inventorySimple;
  newState.weeklyDetails  = state.weeklyDetails  || def.weeklyDetails;
  newState.editableMonths = state.editableMonths || def.editableMonths;
  return newState;
};

let appState = {};
function loadState() {
  const def = initialStateFactory();
  const seedEl = document.getElementById("mg-seed");
  let savedState = {};
  if (seedEl && seedEl.textContent.trim().length > 2) {
    try {
      const seedData = JSON.parse(seedEl.textContent);
      console.log("Loading state from HTML seed script.");
      savedState = validateAndMergeState(seedData, def);
    } catch (e) { console.error("Failed to parse state from HTML seed script:", e); }
  }
  if (Object.keys(savedState).length === 0) {
    const ls = safeGet(storageKey, {});
    if (Object.keys(ls).length > 0) {
      console.log("Loading state from local storage.");
      savedState = validateAndMergeState(ls, def);
    }
  }
  if (Object.keys(savedState).length === 0) {
    console.log("No saved state found, loading clean state.");
    savedState = def;
  }
  safeSet(storageKey, savedState);
  return savedState;
}
function getState(){ return appState; }
function saveState(s){ appState = s; safeSet(storageKey, s); }

/* ---------- UI roots & routing ---------- */
const contentArea = document.getElementById("content-area");
const strategyFramework = document.getElementById("strategy-framework");
function setActiveTab(tab){
  document.querySelectorAll(".tab-button").forEach(btn => btn.classList.toggle("active", btn.dataset.tab === tab));
}
function router(){
  const hash = window.location.hash || "#/weeks";
  let tabToActivate = hash.startsWith("#/ops") ? "ops" : hash.replace("#/","");
  setActiveTab(tabToActivate);
  if (tabToActivate==="months" || tabToActivate==="weeks" || tabToActivate==="progress"){
    strategyFramework.classList.remove("hidden");
  } else {
    strategyFramework.classList.add("hidden");
  }
  if      (hash === "#/months")        renderMonths();
  else if (hash === "#/weeks")         renderWeeks();
  else if (hash === "#/progress")      renderProgress();
  else if (hash === "#/ops/inventory") renderInventorySimplePage();
  else if (hash === "#/ops/events")    renderEventsPage();
  else if (hash === "#/ops")           window.location.hash = "#/ops/inventory";
  else                                 window.location.hash = "#/weeks";
}

/* ---------- Months ---------- */
function goalRow(g){
  return `<div class="flex items-start gap-2 bg-white rounded-md p-2 shadow-sm">
    <input type="checkbox" data-goal-toggle="${g.id}" ${g.completed?"checked":""}>
    <p class="text-sm flex-1" contenteditable="true" data-goal-text="${g.id}">${g.text}</p>
  </div>`;
}
function renderMonths(){
  const s = getState();
  const html = s.editableMonths.map((month, idx) => {
    const m = idx+1;
    const goals = s.monthlyGoals.filter(g=>g.month===m);
    const done = goals.filter(g=>g.completed).length, total = goals.length, pct = total? Math.round((done/total)*100):0;
    return `
      <div class="card p-6 mb-4 brand-bg-champagne">
        <h3 class="text-xl font-bold mb-2 brand-text-petrol" contenteditable="true" data-editable-month-field="title" data-month="${m}">${month.title}</h3>
        <p class="font-medium mb-2">Skills:
          <span class="font-normal" contenteditable="true" data-editable-month-field="skills" data-month="${m}">${month.skills.join(", ")}</span>
        </p>
        <h4 class="font-medium mb-1">Key Tasks</h4>
        <ul class="list-disc list-inside mb-2">
          ${(Array.isArray(month.tasks)?month.tasks:[month.tasks]).map(t=>`<li contenteditable="true" class="mb-1" data-editable-month-field="tasks" data-month="${m}">${t}</li>`).join("")}
        </ul>
        <div class="mt-4">
          <div class="flex items-center justify-between mb-2">
            <p class="font-bold">Monthly Goals</p>
            <span class="text-sm text-gray-500">${done} of ${total} completed (${pct}%)</span>
          </div>
          <div id="goals-list-${m}" class="space-y-2">${goals.map(goalRow).join("")}</div>
          <div class="mt-3 flex gap-2">
            <input type="text" id="goal-input-${m}" class="flex-1 p-2 border rounded-md" placeholder="Add a new goal for Month ${m}…">
            <button class="px-3 py-2 rounded-md border border-gray-300 hover:bg-gray-50" data-add-goal="${m}">+ Add</button>
          </div>
        </div>
        <div class="mt-4 p-4 border-l-4 border-lime-500 bg-lime-50 text-lime-800 rounded-md">
          <p class="font-bold">Gate Criteria:</p>
          <p contenteditable="true" data-editable-month-field="gate" data-month="${m}">${month.gate}</p>
        </div>
      </div>`;
  }).join("");
  contentArea.innerHTML = html;

  [1,2,3].forEach((m)=>{
    const addBtn = contentArea.querySelector(`[data-add-goal="${m}"]`);
    addBtn.addEventListener("click", ()=>{
      const input = document.getElementById(`goal-input-${m}`);
      const text = (input.value||"").trim();
      if(!text) return;
      const st = getState();
      st.monthlyGoals.push({ id:`goal-${Date.now()}`, month:m, text, completed:false });
      saveState(st); renderMonths();
    });
  });

  contentArea.addEventListener("change",(e)=>{
    if(e.target.matches("[data-goal-toggle]")){
      const id = e.target.dataset.goalToggle;
      const st = getState();
      const g = st.monthlyGoals.find(x=>x.id===id);
      if(g){ g.completed = e.target.checked; saveState(st); renderMonths(); }
    }
  });

  contentArea.addEventListener("blur",(e)=>{
    if(e.target.matches("[data-goal-text]")){
      const id = e.target.dataset.goalText;
      const st = getState();
      const g = st.monthlyGoals.find(x=>x.id===id);
      if(g){ g.text = e.target.textContent.trim() || g.text; saveState(st); renderMonths(); }
    } else if (e.target.matches("[data-editable-month-field]")){
      const field = e.target.dataset.editableMonthField;
      const month = parseInt(e.target.dataset.month);
      const st = getState();
      const mObj = st.editableMonths[month-1];
      if(mObj){
        if(field==="skills"){
          mObj.skills = e.target.textContent.split(",").map(s=>s.trim());
        } else if (field==="tasks"){
          const ul = e.target.closest("ul");
          mObj.tasks = Array.from(ul.querySelectorAll("li")).map(li=>li.textContent.trim());
        } else {
          mObj[field] = e.target.textContent.trim();
        }
        saveState(st);
      }
    }
  }, true);
}

/* ---------- Weeks ---------- */
function taskSelectOptions(value, options){
  return options.map(o=>`<option value="${o}" ${value===o?"selected":""}>${o}</option>`).join("");
}
function renderTask(task){
  const daysOfWeek = ["None","Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
  const hasLink = !!(task.link && task.link.trim());
  return `
    <div class="task-item flex flex-col bg-white rounded-lg p-3 shadow-sm group relative" data-task-id="${task.id}" draggable="true">
      <div class="flex justify-between items-center mb-2">
        <div class="flex items-center gap-2">
          <input type="checkbox" data-task-id="${task.id}" ${task.completed?"checked":""} class="rounded text-petrol focus:ring-petrol no-week-select">
          <span class="w-3 h-3 rounded-full ${bucketColor(task.bucket)}"></span>
          <select data-task-id="${task.id}" data-field="bucket" class="text-xs border rounded p-1 no-week-select">
            ${taskSelectOptions(task.bucket, BUCKETS)}
          </select>
          <select data-task-id="${task.id}" data-field="effort" class="text-xs border rounded p-1 no-week-select">
            ${taskSelectOptions(task.effort, ["low","medium","high"])}
          </select>
          ${hasLink?`<span class="link-chip">link saved</span>`:""}
        </div>
        <div class="flex items-center gap-2">
          ${hasLink?`<button class="icon-btn text-xs" title="Open link" data-link-open="${task.id}"><i class="fa-solid fa-arrow-up-right-from-square"></i></button>`:""}
          <button class="icon-btn text-xs" title="Add/Edit link" data-link-edit="${task.id}"><i class="fa-solid fa-link"></i></button>
          <button class="text-gray-400 hover:text-red-500 delete-task opacity-0 group-hover:opacity-100 transition-opacity no-week-select" title="Delete">&times;</button>
        </div>
      </div>

      <p class="text-sm" contenteditable="true" data-field="description" data-task-id="${task.id}">${task.description}</p>

      <div class="flex items-center gap-2 mt-2 text-xs text-gray-500">
        <label for="due-day-${task.id}">Completed by:</label>
        <select id="due-day-${task.id}" data-task-id="${task.id}" data-field="dueDay" class="text-xs border rounded p-1 flex-1">
          ${taskSelectOptions(task.dueDay, daysOfWeek)}
        </select>
      </div>

      <div class="flex items-center gap-2 mt-2 text-xs text-gray-500">
        <label for="est-time-${task.id}">Est:</label>
        <input type="text" id="est-time-${task.id}" data-task-id="${task.id}" data-field="estimate" class="text-xs border rounded p-1 flex-1" value="${task.estimate || ""}">
      </div>

      <!-- Compact per-task link popover -->
      <div class="link-pop" id="link-pop-${task.id}">
        <div class="text-xs font-medium mb-1">Task Link</div>
        <input type="url" placeholder="https://…" class="w-full p-2 border rounded-md text-xs" value="${task.link ? task.link.replace(/"/g,"&quot;") : ""}" data-link-input="${task.id}">
        <div class="flex gap-2 mt-2">
          <button class="brand-bg-petrol text-white px-2 py-1 rounded-md text-xs" data-link-save="${task.id}">Save</button>
          <button class="px-2 py-1 rounded-md border text-xs" data-link-clear="${task.id}">Clear</button>
          <button class="px-2 py-1 rounded-md border text-xs ml-auto" data-link-close="${task.id}">Close</button>
        </div>
      </div>
    </div>`;
}
function renderWeeks(){
  const state = getState();
  const currentWeek = state.currentWeek;
  const allTasks = state.tasks || [];
  const expandedWeek = state.expandedWeek;

  if (expandedWeek !== null){
    const weekTasks = allTasks.filter(t=>t.week===expandedWeek);
    const weekDetails = state.weeklyDetails[expandedWeek] || {};
    const expandedHtml = `
      <div class="expanded-view card brand-bg-champagne">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-2xl font-bold brand-text-petrol">Week ${expandedWeek}</h2>
          <button id="back-to-grid" class="px-3 py-2 rounded-md border border-gray-300 hover:bg-gray-50">Back to all weeks</button>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <h3 class="font-bold">Weekly Goal</h3>
            <textarea id="weekly-goal" class="w-full p-2 border rounded-md" placeholder="Type your goal…">${weekDetails.goal||""}</textarea>
          </div>
          <div>
            <h3 class="font-bold">Top 3 Tasks</h3>
            <textarea id="top3-editor" class="w-full p-2 border rounded-md text-sm" placeholder="One per line…">${weekDetails.top3||""}</textarea>
          </div>
          <div>
            <h3 class="font-bold">Micro-KPIs</h3>
            <div class="space-y-2 text-sm mt-2">
              <div class="flex items-center space-x-2"><label>Sales:</label><input type="number" id="kpi-sales" class="w-16 p-1 border rounded-md text-sm no-week-select"></div>
              <div class="flex items-center space-x-2"><label>Reviews:</label><input type="number" id="kpi-reviews" class="w-16 p-1 border rounded-md text-sm no-week-select"></div>
              <div class="flex items-center space-x-2"><label>Leads:</label><input type="number" id="kpi-leads" class="w-16 p-1 border rounded-md text-sm no-week-select"></div>
              <div class="flex items-center space-x-2"><label>Spend:</label><input type="number" id="kpi-spend" class="w-16 p-1 border rounded-md text-sm no-week-select"></div>
              <p id="cpl-cpa-display" class="font-bold text-gray-700"></p>
            </div>
          </div>
          <div><h3 class="font-bold">Risks & Prep</h3><ul class="list-disc list-inside text-sm">
            <li><a href="#/ops/inventory" class="text-blue-600 underline">Inventory Tracker</a></li>
            <li><a href="#/ops/events" class="text-blue-600 underline">Event Pipeline</a></li>
          </ul></div>
          <div>
            <h3 class="font-bold">Budget Planner</h3>
            <div class="space-y-2 text-sm">
              <div class="flex items-center space-x-2"><label>Ads:</label><input type="number" id="budget-ads" class="w-16 p-1 border rounded-md text-sm no-week-select"></div>
              <div class="flex items-center space-x-2"><label>Events:</label><input type="number" id="budget-events" class="w-16 p-1 border rounded-md text-sm no-week-select"></div>
              <div id="budget-warning" class="text-red-600 text-xs hidden"></div>
            </div>
          </div>
          <div><h3 class="font-bold">Admin</h3>
            <button id="btn-hard-reset" class="mt-2 text-sm px-3 py-2 rounded-md border border-gray-300 hover:bg-gray-50">Reset to clean plan</button>
          </div>
        </div>
        <div class="mt-6">
          <h4 class="font-bold text-sm">Tasks for this week</h4>
          <div id="task-list-${expandedWeek}" class="space-y-2 mt-2 drop-zone" data-week="${expandedWeek}">
            ${weekTasks.map(renderTask).join("")}
          </div>
          <button class="mt-2 text-sm px-3 py-2 rounded-md border border-gray-300 hover:bg-gray-50 add-task no-week-select" data-week="${expandedWeek}">+ Add Task</button>
        </div>
      </div>`;
    contentArea.innerHTML = expandedHtml;
    document.getElementById("back-to-grid").addEventListener("click", ()=>{
      const s = getState(); s.expandedWeek = null; saveState(s); router();
    });
  } else {
    const weeksGridHtml = `
      <h2 class="text-2xl font-bold mb-4 text-center brand-text-petrol">WEEKLY PLAYBOOK</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        ${Array.from({length:12},(_,i)=>i+1).map(weekNum=>{
          const weekTasks = allTasks.filter(t=>t.week===weekNum);
          const isCurrent = weekNum===currentWeek;
          const gateHtml = [4,8,12].includes(weekNum) ? `<div class="absolute top-2 right-2 bg-lime-500 text-white text-xs px-2 py-1 rounded-md">Gate</div>` : "";
          const weekDetails = getState().weeklyDetails[weekNum] || {};
          return `
            <div class="card p-4 relative ${isCurrent?"border-4":""}" style="${isCurrent?"border-color: var(--brand-petrol);":""}" data-select-week="${weekNum}">
              ${gateHtml}
              <div class="flex justify-between items-center mb-2">
                <h3 class="font-bold text-lg brand-text-petrol">Week ${weekNum}</h3>
                <span class="text-xs px-2 py-1 rounded-md bg-gray-100 text-gray-700">${weekTasks.length} task${weekTasks.length===1?"":"s"}</span>
              </div>
              <div class="space-y-4">
                <div><h4 class="font-bold text-sm">Weekly Goal</h4>
                  <p class="text-sm" contenteditable="true" data-field="goal" data-week="${weekNum}">${weekDetails.goal||""}</p></div>
                <div><h4 class="font-bold text-sm">Why it matters</h4>
                  <p class="text-sm" contenteditable="true" data-field="why" data-week="${weekNum}">${weekDetails.why||""}</p></div>
                <div>
                  <h4 class="font-bold text-sm">Tasks</h4>
                  <div id="task-list-${weekNum}" class="space-y-2 mt-2 drop-zone" data-week="${weekNum}">
                    ${weekTasks.map(renderTask).join("")}
                  </div>
                  <button class="mt-2 text-sm px-3 py-2 rounded-md border border-gray-300 hover:bg-gray-50 add-task no-week-select" data-week="${weekNum}">+ Add Task</button>
                </div>
                <div><h4 class="font-bold text-sm">Prep for next month</h4>
                  <p class="text-sm mt-2" contenteditable="true" data-field="prep" data-week="${weekNum}">${weekDetails.prep||""}</p></div>
                <div><h4 class="font-bold text-sm">Success criteria</h4>
                  <p class="text-sm mt-2" contenteditable="true" data-field="success" data-week="${weekNum}">${weekDetails.success||""}</p></div>
                <div><h4 class="font-bold text-sm">Micro-KPI targets</h4>
                  <ul class="list-disc list-inside text-sm mt-2" contenteditable="true" data-field="targets" data-week="${weekNum}">
                    ${Object.entries(weekDetails.targets||{}).map(([k,v])=>`<li>${k[0].toUpperCase()+k.slice(1)}: ${v}</li>`).join("")}
                  </ul></div>
                <div><h4 class="font-bold text-sm">Dependencies</h4>
                  <p class="text-sm mt-2" contenteditable="true" data-field="dependencies" data-week="${weekNum}">${weekDetails.dependencies||""}</p></div>
              </div>
            </div>`;
        }).join("")}
      </div>`;
    contentArea.innerHTML = weeksGridHtml;
    updateWeeklyFocusPanel();
    setupTaskListeners();
    setupWeeklyDetailsListeners();
  }
  document.getElementById("btn-hard-reset")?.addEventListener("click", ()=>{
    localStorage.removeItem(storageKey); location.reload();
  });
}

/* ---------- Progress ---------- */
function renderProgress(){
  const s = getState(), allTasks = s.tasks, buckets = BUCKETS;
  const bucketCards = buckets.map(bucket=>{
    const bucketTasks = allTasks.filter(t=>t.bucket===bucket);
    const completed = bucketTasks.filter(t=>t.completed).length, total=bucketTasks.length;
    const progress = total? Math.round((completed/total)*100):0;
    return `
      <div class="card p-4 mb-4">
        <div class="flex items-center justify-between mb-2">
          <h3 class="text-xl font-bold brand-text-petrol">${bucket}</h3>
          <div class="text-sm text-gray-500">${completed} of ${total} tasks completed (${progress}%)</div>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-2.5 mb-4"><div class="bg-petrol h-2.5 rounded-full" style="width:${progress}%"></div></div>
        <div class="space-y-4 mt-4">
          ${bucketTasks.map(task=>{
            const weeklyGoal = (s.weeklyDetails[task.week]||{}).goal || "No specific weekly goal.";
            const linkBadge = task.link ? `<a href="${task.link}" target="_blank" rel="noopener noreferrer" class="link-chip inline-block ml-2">open link</a>` : "";
            return `<div class="flex items-start">
              <input type="checkbox" data-task-id="${task.id}" ${task.completed?"checked":""} class="mt-1 mr-2">
              <div class="flex-grow"><p class="font-medium">${task.description}${linkBadge}</p>
              <p class="text-xs text-gray-500 italic mt-1">Why: ${weeklyGoal}</p></div></div>`;
          }).join("")}
        </div>
      </div>`;
  }).join("");

  const months = [1,2,3];
  const goalsCards = months.map(m=>{
    const goals = s.monthlyGoals.filter(g=>g.month===m);
    const done = goals.filter(g=>g.completed).length, total=goals.length, pct = total? Math.round((done/total)*100):0;
    return `<div class="card p-4">
      <div class="flex items-center justify-between"><h4 class="font-bold">Month ${m} Goals</h4><span class="text-sm text-gray-500">${done}/${total} (${pct}%)</span></div>
      <div class="mt-2 space-y-2">
        ${goals.map(g=>`<div class="flex items-start gap-2"><input type="checkbox" data-goal-toggle="${g.id}" ${g.completed?"checked":""}><div class="text-sm">${g.text}</div></div>`).join("")}
      </div>
    </div>`;
  }).join("");

  contentArea.innerHTML = `
    <div class="card p-6 mb-8 brand-bg-champagne">
      <h2 class="text-2xl font-bold brand-text-petrol mb-4">Progress Dashboard</h2>
      <p class="text-sm text-gray-600 mb-6">Track your progress across strategy buckets and monthly goals.</p>
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">${goalsCards}</div>
      ${bucketCards}
    </div>`;
  setupTaskListeners();
  contentArea.addEventListener("change",(e)=>{
    if(e.target.matches("[data-goal-toggle]")){
      const id = e.target.dataset.goalToggle;
      const st = getState();
      const g = st.monthlyGoals.find(x=>x.id===id);
      if(g){ g.completed = e.target.checked; saveState(st); }
    }
  });
}

/* ---------- Inventory (simple) ---------- */
function invSimpleRow(item){
  return `<tr class="border-t border-gray-200 ${item.delayed?"bg-yellow-50":""}">
    <td class="p-2" contenteditable="true" data-field="category" data-id="${item.id}">${item.category}</td>
    <td class="p-2" contenteditable="true" data-field="notes" data-id="${item.id}">${item.notes||""}</td>
    <td class="p-2" contenteditable="true" data-field="cost" data-id="${item.id}">${item.cost||0}</td>
    <td class="p-2" contenteditable="true" data-field="supplier" data-id="${item.id}">${item.supplier||""}</td>
    <td class="p-2">${item.link?`<a href="${item.link}" target="_blank" rel="noopener noreferrer" class="text-blue-600 underline">Open</a>`:"—"}</td>
    <td class="p-2">
      <button class="text-xs px-2 py-1 rounded-md ${item.delayed?"bg-yellow-600 text-white":"bg-gray-200 text-gray-700"}" data-toggle-delayed="${item.id}">
        ${item.delayed?"Delayed":"On Track"}
      </button>
    </td>
    <td class="p-2"><button class="text-gray-400 hover:text-red-500" title="Delete" data-del-inv="${item.id}">&times;</button></td>
  </tr>`;
}
function renderInventorySimplePage(){
  const { inventorySimple=[] } = getState();
  contentArea.innerHTML = `
    <div id="ops-inventory-simple">
      <div class="flex items-center justify-between mb-2">
        <h2 class="text-2xl font-bold brand-text-petrol">Inventory (High-Level)</h2>
        <div class="flex gap-2"><a href="#/ops/inventory" class="tab-button active">Inventory</a><a href="#/ops/events" class="tab-button">Events</a></div>
      </div>
      <form id="add-inv-simple" class="card p-4 mb-6">
        <h3 class="text-xl font-semibold mb-2">Add Item</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
          <input id="inv-cat" class="p-2 border rounded-md" placeholder="Category" required>
          <input id="inv-notes" class="p-2 border rounded-md" placeholder="Notes">
          <input id="inv-cost" type="number" class="p-2 border rounded-md" placeholder="Rough Cost ($)">
          <input id="inv-supplier" class="p-2 border rounded-md" placeholder="Supplier">
          <input id="inv-link" type="url" class="p-2 border rounded-md" placeholder="Supplier Link (optional)">
        </div>
        <div class="mt-3 flex items-center gap-3">
          <label class="flex items-center gap-2 text-sm"><input type="checkbox" id="inv-delayed"> Mark as Delayed</label>
          <button class="ml-auto brand-bg-petrol text-white px-4 py-2 rounded-md hover:scale-105" type="submit">Add Item</button>
        </div>
      </form>
      <div class="card p-4 overflow-x-auto">
        <table class="w-full text-left table-auto">
          <thead><tr class="brand-text-petrol"><th class="p-2">Category</th><th class="p-2">Notes</th><th class="p-2">Rough Cost</th><th class="p-2">Supplier</th><th class="p-2">Link</th><th class="p-2">Status</th><th class="p-2"></th></tr></thead>
          <tbody id="inv-simple-body" class="text-sm">${inventorySimple.map(invSimpleRow).join("")}</tbody>
        </table>
      </div>
    </div>`;
  document.getElementById("add-inv-simple").addEventListener("submit",(e)=>{
    e.preventDefault();
    const st = getState();
    st.inventorySimple.push({
      id:`inv-${Date.now()}`,
      category:document.getElementById("inv-cat").value.trim(),
      notes:document.getElementById("inv-notes").value.trim(),
      cost:parseFloat(document.getElementById("inv-cost").value)||0,
      supplier:document.getElementById("inv-supplier").value.trim(),
      link:document.getElementById("inv-link").value.trim(),
      delayed:document.getElementById("inv-delayed").checked,
    });
    saveState(st); renderInventorySimplePage();
  });
  const tbody = document.getElementById("inv-simple-body");
  tbody.addEventListener("blur",(e)=>{
    const id = e.target.dataset.id, field = e.target.dataset.field;
    if(!id || !field) return;
    const st = getState();
    const it = st.inventorySimple.find(x=>x.id===id);
    if(it){
      it[field] = field==="cost" ? (parseFloat(e.target.textContent.trim())||0) : e.target.textContent.trim();
      saveState(st);
    }
  }, true);
  tbody.addEventListener("click",(e)=>{
    if(e.target.matches("[data-del-inv]")){
      const id = e.target.dataset.delInv;
      const st = getState();
      st.inventorySimple = st.inventorySimple.filter(x=>x.id!==id);
      saveState(st); renderInventorySimplePage();
    }
    if(e.target.matches("[data-toggle-delayed]")){
      const id = e.target.dataset.toggleDelayed;
      const st = getState();
      const it = st.inventorySimple.find(x=>x.id===id);
      if(it){ it.delayed = !it.delayed; saveState(st); renderInventorySimplePage(); }
    }
  });
}

/* ---------- Events (simplified CRUD) ---------- */
function eventCard(ev, column){
  const dateStr = ev.dateISO ? new Date(ev.dateISO).toLocaleDateString() : "";
  const delayedBadge = ev.delayed?`<span class="badge bg-yellow-600 text-white ml-2">Delayed</span>`:"";
  return `<div class="card p-3">
    <div class="font-semibold flex items-center"><span contenteditable="true" data-ev-field="name" data-id="${ev.id}" data-col="${column}">${ev.name||"Untitled Event"}</span>${delayedBadge}</div>
    <div class="text-sm text-gray-500"><span contenteditable="true" data-ev-field="city" data-id="${ev.id}" data-col="${column}">${ev.city||""}</span> - $<span contenteditable="true" data-ev-field="fee" data-id="${ev.id}" data-col="${column}">${ev.fee||0}</span></div>
    <div class="text-xs text-gray-400">${dateStr}</div>
    <div class="mt-2 text-sm">
      <div>Target Leads: <span contenteditable="true" data-ev-field="targetLeads" data-id="${ev.id}" data-col="${column}">${ev.targetLeads||0}</span></div>
      <div class="mt-1 text-xs text-gray-600">Notes:</div>
      <div class="text-xs" contenteditable="true" data-ev-field="notes" data-id="${ev.id}" data-col="${column}">${ev.notes||""}</div>
    </div>
    <div class="flex items-center justify-between mt-2">
      <label class="text-xs flex items-center gap-1"><input type="checkbox" ${ev.delayed?"checked":""} data-ev-toggle-delayed="${ev.id}" data-col="${column}"> Delayed</label>
      <div class="flex items-center gap-2">
        <label class="text-sm">Move to:</label>
        <select data-event-id="${ev.id}" data-current-column="${column}" class="text-sm p-1 border rounded-md move-event-select">
          ${["prospects","applied","confirmed","thisMonth","past"].map(c=>`<option value="${c}" ${c===column?"disabled":""}>${c==="thisMonth"?"This Month":(c[0].toUpperCase()+c.slice(1))}</option>`).join("")}
        </select>
        <button class="text-gray-400 hover:text-red-500" title="Delete" data-ev-del="${ev.id}" data-col="${column}">&times;</button>
      </div>
    </div>
  </div>`;
}
function renderEventsPage(){
  const s = getState();
  const today = new Date();
  ["prospects","applied","confirmed","thisMonth"].forEach(k=>{
    s.eventPipeline[k] = (s.eventPipeline[k]||[]).filter(ev=>{
      if(ev.dateISO && new Date(ev.dateISO) < today){
        (s.eventPipeline.past ||= []).push(ev);
        return false;
      }
      return true;
    });
  });
  saveState(s);

  contentArea.innerHTML = `
    <div id="ops-events">
      <div class="flex items-center justify-between">
        <h2 class="text-2xl font-bold brand-text-petrol">Event Pipeline</h2>
        <div class="flex gap-2"><a href="#/ops/inventory" class="tab-button">Inventory</a><a href="#/ops/events" class="tab-button active">Events</a></div>
      </div>
      <form id="add-event-form" class="card p-4 mb-8">
        <h3 class="text-xl font-semibold mb-2">Add New Event</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" id="add-event-name" placeholder="Event Name" class="p-2 border rounded-md" required>
          <input type="text" id="add-event-city" placeholder="City" class="p-2 border rounded-md">
          <input type="number" id="add-event-fee" placeholder="Fee ($)" class="p-2 border rounded-md">
          <input type="number" id="add-event-target-leads" placeholder="Target Leads" class="p-2 border rounded-md">
        </div>
        <textarea id="add-event-notes" placeholder="Notes" class="w-full p-2 border rounded-md mt-4"></textarea>
        <div class="mt-3 flex items-center gap-3">
          <label class="flex items-center gap-2 text-sm"><input type="checkbox" id="add-event-delayed"> Mark as Delayed</label>
          <button type="submit" class="brand-bg-petrol text-white p-3 rounded-md mt-1 hover:scale-105">Add Event</button>
        </div>
      </form>
      <div class="flex flex-col md:flex-row gap-4 overflow-x-auto pb-4">
        ${["prospects","applied","confirmed","thisMonth","past"].map(col=>`
          <div class="kanban-column flex-shrink-0 w-full md:w-1/5">
            <h3 class="text-lg font-bold brand-text-petrol">${col==="thisMonth"?"This Month":(col[0].toUpperCase()+col.slice(1))}</h3>
            <div class="bg-gray-200 rounded-xl p-3 h-full space-y-3" id="kanban-${col}">
              ${(s.eventPipeline[col]||[]).map(ev=>eventCard(ev,col)).join("")}
            </div>
          </div>`).join("")}
      </div>
    </div>`;
  document.getElementById("add-event-form").addEventListener("submit",(e)=>{
    e.preventDefault();
    const st = getState();
    const ev = {
      id:`event-${Date.now()}`,
      name:document.getElementById("add-event-name").value,
      city:document.getElementById("add-event-city").value,
      fee:parseInt(document.getElementById("add-event-fee").value||"0",10),
      targetLeads:parseInt(document.getElementById("add-event-target-leads").value||"0",10),
      notes:document.getElementById("add-event-notes").value,
      delayed:document.getElementById("add-event-delayed").checked,
    };
    (st.eventPipeline.prospects ||= []).push(ev);
    saveState(st); renderEventsPage(); e.target.reset();
  });
  contentArea.addEventListener("change",(e)=>{
    if(e.target.matches(".move-event-select")){
      const st = getState();
      const id = e.target.dataset.eventId;
      const from = e.target.dataset.currentColumn;
      const to = e.target.value;
      const idx = (st.eventPipeline[from]||[]).findIndex(x=>x.id===id);
      if(idx>-1){
        const [ev] = st.eventPipeline[from].splice(idx,1);
        if(to==="thisMonth" && !ev.dateISO){
          const d = new Date(); ev.dateISO = new Date(d.getFullYear(), d.getMonth(), 15).toISOString();
        }
        (st.eventPipeline[to] ||= []).push(ev);
        saveState(st); renderEventsPage();
      }
    }
    if(e.target.matches("[data-ev-toggle-delayed]")){
      const id = e.target.dataset.evToggleDelayed, col = e.target.dataset.col;
      const st = getState();
      const ev = (st.eventPipeline[col]||[]).find(x=>x.id===id);
      if(ev){ ev.delayed = !ev.delayed; saveState(st); renderEventsPage(); }
    }
  });
  contentArea.addEventListener("blur",(e)=>{
    if(e.target.matches("[data-ev-field]")){
      const id = e.target.dataset.id, col = e.target.dataset.col, field = e.target.dataset.evField;
      const st = getState();
      const ev = (st.eventPipeline[col]||[]).find(x=>x.id===id);
      if(ev){
        const nv = e.target.textContent.trim();
        ev[field] = ["fee","targetLeads"].includes(field) ? (parseInt(nv,10)||0) : nv;
        saveState(st);
      }
    }
  }, true);
  contentArea.addEventListener("click",(e)=>{
    if(e.target.matches("[data-ev-del]")){
      const id = e.target.dataset.evDel, col = e.target.dataset.col;
      const st = getState();
      st.eventPipeline[col] = (st.eventPipeline[col]||[]).filter(x=>x.id!==id);
      saveState(st); renderEventsPage();
    }
  });
}

/* ---------- Weekly details listeners ---------- */
function setupWeeklyDetailsListeners(){
  const content = document.getElementById("content-area");
  content.addEventListener("blur",(e)=>{
    const field = e.target.dataset.field, weekNum = e.target.dataset.week;
    if(field && weekNum){
      const s = getState();
      if(!s.weeklyDetails[weekNum]) s.weeklyDetails[weekNum]={};
      if(field==="targets"){
        const items = e.target.querySelectorAll("li");
        const targets = {};
        items.forEach(li=>{
          const [k,v]=li.textContent.split(":");
          if(k&&v) targets[k.trim().toLowerCase()] = v.trim();
        });
        s.weeklyDetails[weekNum][field]=targets;
      } else {
        s.weeklyDetails[weekNum][field]=e.target.textContent;
      }
      saveState(s);
    }
  }, true);
}

/* ---------- Tasks listeners (incl. link UI) ---------- */
function setupTaskListeners(){
  const content = document.getElementById("content-area");
  const dropZones = content.querySelectorAll(".drop-zone");

  // Drag & drop
  dropZones.forEach(zone=>{
    zone.addEventListener("dragover",(e)=>{ e.preventDefault(); zone.classList.add("hovered"); });
    zone.addEventListener("dragleave",()=> zone.classList.remove("hovered"));
    zone.addEventListener("drop",(e)=>{
      e.preventDefault(); zone.classList.remove("hovered");
      const draggedId = e.dataTransfer.getData("text/plain");
      const dropTarget = e.target.closest(".task-item");
      const targetDropZone = e.target.closest(".drop-zone");
      if(!draggedId || !targetDropZone) return;
      const targetWeek = parseInt(targetDropZone.dataset.week,10);
      const s = getState();
      const draggedIdx = s.tasks.findIndex(t=>t.id===draggedId);
      const dragged = s.tasks[draggedIdx];
      if(dragged.week !== targetWeek) dragged.week = targetWeek;
      if(dropTarget){
        const targetIdx = s.tasks.findIndex(t=>t.id===dropTarget.dataset.taskId);
        const [rm] = s.tasks.splice(draggedIdx,1);
        s.tasks.splice(targetIdx,0,rm);
      } else {
        const [rm] = s.tasks.splice(draggedIdx,1);
        let lastIdx = -1;
        for(let i=0;i<s.tasks.length;i++) if(s.tasks[i].week===targetWeek) lastIdx = i;
        if(lastIdx===-1) s.tasks.push(rm); else s.tasks.splice(lastIdx+1,0,rm);
      }
      saveState(s); router();
    });
  });

  document.querySelectorAll(".task-item").forEach(item=>{
    item.addEventListener("dragstart",(e)=>{
      e.dataTransfer.setData("text/plain", item.dataset.taskId);
      item.classList.add("dragging");
    });
    item.addEventListener("dragend",()=> item.classList.remove("dragging"));
  });

  // Checkbox & selects
  content.addEventListener("change",(e)=>{
    if(e.target.type==="checkbox" && e.target.dataset.taskId){
      const s = getState();
      const t = s.tasks.find(x=>x.id===e.target.dataset.taskId);
      if(t){ t.completed = e.target.checked; saveState(s); router(); }
    }
    if(e.target.tagName==="SELECT" && e.target.dataset.taskId){
      const s = getState();
      const t = s.tasks.find(x=>x.id===e.target.dataset.taskId);
      if(t){
        if(e.target.dataset.field==="bucket")  t.bucket  = e.target.value;
        if(e.target.dataset.field==="effort")  t.effort  = e.target.value;
        if(e.target.dataset.field==="dueDay")  t.dueDay  = e.target.value;
        saveState(s); router();
      }
    }
  });

  // Delete task
  content.addEventListener("click",(e)=>{
    if(e.target.classList.contains("delete-task")){
      const s = getState();
      s.tasks = s.tasks.filter(t=>t.id !== e.target.closest("[data-task-id]").dataset.taskId);
      saveState(s); router();
    }
  });

  // Add task
  content.addEventListener("click",(e)=>{
    const btn = e.target.closest(".add-task");
    if(!btn) return;
    const week = parseInt(btn.dataset.week,10);
    const s = getState();
    const existsDraft = s.tasks.find(t=>t.week===week && t.description==="New task…");
    if(existsDraft){
      const el = document.querySelector(`[data-task-id="${existsDraft.id}"][data-field="description"]`);
      if(el) el.focus();
      return;
    }
    const newTask = {
      id:`custom-${Date.now()}`, week, bucket:BUCKETS[0],
      description:"New task…", effort:"low", tags:[], completed:false, dueDay:"", estimate:"", link:"", meta:{isNew:true},
    };
    s.tasks.push(newTask); saveState(s); router();
    requestAnimationFrame(()=>{
      const el = document.querySelector(`[data-task-id="${newTask.id}"][data-field="description"]`);
      if(el){
        el.focus();
        const r = document.createRange(); r.selectNodeContents(el); r.collapse(false);
        const sel = window.getSelection(); sel.removeAllRanges(); sel.addRange(r);
      }
    });
  });

  // Edit description / estimate
  content.addEventListener("blur",(e)=>{
    const field = e.target.dataset.field;
    if(field==="description" || field==="estimate"){
      const s = getState();
      const id = e.target.dataset.taskId;
      const t = s.tasks.find(x=>x.id===id);
      if(!t) return;
      if(field==="description"){
        const text = e.target.textContent.trim();
        if(!text){
          s.tasks = s.tasks.filter(task=>task.id!==id);
          saveState(s); router(); return;
        }
        t.description = text;
        if(t.meta?.isNew) t.meta.isNew = false;
      } else if (field==="estimate"){
        t.estimate = e.target.value?.trim?.() || e.target.textContent.trim();
      }
      saveState(s);
    }
  }, true);

  /* ---- Per-task LINK UI ---- */
  content.addEventListener("click",(e)=>{
    if(e.target.closest("[data-link-edit]")){
      const id = e.target.closest("[data-link-edit]").dataset.linkEdit;
      document.querySelectorAll(".link-pop").forEach(p=>p.classList.remove("show"));
      const pop = document.getElementById(`link-pop-${id}`); pop?.classList.add("show");
      const input = pop?.querySelector(`[data-link-input="${id}"]`); input?.focus();
    }
    if(e.target.closest("[data-link-close]")){
      const id = e.target.closest("[data-link-close]").dataset.linkClose;
      document.getElementById(`link-pop-${id}`)?.classList.remove("show");
    }
  });
  content.addEventListener("click",(e)=>{
    if(e.target.closest("[data-link-save]")){
      const id = e.target.closest("[data-link-save]").dataset.linkSave;
      const input = content.querySelector(`[data-link-input="${id}"]`);
      const url = (input?.value||"").trim();
      const s = getState();
      const t = s.tasks.find(x=>x.id===id);
      if(t){ t.link = url; saveState(s); router(); }
    }
  });
  content.addEventListener("click",(e)=>{
    if(e.target.closest("[data-link-clear]")){
      const id = e.target.closest("[data-link-clear]").dataset.linkClear;
      const s = getState();
      const t = s.tasks.find(x=>x.id===id);
      if(t){ t.link = ""; saveState(s); router(); }
    }
  });
  content.addEventListener("click",(e)=>{
    if(e.target.closest("[data-link-open]")){
      const id = e.target.closest("[data-link-open]").dataset.linkOpen;
      const s = getState();
      const t = s.tasks.find(x=>x.id===id);
      if(t?.link) window.open(t.link,"_blank","noopener,noreferrer");
    }
  });
  document.addEventListener("click",(e)=>{
    const pop = e.target.closest(".link-pop");
    const openBtn = e.target.closest("[data-link-edit]");
    if(!pop && !openBtn){
      document.querySelectorAll(".link-pop").forEach(p=>p.classList.remove("show"));
    }
  });
}

/* ---------- Focus panel helpers ---------- */
function updateWeeklyFocusPanel(){
  const s = getState();
  const w = s.expandedWeek || s.currentWeek;
  const goalEl = document.getElementById("weekly-goal");
  const top3El = document.getElementById("top3-editor");
  const kS = document.getElementById("kpi-sales"),
        kR = document.getElementById("kpi-reviews"),
        kL = document.getElementById("kpi-leads"),
        kSp= document.getElementById("kpi-spend");
  const bA = document.getElementById("budget-ads"),
        bE = document.getElementById("budget-events");
  if(kS) kS.value = s.kpis[w]?.sales || "";
  if(kR) kR.value = s.kpis[w]?.reviews || "";
  if(kL) kL.value = s.kpis[w]?.leads || "";
  if(kSp) kSp.value = s.kpis[w]?.spend || "";
  if(bA) bA.value = s.budgets?.ads || "";
  if(bE) bE.value = s.budgets?.events || "";
  updateKPIs(); checkBudgetWarning();
  if(goalEl) goalEl.addEventListener("input",()=>{ const st=getState(); (st.weeklyDetails[w] ||= {}).goal = goalEl.value; saveState(st); });
  if(top3El) top3El.addEventListener("input",()=>{ const st=getState(); (st.weeklyDetails[w] ||= {}).top3 = top3El.value; saveState(st); });
  document.getElementById("focus-week-select")?.addEventListener("change",(e)=> setCurrentWeek(e.target.value));
  document.getElementById("content-area").addEventListener("input",(e)=>{ if(e.target.id?.startsWith("kpi-")) updateKPIs(); if(e.target.id?.startsWith("budget-")) checkBudgetWarning(); });
  document.getElementById("content-area").addEventListener("change",(e)=>{ if(e.target.id?.startsWith("kpi-")) updateKPIs(); if(e.target.id?.startsWith("budget-")) checkBudgetWarning(); });
}
function updateKPIs(){
  const s = getState();
  const w = s.expandedWeek || s.currentWeek;
  const sales = +(document.getElementById("kpi-sales")?.value||0),
        reviews = +(document.getElementById("kpi-reviews")?.value||0),
        leads = +(document.getElementById("kpi-leads")?.value||0),
        spend = +(document.getElementById("kpi-spend")?.value||0);
  const cpl = leads>0 ? (spend/leads).toFixed(2) : "N/A";
  const cpa = sales>0 ? (spend/sales).toFixed(2) : "N/A";
  const out = document.getElementById("cpl-cpa-display");
  if(out) out.innerHTML = `Weekly CPL: $${cpl}<br>Weekly CPA: $${cpa}`;
  s.kpis[w] = { sales, reviews, leads, spend }; saveState(s);
}
function checkBudgetWarning(){
  const ads = +(document.getElementById("budget-ads")?.value||0),
        events = +(document.getElementById("budget-events")?.value||0);
  const warning = document.getElementById("budget-warning");
  if(!warning) return;
  const remaining = 750 - (ads + events);
  if(remaining < 0){
    warning.textContent = `Warning: This week's Ads+Events budget ($${ads+events}) exceeds the remaining monthly budget.`;
    warning.classList.remove("hidden");
  } else {
    warning.classList.add("hidden");
  }
}
function setCurrentWeek(week){
  const s = getState();
  s.currentWeek = Math.max(1, Math.min(12, parseInt(week,10)||1));
  saveState(s); router();
}

/* ---------- App boot ---------- */
document.addEventListener("DOMContentLoaded", ()=>{
  appState = loadState();

  document.getElementById("tabbar").addEventListener("click",(e)=>{
    const btn = e.target.closest(".tab-button");
    if(!btn) return;
    const route = btn.dataset.route;
    if(route) window.location.hash = route;
  });

  document.getElementById("content-area").addEventListener("click",(e)=>{
    const card = e.target.closest("[data-select-week]");
    if(card && !e.target.closest("select,input,textarea,button,[contenteditable]")){
      const s = getState();
      s.expandedWeek = parseInt(card.dataset.selectWeek,10);
      saveState(s); router();
    }
  });

  document.querySelector("header").addEventListener("blur",(e)=>{
    const field = e.target.dataset.field;
    if(field === "main-title"){
      document.title = e.target.textContent + " - Sales Playbook";
    }
  }, true);

  if(!location.hash) location.hash = "#/weeks";
  window.addEventListener("hashchange", router);
  router();
});

/* ---------- DnD hotfix wrapper ---------- */
(function(){
  const _renderWeeks = window.renderWeeks;
  if (typeof _renderWeeks !== "function") return;
  window.renderWeeks = function(){
    _renderWeeks();
    try {
      const s = window.getState ? window.getState() : null;
      if(s && s.expandedWeek !== null && typeof window.setupTaskListeners === "function"){
        window.setupTaskListeners();
      }
    } catch (e) { console.warn("Expanded-week DnD hotfix fallback:", e); }
  };
})();

/* ===== Export/Import HTML snapshot buttons ===== */
(function () {
  const LOCAL_KEY = (typeof window.storageKey === "string" && window.storageKey) || "mg_state";
  const SEED_TAG_ID = "mg-seed";
  const statusMessageEl = document.getElementById('status-message');
  const statusTextEl = document.getElementById('status-text');

  function showStatus(message, isError=false){
    statusTextEl.textContent = message;
    statusTextEl.className = isError
      ? "px-4 py-2 rounded-md shadow-sm text-sm bg-red-100 text-red-700"
      : "px-4 py-2 rounded-md shadow-sm text-sm bg-green-100 text-green-700";
    statusMessageEl.style.display = 'block';
    setTimeout(()=>{ statusMessageEl.style.display = 'none'; }, 3000);
  }

  function timestamp(){
    const d = new Date(); const pad = n=>String(n).padStart(2,"0");
    return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}_${pad(d.getHours())}-${pad(d.getMinutes())}-${pad(d.getSeconds())}`;
  }

  async function exportHtmlSnapshot(){
    try {
      const stateRaw = localStorage.getItem(LOCAL_KEY) ?? "{}";
      const safeJson = stateRaw.replace(/</g,"\\u003c").replace(/<\/script>/gi,"<\\/script>");
      const doc = document.documentElement.outerHTML;
      const seedTag = `<script id="${SEED_TAG_ID}" type="application/json">`;
      const SEED_RE = new RegExp(`<script id="${SEED_TAG_ID}"[^>]*>[\\s\\S]*?<\\/script>`,'i');
      const HEAD_RE = /<\/head>/i;
      let html;
      if(SEED_RE.test(doc)){ html = doc.replace(SEED_RE, `${seedTag}${safeJson}</script>`); }
      else { html = doc.replace(HEAD_RE, `${seedTag}${safeJson}</script>\n</head>`); }
      const blob = new Blob([html], { type:"text/html" });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = `momentum_gems_snapshot_${timestamp()}.html`;
      a.style.display = "none"; document.body.appendChild(a); a.click();
      setTimeout(()=>{ URL.revokeObjectURL(a.href); a.remove(); },0);
      showStatus("Export successful!");
    } catch (err) {
      console.error("Export HTML failed:", err);
      showStatus("Export failed. Check console for details.", true);
    }
  }

  function importHtmlFromClipboard(){
    if(!navigator.clipboard || !navigator.clipboard.readText){
      console.error("Clipboard API not supported");
      showStatus("Clipboard access is not supported by your browser.", true);
      return;
    }
    navigator.clipboard.readText().then(clipboardText=>{
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = clipboardText;
      const seedScript = tempDiv.querySelector(`#${SEED_TAG_ID}`);
      if(seedScript && seedScript.textContent && seedScript.textContent.trim().length > 2){
        try{
          const state = JSON.parse(seedScript.textContent);
          if(state){
            console.log("State found in clipboard. Applying...");
            localStorage.setItem(LOCAL_KEY, JSON.stringify(state));
            window.location.reload();
            return;
          }
        } catch(e){
          console.error("Failed to parse state from clipboard data:", e);
          showStatus("Import failed: Clipboard content is not valid.", true);
          return;
        }
      }
      console.log("No saved state found in clipboard data.");
      showStatus("Import failed: No valid state found in clipboard.", true);
    }).catch(err=>{
      console.error('Failed to read clipboard contents: ', err);
      showStatus("Import failed: Could not read from clipboard.", true);
    });
  }

  document.getElementById("mg-export-html-btn")?.addEventListener("click", exportHtmlSnapshot);
  document.getElementById("mg-import-html-btn")?.addEventListener("click", importHtmlFromClipboard);
})();
