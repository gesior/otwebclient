import { Player } from './player';
import { Blessings, Direction, InventorySlot, Skill } from "./constants/const";
import { Log } from "./log";
import { g_map } from "./map";
import { Timer } from "./structures/timer";
import { g_clock } from "./structures/g_clock";
import { toInt } from "./constants/helpers";
import { Position } from "./position";
export class LocalPlayer extends Player {
    constructor() {
        super();
        this.m_lastPrewalkDestination = new Position();
        this.m_autoWalkDestination = new Position();
        this.m_lastAutoWalkPosition = new Position();
        this.m_serverWalkEndEvent = null;
        this.m_autoWalkContinueEvent = null;
        this.m_walkLockExpiration = 0;
        this.m_preWalking = false;
        this.m_lastPrewalkDone = true;
        this.m_secondPreWalk = false;
        this.m_serverWalking = false;
        this.m_knownCompletePath = false;
        this.m_premium = false;
        this.m_known = false;
        this.m_pending = false;
        this.m_idleTimer = new Timer();
        this.m_skillsLevel = [];
        this.m_skillsBaseLevel = [];
        this.m_skillsLevelPercent = [];
        this.m_spells = [];
        this.m_states = 0;
        this.m_vocation = 0;
        this.m_blessings = Blessings.BlessingNone;
        this.m_health = -1;
        this.m_maxHealth = -1;
        this.m_freeCapacity = -1;
        this.m_totalCapacity = -1;
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
        this.m_regenerationTime = -1;
        this.m_offlineTrainingTime = -1;
        for (let skillId = 0; skillId < Skill.LastSkill; skillId++) {
            this.m_skillsLevel[skillId] = -1;
            this.m_skillsBaseLevel[skillId] = -1;
            this.m_skillsLevelPercent[skillId] = -1;
        }
        for (let slotId = 0; slotId < InventorySlot.LastInventorySlot; slotId++) {
            this.m_inventoryItems[slotId] = null;
        }
        this.m_baseSpeed = -1;
    }
    isLocalPlayer() {
        return true;
    }
    unlockWalk() { this.m_walkLockExpiration = 0; }
    lockWalk(millis = 250) {
        this.m_walkLockExpiration = toInt(Math.max(this.m_walkLockExpiration, g_clock.millis() + millis));
    }
    stopAutoWalk() {
        this.m_autoWalkDestination = new Position();
        this.m_lastAutoWalkPosition = new Position();
        this.m_knownCompletePath = false;
        /*
                if(this.m_autoWalkContinueEvent)
                    this.m_autoWalkContinueEvent->cancel();
        */
    }
    autoWalk(destination) {
        /*
                if(g_game.getClientVersion() <= 740 && this.m_position.isInRange(destination, 1, 1))
                    return g_game.walk(this.m_position.getDirectionFromPosition(destination));
        
                bool tryKnownPath = false;
                if(destination != this.m_autoWalkDestination) {
                    this.m_knownCompletePath = false;
                    tryKnownPath = true;
                }
        
                std::tuple<std::vector<Otc::Direction>, Otc::PathFindResult> result;
                std::vector<Otc::Direction> limitedPath;
        
                if(destination == this.m_position)
                    return true;
        
                // try to find a path that we know
                if(tryKnownPath || this.m_knownCompletePath) {
                    result = g_map.findPath(this.m_position, destination, 50000, 0);
                    if(std::get<1>(result) == Otc::PathFindResultOk) {
                        limitedPath = std::get<0>(result);
                        // limit to 127 steps
                        if(limitedPath.size() > 127)
                            limitedPath.resize(127);
                        this.m_knownCompletePath = true;
                    }
                }
        
                // no known path found, try to discover one
                if(limitedPath.empty()) {
                    result = g_map.findPath(this.m_position, destination, 50000, Otc::PathFindAllowNotSeenTiles);
                    if(std::get<1>(result) != Otc::PathFindResultOk) {
                       // callLuaField("onAutoWalkFail", std::get<1>(result));
                        stopAutoWalk();
                        return false;
                    }
        
                    Position currentPos = this.m_position;
                    for(auto dir : std::get<0>(result)) {
                        currentPos = currentPos.translatedToDirection(dir);
                        if(!hasSight(currentPos))
                            break;
                        else
                            limitedPath.push_back(dir);
                    }
                }
        
                this.m_autoWalkDestination = destination;
                this.m_lastAutoWalkPosition = this.m_position.translatedToDirections(limitedPath).back();
        */
        /*
        // debug calculated path using minimap
        for(auto pos : this.m_position.translatedToDirections(limitedPath)) {
            g_map.getOrCreateTile(pos)->overwriteMinimapColor(215);
            g_map.notificateTileUpdate(pos);
        }
        */
        /*
                g_game.autoWalk(limitedPath);
                */
        return true;
    }
    canWalk(direction) {
        /*
        // cannot walk while locked
        if(this.m_walkLockExpiration != 0 && g_clock.millis() < this.m_walkLockExpiration)
            return false;

        // paralyzed
        if(this.m_speed == 0)
            return false;

        // last walk is not done yet
        if((this.m_walkTimer.ticksElapsed() < getStepDuration()) && !isAutoWalking())
            return false;

        // prewalk has a timeout, because for some reason that I don't know yet the server sometimes doesn't answer the prewalk
        bool prewalkTimeouted = this.m_walking && this.m_preWalking && this.m_walkTimer.ticksElapsed() >= getStepDuration() + PREWALK_TIMEOUT;

        // avoid doing more walks than wanted when receiving a lot of walks from server
        if(!this.m_lastPrewalkDone && this.m_preWalking && !prewalkTimeouted)
            return false;

        // cannot walk while already walking
        if((this.m_walking && !isAutoWalking()) && (!prewalkTimeouted || this.m_secondPreWalk))
            return false;
*/
        return true;
    }
    setStates(states) {
        /*
                if(this.m_states != states) {
                    int oldStates = this.m_states;
                    this.m_states = states;
        
                   // callLuaField("onStatesChange", states, oldStates);
                }
                */
    }
    setSkill(skill, level, levelPercent) {
        if (skill >= Skill.LastSkill) {
            Log.error("invalid skill");
            return;
        }
        let oldLevel = this.m_skillsLevel[skill];
        let oldLevelPercent = this.m_skillsLevelPercent[skill];
        if (level != oldLevel || levelPercent != oldLevelPercent) {
            this.m_skillsLevel[skill] = level;
            this.m_skillsLevelPercent[skill] = levelPercent;
            //callLuaField("onSkillChange", skill, level, levelPercent, oldLevel, oldLevelPercent);
        }
    }
    setBaseSkill(skill, baseLevel) {
        if (skill >= Skill.LastSkill) {
            Log.error("invalid skill");
            return;
        }
        let oldBaseLevel = this.m_skillsBaseLevel[skill];
        if (baseLevel != oldBaseLevel) {
            this.m_skillsBaseLevel[skill] = baseLevel;
            //callLuaField("onBaseSkillChange", skill, baseLevel, oldBaseLevel);
        }
    }
    setHealth(health, maxHealth) {
        if (this.m_health != health || this.m_maxHealth != maxHealth) {
            let oldHealth = this.m_health;
            let oldMaxHealth = this.m_maxHealth;
            this.m_health = health;
            this.m_maxHealth = maxHealth;
            //callLuaField("onHealthChange", health, maxHealth, oldHealth, oldMaxHealth);
            // cannot walk while dying
            if (health == 0) {
                if (this.isPreWalking())
                    this.stopWalk();
                this.lockWalk();
            }
        }
    }
    setFreeCapacity(freeCapacity) {
        if (this.m_freeCapacity != freeCapacity) {
            let oldFreeCapacity = this.m_freeCapacity;
            this.m_freeCapacity = freeCapacity;
            // callLuaField("onFreeCapacityChange", freeCapacity, oldFreeCapacity);
        }
    }
    setTotalCapacity(totalCapacity) {
        if (this.m_totalCapacity != totalCapacity) {
            let oldTotalCapacity = this.m_totalCapacity;
            this.m_totalCapacity = totalCapacity;
            // callLuaField("onTotalCapacityChange", totalCapacity, oldTotalCapacity);
        }
    }
    setExperience(experience) {
        if (this.m_experience != experience) {
            let oldExperience = this.m_experience;
            this.m_experience = experience;
            // callLuaField("onExperienceChange", experience, oldExperience);
        }
    }
    setLevel(level, levelPercent) {
        if (this.m_level != level || this.m_levelPercent != levelPercent) {
            let oldLevel = this.m_level;
            let oldLevelPercent = this.m_levelPercent;
            this.m_level = level;
            this.m_levelPercent = levelPercent;
            // callLuaField("onLevelChange", level, levelPercent, oldLevel, oldLevelPercent);
        }
    }
    setMana(mana, maxMana) {
        if (this.m_mana != mana || this.m_maxMana != maxMana) {
            let oldMana = this.m_mana;
            let oldMaxMana;
            this.m_mana = mana;
            this.m_maxMana = maxMana;
            // callLuaField("onManaChange", mana, maxMana, oldMana, oldMaxMana);
        }
    }
    setMagicLevel(magicLevel, magicLevelPercent) {
        if (this.m_magicLevel != magicLevel || this.m_magicLevelPercent != magicLevelPercent) {
            let oldMagicLevel = this.m_magicLevel;
            let oldMagicLevelPercent = this.m_magicLevelPercent;
            this.m_magicLevel = magicLevel;
            this.m_magicLevelPercent = magicLevelPercent;
            // callLuaField("onMagicLevelChange", magicLevel, magicLevelPercent, oldMagicLevel, oldMagicLevelPercent);
        }
    }
    setBaseMagicLevel(baseMagicLevel) {
        if (this.m_baseMagicLevel != baseMagicLevel) {
            let oldBaseMagicLevel = this.m_baseMagicLevel;
            this.m_baseMagicLevel = baseMagicLevel;
            // callLuaField("onBaseMagicLevelChange", baseMagicLevel, oldBaseMagicLevel);
        }
    }
    setSoul(soul) {
        if (this.m_soul != soul) {
            let oldSoul = this.m_soul;
            this.m_soul = soul;
            // callLuaField("onSoulChange", soul, oldSoul);
        }
    }
    setStamina(stamina) {
        if (this.m_stamina != stamina) {
            let oldStamina = this.m_stamina;
            this.m_stamina = stamina;
            // callLuaField("onStaminaChange", stamina, oldStamina);
        }
    }
    setKnown(known) { this.m_known = known; }
    setPendingGame(pending) { this.m_pending = pending; }
    setInventoryItem(inventory, item) {
        if (inventory >= InventorySlot.LastInventorySlot) {
            Log.error("invalid slot");
            return;
        }
        if (this.m_inventoryItems[inventory] != item) {
            let oldItem = this.m_inventoryItems[inventory];
            this.m_inventoryItems[inventory] = item;
            // callLuaField("onInventoryChange", inventory, item, oldItem);
        }
    }
    setVocation(vocation) {
        if (this.m_vocation != vocation) {
            let oldVocation = this.m_vocation;
            this.m_vocation = vocation;
            // callLuaField("onVocationChange", vocation, oldVocation);
        }
    }
    setPremium(premium) {
        if (this.m_premium != premium) {
            this.m_premium = premium;
            // callLuaField("onPremiumChange", premium);
        }
    }
    setRegenerationTime(regenerationTime) {
        if (this.m_regenerationTime != regenerationTime) {
            let oldRegenerationTime = this.m_regenerationTime;
            this.m_regenerationTime = regenerationTime;
            // callLuaField("onRegenerationChange", regenerationTime, oldRegenerationTime);
        }
    }
    setOfflineTrainingTime(offlineTrainingTime) {
        if (this.m_offlineTrainingTime != offlineTrainingTime) {
            let oldOfflineTrainingTime = this.m_offlineTrainingTime;
            this.m_offlineTrainingTime = offlineTrainingTime;
            // callLuaField("onOfflineTrainingChange", offlineTrainingTime, oldOfflineTrainingTime);
        }
    }
    setSpells(spells) {
        if (this.m_spells != spells) {
            let oldSpells = this.m_spells.slice();
            this.m_spells = spells;
            // callLuaField("onSpellsChange", spells, oldSpells);
        }
    }
    setBlessings(blessings) {
        if (blessings != this.m_blessings) {
            let oldBlessings = this.m_blessings;
            this.m_blessings = blessings;
            // callLuaField("onBlessingsChange", blessings, oldBlessings);
        }
    }
    getStates() { return this.m_states; }
    getSkillLevel(skill) { return this.m_skillsLevel[skill]; }
    getSkillBaseLevel(skill) { return this.m_skillsBaseLevel[skill]; }
    getSkillLevelPercent(skill) { return this.m_skillsLevelPercent[skill]; }
    getVocation() { return this.m_vocation; }
    getHealth() { return this.m_health; }
    getMaxHealth() { return this.m_maxHealth; }
    getFreeCapacity() { return this.m_freeCapacity; }
    getTotalCapacity() { return this.m_totalCapacity; }
    getExperience() { return this.m_experience; }
    getLevel() { return this.m_level; }
    getLevelPercent() { return this.m_levelPercent; }
    getMana() { return this.m_mana; }
    getMaxMana() { return this.m_maxMana; }
    getMagicLevel() { return this.m_magicLevel; }
    getMagicLevelPercent() { return this.m_magicLevelPercent; }
    getBaseMagicLevel() { return this.m_baseMagicLevel; }
    getSoul() { return this.m_soul; }
    getStamina() { return this.m_stamina; }
    getRegenerationTime() { return this.m_regenerationTime; }
    getOfflineTrainingTime() { return this.m_offlineTrainingTime; }
    getSpells() { return this.m_spells; }
    getInventoryItem(inventory) { return this.m_inventoryItems[inventory]; }
    getBlessings() { return this.m_blessings; }
    hasSight(pos) {
        return this.m_position.isInRange(pos, g_map.getAwareRange().left - 1, g_map.getAwareRange().top - 1);
    }
    isKnown() { return this.m_known; }
    isPreWalking() { return this.m_preWalking; }
    isAutoWalking() { return this.m_autoWalkDestination.isValid(); }
    isServerWalking() { return this.m_serverWalking; }
    isPremium() { return this.m_premium; }
    isPendingGame() { return this.m_pending; }
    onAppear() {
        super.onAppear();
        /* Does not seem to be needed anymore
        // on teleports lock the walk
        if(!this.m_oldPosition.isInRange(this.m_position,1,1))
            lockWalk();
        */
    }
    onPositionChange(newPos, oldPos) {
        super.onPositionChange(newPos, oldPos);
        if (newPos == this.m_autoWalkDestination)
            this.stopAutoWalk();
        else if (this.m_autoWalkDestination.isValid() && newPos == this.m_lastAutoWalkPosition)
            this.autoWalk(this.m_autoWalkDestination);
    }
    walk(oldPos, newPos) {
        // a prewalk was going on
        if (this.m_preWalking) {
            // switch to normal walking
            this.m_preWalking = false;
            this.m_secondPreWalk = false;
            this.m_lastPrewalkDone = true;
            // if is to the last prewalk destination, updates the walk preserving the animation
            if (newPos == this.m_lastPrewalkDestination) {
                this.updateWalk();
                // was to another direction, replace the walk
            }
            else
                super.walk(oldPos, newPos);
        }
        else {
            this.m_serverWalking = true;
            if (this.m_serverWalkEndEvent)
                this.m_serverWalkEndEvent.cancel();
            super.walk(oldPos, newPos);
        }
    }
    preWalk(direction) {
        Position;
        newPos = this.m_position.translatedToDirection(direction);
        // avoid reanimating prewalks
        if (this.m_preWalking) {
            this.m_secondPreWalk = true;
            return;
        }
        this.m_preWalking = true;
        if (this.m_serverWalkEndEvent)
            this.m_serverWalkEndEvent -  > cancel();
        // start walking to direction
        this.m_lastPrewalkDone = false;
        this.m_lastPrewalkDestination = newPos;
        super.walk(this.m_position, newPos);
    }
    cancelWalk(direction = Direction.InvalidDirection) {
        // only cancel client side walks
        if (this.m_walking && this.m_preWalking)
            stopWalk();
        this.m_lastPrewalkDone = true;
        this.m_idleTimer.restart();
        lockWalk();
        if (this.m_autoWalkDestination.isValid()) {
            g_game.stop();
            auto;
            self = asLocalPlayer();
            if (this.m_autoWalkContinueEvent)
                this.m_autoWalkContinueEvent -  > cancel();
            this.m_autoWalkContinueEvent = g_dispatcher.scheduleEvent([self](), {
                self: - > autoWalk(self -  > this.m_autoWalkDestination)
            }, 500);
        }
        // turn to the cancel direction
        if (direction != Otc)
            : : InvalidDirection;
        setDirection(direction);
        callLuaField("onCancelWalk", direction);
    }
    stopWalk() {
        Creature: : stopWalk(); // will call terminateWalk
        this.m_lastPrewalkDone = true;
        this.m_lastPrewalkDestination = new Position();
    }
    updateWalkOffset(int = totalPixelsWalked) {
        // pre walks offsets are calculated in the oposite direction
        if (this.m_preWalking) {
            this.m_walkOffset = Point(0, 0);
            if (this.m_direction == Otc)
                : : North || this.m_direction == Otc;
            NorthEast || this.m_direction == Otc;
            NorthWest;
            this.m_walkOffset.y = -totalPixelsWalked;
            if (this.m_direction == Otc)
                : : South || this.m_direction == Otc;
            SouthEast || this.m_direction == Otc;
            SouthWest;
            this.m_walkOffset.y = totalPixelsWalked;
            if (this.m_direction == Otc)
                : : East || this.m_direction == Otc;
            NorthEast || this.m_direction == Otc;
            SouthEast;
            this.m_walkOffset.x = totalPixelsWalked;
            if (this.m_direction == Otc)
                : : West || this.m_direction == Otc;
            NorthWest || this.m_direction == Otc;
            SouthWest;
            this.m_walkOffset.x = -totalPixelsWalked;
        }
        else
            super.updateWalkOffset(totalPixelsWalked);
    }
}
void updateWalk();
{
    int;
    stepDuration = getStepDuration();
    float;
    walkTicksPerPixel = getStepDuration(true) / 32.0;
    f;
    int;
    totalPixelsWalked = std;
    min(this.m_walkTimer.ticksElapsed() / walkTicksPerPixel, 32.0, f);
    // update walk animation and offsets
    updateWalkAnimation(totalPixelsWalked);
    updateWalkOffset(totalPixelsWalked);
    updateWalkingTile();
    // terminate walk only when client and server side walk are completed
    if (this.m_walking && !this.m_preWalking && this.m_walkTimer.ticksElapsed() >= stepDuration)
        terminateWalk();
}
void terminateWalk();
{
    Creature: : terminateWalk();
    this.m_preWalking = false;
    this.m_secondPreWalk = false;
    this.m_idleTimer.restart();
    auto;
    self = asLocalPlayer();
    if (this.m_serverWalking) {
        if (this.m_serverWalkEndEvent)
            this.m_serverWalkEndEvent -  > cancel();
        this.m_serverWalkEndEvent = g_dispatcher.scheduleEvent([self], {
            self: - > this.m_serverWalking, false: 
        }, 100);
    }
}
//# sourceMappingURL=localplayer.js.map