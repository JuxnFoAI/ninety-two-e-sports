import { Link } from "react-router-dom";

import { usePageTitle } from "@/shared/hooks";

import { SiteShell } from "./components";

/** Unknown paths. The shell stays so the navbar can still take you home. */
export const NotFoundPage = (): JSX.Element => {
  usePageTitle("Página no encontrada");

  return (
    <SiteShell opaqueNight>
      <section className="flex min-h-[calc(100dvh-var(--header-height))] flex-col items-center justify-center px-6 pb-16 pt-[var(--header-height)] text-center">
        <p className="m-0 font-[var(--font-orbitron)] text-xs font-medium uppercase tracking-[0.28em] text-white/45">
          404
        </p>
        <h1 className="m-0 mt-4 max-w-xl font-[var(--font-orbitron)] text-[clamp(1.6rem,4vw,2.75rem)] font-medium uppercase leading-tight tracking-[0.06em]">
          Esta página no existe
        </h1>
        <p className="m-0 mt-4 max-w-md font-[var(--font-rajdhani)] text-lg leading-snug text-white/70">
          El enlace no corresponde a ninguna sección del equipo.
        </p>
        <Link
          to="/"
          className="mt-8 font-[var(--font-orbitron)] text-xs font-medium uppercase tracking-[0.16em] text-[#f7e9ae] no-underline underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f7e9ae]"
        >
          Volver al inicio
        </Link>
      </section>
    </SiteShell>
  );
};
