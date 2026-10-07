/* ============================================================
   "The Cut", Michael Adenuga portfolio
   ------------------------------------------------------------
   TO EDIT THE SITE, YOU ONLY TOUCH THE CONFIG BLOCK BELOW.
   ============================================================ */

const CONFIG = {
  // Where the "Work with me" button sends people.
  // CHANGE this to whichever inbox should receive enquiries.
  contactEmail: "michealadenugaceo@gmail.com",
  emailSubject: "Project enquiry: let's work together",
  emailBody:
    "Hi Michael,\n\nHere's what I need edited:\n- \n\nRough idea / goal:\n- \n\nLink to my footage:\n- \n",
};

/* ------------------------------------------------------------
   TESTIMONIALS = client testimonial videos, shown in their own spot
   at the very top of the work area. Self-hosted (videoUrl) items with a
   corner badge. The whole section auto-hides while this array is empty.
------------------------------------------------------------ */
const TESTIMONIALS = [
  {
    videoUrl:
      "https://pub-ecf6d65a25964c34a5b0f7870ddc40db.r2.dev/Adetutu%20Michael%20Adenuga%20Testimonial.mp4",
    vertical: false,
    badge: "Client testimonial",
    caption: "<b>Adetutu Olatawura</b>: a client testimonial on the results of working together.",
  },
];

/* ------------------------------------------------------------
   FEATURED = the 16:9 WIDE ROW (long-form pieces + landscape clips), in display order.
   ------------------------------------------------------------
   Each tile needs:
     youtubeId : the part after v= / youtu.be/ / shorts/
     category  : "Long Form" | "Short Form"
     vertical  : true for 9:16 shorts, false/omit for 16:9
     caption   : outcome-first sentence. Bold the lead with <b></b>.
     poster    : OPTIONAL. A custom exported frame in /assets.
                 If omitted, the YouTube still is used as a placeholder
                , replace with your own sharp frame when you can.
------------------------------------------------------------ */
const FEATURED = [
  {
    videoUrl: "https://pub-ecf6d65a25964c34a5b0f7870ddc40db.r2.dev/dog-dental-care.mp4",
    category: "Long Form",
    caption: "<b>Dog dental care</b>: a long-form explainer on preventing serious dental problems in dogs.",
  },
  {
    videoUrl: "https://pub-ecf6d65a25964c34a5b0f7870ddc40db.r2.dev/robs-401k-business.mp4",
    category: "Long Form",
    caption: "<b>ROBS & your 401(k)</b>: a long-form explainer on using retirement funds to buy a business.",
  },
  {
    youtubeId: "sFqe0MSV3Os",
    category: "Long Form",
    caption: "<b>Marvella Visuals</b>: a product-showcase edit built to sell through organic, dropshipping-style content.",
  },
  {
    youtubeId: "ES2K6upVleI",
    category: "Long Form",
    caption: "<b>Long-form ad</b>: a paid spot edited to hold attention all the way to the call to action.",
  },
  {
    videoUrl: "https://pub-ecf6d65a25964c34a5b0f7870ddc40db.r2.dev/gut-health-4-ways.mp4",
    category: "Long Form",
    caption: "<b>Angell K, gut health</b>: a long-form how-to edit that turns four simple steps into an easy-to-follow wellness guide.",
  },
  {
    videoUrl: "https://pub-ecf6d65a25964c34a5b0f7870ddc40db.r2.dev/gut-health-importance.mp4",
    category: "Long Form",
    caption: "<b>Angell K, gut health</b>: a long-form explainer edit that makes the science of the gut clear and easy to follow.",
  },
  {
    youtubeId: "9ao9nTWHqF8",
    category: "Long Form",
    caption: "<b>StrideDaily</b>: a long-form supplement promo edited to build everyday energy and recovery into a clear reason to buy.",
  },
  {
    videoUrl: "https://pub-ecf6d65a25964c34a5b0f7870ddc40db.r2.dev/unchained.mp4",
    category: "Long Form",
    caption: "<b>Unchained</b>: a long-form edit that converted 13 small businesses into sign-ups.",
  },
  {
    videoUrl: "https://pub-ecf6d65a25964c34a5b0f7870ddc40db.r2.dev/creg-acton.mp4",
    category: "Long Form",
    caption: "<b>Creg Acton</b>: a talking-head edit that keeps a personal brand sharp on camera.",
  },
  {
    videoUrl: "https://pub-ecf6d65a25964c34a5b0f7870ddc40db.r2.dev/tom-bolan.mp4",
    category: "Long Form",
    caption: "<b>Tom Bolan</b>: a talking-head edit paced to hold attention start to finish.",
  },
];

