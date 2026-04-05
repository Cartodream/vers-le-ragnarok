const VTR_SKILLS = {
  acr: { label: "Acrobaties", ability: "dex" },
  arc: { label: "Arcanes", ability: "int" },
  asa: { label: "Ásatrú", ability: "wis" },
  ath: { label: "Athlétisme", ability: "str" },
  ste: { label: "Discrétion", ability: "dex" },
  ani: { label: "Dressage", ability: "wis" },
  slt: { label: "Escamotage", ability: "dex" },
  his: { label: "Histoire", ability: "int" },
  itm: { label: "Intimidation", ability: "cha" },
  inv: { label: "Investigation", ability: "int" },
  med: { label: "Médecine", ability: "wis" },
  nat: { label: "Nature", ability: "int" },
  prc: { label: "Perception", ability: "wis" },
  ins: { label: "Perspicacité", ability: "wis" },
  per: { label: "Persuasion", ability: "cha" },
  rel: { label: "Religion", ability: "int" },
  prf: { label: "Représentation", ability: "cha" },
  dec: { label: "Supercherie", ability: "cha" },
  sur: { label: "Survie", ability: "wis" }
};

const ABILITY_LABELS = {
  str: "FOR", dex: "DEX", con: "CON",
  int: "INT", wis: "SAG", cha: "CHA"
};

const _BaseSheet = dnd5e?.applications?.actor?.BaseActorSheet
  ?? ActorSheet;

class VtrActorSheet extends _BaseSheet {

  static DEFAULT_OPTIONS = {
    classes: ["dnd5e", "sheet", "actor", "vtr-sheet"],
    position: { width: 820, height: 980 },
    window: { resizable: true },
    form: { submitOnChange: true }
  };

  static PARTS = {
    main: { template: "modules/vers-le-ragnarok/templates/actor-sheet.hbs" }
  };

  async _prepareContext(options) {
    const context = await super._prepareContext(options);
    const actor = this.actor;
    const prof = actor.system.attributes.prof ?? 2;
    const skills = {};

    for (const [key, skill] of Object.entries(VTR_SKILLS)) {
      const abilityMod = actor.system.abilities[skill.ability]?.mod ?? 0;
      if (key === "asa") {
        const proficient = actor.getFlag("vers-le-ragnarok", "asatruProf") ?? 0;
        const bonus = Math.floor(prof * proficient);
        skills[key] = {
          label: skill.label, ability: ABILITY_LABELS[skill.ability],
          value: abilityMod + bonus, proficient,
          passive: 10 + abilityMod + bonus
        };
      } else {
        const s = actor.system.skills[key] ?? {};
        const proficient = s.value ?? 0;
        const bonus = Math.floor(prof * proficient);
        skills[key] = {
          label: skill.label, ability: ABILITY_LABELS[skill.ability],
          value: abilityMod + bonus, proficient,
          passive: 10 + abilityMod + bonus
        };
      }
    }

    context.vtrSkills = skills;
    context.abilityLabels = ABILITY_LABELS;
    context.passiveAsatru = skills.asa?.passive ?? 10;
    context.actor = actor;
    context.system = actor.system;
    context.flags = actor.flags;
    context.items = actor.items.contents;
    return context;
  }

  _onRender(context, options) {
    super._onRender(context, options);
    const html = $(this.element);

    // Navigation pages
    html.find(".vtr-tab-btn").on("click", (ev) => {
      const page = ev.currentTarget.dataset.page;
      html.find(".vtr-tab-btn").removeClass("active");
      html.find(".vtr-page").removeClass("active");
      html.find(`[data-page="${page}"]`).addClass("active");
      html.find(`.vtr-page[data-page="${page}"]`).addClass("active");
    });

    // Roll Ásatrú
    html.find(".skill-asatru .skill-name").on("click", async () => {
      const abilityMod = this.actor.system.abilities.wis?.mod ?? 0;
      const prof = this.actor.system.attributes.prof ?? 2;
      const proficient = this.actor.getFlag("vers-le-ragnarok", "asatruProf") ?? 0;
      const bonus = Math.floor(prof * proficient) + abilityMod;
      const roll = await new Roll(`1d20 + ${bonus}`).evaluate();
      roll.toMessage({
        speaker: ChatMessage.getSpeaker({ actor: this.actor }),
        flavor: "Ásatrú (SAG)"
      });
    });

    // Toggle maîtrise Ásatrú
    html.find(".skill-asatru .proficiency-toggle").on("click", async () => {
      const current = this.actor.getFlag("vers-le-ragnarok", "asatruProf") ?? 0;
      const next = current >= 2 ? 0 : current === 0 ? 1 : 2;
      await this.actor.setFlag("vers-le-ragnarok", "asatruProf", next);
    });
  }
}

Hooks.once("init", () => {
  foundry.documents.collections.Actors.registerSheet("dnd5e", VtrActorSheet, {
    types: ["character"],
    makeDefault: false,
    label: "Vers le Ragnarök"
  });
});
