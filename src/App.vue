<template>
    <div id="container">
        <p id="titleTag">LTRPGarázs rendszer</p>
        <i @click="exit()" id="close" class="fas fa-times"></i>
        <div id="insideCont">
            <div id="searchContainer">
                <i class="fas fa-search"></i>
                <input placeholder="Keresés . . ." type="text" v-model="searchQuery">
            </div>
            <div id="cars">
                <Card v-for="(value, index) in filteredList" :name="value.name" :plate="value.plate" :stats="value.stats" :key="index" />
                <h1 v-if="carList.length == 0">Nincs elérhető jármű!</h1>
            </div>
        </div>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
import Card from './components/CardCard.vue'

export default {
    name: 'Container',
    components: {
        Card
    },
    data() {
        return {
            searchQuery: ''
        }
    },
    computed: {
        ...mapGetters(['carList']),
        filteredList() {
            return this.$store.state.carList.filter(i => {
                return i.plate.toLowerCase().includes(this.searchQuery.toLowerCase()) || i.name.toLowerCase().includes(this.searchQuery.toLowerCase())
            })
        },
    },
    methods: {
        exit() {
            fetch('https://lt_garage/exit', {
                method: 'POST',
            })
        }
    },
    mounted() {
        document.onkeyup = (data) => {
            if (data.which == 27) {
                fetch('https://lt_garage/exit', {
                    method: 'POST',
                })
            }
        };
        window.addEventListener('message', (event) => {
            if (event.data.type) {
                let display  = document.getElementById('container')
                if (event.data.status) {
                    display.style.display = 'block'
                    if (event.data.type == 'garage') {
                        this.$store.state.carList = []
                        for (let i = 0; i < event.data.data.length; i++) {
                            if (event.data.data[i].stored == 1) {
                                this.$store.state.carList.push({spawnData: event.data.spawnData, name: event.data.data[i].vehName, plate: event.data.data[i].plate, stats: {fuel: JSON.parse(event.data.data[i].vehicle).fuelLevel, demage: JSON.parse(event.data.data[i].vehicle).engineHealth, dirt: JSON.parse(event.data.data[i].vehicle).dirtLevel}, carFullData: event.data.data[i].vehicle})
                            }
                        }
                    } else if (event.data.type == 'impound') {
                        this.$store.state.carList = []
                        for (let i = 0; i < event.data.data.length; i++) {
                            if (event.data.data[i].stored == 0) {
                                this.$store.state.carList.push({spawnData: event.data.spawnData, name: event.data.data[i].vehName, plate: event.data.data[i].plate, stats: {fuel: JSON.parse(event.data.data[i].vehicle).fuelLevel, demage: JSON.parse(event.data.data[i].vehicle).engineHealth, dirt: JSON.parse(event.data.data[i].vehicle).dirtLevel}, carFullData: event.data.data[i].vehicle})
                            }
                        }
                    }
                }
            } 
        })
    }
}
</script>

<style scoped>
#container {
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 120vmin;
    height: 70vmin;
    background-color: rgb(90, 90, 90);
    border-radius: 1vmin;
    box-shadow: 5px 5px 28px -2px #000;
}
#insideCont {
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    width: 90%;
    height: 80%;
    background-color: rgba(43, 43, 43, 0.74);
    border-radius: 1vmin;
    box-shadow: 5px 5px 28px -2px #424242;
}
#titleTag {
    font-size: 3vmin;
    font-weight: 700;
    margin: 0;
    padding: 0;
    color: white;
    position: absolute;
    top: 2vmin;
    left: 7vmin;
    font-family: 'Oswald', sans-serif;
    text-shadow: 1px 1px 21px rgba(255, 255, 255, 1);
}
#close {
    color: red;
    margin: 0;
    padding: 0;
    position: absolute;
    top: 1vmin;
    right: 2vmin;
    font-size: 2.5vmin;
    font-weight: 700;
}
#searchContainer {
    width: 97%;
    height: 12%;
    display: flex;
    align-items: center;
    justify-content: center;
}
#searchContainer input {
    width: 80%;
    height: 4vmin;
    border-radius: 0.5vmin;
    outline: none;
    border: none;
    margin: 3vmin;
    padding-left: 5vmin
}
#searchContainer input::placeholder {
    letter-spacing: 0.2vmin;
}
#searchContainer i {
    position: relative;
    top: -0.1vmin;
    left: 6.5vmin;
}
#cars {
    width: 90%;
    height: 82%;
    margin: 0 auto;
    overflow: auto;
    text-align: center;
}
h1 {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
}
</style>


<style>
/* width */
::-webkit-scrollbar {
  width: 0.5vmin;
}
/* Handle */
::-webkit-scrollbar-thumb {
  background: black; 
  border-radius: 0.5vmin;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: rgb(61, 61, 61); 
}
</style>