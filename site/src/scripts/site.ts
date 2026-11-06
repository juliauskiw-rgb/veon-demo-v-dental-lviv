// Behaviour of the homepage. Everything works as plain content if this file does not run.
const wide = window.matchMedia("(min-width: 60rem)");

/* Routes: tabs on a wide screen, an accordion on a phone. */
const grid = document.querySelector<HTMLElement>("[data-routes]");
if (grid) {
  const buttons = [...grid.querySelectorAll<HTMLButtonElement>(".routes__btn")];
  const panelOf = (b: HTMLButtonElement) => document.getElementById(b.getAttribute("aria-controls") ?? "");
  const set = (b: HTMLButtonElement, open: boolean) => {
    b.setAttribute("aria-expanded", String(open));
    panelOf(b)?.classList.toggle("is-open", open);
  };
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const wasOpen = button.getAttribute("aria-expanded") === "true";
      if (wasOpen && wide.matches) return;
      grid.classList.remove("is-switching");
      buttons.forEach((b) => set(b, false));
      if (wasOpen) return;
      set(button, true);
      void grid.offsetWidth;
      grid.classList.add("is-switching");
      if (!wide.matches) {
        const header = document.querySelector<HTMLElement>(".site-header")?.offsetHeight ?? 0;
        const top = button.getBoundingClientRect().top;
        if (top < header) window.scrollBy({ top: top - header - 8, behavior: "auto" });
      }
    });
  });
}

/* Price groups fold on a phone; on a wide screen every group stays open. */
document.querySelectorAll<HTMLElement>("[data-pg]").forEach((group) => {
  const toggle = group.querySelector<HTMLButtonElement>(".pg__toggle");
  if (!toggle) return;
  const close = (closed: boolean) => {
    group.classList.toggle("is-closed", closed);
    toggle.setAttribute("aria-expanded", String(!closed));
  };
  if (group.classList.contains("is-closable")) close(true);
  toggle.addEventListener("click", () => close(!group.classList.contains("is-closed")));
});

/* Current section on the mini route. */
const links = [...document.querySelectorAll<HTMLAnchorElement>(".mini-route__list a")];
const marker = document.querySelector<HTMLElement>(".mini-route__marker");
let current: HTMLAnchorElement | undefined;
const placeMarker = () => {
  if (!marker) return;
  marker.classList.toggle("is-on", Boolean(current));
  if (current) marker.style.setProperty("--marker-x", `${current.offsetLeft}px`);
};
const setCurrent = (id: string) => {
  // The proof block has no menu item: it belongs to the doctors step.
  const target = id === "proof" ? "doctors" : id;
  current = links.find((a) => a.hash === `#${target}`);
  links.forEach((a) => (a === current ? a.setAttribute("aria-current", "true") : a.removeAttribute("aria-current")));
  placeMarker();
};
const sections = [...document.querySelectorAll<HTMLElement>("main section[id]")];
const spy = new IntersectionObserver((entries) => {
  entries.forEach((e) => { if (e.isIntersecting) setCurrent(e.target.id); });
}, { rootMargin: "-45% 0px -50% 0px" });
sections.forEach((s) => spy.observe(s));
window.addEventListener("resize", placeMarker);
void document.fonts?.ready.then(placeMarker);

/* Phone menu: closes after a choice, on Esc and on a tap outside. */
const menu = document.querySelector<HTMLDetailsElement>("[data-mnav]");
if (menu) {
  menu.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => { menu.open = false; }));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && menu.open) {
      menu.open = false;
      menu.querySelector("summary")?.focus();
    }
  });
  document.addEventListener("click", (e) => {
    if (menu.open && !menu.contains(e.target as Node)) menu.open = false;
  });
}

/* Call bar: visible only between the hero and contacts. */
const bar = document.querySelector<HTMLElement>("[data-callbar]");
const hero = document.getElementById("hero");
const contacts = document.getElementById("contacts");
if (bar && hero && contacts) {
  const seen = new Map<Element, boolean>();
  const watch = new IntersectionObserver((entries) => {
    entries.forEach((e) => seen.set(e.target, e.isIntersecting));
    bar.classList.toggle("is-on", !seen.get(hero) && !seen.get(contacts));
  });
  watch.observe(hero);
  watch.observe(contacts);
}

/* FutureLink note: stays on screen and also answers a tap. */
document.querySelectorAll<HTMLElement>(".future-link").forEach((link) => {
  const note = link.querySelector<HTMLElement>(".future-link__note");
  if (!note) return;
  const fit = () => {
    link.style.removeProperty("--note-x");
    const over = note.getBoundingClientRect().right + 8 - document.documentElement.clientWidth;
    if (over > 0) link.style.setProperty("--note-x", `${-over}px`);
  };
  link.addEventListener("pointerenter", fit);
  link.addEventListener("focus", fit);
  link.addEventListener("click", () => {
    fit();
    link.classList.add("is-tapped");
    window.setTimeout(() => link.classList.remove("is-tapped"), 1800);
  });
});
