import { ModuleBuilder } from "@/components/ModuleBuilder";
import { MODULES, whatsappLink } from "@/lib/site";

const STEPS = [
  {
    title: "Charlamos",
    body: "Nos contás cómo trabaja tu negocio hoy y qué te hace perder tiempo o clientes.",
  },
  {
    title: "Elegimos los módulos",
    body: "Te proponemos solo lo que vas a usar. Si algo no existe, lo cotizamos a medida.",
  },
  {
    title: "Lo dejamos funcionando",
    body: "Cargamos tus datos, conectamos tu dominio y tu cuenta de Mercado Pago, y te mostramos cómo usarlo.",
  },
  {
    title: "Te acompañamos",
    body: "Las dudas y los cambios los resolvés por WhatsApp, con quien programó tu sistema.",
  },
];

const CONTACT_MESSAGE = "Hola, quiero consultar por software para mi negocio.";
const CUSTOM_MESSAGE = "Hola, necesito una solución a medida para mi negocio.";

export default function Home() {
  return (
    <>
      <header className="border-b border-line">
        <nav
          aria-label="Principal"
          className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6"
        >
          <a href="#" className="font-display text-xl font-bold tracking-tight">
            EssentialWebs
          </a>
          <div className="flex items-center gap-6">
            <ul className="hidden gap-6 text-sm text-ink-soft md:flex">
              <li><a href="#modulos" className="hover:text-ink">Módulos</a></li>
              <li><a href="#como-trabajamos" className="hover:text-ink">Cómo trabajamos</a></li>
              <li><a href="#a-medida" className="hover:text-ink">A medida</a></li>
            </ul>
            <a
              href={whatsappLink(CONTACT_MESSAGE)}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md border-2 border-ink px-3 py-2 text-sm font-semibold hover:bg-ink hover:text-paper"
            >
              Escribinos
            </a>
          </div>
        </nav>
      </header>

      <main className="flex-1">
        <ModuleBuilder />

        <section id="modulos" className="border-t border-line bg-wash">
          <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Qué hace cada módulo
            </h2>
            <dl className="mt-10 grid gap-x-12 gap-y-8 md:grid-cols-2">
              {MODULES.map((m) => (
                <div key={m.id} className="border-l-4 border-signal pl-5">
                  <dt className="font-display text-xl font-semibold">{m.name}</dt>
                  <dd className="mt-2 max-w-prose text-ink-soft">{m.detail}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section id="como-trabajamos" className="border-t border-line">
          <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Cómo trabajamos
            </h2>
            <ol className="mt-10 grid gap-10 md:grid-cols-4">
              {STEPS.map((step, i) => (
                <li key={step.title}>
                  <span
                    aria-hidden="true"
                    className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-ink font-display text-lg font-bold"
                  >
                    {i + 1}
                  </span>
                  <h3 className="mt-4 font-display text-xl font-semibold">{step.title}</h3>
                  <p className="mt-2 text-ink-soft">{step.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="a-medida" className="bg-ink text-paper">
          <div className="mx-auto grid max-w-6xl gap-8 px-4 py-20 sm:px-6 md:grid-cols-[3fr_2fr] md:items-end">
            <div>
              <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
                ¿Necesitás algo que no está en la lista?
              </h2>
              <p className="mt-4 max-w-xl text-lg opacity-80">
                Desarrollamos soluciones a medida: integraciones con los sistemas que ya usás,
                automatizaciones y herramientas internas para tu equipo.
              </p>
            </div>
            <a
              href={whatsappLink(CUSTOM_MESSAGE)}
              target="_blank"
              rel="noopener noreferrer"
              className="justify-self-start rounded-md bg-signal px-5 py-3 font-semibold text-signal-ink hover:opacity-90 md:justify-self-end"
            >
              Contanos tu idea
            </a>
          </div>
        </section>
      </main>

      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-8 text-sm text-ink-soft sm:flex-row sm:justify-between sm:px-6">
          <p>EssentialWebs, desarrollo de software en Argentina.</p>
          <p>© {new Date().getFullYear()} EssentialWebs</p>
        </div>
      </footer>
    </>
  );
}
