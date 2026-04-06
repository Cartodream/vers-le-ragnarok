const { CharacterActorSheet } = dnd5e.applications.actor;

const VTR_RUNES = [
  {
    id: 1, nom: "Fehu", symbole: "ᚠ",
    endroit: { titre: "Fortune, succès et bien-être mérités.", effet_aett: "Vous sentez un brusque regain d'optimisme, tout semble se dérouler de la bonne manière.", effet_rune: "Vous gagnez un bonus de +1 aux tests de caractéristique et un 20 naturel est toujours considéré comme un succès." },
    envers:  { titre: "Mal, jalousie, envie.", effet_aett: "Tout semble se dérouler de la bonne manière pour tout le monde, sauf pour vous. Vous êtes jaloux de leurs réussites et anticipez vos propres échecs.", effet_rune: "Vous subissez un malus de -1 aux tests de caractéristique et un 1 naturel est toujours considéré comme un échec." },
    aett: "Freyja", don: "Le don de la vie", presides: "Auðhumla, Freyr et Freyja"
  },
  {
    id: 2, nom: "Ūruz", symbole: "ᚢ",
    endroit: { titre: "Force, courage, initiative.", effet_aett: "Rien dans les Neuf mondes ne peut vous arrêter, vous vivrez pour voir un nouveau jour se lever.", effet_rune: "Vous appliquez votre bonus de maîtrise à vos jets d'initiative." },
    envers:  { titre: "Férocité, agression, addiction.", effet_aett: "La force n'est qu'apparente lorsqu'on la compare à la faiblesse, vous pressentez l'oppression et les abus de pouvoir.", effet_rune: "Vous êtes avantagé lors des tests de Charisme (Intimidation) et des jets d'attaque contre des créatures dont la valeur de Force est inférieure à la vôtre. Vous êtes également désavantagé contre les créatures dont la valeur de Force est supérieure à la vôtre." },
    aett: "Freyja", don: "L'instinct de survie", presides: "Ymir"
  }
];


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
    document.body.appendChild(btn);

    let dragging = false, startX, startY, origX, origY;
    btn.addEventListener("mousedown", e => {
      dragging = false;
      startX = e.clientX; startY = e.clientY;
      origX = btn.offsetLeft; origY = btn.offsetTop;
      const onMove = e => {
        if ( Math.abs(e.clientX - startX) > 3 || Math.abs(e.clientY - startY) > 3 ) dragging = true;
        btn.style.left = origX + (e.clientX - startX) + "px";
        btn.style.top  = origY + (e.clientY - startY) + "px";
        btn.style.right = "auto"; btn.style.bottom = "auto";
      };
      const onUp = () => {
        document.removeEventListener("mousemove", onMove);
        document.removeEventListener("mouseup", onUp);
        if ( !dragging ) this._rollRune();
      };
      document.addEventListener("mousemove", onMove);
      document.addEventListener("mouseup", onUp);
    });

    return this;
  }

  async _rollRune() {
    const rune = VTR_RUNES[Math.floor(Math.random() * VTR_RUNES.length)];
    const sens = Math.random() < 0.5 ? "endroit" : "envers";
    const data = rune[sens];
    const sensLabel = sens === "endroit" ? "🔺 À l'endroit" : "🔻 À l'envers";
    const img = `modules/vers-le-ragnarok/runes/${rune.id}.png`;
    const content = `
      <div style="text-align:center;">
        <img src="${img}" style="width:80px;height:80px;border:none;"/>
        <h2 style="margin:4px 0;">${rune.id}. ${rune.nom.toUpperCase()} &mdash; ${sensLabel}</h2>
        <p><em>${rune.don}</em>, présidé par <strong>${rune.presides}</strong>.</p>
        <hr/>
        <p><strong>${data.titre}</strong></p>
        <p><strong>Effet de l'ætt de ${rune.aett}</strong><br/>${data.effet_aett}</p>
        <p><strong>Effet de la rune ${rune.nom}</strong><br/>${data.effet_rune}</p>
      </div>
    `;
    ChatMessage.create({ content, speaker: ChatMessage.getSpeaker() });
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
