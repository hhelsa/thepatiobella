/**
 * Intro gate: prevents the flash of hero content between the server-rendered
 * paint and the first GSAP frame, without making content depend on JS.
 *
 * - An inline <head> script sets `data-motion-intro` on <html>, only when
 *   JS runs and the visitor has not asked for reduced motion.
 * - CSS hides `[data-intro]` elements while that attribute is present.
 * - The hero's useGSAP() sets its from-states, then calls releaseIntro().
 * - A failsafe timer removes the attribute anyway, so content can never stay
 *   hidden if hydration fails or is slow. Without JS nothing is ever hidden.
 * - An intro longer than the failsafe calls claimIntro() as soon as its
 *   timeline exists; the failsafe then leaves the gate to releaseIntro().
 *
 * Only mark elements with `data-intro` inside a component that calls
 * releaseIntro(); everything else should animate from its visible state or
 * sit below the fold.
 */
export const INTRO_ATTR = "data-motion-intro";
const CLAIM_ATTR = "data-motion-claimed";
const FAILSAFE_MS = 2500;

export const introGateScript = `(function(){try{if(window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;var h=document.documentElement;h.setAttribute("${INTRO_ATTR}","");setTimeout(function(){if(!h.hasAttribute("${CLAIM_ATTR}"))h.removeAttribute("${INTRO_ATTR}")},${FAILSAFE_MS})}catch(e){}})();`;

/** True while the gate is up (JS running, motion allowed, not yet released). */
export function introPending(): boolean {
  return document.documentElement.hasAttribute(INTRO_ATTR);
}

/** Take over the gate from the failsafe; the caller must releaseIntro(). */
export function claimIntro(): void {
  document.documentElement.setAttribute(CLAIM_ATTR, "");
}

export function releaseIntro(): void {
  document.documentElement.removeAttribute(INTRO_ATTR);
  document.documentElement.removeAttribute(CLAIM_ATTR);
}
