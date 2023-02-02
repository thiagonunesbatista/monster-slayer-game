Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      accumulatedPlayerAttacks: 0
    }
  },
  computed: {
    finishedBattleMessage() {
      if (this.playerHealth <= 0) {
        return 'Monster Won'
      }

      if (this.monsterHealth <= 0) {
        return 'Player Won'
      }

      return false
    },
    healthBarStyles() {
      return {
        monster: `width: ${this.monsterHealth}%`,
        player: `width: ${this.playerHealth}%`
      }
    },
    isSpecialAttackAvailable() {
      const quantityToLoadSpecialAttack = 3

      return this.accumulatedPlayerAttacks >= quantityToLoadSpecialAttack
    },
    isHealAvailable() {
      return this.accumulatedPlayerAttacks >= 2 && this.playerHealth < 100
    }
  },
  watch: {
    monsterHealth(newHealthValue, oldHealthValue) {
      const hasMonsterBeenAttacked = newHealthValue - oldHealthValue

      if (newHealthValue > 0 && hasMonsterBeenAttacked) {
        this.makeMonsterAttack()
      }
    },
    playerHealth(newHealthValue, oldHealthValue) {
      const hasPlayerBeenHealed = newHealthValue > oldHealthValue

      if (hasPlayerBeenHealed) {
        this.makeMonsterAttack()
      }
    }
  },
  methods: {
    startNewBattle() {
      this.playerHealth = 100
      this.monsterHealth = 100
      this.accumulatedPlayerAttacks = 0
    },
    getRandomValueBetweenInterval(initialInverval, finalInterval) {
      return (
        Math.floor(Math.random() * (finalInterval - initialInverval)) +
        initialInverval
      )
    },
    makeMonsterAttack() {
      this.makeAttack('playerHealth', 8, 15)
    },
    makeAttack(enemyHealthKey, minimumAttackDamage, maximumAttackDamage) {
      const randomAttackDamage = this.getRandomValueBetweenInterval(
        minimumAttackDamage,
        maximumAttackDamage
      )

      this[enemyHealthKey] -= randomAttackDamage
    },
    makePlayerAttack() {
      this.makeAttack('monsterHealth', 5, 12)
      this.accumulatedPlayerAttacks++
    },
    makePlayerSpecialAttack() {
      if (this.isSpecialAttackAvailable) {
        this.makeAttack('monsterHealth', 15, 20)
        this.accumulatedPlayerAttacks = 0
      }
    },
    healPlayer() {
      if (this.isHealAvailable) {
        const healValue = this.getRandomValueBetweenInterval(5, 20)

        const healthAfterHeal = this.playerHealth + healValue

        if (healthAfterHeal > 100) {
          this.playerHealth = 100
          return
        }

        this.playerHealth = healthAfterHeal
      }
    },
    handleSurrender() {}
  }
}).mount('#game')
