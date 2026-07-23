# Leak Assessment — Prep Email

**Trigger:** Fires automatically after someone books a Leak Assessment call via [the Livingry booking link](https://calendar.app.google/4UfTY4vavUc7iQBT6). Google Calendar sends its own confirmation separately (date, time, video/call link) — this email does not repeat calendar logistics. Its only job is to prime the prospect so the 45–60 minutes actually earns its keep.

**Send timing:** Immediately after booking (same automation trigger as the calendar confirmation, sent as a separate message).

**From:** OV, Livingry Services <ov@livingry.services>
**Reply-to:** ov@livingry.services

---

## Subject line

**Primary:** Before our call — how to make the most of it

**Alternates:**
1. Quick prep for your Leak Assessment call
2. What to have ready before we talk

---

## Preheader (~90 characters)

No slides, no pitch — just a focused look at where your business may be leaking value.

*(88 characters)*

---

## Body copy

*The copy below is written to read cleanly with all HTML styling stripped — plain paragraphs, no reliance on bold/color to carry meaning. A conceptual plain-text version follows the HTML-formatted version at the bottom of this document; the wording is identical.*

---

### HTML-formatted version

**Hi [First Name],**

You're booked. Here's what to expect, and how to get the most out of it.

This isn't a sales call. For the next 45 to 60 minutes, my only job is to find out — honestly — whether there's a real leak in your business worth sealing, and if there is, what the smallest useful fix would look like. If there isn't, I'll tell you that directly. Either way, you'll leave with a clear, specific answer instead of a vague pitch.

**What we'll walk through together**

We follow the same structure on every call, regardless of industry, so nothing about this is improvised:

1. **Scope** — a few minutes to confirm what's going on and what a useful conversation looks like for you.
2. **Symptoms** — the leaks you already notice: missed calls, cold estimates, past customers gone quiet, and so on.
3. **Signals** — a live look together at your website, your Google Business Profile, and a recent lost job, so we're working from evidence, not memory.
4. **Systems** — naming the one or two leaks that matter most, and what closing the highest-value one could look like.
5. **Next steps** — exactly what I'll send you, and what I'll need back from you, by what date.

**What to have ready**

No prep is required. But the more of the following you can bring, the more the call gives you back:

- The URL of your website
- Access to your CRM or lead list, or the ability to share your screen showing it
- One recent lost job you're comfortable walking through, start to finish
- Honest answers about who actually owns what right now — phone, CRM, website, follow-up. "Nobody, really" is a completely fine answer.

If you can only bring one of these, bring the lost job. A single real example tells us more than a general description ever could.

**What we won't do on this call**

- We won't diagnose everything in one sitting or hand you a list of tools to go buy. A Leak Assessment finds the highest-value leak — not every leak.
- We won't tell you what you want to hear to keep the conversation moving. If we're not the right fit, or if now isn't the right time, we'll say so.
- If your practice is legal or medical, we won't offer legal or clinical advice, and we won't propose anything that touches professional judgment. Those conversations happen only inside a governed pilot, with the right privacy and compliance controls in place first.

**If plans change**

Life happens. You can reschedule directly through [the booking link](https://calendar.app.google/4UfTY4vavUc7iQBT6), or just reply to this email and I'll sort it out with you.

Talk soon,

**OV**
Founder, Livingry Services
An independent practice · Lecanto, FL
ov@livingry.services · [livingry-services.vercel.app](https://livingry-services.vercel.app)

---

### Plain-text version

```
Hi [First Name],

You're booked. Here's what to expect, and how to get the most out of it.

This isn't a sales call. For the next 45 to 60 minutes, my only job is
to find out -- honestly -- whether there's a real leak in your business
worth sealing, and if there is, what the smallest useful fix would look
like. If there isn't, I'll tell you that directly. Either way, you'll
leave with a clear, specific answer instead of a vague pitch.

WHAT WE'LL WALK THROUGH TOGETHER

We follow the same structure on every call, regardless of industry, so
nothing about this is improvised:

1. Scope -- a few minutes to confirm what's going on and what a useful
   conversation looks like for you.
2. Symptoms -- the leaks you already notice: missed calls, cold
   estimates, past customers gone quiet, and so on.
3. Signals -- a live look together at your website, your Google
   Business Profile, and a recent lost job, so we're working from
   evidence, not memory.
4. Systems -- naming the one or two leaks that matter most, and what
   closing the highest-value one could look like.
5. Next steps -- exactly what I'll send you, and what I'll need back
   from you, by what date.

WHAT TO HAVE READY

No prep is required. But the more of the following you can bring, the
more the call gives you back:

- The URL of your website
- Access to your CRM or lead list, or the ability to share your screen
  showing it
- One recent lost job you're comfortable walking through, start to
  finish
- Honest answers about who actually owns what right now -- phone, CRM,
  website, follow-up. "Nobody, really" is a completely fine answer.

If you can only bring one of these, bring the lost job. A single real
example tells us more than a general description ever could.

WHAT WE WON'T DO ON THIS CALL

- We won't diagnose everything in one sitting or hand you a list of
  tools to go buy. A Leak Assessment finds the highest-value leak --
  not every leak.
- We won't tell you what you want to hear to keep the conversation
  moving. If we're not the right fit, or if now isn't the right time,
  we'll say so.
- If your practice is legal or medical, we won't offer legal or
  clinical advice, and we won't propose anything that touches
  professional judgment. Those conversations happen only inside a
  governed pilot, with the right privacy and compliance controls in
  place first.

IF PLANS CHANGE

Life happens. You can reschedule directly through the booking link
below, or just reply to this email and I'll sort it out with you.

Reschedule: https://calendar.app.google/4UfTY4vavUc7iQBT6

Talk soon,

OV
Founder, Livingry Services
An independent practice -- Lecanto, FL
ov@livingry.services
https://livingry-services.vercel.app
```

---

## Notes for implementation

- **Reschedule link:** uses the same booking link ([calendar.app.google/4UfTY4vavUc7iQBT6](https://calendar.app.google/4UfTY4vavUc7iQBT6)) since no separate reschedule URL was provided. If a dedicated reschedule/cancel link exists in the Google Calendar confirmation, swap it in.
- **Reply-to** is ov@livingry.services so "reply to this email" is literally true — no noreply address.
- **No dollar figures, no turnaround-time promises, no urgency language** anywhere in this email, consistent with the framework's own boundaries.
- **Governed Pilot line** only needs to render for legal/medical bookings if the booking flow captures vertical; otherwise it's harmless boilerplate for HVAC/roofing prospects too, since it correctly describes a boundary rather than claiming an active service.
- Terminology matches the framework and site exactly: **Leak**, **Seal**, **Leak Assessment**, **governed pilot** — no "growth lever," "unlock," or similar substitutions.
