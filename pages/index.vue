<template>
  <main role="main" id="main">
    <TodoList v-for="(item, index) in todoContent" :key="index" 
              :data="item"
              :columIndex="index" 
              :ghostColum="ghostIndex.colum "
              :ghostTask="ghostIndex.task"
              
              @activateGhost="activateGhost"/>
    <TodoGhost  :data="ghostData"
                :index="ghostIndex"

                @removeTaskFromArr="removeTaskFromArr" 
                @isertTaskToArr="isertTaskToArr"
                ref="clone"/>
    <TodoSliderController />
  </main>
</template>

<script>
export default {
  data: () => {
    return {
      todoContent: [{
        title: 'New',
        context: [{
          title: 'Create Todos',
          priopaty: 'low',
          deadline: '0 : 23 : 13'
        },{
          title: 'Make app',
          priopaty: 'high',
          deadline: '0 : 12 : 13'     
        }]
      },{
        title: 'Processed',
        context: []
      }, {
        title: 'Done',
        context: [{
          title: 'Make design',
          priopaty: 'medium',
          deadline: 'finished'     
        }]
      }],

      ghostIndex: {
        colum: '-',
        task: '-'
      },
      ghostData: {}
    }
  },
  methods: {
    //Ghost config
    activateGhost(val) {      
      const {e, task, index} = val;
      this.ghostData = task;
      
      this.ghostIndex = Object.assign({}, index);

      this.$refs.clone.start(val);

      e.target.addEventListener('touchmove', function(e) {
        e.preventDefault();
        this.$refs.clone.drag(e.touches[0]);
      }.bind(this));
      e.target.addEventListener('touchend', function(e) {
         this.$refs.clone.end();
      }.bind(this));   
    },
    removeTaskFromArr() {
      this.todoContent[Number(this.ghostIndex.colum)].context.splice(this.ghostIndex.task, 1);
    },
    isertTaskToArr() {
      this.todoContent[Number(this.ghostIndex.colum)].context.splice(this.ghostIndex.task, 0, Object.assign({}, this.ghostData));
    }
  }
}
</script>

<style>
  main {
    display: flex;
    align-items: flex-start;
    width: fit-content;
    height: 100%;

    padding-top: 125px; /* Padding from fixed header */
    padding-bottom: 20px;

    position: relative; 
  }

  @media (max-width: 600px) {
    main {
      width: 100%;
      padding-top: 80px; /* Padding from fixed header */
      padding-bottom: 64px; /* Padding from sldier controller */
    }
  }
</style>
