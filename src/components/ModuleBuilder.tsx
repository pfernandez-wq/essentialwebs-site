"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { MODULES, type ModuleId, whatsappLink } from "@/lib/site";

const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

const SERVICES = [
  { name: "Service completo", price: "$85.000" },
  { name: "Cambio de pastillas de freno", price: "$42.000" },
  { name: "Alineación y balanceo", price: "$28.000" },
];

const SLOTS = ["Lun 9:00", "Lun 11:30", "Mar 8:30", "Mar 15:00"];

export function ModuleBuilder() {
  const [active, setActive] = useState<Set<ModuleId>>(new Set(["web", "catalog", "booking"]));
  const [lastAdded, setLastAdded] = useState<ModuleId | null>(null);

  function toggle(id: ModuleId) {
    if (id === "web") return;
    const next = new Set(active);
    if (next.has(id)) {
      next.delete(id);
      setLastAdded(null);
    } else {
      next.add(id);
      setLastAdded(id);
    }
    setActive(next);
  }

  const has = (id: ModuleId) => active.has(id);
  const mark = (id: ModuleId) => (lastAdded === id ? "arrive" : "");
  const chosen = MODULES.filter((m) => active.has(m.id)).map((m) => m.name);
  const message = `Hola, quiero software para mi negocio con estos módulos: ${chosen.join(", ")}.`;

  return (
    <>
      <section className="mx-auto grid max-w-6xl gap-x-10 px-4 pt-12 pb-16 sm:px-6 lg:grid-cols-2 lg:items-center lg:pt-16">
        <div className="lg:col-start-1">
          <h1 className="font-display text-4xl leading-[1.05] font-bold tracking-tight sm:text-6xl">
            Software para tu negocio, armado por módulos.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-ink-soft">
            Empezás con tu web y sumás lo que necesites: catálogo, turnos, cobros con
            Mercado Pago, consultas por WhatsApp. Nosotros lo configuramos y te acompañamos.
          </p>
        </div>

        <div className="relative -mx-4 h-72 sm:h-96 lg:col-start-2 lg:row-start-1 lg:row-span-2 lg:mx-0 lg:h-[560px]">
          <HeroScene active={active} />
        </div>

        <div className="lg:col-start-1">
          <p id="builder-hint" className="text-ink-soft">
            Tocá los módulos para sumarlos a tu sistema.
          </p>
          <ul className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3" aria-describedby="builder-hint">
            {MODULES.map((m) => {
              const on = has(m.id);
              const locked = m.id === "web";
              return (
                <li key={m.id}>
                  <button
                    type="button"
                    aria-pressed={on}
                    disabled={locked}
                    onClick={() => toggle(m.id)}
                    className={`w-full rounded-md border-2 px-3 py-2.5 text-left font-display font-semibold transition-colors ${
                      on
                        ? "border-ink bg-signal text-signal-ink"
                        : "border-line bg-paper text-ink hover:border-ink"
                    } ${locked ? "cursor-default" : "cursor-pointer"}`}
                  >
                    {m.name}
                    <span className="sr-only">{locked ? " (incluido)" : on ? " (activado)" : ""}</span>
                  </button>
                </li>
              );
            })}
          </ul>
          <a
            href={whatsappLink(message)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex rounded-md bg-ink px-5 py-3 font-semibold text-paper hover:opacity-90"
          >
            Consultar por estos {chosen.length} módulos
          </a>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[2fr_3fr] lg:items-center">
          <div>
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Así lo ven tus clientes
            </h2>
            <p className="mt-4 max-w-md text-ink-soft">
              Un ejemplo con un taller mecánico. Cada módulo que sumás arriba aparece acá,
              en la web de tu negocio.
            </p>
          </div>
          <Preview has={has} mark={mark} />
        </div>
      </section>
    </>
  );
}

function Preview({
  has,
  mark,
}: {
  has: (id: ModuleId) => boolean;
  mark: (id: ModuleId) => string;
}) {
  return (
    <figure
      aria-label="Vista previa de la web de un taller de ejemplo"
      className="relative overflow-hidden rounded-xl border-2 border-ink bg-paper shadow-[8px_8px_0_0_var(--ink)]"
    >
      <div className="flex items-center gap-2 border-b-2 border-ink bg-wash px-4 py-2 text-sm text-ink-soft">
        <span className="truncate">tallerruben.com.ar</span>
      </div>

      <div className="space-y-5 p-5 pb-16 text-ink">
        <header>
          <p className="font-display text-2xl font-bold">Taller Rubén</p>
          <p className="text-sm text-ink-soft">Mecánica general en Lanús. Lunes a viernes de 8 a 18.</p>
        </header>

        {has("catalog") && (
          <section className={`rounded-md ${mark("catalog")}`}>
            <h3 className="font-semibold">Servicios</h3>
            <ul className="mt-2 divide-y divide-line border-y border-line">
              {SERVICES.map((s) => (
                <li key={s.name} className="flex justify-between gap-4 py-2 text-sm">
                  <span>{s.name}</span>
                  <span className="font-medium tabular-nums">{s.price}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {has("booking") && (
          <section className={`rounded-md ${mark("booking")}`}>
            <h3 className="font-semibold">Pedí turno</h3>
            <div className="mt-2 flex flex-wrap gap-2">
              {SLOTS.map((slot) => (
                <span key={slot} className="rounded border border-ink px-2 py-1 text-sm">
                  {slot}
                </span>
              ))}
            </div>
          </section>
        )}

        {has("payments") && (
          <section className={`rounded-md ${mark("payments")}`}>
            <span className="inline-flex rounded-md bg-ink px-3 py-2 text-sm font-semibold text-paper">
              Pagar seña de $10.000
            </span>
            <p className="mt-1 text-xs text-ink-soft">Con tarjeta, débito o dinero en cuenta.</p>
          </section>
        )}

        {has("management") && (
          <section className={`rounded-md border border-dashed border-ink-soft p-3 ${mark("management")}`}>
            <h3 className="text-sm font-semibold">Panel del taller (solo lo ves vos)</h3>
            <dl className="mt-2 grid grid-cols-3 gap-2 text-sm">
              <div>
                <dt className="text-ink-soft">Órdenes abiertas</dt>
                <dd className="font-display text-xl font-bold tabular-nums">6</dd>
              </div>
              <div>
                <dt className="text-ink-soft">Presupuestos</dt>
                <dd className="font-display text-xl font-bold tabular-nums">3</dd>
              </div>
              <div>
                <dt className="text-ink-soft">Listos para retirar</dt>
                <dd className="font-display text-xl font-bold tabular-nums">2</dd>
              </div>
            </dl>
          </section>
        )}
      </div>

      {has("whatsapp") && (
        <span
          className={`absolute bottom-4 right-4 rounded-full bg-[#25d366] px-4 py-2 text-sm font-semibold text-[#073b1c] ${mark("whatsapp")}`}
        >
          Consultanos
        </span>
      )}
    </figure>
  );
}
