<template>
    <div class="todo-slider-controller bg-white" @mousedown="start($event)" @touchstart="start($event.touches[0])"> 
        <div class="dots-row">
            <div class="dot" v-for="(item, index) in slidesAmount" :key="index" :class="{'active': index === activeSlide}"/>
        </div>
    </div>
</template>

<script>
//Переделать добавление класса animate
var isCliked = false;
var firstPos = 0;
var firstSize = 0;
export default {
    props: ['taskMargin', 'taskTitle', 'slidesAmount'],
    data: function () {
        return {
            slideWidht: 0,
            sliderScrollX: 0,
            isAnimate: false,
            secPos: 0,
            activeSlide: 0
        }
    },   
    computed: {
        scrollX() {
            return `transform: translateX(${-(this.secPos + this.sliderScrollX)}px);`
        }
    },
    watch: {
        'scrollX'() {
            this.$emit('changePosition', this.scrollX)
        },
        'isAnimate'() {
            this.$emit('isAnimated', this.isAnimate)
        }
    },
    methods: {
        resized(width) {
            this.isAnimate = false;
            this.sliderScrollX -= (firstSize - width)*this.activeSlide;//*x = posIndex of slide
            this.slideWidht = width;
            firstSize = width;
        },
        nextSlide(isAnimate) {
            this.isAnimate = isAnimate;
            this.activeSlide++;

            if (this.activeSlide  > (this.slidesAmount - 1))
                    this.activeSlide = 0;

            this.sliderScrollX = this.sliderScrollX + (this.taskMargin +  this.slideWidht);
        },
        pastSlide(isAnimate) {
            this.isAnimate = isAnimate;
            this.activeSlide--;

            if (this.activeSlide < 0)
                this.activeSlide = (this.slidesAmount - 1);

            this.sliderScrollX = this.sliderScrollX - (this.taskMargin +  this.slideWidht);
        },
        start(e) {
            this.isAnimate = false;
            isCliked = true;
            firstPos = e.pageX;
        },
        drag(e) {
            if (isCliked) 
                this.secPos = firstPos - e.pageX;
        },
        end() {
            isCliked = false;
            this.isAnimate = true;
            if (this.secPos > this.slideWidht/3 && -(this.secPos + this.sliderScrollX) > -((this.slideWidht + this.taskMargin)*(this.slidesAmount - 1))) 
                this.nextSlide(true);
            else if (this.secPos < (-this.slideWidht/3) && (this.secPos + this.sliderScrollX) > 0) 
                this.pastSlide(true);

            this.secPos = 0;
        },       
    },
    mounted() {
        this.slideWidht = firstSize = document.getElementById('main').offsetWidth;
        //events mouse
        window.addEventListener('mousemove', function(e) {
            this.drag(e);
        }.bind(this));
        window.addEventListener('mouseup', function() {
            this.end();
        }.bind(this));

        //events touch
        window.addEventListener('touchmove', function(e){
            this.drag(e.touches[0]);
        }.bind(this));
        window.addEventListener('touchend', function(){
            this.end();
        }.bind(this));
  }
}
</script>

<style scoped>
    .todo-slider-controller {
        display: none;
        width: calc(100% - 50px);/*15px both sides */
        height: 40px;
        border-radius: 5px;
        box-shadow: 0px 5px 7px -5px rgba(0, 0, 0, 0.25);

        position: fixed;
        left: 50%;
        bottom: 12px;
        transform: translate(-50%, 0);
    }

    .dots-row {
        display: flex;
        position: absolute;
        bottom: 10px;
        left: 50%;
        transform: translate(-50%, 50%);
        z-index: 2;
    }
    .dot {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background-color: #000;
    }
    .dot + .dot {
        margin-left: 5px;
    }
    .dot.active {
        background-color: #0077b6;
    }

    @media (max-width: 600px) {
        .todo-slider-controller {
            display: block;
        }
    }
</style>