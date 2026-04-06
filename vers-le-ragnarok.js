const { CharacterActorSheet } = dnd5e.applications.actor;

class VtrActorSheet extends CharacterActorSheet {

  static DEFAULT_OPTIONS = foundry.utils.mergeObject(
    CharacterActorSheet.DEFAULT_OPTIONS,
    {
      classes: ["dnd5e", "sheet", "actor", "character", "vertical-tabs", "vtr-sheet"],
      position: { width: 800, height: 1000 },
      actions: {
        rollAsatru: VtrActorSheet.#rollAsatru,
        toggleAsatruProf: VtrActorSheet.#toggleAsatruProf
      }
    },
    { inplace: false }
  );

  static PARTS = CharacterActorSheet.PARTS;

  /** @inheritDoc */
  async _preparePartContext(partId, context, options) {
    context = await super._preparePartContext(partId, context, options);
    if ( partId === "details" ) {
      // Injecter Ásatrú dans les skills
      const actor = this.actor;
      const prof = actor.system.attributes.prof ?? 2;
      const wisMod = actor.system.abilities.wis?.mod ?? 0;
      const asatruProf = actor.getFlag("vers-le-ragnarok", "asatruProf") ?? 0;
      const bonus = Math.floor(prof * asatruProf);
      context.skills.asa = {
        label: "Ásatrú",
        abbreviation: "Ásatrú",
        ability: "wis",
        value: asatruProf,
        baseValue: asatruProf,
        total: wisMod + bonus,
        passive: 10 + wisMod + bonus,
        class: CharacterActorSheet.PROFICIENCY_CLASSES[asatruProf] ?? "none",
        isCustom: true
      };
    }
    if ( partId === "sidebar" ) {
      context.vtrFlags = this.actor.flags?.["vers-le-ragnarok"] ?? {};
      context.passiveAsatru = (() => {
        const prof = this.actor.system.attributes.prof ?? 2;
        const wisMod = this.actor.system.abilities.wis?.mod ?? 0;
        const asatruProf = this.actor.getFlag("vers-le-ragnarok", "asatruProf") ?? 0;
        return 10 + wisMod + Math.floor(prof * asatruProf);
      })();
    }
    return context;
  }

  /** @inheritDoc */
  async _onRender(context, options) {
    await super._onRender(context, options);

    // Ajouter Ásatrú dans la liste des skills si pas déjà présent
    const skillsList = this.element.querySelector(".skills-list");
    if ( skillsList && !skillsList.querySelector("[data-key='asa']") ) {
      const actor = this.actor;
      const prof = actor.system.attributes.prof ?? 2;
      const wisMod = actor.system.abilities.wis?.mod ?? 0;
      const asatruProf = actor.getFlag("vers-le-ragnarok", "asatruProf") ?? 0;
      const bonus = Math.floor(prof * asatruProf);
      const total = wisMod + bonus;
      const profClass = CharacterActorSheet.PROFICIENCY_CLASSES[asatruProf] ?? "none";
      const sign = total >= 0 ? "+" : "";

      const li = document.createElement("li");
      li.className = "skill";
      li.dataset.key = "asa";
      li.innerHTML = `
        <button type="button" class="proficiency-toggle pips ${profClass}" data-action="toggleAsatruProf"
                aria-label="Ásatrú" data-tooltip="Ásatrú">
          <pip-element></pip-element>
        </button>
        <span class="skill-name rollable" data-action="rollAsatru">
          Ásatrú <span class="ability">(SAG)</span>
        </span>
        <span class="skill-mod">${sign}${total}</span>
        <span class="passive">${10 + wisMod + bonus}</span>
      `;
      skillsList.appendChild(li);
    }
  }

  /**
   * Roll Ásatrú skill check.
   * @this {VtrActorSheet}
   */
  static async #rollAsatru(event, target) {
    const actor = this.actor;
    const prof = actor.system.attributes.prof ?? 2;
    const wisMod = actor.system.abilities.wis?.mod ?? 0;
    const asatruProf = actor.getFlag("vers-le-ragnarok", "asatruProf") ?? 0;
    const bonus = Math.floor(prof * asatruProf) + wisMod;
    const roll = await new Roll(`1d20 + ${bonus}`).evaluate();
    roll.toMessage({
      speaker: ChatMessage.getSpeaker({ actor }),
      flavor: "Ásatrú (SAG)"
    });
  }

  /**
   * Toggle Ásatrú proficiency level.
   * @this {VtrActorSheet}
   */
  static async #toggleAsatruProf(event, target) {
    const current = this.actor.getFlag("vers-le-ragnarok", "asatruProf") ?? 0;
    const next = current >= 2 ? 0 : current === 0 ? 1 : 2;
    await this.actor.setFlag("vers-le-ragnarok", "asatruProf", next);
  }
}

globalThis.VtrActorSheet = VtrActorSheet;

class VtrRuneButton extends Application {
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      id: "vtr-rune-button",
      template: null,
      popOut: false
    });
  }

  render(force, options) {
    if ( document.getElementById("vtr-rune-button") ) return this;
    const btn = document.createElement("div");
    btn.id = "vtr-rune-button";
    btn.innerHTML = `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <polygon points="50,5 95,95 5,95" fill="#2c1a0e" stroke="#c88600" stroke-width="4"/>
      <text x="50" y="72" text-anchor="middle" font-size="38" fill="#c8860088">ᚱ</text>
    </svg>`;
    btn.title = "Lancer les runes";
    btn.addEventListener("click", () => this._rollRune());
    document.body.appendChild(btn);
    return this;
  }

  async _rollRune() {
    const roll = await new Roll("1d24").evaluate();
    roll.toMessage({ flavor: "🎲 Lancer de rune" });
  }
}

Hooks.once("ready", () => {
  if ( game.user.isGM || game.user.character ) {
    new VtrRuneButton().render(true);
  }
});
Hooks.once("init", () => {
  delete CONFIG.DND5E.skills.dec;
  CONFIG.DND5E.skills.ins.label = "Ásatrú";

  foundry.documents.collections.Actors.registerSheet("dnd5e", VtrActorSheet, {
    types: ["character"],
    makeDefault: false,
    label: "Vers le Ragnarök"
  });
});
