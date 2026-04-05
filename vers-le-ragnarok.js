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

const _ParentSheet = dnd5e?.applications?.actor?.ActorSheet5eCharacter2
  ?? dnd5e?.applications?.actor?.ActorSheet5eCharacter
  ?? ActorSheet;

class VtrActorSheet extends _ParentSheet {
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["dnd5e", "sheet", "actor", "vtr-sheet"],
      template: "modules/vers-le-ragnarok/templates/actor-sheet.hbs",
      width: 820,
      height: 980
    });
  }

  async getData() {
    const data = await super.getData();

    // Calcul des compétences VtR (inclut Ásatrú custom)
    const actor = this.actor;
    const prof = actor.system.attributes.prof ?? 2;
    const skills = {};

    for (const [key, skill] of Object.entries(VTR_SKILLS)) {
      const abilityMod = actor.system.abilities[skill.ability]?.mod ?? 0;

      if (key === "asa") {
        // Compétence custom Ásatrú — stockée dans flags
        const flags = actor.flags?.["vers-le-ragnarok"] ?? {};
        const proficient = flags.asatruProf ?? 0; // 0, 0.5, 1, 2
        const bonus = Math.floor(prof * proficient);
        skills[key] = {
          label: skill.label,
          ability: ABILITY_LABELS[skill.ability],
          value: abilityMod + bonus,
          proficient,
          passive: 10 + abilityMod + bonus
        };
      } else {
        const s = actor.system.skills[key] ?? {};
        const proficient = s.value ?? 0;
        const bonus = Math.floor(prof * proficient);
        skills[key] = {
          label: skill.label,
          ability: ABILITY_LABELS[skill.ability],
          value: abilityMod + bonus,
          proficient,
          passive: 10 + abilityMod + bonus
        };
      }
    }

    data.vtrSkills = skills;
    data.abilityLabels = ABILITY_LABELS;

    // Sagesse passive Ásatrú
    data.passiveAsatru = skills.asa?.passive ?? 10;

    return data;
  }

  activateListeners(html) {
    super.activateListeners(html);

    // Navigation pages
    html.find(".vtr-tab-btn").on("click", (ev) => {
      const page = ev.currentTarget.dataset.page;
      html.find(".vtr-tab-btn").removeClass("active");
      html.find(".vtr-page").removeClass("active");
      html.find(`[data-page="${page}"]`).addClass("active");
      html.find(`.vtr-page[data-page="${page}"]`).addClass("active");
    });

    // Roll Ásatrú
    html.find(".skill-asatru .skill-name").on("click", async (ev) => {
      const abilityMod = this.actor.system.abilities.wis?.mod ?? 0;
      const prof = this.actor.system.attributes.prof ?? 2;
      const proficient = this.actor.flags?.["vers-le-ragnarok"]?.asatruProf ?? 0;
      const bonus = Math.floor(prof * proficient) + abilityMod;
      const roll = await new Roll(`1d20 + ${bonus}`).evaluate();
      roll.toMessage({
        speaker: ChatMessage.getSpeaker({ actor: this.actor }),
        flavor: `Ásatrú (SAG)`
      });
    });

    // Toggle maîtrise Ásatrú (clic sur la case)
    if (this.isEditable) {
      html.find(".skill-asatru .proficiency-toggle").on("click", async (ev) => {
        const current = this.actor.flags?.["vers-le-ragnarok"]?.asatruProf ?? 0;
        const next = current >= 2 ? 0 : current === 0 ? 1 : 2;
        await this.actor.setFlag("vers-le-ragnarok", "asatruProf", next);
      });
    }
  }
}

Hooks.once("init", () => {
  Actors.registerSheet("dnd5e", VtrActorSheet, {
    types: ["character"],
    makeDefault: false,
    label: "Vers le Ragnarök"
  });
});
