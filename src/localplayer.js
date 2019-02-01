import { Player } from './player';
import { g_movieEvent } from "./movieevent";
import { Skill } from "./constants/const";
export class LocalPlayer extends Player {
    constructor() {
        super();
        this.m_premium = false;
        this.m_known = false;
        this.m_states = 0;
        this.m_vocation = 0;
        this.m_blessings = 0;
        this.m_health = -1;
        this.m_maxHealth = -1;
        this.m_freeCapacity = -1;
        this.m_experience = -1;
        this.m_level = -1;
        this.m_levelPercent = -1;
        this.m_mana = -1;
        this.m_maxMana = -1;
        this.m_magicLevel = -1;
        this.m_magicLevelPercent = -1;
        this.m_baseMagicLevel = -1;
        this.m_soul = -1;
        this.m_stamina = -1;
        this.m_baseSpeed = -1;
        this.m_regenerationTime = -1;
        this.m_offlineTrainingTime = -1;
        this.m_totalCapacity = -1;
        this.m_skillsLevel = [];
        this.m_skillsBaseLevel = [];
        this.m_skillsLevelPercent = [];
        this.m_spells = [];
        for (let skill = Skill.Fist; skill < Skill.LastSkill; skill++) {
            this.m_skillsLevel[skill] = 10;
            this.m_skillsBaseLevel[skill] = 10;
            this.m_skillsLevelPercent[skill] = 0;
        }
    }
    isLocalPlayer() {
        return true;
    }
    setKnown(known) {
        this.m_known = known;
    }
    isKnown() {
        return this.m_known;
    }
    setPremium(premium) {
        this.m_premium = premium;
    }
    isPremium() {
        return this.m_premium;
    }
    onPositionChange(newPos, oldPos) {
        super.onPositionChange(newPos, oldPos);
        g_movieEvent.onWalk(this, newPos, oldPos);
    }
    setStates(states) {
        if (this.m_states != states) {
            this.m_states = states;
        }
    }
    setVocation(vocation) {
        if (this.m_vocation != vocation) {
            this.m_vocation = vocation;
        }
    }
    setBlessings(blessings) {
        if (this.m_blessings != blessings) {
            this.m_blessings = blessings;
        }
    }
    setHealth(health, maxHealth) {
        if (this.m_health != health) {
            g_movieEvent.onHealthChange(this, health);
        }
        if (this.m_maxHealth != maxHealth) {
            g_movieEvent.onMaxHealthChange(this, maxHealth);
        }
        this.m_health = health;
        this.m_maxHealth = maxHealth;
    }
    setFreeCapacity(freeCapacity) {
        if (this.m_freeCapacity != freeCapacity) {
            this.m_freeCapacity = freeCapacity;
        }
    }
    setTotalCapacity(totalCapacity) {
        if (this.m_totalCapacity != totalCapacity) {
            this.m_totalCapacity = totalCapacity;
        }
    }
    setExperience(experience) {
        if (this.m_experience != experience) {
            this.m_experience = experience;
        }
    }
    setLevel(level, levelPercent) {
        if (this.m_level != level || this.m_levelPercent != levelPercent) {
            this.m_level = level;
            this.m_levelPercent = levelPercent;
        }
    }
    setMana(mana, maxMana) {
        if (this.m_mana != mana) {
            g_movieEvent.onManaChange(this, mana);
        }
        if (this.m_maxMana != maxMana) {
            g_movieEvent.onMaxManaChange(this, maxMana);
        }
        this.m_mana = mana;
        this.m_maxMana = maxMana;
    }
    setMagicLevel(magicLevel, magicLevelPercent) {
        if (this.m_magicLevel != magicLevel || this.m_magicLevelPercent != magicLevelPercent) {
            this.m_magicLevel = magicLevel;
            this.m_magicLevelPercent = magicLevelPercent;
        }
    }
    setBaseMagicLevel(baseMagicLevel) {
        if (this.m_baseMagicLevel != baseMagicLevel) {
            this.m_baseMagicLevel = baseMagicLevel;
        }
    }
    setStamina(stamina) {
        if (this.m_stamina != stamina) {
            this.m_stamina = stamina;
        }
    }
    setSoul(soul) {
        if (this.m_soul != soul) {
            this.m_soul = soul;
        }
    }
    setRegenerationTime(regeneration) {
        if (this.m_regenerationTime != regeneration) {
            this.m_regenerationTime = regeneration;
        }
    }
    setOfflineTrainingTime(training) {
        if (this.m_offlineTrainingTime != training) {
            this.m_offlineTrainingTime = training;
        }
    }
    setSkill(skill, level, levelPercent) {
        const oldLevel = this.m_skillsLevel[skill];
        const oldLevelPercent = this.m_skillsLevelPercent[skill];
        if (level != oldLevel || levelPercent != oldLevelPercent) {
            this.m_skillsLevel[skill] = level;
            this.m_skillsLevelPercent[skill] = levelPercent;
        }
    }
    setBaseSkill(skill, baseLevel) {
        const oldBaseLevel = this.m_skillsBaseLevel[skill];
        if (baseLevel != oldBaseLevel) {
            this.m_skillsBaseLevel[skill] = baseLevel;
        }
    }
    setSpells(spells) {
        this.m_spells = spells;
    }
}
//# sourceMappingURL=localplayer.js.map