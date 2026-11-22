/**
 * Type-level English verb conjugation.
 *
 * A `Verb` is its base (dictionary) form plus optional surface overrides for the
 * forms English spelling can't derive mechanically (irregular pasts, consonant
 * doubling, suppletive `be`). When an override is absent, the regular orthographic
 * rules below compute the surface from the base — entirely at the type level, so
 * `ConjugateVerb<Walk, "Past">` *resolves* to the string literal `"walked"`.
 *
 * This mirrors Typed Japanese's `ConjugateVerb`: every constructor evaluates to the
 * real surface form, which is what the analyzer reads back from the compiler.
 */

export type Vowel = "a" | "e" | "i" | "o" | "u";

/**
 * A verb. Only `base` is required. Supply an override whenever the regular rule
 * would be wrong:
 *  - `past` / `pastParticiple` — irregular or suppletive (go→went→gone)
 *  - `ing` — consonant doubling or e-drop exceptions (run→running, see→seeing)
 *  - `s` — irregular 3rd-person singular (be→is, have→has, do→does)
 */
export type Verb = {
  base: string;
  past?: string;
  pastParticiple?: string;
  ing?: string;
  s?: string;
};

/** Convenience constructor for a fully regular verb (walk, play, watch…). */
export type RegularVerb<B extends string> = { base: B };

/** The conjugation forms the analyzer and course expose. */
export type VerbForm =
  | "Base" // dictionary form: go, walk
  | "Infinitive" // to go, to walk
  | "ThirdPerson" // present 3rd-person singular: goes, walks
  | "Past" // simple past: went, walked
  | "PastParticiple" // gone, walked — for perfect tenses & passive
  | "Gerund" // present participle / -ing: going, walking
  | "PresentParticiple"; // alias of Gerund

// --- regular orthography (computed when no override is supplied) --------------

/** Present 3rd-person singular: +s, with the -es / consonant-y→-ies spellings. */
export type ThirdPersonS<B extends string> =
  B extends `${string}${"s" | "x" | "z" | "o"}`
    ? `${B}es`
    : B extends `${string}${"sh" | "ch"}`
      ? `${B}es`
      : B extends `${string}${Vowel}y`
        ? `${B}s`
        : B extends `${infer Body}y`
          ? `${Body}ies`
          : `${B}s`;

/** Regular past / past participle: +ed, with e→+d and consonant-y→-ied. */
export type RegularEd<B extends string> =
  B extends `${string}e`
    ? `${B}d`
    : B extends `${string}${Vowel}y`
      ? `${B}ed`
      : B extends `${infer Body}y`
        ? `${Body}ied`
        : `${B}ed`;

/** Regular -ing: drop a silent final -e (make→making), keep -ee/-ye/-oe. */
export type RegularIng<B extends string> =
  B extends `${string}${"ee" | "ye" | "oe"}`
    ? `${B}ing`
    : B extends `${infer Body}e`
      ? `${Body}ing`
      : `${B}ing`;

// --- the main conjugator ------------------------------------------------------

export type ConjugateVerb<V extends Verb, F extends VerbForm> = F extends "Base"
  ? V["base"]
  : F extends "Infinitive"
    ? `to ${V["base"]}`
    : F extends "ThirdPerson"
      ? V extends { s: infer S extends string }
        ? S
        : ThirdPersonS<V["base"]>
      : F extends "Past"
        ? V extends { past: infer P extends string }
          ? P
          : RegularEd<V["base"]>
        : F extends "PastParticiple"
          ? V extends { pastParticiple: infer PP extends string }
            ? PP
            : V extends { past: infer P extends string }
              ? P
              : RegularEd<V["base"]>
          : F extends "Gerund" | "PresentParticiple"
            ? V extends { ing: infer G extends string }
              ? G
              : RegularIng<V["base"]>
            : never;

// --- a small irregular/common-verb dictionary (handy for the course) ----------

export type Be = { base: "be"; s: "is"; past: "was"; pastParticiple: "been"; ing: "being" };
export type Have = { base: "have"; s: "has"; past: "had"; pastParticiple: "had"; ing: "having" };
export type Do = { base: "do"; s: "does"; past: "did"; pastParticiple: "done"; ing: "doing" };
export type Go = { base: "go"; s: "goes"; past: "went"; pastParticiple: "gone"; ing: "going" };
export type Make = { base: "make"; past: "made"; pastParticiple: "made"; ing: "making" };
export type Take = { base: "take"; past: "took"; pastParticiple: "taken"; ing: "taking" };
export type See = { base: "see"; past: "saw"; pastParticiple: "seen"; ing: "seeing" };
export type Come = { base: "come"; past: "came"; pastParticiple: "come"; ing: "coming" };
export type Get = { base: "get"; past: "got"; pastParticiple: "gotten"; ing: "getting" };
export type Give = { base: "give"; past: "gave"; pastParticiple: "given"; ing: "giving" };
export type Know = { base: "know"; past: "knew"; pastParticiple: "known"; ing: "knowing" };
export type Think = { base: "think"; past: "thought"; pastParticiple: "thought"; ing: "thinking" };
export type Eat = { base: "eat"; past: "ate"; pastParticiple: "eaten"; ing: "eating" };
export type Run = { base: "run"; past: "ran"; pastParticiple: "run"; ing: "running" };
export type Write = { base: "write"; past: "wrote"; pastParticiple: "written"; ing: "writing" };
export type Read = { base: "read"; past: "read"; pastParticiple: "read"; ing: "reading" };
export type Say = { base: "say"; past: "said"; pastParticiple: "said"; ing: "saying" };
export type Sing = { base: "sing"; past: "sang"; pastParticiple: "sung"; ing: "singing" };
export type Sit = { base: "sit"; past: "sat"; pastParticiple: "sat"; ing: "sitting" };
export type Stand = { base: "stand"; past: "stood"; pastParticiple: "stood"; ing: "standing" };
export type Buy = { base: "buy"; past: "bought"; pastParticiple: "bought"; ing: "buying" };
export type Bring = { base: "bring"; past: "brought"; pastParticiple: "brought"; ing: "bringing" };
export type Find = { base: "find"; past: "found"; pastParticiple: "found"; ing: "finding" };
export type Speak = { base: "speak"; past: "spoke"; pastParticiple: "spoken"; ing: "speaking" };
export type Drink = { base: "drink"; past: "drank"; pastParticiple: "drunk"; ing: "drinking" };
export type Sleep = { base: "sleep"; past: "slept"; pastParticiple: "slept"; ing: "sleeping" };
export type Begin = { base: "begin"; past: "began"; pastParticiple: "begun"; ing: "beginning" };

// --- type-level tests (documentation; also caught by `tsc`) -------------------

type _Walk = RegularVerb<"walk">;
type _t1 = ConjugateVerb<_Walk, "ThirdPerson">; // "walks"
type _t2 = ConjugateVerb<_Walk, "Past">; // "walked"
type _t3 = ConjugateVerb<_Walk, "Gerund">; // "walking"
type _t4 = ConjugateVerb<Go, "Past">; // "went"
type _t5 = ConjugateVerb<Go, "PastParticiple">; // "gone"
type _t6 = ConjugateVerb<{ base: "study" }, "ThirdPerson">; // "studies"
type _t7 = ConjugateVerb<{ base: "study" }, "Past">; // "studied"
type _t8 = ConjugateVerb<{ base: "watch" }, "ThirdPerson">; // "watches"
type _t9 = ConjugateVerb<Run, "Gerund">; // "running"
