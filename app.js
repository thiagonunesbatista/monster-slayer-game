Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      accumulatedPlayerAttacks: 0,
      hasPlayerSurrended: false,
      logMessages: []
    }
  },
  computed: {
    finishedBattleMessage() {
      if (this.hasPlayerSurrended || this.playerHealth <= 0) {
        return 'Monster Won'
      }

      if (this.monsterHealth <= 0) {
        return 'Player Won'
      }

      return false
    },
    healthBarStyles() {
      return {
        monster: `width: ${this.monsterHealth > 0 ? this.monsterHealth : 0}%`,
        player: `width: ${this.playerHealth > 0 ? this.playerHealth : 0}%`
      }
    },
    isSpecialAttackAvailable() {
      const quantityToLoadSpecialAttack = 3

      return this.accumulatedPlayerAttacks >= quantityToLoadSpecialAttack
    },
    isHealAvailable() {
      return this.accumulatedPlayerAttacks >= 2 && this.playerHealth < 100
    },
    isANewGame() {
      return this.playerHealth === 100 && this.monsterHealth === 100
    }
  },
  watch: {
    monsterHealth(newHealthValue, oldHealthValue) {
      if (this.isANewGame) {
        return
      }

      const hasMonsterBeenAttacked = newHealthValue < oldHealthValue

      if (newHealthValue > 0 && hasMonsterBeenAttacked) {
        this.makeMonsterAttack()
      }
    },
    playerHealth(newHealthValue, oldHealthValue) {
      if (this.isANewGame) {
        return
      }

      const hasPlayerBeenHealed = newHealthValue > oldHealthValue

      if (hasPlayerBeenHealed) {
        this.makeMonsterAttack()
      }
    }
  },
  methods: {
    addLogMessage({ who, action, type, points }) {
      this.logMessages.unshift({
        who,
        type,
        action,
        points
      })
    },
    startNewBattle() {
      this.playerHealth = 100
      this.monsterHealth = 100
      this.accumulatedPlayerAttacks = 0
      this.hasPlayerSurrended = false
      this.logMessages = []
    },
    getRandomValueBetweenInterval(initialInverval, finalInterval) {
      return (
        Math.floor(Math.random() * (finalInterval - initialInverval)) +
        initialInverval
      )
    },
    makeMonsterAttack() {
      this.makeAttack('playerHealth', 8, 15, 'monster')
    },
    makeAttack(
      enemyHealthKey,
      minimumAttackDamage,
      maximumAttackDamage,
      originAttackName
    ) {
      const randomAttackDamage = this.getRandomValueBetweenInterval(
        minimumAttackDamage,
        maximumAttackDamage
      )

      this.addLogMessage({
        who: originAttackName,
        action: `attacked with damage of`,
        points: randomAttackDamage,
        type: 'attack'
      })

      this[enemyHealthKey] -= randomAttackDamage
    },
    makePlayerAttack() {
      this.makeAttack('monsterHealth', 5, 12, 'player')
      this.accumulatedPlayerAttacks++
    },
    makePlayerSpecialAttack() {
      if (this.isSpecialAttackAvailable) {
        this.makeAttack('monsterHealth', 15, 25, 'player')
        this.accumulatedPlayerAttacks = 0
      }
    },
    healPlayer() {
      if (this.isHealAvailable) {
        const healValue = this.getRandomValueBetweenInterval(5, 20)

        const healthAfterHeal = this.playerHealth + healValue

        this.addLogMessage({
          who: 'player',
          action: `healed himself for`,
          type: 'heal',
          points: healValue
        })

        if (healthAfterHeal > 100) {
          this.playerHealth = 100
          return
        }

        this.playerHealth = healthAfterHeal
      }
    },
    handleSurrender() {
      this.hasPlayerSurrended = true
      this.addLogMessage({
        who: 'player',
        type: 'surrended',
        action: 'surrended'
      })
    }
  }
}).mount('#game')
