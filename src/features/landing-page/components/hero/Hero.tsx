import { HeroCtaButton } from "./HeroCtaButton";
import { HeroTitle } from "./HeroTitle";

export const Hero = (): JSX.Element => {
  return (
    <section
      id="inicio"
      className="relative flex min-h-dvh flex-col items-center justify-center px-[clamp(1rem,4vw,4rem)] pb-[clamp(2.5rem,8vh,4rem)] pt-[calc(var(--header-height)+clamp(2rem,8vh,4rem))] text-center"
      aria-labelledby="hero-title"
    >
      <div className="w-full max-w-3xl">
        <p className="m-0 mb-3 text-[0.65rem] font-medium uppercase tracking-[0.28em] text-white/70 sm:mb-4 sm:text-[0.7rem] sm:tracking-[0.32em]">
          E-Sports
        </p>

        <HeroTitle />

        <p className="mx-auto mt-5 max-w-md text-[clamp(0.9rem,2.8vw,1.05rem)] font-normal leading-relaxed tracking-wide text-white/78 sm:mt-6">
          Precisión en competición. Evolución en cada escenario.
        </p>

        <div className="mt-8 flex justify-center sm:mt-9">
          <HeroCtaButton href="#quienes-somos">Quiénes somos</HeroCtaButton>
        </div>
      </div>

      <a
        className="absolute bottom-[max(clamp(1.5rem,4vh,3rem),env(safe-area-inset-bottom))] left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-white/45 no-underline transition-colors duration-200 hover:text-white/85 focus-visible:text-white/85 md:left-auto md:right-[clamp(1rem,4vw,4rem)] md:translate-x-0 md:gap-3 md:text-white/50 motion-reduce:hidden"
        href="#quienes-somos"
        aria-label="Desplazar a Quiénes somos"
        data-decorative="true"
      >
        <span className="block h-10 w-px origin-top bg-gradient-to-b from-white/10 to-white/75 motion-safe:animate-[scrollPulse_2.2s_ease-in-out_infinite] md:h-14" />
      </a>
    </section>
  );
};
