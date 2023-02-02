Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      accumulatedPlayerAttacks: 0
    }
  },
  computed: {
    healthBarStyles() {
      return {
        monster: `width: ${this.monsterHealth}%`,
        player: `width: ${this.playerHealth}%`
      }
    },
    isSpecialAttackAvailable() {
      const quantityToLoadSpecialAttack = 3

      return this.accumulatedPlayerAttacks >= quantityToLoadSpecialAttack
    }
  },
  watch: {
    monsterHealth(newHealthValue, oldHealthValue) {
      const hasMonsterBeenAttacked = newHealthValue - oldHealthValue

      if (hasMonsterBeenAttacked) {
        this.makeMonsterAttack()
      }
    }
  },
  methods: {
    makeMonsterAttack() {
      this.makeAttack('playerHealth', 8, 15)
    },
    makeAttack(enemyHealthKey, minimumAttackDamage, maximumAttackDamage) {
      const randomAttackDamage =
        Math.floor(
          Math.random() * (maximumAttackDamage - minimumAttackDamage)
        ) + minimumAttackDamage

      console.log(randomAttackDamage)

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
    healPlayer() {},
    handleSurrender() {}
  }
}).mount('#game')
