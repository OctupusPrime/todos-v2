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
                  @openQuickMenu="openQuickTodoMenu"
                  @addTask="addTaskToColumn"/>
      </main>
    </div>
    <TodoGhost  :data="currentTaskData"
                :index="ghostIndex"

                @removeTaskFromArr="removeTaskFromArr(ghostIndex.colum, ghostIndex.task)" 
                @isertTaskToArr="isertTaskToArr(ghostIndex.colum, ghostIndex.task, currentTaskData)"
                ref="clone"/>

    <TodoOverlayedTask  :data="currentTaskData" 
                        ref="TodoOverlayedTask"/>

    <TodoOpenedTask :data="currentTaskData"
                    :colum="Number(openedTaskIndex.colum)"

                    @moveTask="moveTask"
                    @deleteTask="openWarningDelete"
                    ref="todoOpenTask"/>

    <TodoQuickMenu  :colum="Number(openedTaskIndex.colum)"
                    @openTask="menuOpenTask"
                    @moveTask="moveTask"
                    @deleteTask="openWarningDelete"
                    ref="TodoQuickMenu"/>

    <ActionWarning  :data="warningText"
                    :emit="watningEmitVal"
                    @deleteTask="deleteTask"
                    ref="ActionWarning"/>

    <TodoSliderController />
  </div>

</template>

<script>
import ActionWarning from '../components/ActionWarning.vue';
export default {
  components: { ActionWarning },
  data: () => {
    return {
      todoContent: [{
        title: 'New',
        context: []
      },{
        title: 'Processed',
        context: []
      }, {
        title: 'Done',
        context: []
      }],

      ghostIndex: {
        colum: '-',
        task: '-'
      },

      currentTaskData: {},

      openedTaskIndex: {
        colum: 0,
        task: 0
      },

      warningText: 'delete the task.',
      watningEmitVal: 'deleteTask'
    }
  },
  methods: {
    removeTaskFromArr(colum, task) {//Сделать отдельную функцию удаления
      this.todoContent[Number(colum)].context.splice(Number(task), 1);
    },
    isertTaskToArr(colum, task, data) {
      this.todoContent[Number(colum)].context.splice(Number(task), 0, Object.assign({}, data));
    },
    //Ghost config
    activateGhost(val) {      
      const {e, task, index, width, left, top, offSet} = val;
      this.currentTaskData = task;
      
      this.ghostIndex = Object.assign({}, index);

      this.$refs.clone.start(width, left, top, offSet);

      e.target.addEventListener('touchmove', function(e) {
        e.preventDefault();
        this.$refs.clone.drag(e.touches[0]);
      }.bind(this));
      e.target.addEventListener('touchend', function(e) {
         this.$refs.clone.end();
      }.bind(this));   
    },
    //OverlayTask
    openQuickTodoMenu(val) {
      const {task, index, width, left, top} = val;

      this.currentTaskData = task;

      this.openedTaskIndex = index;

      this.$refs.TodoOverlayedTask.open(width, left, top);
      this.$refs.TodoQuickMenu.open(top, left + 10 + width);
      this.$store.commit('overlay/open');
    },
    //Menu config
    menuOpenTask() {
      this.$refs.todoOpenTask.open();
      this.$refs.TodoOverlayedTask.close();
      this.$refs.TodoQuickMenu.close();
    },
    moveTask(colum) {
      this.$store.commit('overlay/close');

      this.removeTaskFromArr(this.openedTaskIndex.colum, this.openedTaskIndex.task);
      this.isertTaskToArr(colum, 0, this.currentTaskData);
    },
    deleteTask() {
      this.$store.commit('overlay/close');
      this.removeTaskFromArr(this.openedTaskIndex.colum, this.openedTaskIndex.task);
    },
    openWarningDelete() {
      this.$refs.todoOpenTask.close();
      this.$refs.TodoOverlayedTask.close();
      this.$refs.TodoQuickMenu.close();

      this.$refs.ActionWarning.open();
    },
    addTaskToColumn(data) {
      this.isertTaskToArr(data.index, this.todoContent[data.index].context.length, data.task);
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
