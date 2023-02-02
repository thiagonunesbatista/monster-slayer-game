Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100
    }
  },
  computed: {
    healthBarStyles() {
      return {
        monster: `width: ${this.monsterHealth}%`,
        player: `width: ${this.playerHealth}%`
      }
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

      this[enemyHealthKey] -= randomAttackDamage
    },
    makePlayerAttack() {
      this.makeAttack('monsterHealth', 5, 12)
    },
    makePlayerSpecialAttack() {},
    healPlayer() {},
    handleSurrender() {}
  }
}).mount('#game')
