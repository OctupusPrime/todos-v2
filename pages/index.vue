<template>
  <div class="main-wrapper">
    <div class="container">
      <main role="main" id="main">
        <TodoList v-for="(item, index) in todoContent" :key="index" 
                  :data="item"
                  :columIndex="index" 
                  :ghostColum="ghostIndex.colum "
                  :ghostTask="ghostIndex.task"
                  
                  @activateGhost="activateGhost"
                  @openQuickMenu="openQuickTodoMenu"/>

        <button @click="$store.commit('overlay/open')">Show overlay</button>
      </main>
    </div>
    <TodoGhost  :data="ghostData"
                :index="ghostIndex"

                @removeTaskFromArr="removeTaskFromArr" 
                @isertTaskToArr="isertTaskToArr"
                ref="clone"/>

    <TodoOverlayedTask  :data="currentTaskData" 
                        ref="TodoOverlayedTask"/>

    <TodoOpenedTask :data="currentTaskData"
                    ref="todoOpenTask"/>

    <TodoQuickMenu  @openTask="menuOpenTask"
                    @moveTask="moveTask"
                    ref="TodoQuickMenu"/>

    <TodoSliderController />
  </div>

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
      ghostData: {},

      currentTaskData: {}
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
    removeTaskFromArr() {//Сделать отдельную функцию удаления
      this.todoContent[Number(this.ghostIndex.colum)].context.splice(this.ghostIndex.task, 1);
    },
    isertTaskToArr() {
      this.todoContent[Number(this.ghostIndex.colum)].context.splice(this.ghostIndex.task, 0, Object.assign({}, this.ghostData));
    },
    //Menu config
    openQuickTodoMenu(val) {
      this.currentTaskData = val.task;

      this.$refs.TodoOverlayedTask.open(val);
      this.$refs.TodoQuickMenu.open(val.top, val.left + 10 + val.width);
      this.$store.commit('overlay/open');
    },
    menuOpenTask() {
      this.$refs.todoOpenTask.open();
      this.$refs.TodoOverlayedTask.close();

      this.$nextTick(() => {
        let todoOpened = document.querySelector('.todo-opened-task').getBoundingClientRect();

        this.$refs.TodoQuickMenu.open(todoOpened.top, todoOpened.left + todoOpened.width + 10);
      });

    },
    moveTask() {
      console.log(2);
    }
  }
}
</script>

<style scoped>
  .main-wrapper {
    position: relative;

    overflow: hidden;
  }
  .container {
    height: 100vh;

    overflow-y: hidden;
  }
  main {
    display: flex;
    align-items: flex-start;
    width: fit-content;
    height: 100%;

    padding-top: 125px; /* Padding from fixed header */
    padding-bottom: 20px;


  }

  @media (max-width: 600px) {
    .container {
      overflow: hidden;
    }
    main {
      width: 100%;
      padding-top: 80px; /* Padding from fixed header */
      padding-bottom: 64px; /* Padding from sldier controller */
    }
  }
</style>