/* ------------------------------------------------------------
   MORE WORK = the 9:16 REELS, best first. Paste new reels here.
   Same shape as FEATURED. The whole section auto-hides while
   this array is empty, so there's never any dead space.

   Example (delete the // and fill in real values):
   { youtubeId: "ABC123xyz", category: "Short Form", vertical: true,
     caption: "<b>Client, project</b>: what the edit accomplished." },
------------------------------------------------------------ */
const MORE_WORK = [
  {
    videoUrl:
      "https://pub-ecf6d65a25964c34a5b0f7870ddc40db.r2.dev/Don't%20just%20pay%20and%20leave.mp4",
    category: "Short Form",
    vertical: true,
    caption: "<b>Don't just pay and leave</b>: a hook-first short that stops the scroll in the opening line.",
  },
  {
    videoUrl:
      "https://pub-ecf6d65a25964c34a5b0f7870ddc40db.r2.dev/First%20cleaning%20in%203%20days.mp4",
    category: "Short Form",
    vertical: true,
    caption: "<b>First cleaning in 3 days</b>: a fast-paced short cut to turn a service offer into bookings.",
  },
  {
    videoUrl: "https://pub-ecf6d65a25964c34a5b0f7870ddc40db.r2.dev/ram-construction.mp4",
    category: "Short Form",
    vertical: true,
    caption: "<b>RAM Construction</b>: a site-showcase short cut to make on-the-ground project progress look sharp and shareable.",
  },
  {
    videoUrl: "https://pub-ecf6d65a25964c34a5b0f7870ddc40db.r2.dev/personal-brand.mp4",
    category: "Short Form",
    vertical: true,
    caption: "<b>Personal brand</b>: a short built to make a founder look credible on camera.",
  },
  {
    videoUrl: "https://pub-ecf6d65a25964c34a5b0f7870ddc40db.r2.dev/coconu-talking-head.mp4",
    category: "Short Form",
    vertical: true,
    caption: "<b>Coconu</b>: a talking-head brand short built to sell without feeling like an ad.",
  },
  {
    videoUrl: "https://pub-ecf6d65a25964c34a5b0f7870ddc40db.r2.dev/coconu-tiktok.mp4",
    category: "Short Form",
    vertical: true,
    caption: "<b>Coconu, TikTok-style</b>: a fast, native-feeling cut made for the For You feed.",
  },
  {
    youtubeId: "lzibABBw4lQ",
    category: "Short Form",
    vertical: true,
    caption: "<b>Granite vs. Quartz</b>: a comparison short that helps buyers choose.",
  },
  {
    videoUrl: "https://pub-ecf6d65a25964c34a5b0f7870ddc40db.r2.dev/stone-faq.mp4",
    category: "Short Form",
    vertical: true,
    caption: "<b>Stone FAQ</b>: an explainer short answering a common customer question.",
  },
  {
    youtubeId: "BTwvn0d1a3o",
    category: "Short Form",
    vertical: true,
    caption: "<b>StrideDaily</b>: a supplement promo short cut to sell everyday energy and recovery in under a minute.",
  },
  {
    videoUrl: "https://pub-ecf6d65a25964c34a5b0f7870ddc40db.r2.dev/stonework-field.mp4",
    category: "Short Form",
    vertical: true,
    caption: "<b>Stonework in the field</b>: a product short for a countertop brand.",
  },
  {
    youtubeId: "fd-5IefQShE",
    category: "Short Form",
    vertical: true,
    caption: "<b>Brand sample reel</b>: a short-form cut built to stop the scroll.",
  },
  {
    videoUrl: "https://pub-ecf6d65a25964c34a5b0f7870ddc40db.r2.dev/fraud-watch-360.mp4",
    category: "Short Form",
    vertical: true,
    caption: "<b>Michael, Fraud Watch 360</b>: a launch short that drove 50+ sign-ups for a brand-new startup.",
  },
  {
    videoUrl: "https://pub-ecf6d65a25964c34a5b0f7870ddc40db.r2.dev/ready-force.mp4",
    category: "Short Form",
    vertical: true,
    caption: "<b>Ready Force</b>: a short-form promo cut for quick impact.",
  },
  {
    videoUrl: "https://pub-ecf6d65a25964c34a5b0f7870ddc40db.r2.dev/delta-house.mp4",
    category: "Short Form",
    vertical: true,
    caption: "<b>Delta House</b>: a short-form brand cut.",
  },
  {
    youtubeId: "PWozJHyVILE",
    category: "Short Form",
    vertical: true,
    caption: "<b>Waterfall edges</b>: a how-it's-done short for a stone fabrication brand.",
  },
  {
    videoUrl: "https://pub-ecf6d65a25964c34a5b0f7870ddc40db.r2.dev/steve-harvey.mp4",
    category: "Short Form",
    vertical: true,
    caption: "<b>Steve Harvey</b>: a short-form cut that rides a big personality for maximum retention.",
  },
  {
    videoUrl: "https://pub-ecf6d65a25964c34a5b0f7870ddc40db.r2.dev/make-gains.mp4",
    category: "Short Form",
    vertical: true,
    caption: "<b>Make Gains</b>: a fitness short cut to keep energy high and viewers watching.",
  },
  {
    youtubeId: "AvreK4dcKCI",
    category: "Short Form",
    vertical: true,
    caption: "<b>Behind the scenes</b>: a workshop short that builds trust in the brand.",
  },
  {
    videoUrl: "https://pub-ecf6d65a25964c34a5b0f7870ddc40db.r2.dev/seizure-prevention.mp4",
    category: "Short Form",
    vertical: true,
    caption: "<b>Seizure Prevention</b>: a health explainer short that makes a serious topic easy to follow.",
  },
  {
    videoUrl: "https://pub-ecf6d65a25964c34a5b0f7870ddc40db.r2.dev/realtor-tip.mp4",
    category: "Short Form",
    vertical: true,
    caption: "<b>Realtor tip</b>: a quick-value short for a real-estate audience.",
  },
];

