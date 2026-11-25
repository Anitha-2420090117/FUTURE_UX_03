# Design Rationale: ClientLoop, CRM / Client Management Dashboard

**Goal:** give a small agency a single place to see who needs attention today, move leads through a pipeline, understand a client at a glance and never miss a follow-up.
**Users:** account leads and founders at a 5 to 15 person B2B agency. Fictional product and data.
**Platform:** web dashboard, designed at 1440px wide with a responsive fallback.

## 1. Real-world agency use cases
| Role | Question they ask every morning | Where the design answers it |
|---|---|---|
| Founder | "Are we on track for the month?" | Overview KPIs, revenue chart, funnel |
| Account lead | "Who do I need to call today?" | "Needs attention" list, Tasks view |
| Sales lead | "What stage is each deal in?" | Pipeline board |
| Account manager | "Is this client happy?" | Client list health bars, client profile |

## 2. Information architecture
```
Overview  |  Pipeline  |  Clients -> Client profile  |  Tasks
```
Four top-level destinations match four jobs: *monitor*, *move deals*, *know a client*, *act on follow-ups*. The profile is one level below Clients, and the Clients item stays highlighted while you are inside it.

## 3. Screen decisions

### Overview
- **Four KPIs at the top** (open pipeline value, new leads, win rate, follow-ups due), each with a trend. The number is large, the context is small.
- **Needs attention** is placed above the fold on purpose. Overdue and due-today items are the highest-value content in a CRM, and the red/amber pills create urgency without extra text.
- A **funnel** (instead of a pie chart) shows where leads drop off. Bars are easy to compare and read at a glance.
- Revenue chart uses one colour with the latest month at full strength, so the current month stands out without a legend.

### Lead pipeline (status-based stages)
- **Kanban columns:** New, Contacted, Proposal, Won, Lost. Columns map to how agencies actually talk about deals.
- Each column header shows **count and total value**, so the user sees where the money is.
- Deal cards show only what is needed to decide: deal name, company, value, due date and owner. Overdue dates turn red.
- **Drag and drop** between stages (working in the prototype) matches the mental model of "moving" a deal and replaces a multi-step edit form.

### Client list
- A table is the right pattern for comparing many records on shared attributes.
- **Health indicator** (three-bar meter) plus **last contact** turns the list into a risk radar. A client with low health and a stale contact date is visible in one scan.
- Status filter chips (All, Active, At risk, On hold) are one tap and show the current filter clearly.
- Whole rows are clickable, so users don't have to find a small "View" link.

### Client profile and engagement status
- Header holds identity, status and **primary actions** (Email, Log call, + Task), which are the three things done most often.
- **Left column** is reference data (contacts, owner, value, source). **Right column** is the story: a stage tracker and an activity timeline.
- An **engagement** panel (health, last contact, email opens) ends with a **suggested next step**, so the screen answers "what should I do?" and not only "what is the status?".
- Timeline is reverse-chronological. The newest event, "proposal opened 3 times", is the most useful signal and appears first.

### Task tracker and reminders
- Tasks are grouped by **Overdue, Today, Upcoming**, which reflects how people plan their day better than a flat list sorted by date.
- Each task shows the related client, so context is never lost.
- Checkbox completion works in the prototype, with strikethrough and reduced opacity as feedback.
- A **follow-up reminders** side panel surfaces *automatic* nudges (no reply in 9 days, invoice unpaid, renewal approaching) that a human might forget.

## 4. Usability principles applied
- **Hierarchy:** KPIs first, then problems, then detail.
- **Recognition over recall:** colour-coded status pills are used identically on every screen.
- **Consistency:** the same pill, avatar and card components appear across all views.
- **Efficiency:** drag and drop, clickable rows, one-tap filters.
- **Feedback:** hover states, drop-target highlight, completed-task styling.
- **Colour with meaning:** red means overdue or risk, amber means due soon, green means healthy or won, indigo is the brand and selection colour.

## 5. Visual design
| Element | Choice | Why |
|---|---|---|
| Dark sidebar and light content area | Separates navigation from work, and lets cards and data stand out |
| Indigo `#4f46e5` | Modern B2B SaaS feel, distinct from status colours |
| Inter | Tabular-friendly numerals for money and counts |
| 14px radius, light borders, almost no shadows | Calm density, suited to long working sessions |

## 6. Responsive behaviour
- Below 1100px, KPI cards go to 2 columns and two-column layouts stack.
- Below 820px, the sidebar becomes a horizontal tab strip and the board scrolls sideways.

## 7. Accessibility
- Status is conveyed by text labels as well as colour.
- Contrast of text on pills and cards meets AA; interactive elements have clear hover and focus states.

## 8. How success would be measured
1. Time to find "who do I follow up with today" (target under 10 seconds).
2. Percentage of overdue tasks week over week.
3. Pipeline hygiene: deals with a stage change in the last 14 days.
4. Task completion rate.

## 9. Notes
- All clients, deals and numbers are fictional sample data.
- The prototype runs in the browser; changes (dragging a deal, ticking a task) reset on refresh.
