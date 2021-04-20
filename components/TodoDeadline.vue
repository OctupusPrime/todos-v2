<template>
    <div class="todo-opts" :class="{'high': isExpired, 'blue': !isExpired}">
        <p class="todo-deadline semi-bold" >{{timerValues}}</p>
    </div>
</template>

<script>
var cd = 24 * 60 * 60 * 1000,// hr, min, sec, ms
    ch = 60 * 60 * 1000;//min, sec, ms
export default {
    props: ['finishDate', 'dateNow'],
    data: () => {
        return {
            difference_ms: 1,
            isExpired: false
        }
    },
    watch: {
        'finishDate'() {
            this.difference_ms = this.finishDate - this.dateNow;
        },
        'dateNow'() {
            this.difference_ms = this.finishDate - this.dateNow;
        }
    },
    computed: {
        timerValues() {
            let days = Math.floor(Math.abs(this.difference_ms) / cd);
            let hours = Math.floor( (Math.abs(this.difference_ms) - days * cd) / ch);
            let minutes = Math.round( (Math.abs(this.difference_ms) - days * cd - hours * ch) / 60000);

            if( minutes === 60 ){
                hours++;
                minutes = 0;
            }
            if( hours === 24 ){
                days++;
                hours = 0;
            }

            if (this.difference_ms <  -60000)
                this.isExpired = true; 
                
            if (this.isExpired)
                return `- ${days} : ${hours} : ${minutes}`;
            else 
                return `${days} : ${hours} : ${minutes}`;
        }
    },
    mounted() {
        this.difference_ms = this.finishDate - this.dateNow;
    }
}
</script>
