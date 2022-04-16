<template>
    <div class="card">
        <i class="fas fa-car"></i>
        <p>Name: <br><br><span style="font-weight: 700;">{{name}}</span></p>
        <p>Rendszám: <br><br><span style="font-weight: 700;">{{plate}}</span></p>
        <p>Statisztikák: <br>Üzemanyag: <span style="font-weight: 700;">{{stats.fuel}}l,</span> <br>Motor szint: <span style="font-weight: 700;">{{stats.damage}}%,</span> <br>Koszosság: <span style="font-weight: 700;">{{stats.dirt}}%</span></p>
        <i class="takeOut fas fa-sign-in-alt" @click="takeOut"></i>
    </div>
</template>

<script>
export default {
    name: 'CarCard',
    props: {
        name: String,
        plate: String,
        stats: Object
    },
    methods: {
        takeOut() {
            for (let i = 0; i < this.$store.state.carList.length; i++) {
                if (this.plate == this.$store.state.carList[i].plate) {
                    fetch('https://lt_garage/spawncar', {
                        method: 'POST',
                        body: JSON.stringify({
                            spawner: this.$store.state.carList[i].spawnData[0].spawnloc,
                            heading: this.$store.state.carList[i].spawnData[0].spawnhead,
                            vehicle: this.$store.state.carList[i].carFullData,
                            vehPlate: this.$store.state.carList[i].plate,
                            vehFuel: this.$store.state.carList[i].stats.fuel
                        })
                    })
                }
            }
        }
    }
}
</script>

<style scoped>
.card {
    text-align: center;
    margin: 5vmin auto;
    width: 90%;
    height: 20%;
    background-color: rgb(138, 13, 13);
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    border-radius: 1vmin;
    color: white;
    box-shadow: 5px 5px 28px -2px rgb(114, 18, 18);
    
}

.card p {
    font-family: 'Roboto Mono', monospace;
    font-size: 1.6vmin;
}

.card i {
    font-size: 3vmin;
    color: black;
}

.card .takeOut:hover {
    color:green;
    cursor: pointer;
}
</style>