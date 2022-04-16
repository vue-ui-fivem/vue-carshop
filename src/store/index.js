import { createStore } from 'vuex'

export default createStore({
  state: {
    carList: [
      {
        name: 'T20',
        plate: 'ASD-123',
        stats: {
          fuel: 100.0,
          damage: 100,
          dirt: 100
        }
      },
      {
        name: 'T20234',
        plate: 'ASD-123',
        stats: {
          fuel: 100.0,
          damage: 100,
          dirt: 100
        }
      },
      {
        name: 'T20456',
        plate: 'ASD-123',
        stats: {
          fuel: 100.0,
          damage: 100,
          dirt: 100
        }
      },
      {
        name: 'T20798',
        plate: 'ASD-123',
        stats: {
          fuel: 100.0,
          damage: 100,
          dirt: 100
        }
      },
    ]
  },
  getters: {
    carList: (state) => {
      return state.carList
    }
  }
})
