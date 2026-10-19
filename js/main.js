document.addEventListener("DOMContentLoaded", () => {
  const btn = document.querySelector("[data-nav-toggle]");
  const nav = document.querySelector("[data-nav-list]");

  if (btn && nav) {
    btn.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      btn.setAttribute("aria-expanded", String(open));
    });
  }

  const ano = document.querySelector("[data-ano]");
  if (ano) ano.textContent = String(new Date().getFullYear());

  const form = document.querySelector("#form-orcamento");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const nome = document.querySelector("#f-nome")?.value.trim() || "";
      const local = document.querySelector("#f-local")?.value.trim() || "";
      const fase = document.querySelector('input[name="fase"]:checked')?.value || "";
      const prazo = document.querySelector("#f-prazo")?.value.trim() || "a combinar";
      const msg =
        `Olá, Tamires! Meu nome é ${nome}. ` +
        `Empreendimento/bairro: ${local}. ` +
        `Fase: ${fase}. Prazo desejado: ${prazo}. ` +
        `Vi o site e quero um orçamento.`;
      if (typeof gtag === "function") {
        gtag("event", "generate_lead", { form: "contato", fase: fase });
      }
      window.open(
        "https://wa.me/5511942119178?text=" + encodeURIComponent(msg),
        "_blank",
        "noopener"
      );
    });
  }

  // Transição suave ao navegar entre as páginas
  const semMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let saindo = false;

  if (!semMovimento) {
    window.addEventListener("pageshow", (e) => {
      if (e.persisted) {
        saindo = false;
        document.documentElement.classList.remove("pagina-saindo");
      }
    });

    document.addEventListener("click", (e) => {
      if (saindo || e.defaultPrevented || e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      const link = e.target.closest("a");
      if (!link) return;

      const href = link.getAttribute("href") || "";
      if (!href || href.startsWith("#")) return;
      if (link.target === "_blank" || link.hasAttribute("download")) return;
      if (link.origin !== window.location.origin) return;
      if (link.pathname === window.location.pathname && link.search === window.location.search) return;

      e.preventDefault();
      saindo = true;
      document.documentElement.classList.add("pagina-saindo");
      const destino = link.href;
      window.setTimeout(() => { window.location.href = destino; }, 220);
    });
  }
});