/* ============================================================
   Below this line: rendering logic. No need to edit.
   ============================================================ */

// Embed params:
//   autoplay/playsinline — start on click, play inline on iPhone
//   cc_load_policy=0      — don't force captions on (CC stays off by default)
//   iv_load_policy=3      — hide annotation cards
//   rel=0                 — keep end-screen "related" videos to this channel only
//   modestbranding=1      — minimal YouTube branding (logo still shows; deprecated but harmless)
//   vq=hd1080             — best-effort hint to start at high quality (YouTube ultimately
//                           adapts to player size + bandwidth; the large player already favours HD)
const YT_EMBED = (id) =>
  `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&playsinline=1&rel=0&controls=1&iv_load_policy=3&cc_load_policy=0&modestbranding=1&vq=hd1080`;

// YouTube still as placeholder poster (maxres, falling back to hq for shorts).
const posterFor = (item) =>
  item.poster || `https://i.ytimg.com/vi/${item.youtubeId}/maxresdefault.jpg`;

// Site-wide rule: only one video plays at a time. `activeStop` resets whichever
// tile is currently playing back to its poster (removing the iframe stops it).
let activeStop = null;
function stopActiveVideo() {
  if (activeStop) {
    activeStop();
    activeStop = null;
  }
}

function buildTile(item) {
  const tile = document.createElement("article");
  tile.className = "tile";
  tile.dataset.cat = item.category;

  const facade = document.createElement("div");
  facade.className = "facade" + (item.vertical ? " facade--vertical" : "");

  // Self-hosted / direct-URL video (e.g. a client reel exported to a CDN).
  // Uses a <video> element instead of a YouTube facade. Set videoUrl to the
  // .mp4 (and optionally poster: an image in /assets) in the data arrays.
  if (item.videoUrl) {
    const vAlt = item.caption.replace(/<[^>]+>/g, "");
    const video = document.createElement("video");
    video.className = "facade__video";
    // Without a poster image, "#t=1" nudges the browser to paint a ~1s frame
    // as the still shown before playback.
    video.src = item.poster ? item.videoUrl : item.videoUrl + "#t=1";
    if (item.poster) video.poster = item.poster;
    video.preload = "metadata";
    video.playsInline = true;
    video.setAttribute("aria-label", vAlt);

    const vShade = document.createElement("div");
    vShade.className = "facade__shade";

    const vPlay = document.createElement("button");
    vPlay.className = "facade__play";
    vPlay.type = "button";
    vPlay.setAttribute("aria-label", "Play video: " + vAlt);

    const vStop = () => {
      video.pause();
      video.removeAttribute("controls");
      facade.classList.remove("is-playing");
    };
    const vActivate = () => {
      stopActiveVideo();            // one video at a time, site-wide
      video.setAttribute("controls", "");
      facade.classList.add("is-playing");
      const p = video.play();
      if (p && p.catch) p.catch(() => {});
      video.focus();
      activeStop = vStop;
    };
    vPlay.addEventListener("click", vActivate);
    facade.addEventListener("click", (e) => {
      if (e.target !== vPlay && e.target !== video) vActivate();
    });

    facade.append(video, vShade, vPlay);
    if (item.badge) {
      const vBadge = document.createElement("span");
      vBadge.className = "facade__badge";
      vBadge.textContent = item.badge;
      facade.appendChild(vBadge);
    }

    const vCaption = document.createElement("p");
    vCaption.className = "tile__caption";
    vCaption.innerHTML = item.caption;
    tile.append(facade, vCaption);
    return tile;
  }

  const img = document.createElement("img");
  img.className = "facade__poster";
  img.src = posterFor(item);
  img.loading = "lazy";
  img.alt = item.caption.replace(/<[^>]+>/g, "");
  // Shorts often lack a maxres still, fall back to hqdefault.
  img.onerror = () => {
    if (!img.dataset.fallback) {
      img.dataset.fallback = "1";
      img.src = `https://i.ytimg.com/vi/${item.youtubeId}/hqdefault.jpg`;
    }
  };

  const shade = document.createElement("div");
  shade.className = "facade__shade";

  const play = document.createElement("button");
  play.className = "facade__play";
  play.type = "button";
  play.setAttribute("aria-label", "Play video: " + img.alt);

  // Removing the iframe stops playback and brings the poster + play button back.
  const stop = () => {
    const frame = facade.querySelector("iframe");
    if (frame) frame.remove();
    facade.classList.remove("is-playing");
  };

  const activate = () => {
    stopActiveVideo();          // stop any other playing video first (one-at-a-time)
    const iframe = document.createElement("iframe");
    iframe.src = YT_EMBED(item.youtubeId);
    iframe.title = img.alt;
    iframe.allow =
      "accelerated-feedback; autoplay; encrypted-media; picture-in-picture; web-share";
    iframe.setAttribute("allowfullscreen", "");
    facade.appendChild(iframe);
    facade.classList.add("is-playing");
    iframe.focus();
    activeStop = stop;          // remember how to stop this one
  };

  play.addEventListener("click", activate);
  facade.addEventListener("click", (e) => {
    if (e.target !== play) activate();
  });

  facade.append(img, shade, play);
  // Optional corner label. Only the transformation tiles use it (Raw / Finished);
  // work-grid tiles omit it since the captions already say what they are.
  if (item.badge) {
    const badge = document.createElement("span");
    badge.className = "facade__badge";
    badge.textContent = item.badge;
    facade.appendChild(badge);
  }

  const caption = document.createElement("p");
  caption.className = "tile__caption";
  caption.innerHTML = item.caption;

  tile.append(facade, caption);
  return tile;
}

