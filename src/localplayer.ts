import {Player} from './player';
import {Position} from "./position";
import {g_movieEvent} from "./movieevent";
import {Skill} from "./constants/const";

export class LocalPlayer extends Player {
    m_premium: boolean = false;
    m_known: boolean = false;

    m_states = 0;
    m_vocation = 0;
    m_blessings = 0;

    m_health = -1;
    m_maxHealth = -1;
    m_freeCapacity = -1;
    m_experience = -1;
    m_level = -1;
    m_levelPercent = -1;
    m_mana = -1;
    m_maxMana = -1;
    m_magicLevel = -1;
    m_magicLevelPercent = -1;
    m_baseMagicLevel = -1;
    m_soul = -1;
    m_stamina = -1;
    m_baseSpeed = -1;
    m_regenerationTime = -1;
    m_offlineTrainingTime = -1;
    m_totalCapacity = -1;

    m_skillsLevel: number[] = [];
    m_skillsBaseLevel: number[] = [];
    m_skillsLevelPercent: number[] = [];
    m_spells: number[] = [];

    constructor() {
        super();
        for (let skill = Skill.Fist; skill < Skill.LastSkill; skill++) {
            this.m_skillsLevel[skill] = 10;
            this.m_skillsBaseLevel[skill] = 10;
            this.m_skillsLevelPercent[skill] = 0;
        }
    }

    isLocalPlayer() {
        return true;
    }

    setKnown(known: boolean) {
        this.m_known = known;
    }

    isKnown() {
        return this.m_known;
    }

    setPremium(premium: boolean) {
        this.m_premium = premium;
    }

    isPremium() {
        return this.m_premium;
    }

    onPositionChange(newPos: Position, oldPos: Position) {
        super.onPositionChange(newPos, oldPos);
        g_movieEvent.onWalk(this, newPos, oldPos);
    }

    setStates(states: number) {
        if (this.m_states != states) {
            this.m_states = states;
        }
    }

    setVocation(vocation: number) {
        if (this.m_vocation != vocation) {
            this.m_vocation = vocation;
        }
    }

    setBlessings(blessings: number) {
        if (this.m_blessings != blessings) {
            this.m_blessings = blessings;
        }
    }

    setHealth(health: number, maxHealth: number) {
        if (this.m_health != health) {
            g_movieEvent.onHealthChange(this, health);
        }

        if (this.m_maxHealth != maxHealth) {
            g_movieEvent.onMaxHealthChange(this, maxHealth);
        }

        this.m_health = health;
        this.m_maxHealth = maxHealth;
    }

    setFreeCapacity(freeCapacity: number) {
        if (this.m_freeCapacity != freeCapacity) {
            this.m_freeCapacity = freeCapacity;
        }
    }

    setTotalCapacity(totalCapacity: number) {
        if (this.m_totalCapacity != totalCapacity) {
            this.m_totalCapacity = totalCapacity;
        }
    }

    setExperience(experience: number) {
        if (this.m_experience != experience) {
            this.m_experience = experience;
        }
    }

    setLevel(level: number, levelPercent: number) {
        if (this.m_level != level || this.m_levelPercent != levelPercent) {
            this.m_level = level;
            this.m_levelPercent = levelPercent;
        }
    }

    setMana(mana: number, maxMana: number) {
        if (this.m_mana != mana) {
            g_movieEvent.onManaChange(this, mana);
        }

        if (this.m_maxMana != maxMana) {
            g_movieEvent.onMaxManaChange(this, maxMana);
        }

        this.m_mana = mana;
        this.m_maxMana = maxMana;
    }

    setMagicLevel(magicLevel: number, magicLevelPercent: number) {
        if (this.m_magicLevel != magicLevel || this.m_magicLevelPercent != magicLevelPercent) {
            this.m_magicLevel = magicLevel;
            this.m_magicLevelPercent = magicLevelPercent;
        }
    }

    setBaseMagicLevel(baseMagicLevel: number) {
        if (this.m_baseMagicLevel != baseMagicLevel) {
            this.m_baseMagicLevel = baseMagicLevel;
        }
    }

    setStamina(stamina: number) {
        if (this.m_stamina != stamina) {
            this.m_stamina = stamina;
        }
    }

    setSoul(soul: number) {
        if (this.m_soul != soul) {
            this.m_soul = soul;
        }
    }

    setRegenerationTime(regeneration: number) {
        if (this.m_regenerationTime != regeneration) {
            this.m_regenerationTime = regeneration;
        }
    }

    setOfflineTrainingTime(training: number) {
        if (this.m_offlineTrainingTime != training) {
            this.m_offlineTrainingTime = training;
        }
    }

    setSkill(skill: Skill, level: number, levelPercent: number) {
        const oldLevel = this.m_skillsLevel[skill];
        const oldLevelPercent = this.m_skillsLevelPercent[skill];

        if (level != oldLevel || levelPercent != oldLevelPercent) {
            this.m_skillsLevel[skill] = level;
            this.m_skillsLevelPercent[skill] = levelPercent;
        }
    }

    setBaseSkill(skill: Skill, baseLevel: number) {
        const oldBaseLevel = this.m_skillsBaseLevel[skill];

        if (baseLevel != oldBaseLevel) {
            this.m_skillsBaseLevel[skill] = baseLevel;
        }
    }

    setSpells(spells: number[]) {
        this.m_spells = spells;
    }

}