function renderGrid(containerId, items) {
  const grid = document.getElementById(containerId);
  if (!grid) return;
  grid.innerHTML = "";
  items.forEach((item) => grid.appendChild(buildTile(item)));
}

function wireFilter(filterEl) {
  const grid = document.getElementById(filterEl.dataset.filterFor);
  if (!grid) return;
  filterEl.addEventListener("click", (e) => {
    const chip = e.target.closest(".chip");
    if (!chip) return;
    filterEl.querySelectorAll(".chip").forEach((c) => c.classList.remove("is-active"));
    chip.classList.add("is-active");
    const cat = chip.dataset.cat;
    grid.querySelectorAll(".tile").forEach((tile) => {
      tile.hidden = cat !== "All" && tile.dataset.cat !== cat;
    });
  });
}

function wireCtas() {
  const href =
    `mailto:${CONFIG.contactEmail}` +
    `?subject=${encodeURIComponent(CONFIG.emailSubject)}` +
    `&body=${encodeURIComponent(CONFIG.emailBody)}`;
  document.querySelectorAll("[data-cta]").forEach((el) => {
    el.setAttribute("href", href);
  });
}

function wireScrollReveal() {
  const els = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    els.forEach((el) => el.classList.add("is-in"));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "0px 0px -10% 0px", threshold: 0.08 }
  );
  els.forEach((el) => io.observe(el));
}

function wireStickyNav() {
  const nav = document.getElementById("nav");
  if (!nav) return;
  // The nav sits below the hero and is position: sticky. It "lights up"
  // (glass background) only once it pins to the very top of the viewport.
  const onScroll = () => nav.classList.toggle("is-stuck", nav.getBoundingClientRect().top <= 0);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

// Cursor-follow "light up": track the pointer over interactive elements so
// the glow gradient (CSS) blooms from wherever the cursor is.
function wireGlow() {
  const move = (e) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", ((e.clientX - r.left) / r.width) * 100 + "%");
    el.style.setProperty("--my", ((e.clientY - r.top) / r.height) * 100 + "%");
  };
  document
    .querySelectorAll(".btn, .chip, .facade, .transform__tab")
    .forEach((el) => el.addEventListener("pointermove", move));
}

document.addEventListener("DOMContentLoaded", () => {
  // Client testimonials get their own spot at the top; hide it if empty.
  renderGrid("testimonial-grid", TESTIMONIALS);
  const testiSection = document.getElementById("testimonials");
  if (testiSection) testiSection.hidden = TESTIMONIALS.length === 0;

  // Two aspect-based grids: 16:9 pieces (wide row) first, 9:16 reels below.
  renderGrid("work-long-grid", FEATURED);
  renderGrid("work-short-grid", MORE_WORK);

  document.querySelectorAll(".filter").forEach(wireFilter);
  wireCtas();
  wireScrollReveal();
  wireStickyNav();
  wireGlow();

  const yr = document.getElementById("year");
  if (yr) yr.textContent = new Date().getFullYear();
});
