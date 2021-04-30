<template>
  <div class="main-wrapper">
    <div class="container" ref="sliderContainer">
      <main role="main" id="main" :style="sliderScrollX" :class="{'animate': isAnimate}">
        <resize-observer @notify="handleResize" />
        <TodoList v-for="(item, index) in todos" :key="index" 
                  :data="item"
                  :columIndex="index" 
                  :ghostColum="ghostIndex.colum "
                  :ghostTask="ghostIndex.task"
                  :dateNow="dateNow"
                  
                  @activateGhost="activateGhost"

                  @openQuickMenu="openQuickTodoMenu"
                  @openTask="openTask"
                  
                  @addTask="addTaskToColumn"/>
      </main>
    </div>
    <TodoGhost  :data="currentTaskData"
                :index="ghostIndex"
                :dateNow="dateNow"

                @isertTaskToArr="addTaksToArr({column: ghostIndex.colum, task: ghostIndex.task, data: currentTaskData})"
                @initReq="relocateReq"
                ref="clone"/>

    <TodoOverlayedTask  :data="currentTaskData" 
                        :dateNow="dateNow"

                        @editTask="editTask"
                        ref="TodoOverlayedTask"/>

    <TodoOpenedTask :data="currentTaskData"
                    :colum="Number(openedTaskIndex.colum)"
                    :dateNow="dateNow"

                    @moveTask="moveTask"
                    @deleteTask="openWarningDelete"
                    @editTask="editTask"
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

    <TodoSliderController :taskMargin="50" 
                          :slidesAmount="todos.length"
                          @changePosition="changePosition" 
                          @isAnimated="isAnimated"
                          ref="todoSlider"/>
  </div>

</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";

let quickMenuWidht = 81;
export default {
  data: () => {
    return {
      dateNow: new Date().getTime(), 

      ghostIndex: {
        colum: -1,
        task: -1
      },

      currentTaskData: {},

      openedTaskIndex: {
        colum: 0,
        task: 0
      },

      warningText: 'delete the task.',
      watningEmitVal: 'deleteTask',

      sliderScrollX: 'transform: translateX(0px);',
      isAnimate: false
    }
  },
  computed: {
     ...mapState('todos', ['todos'])
  },
  methods: {
    ...mapMutations('todos', ['addTaksToArr']),
    ...mapMutations('todos', ['removeTaskFromArr']),

    ...mapActions('todos', ['addTodo']),
    ...mapActions('todos', ['deleteTodo']),
    ...mapActions('todos', ['relocateTodo']),
    ...mapActions('todos', ['editTodo']),
    handleResize ({ width, height }) {
      if (width > 600) 
        return this.sliderScrollX = 'transform: translateX(0px);';
        
      this.$refs.todoSlider.resized(width);
      this.$refs.sliderContainer.scrollLeft = 0;
    },
    editTask(val) {
      const {title, data} = val;
      this.editTodo({
        title: title,
        column: this.openedTaskIndex.colum,
        task: this.openedTaskIndex.task,
        data: data
      });   
    },
    //Slider config
    changePosition(val) {
      this.sliderScrollX = val;
    },
    isAnimated(val) {
      this.isAnimate = val;
    },
    addTaskToColumn(data) {
      const {index, task} = data;
      let params = {
        column: index, 
        task: this.todos[index].taskList.length,
        data: task
      }

      this.addTodo(params);
    },
    //Ghost config
    activateGhost(val) {    
      const {e, task, index} = val;
      this.currentTaskData = task;
      
      this.ghostIndex = Object.assign({}, index);

      this.$refs.clone.start(val);

      this.removeTaskFromArr({
        column: this.ghostIndex.colum,
        task: this.ghostIndex.task
      });

      e.target.addEventListener('touchmove', function(e) {
        e.preventDefault();
        this.$refs.clone.drag(e.touches[0]);
      }.bind(this));
      e.target.addEventListener('touchend', function(e) {
         this.$refs.clone.end();
      }.bind(this));   
    },
    relocateReq(val) {
      const {status, index} = val;

      this.relocateTodo({
        title: this.currentTaskData.title, 
        status: this.todos[status].columTitle,
        index: index
      });
    },
    //OverlayTask
    openQuickTodoMenu(val) {
      const {task, index, width, height, left, top} = val;
      this.currentTaskData = Object.assign({}, task);

      this.openedTaskIndex = index;
    
      this.$refs.TodoOverlayedTask.open(width, left, top);

      if (left + width + 10 + quickMenuWidht > document.body.offsetWidth)//mb переделать
        this.$refs.TodoQuickMenu.open(top + height + 10, left);
      else
        this.$refs.TodoQuickMenu.open(top, left + width + 10);

      this.$store.commit('overlay/open');
    },
    //OpenedTAsk 
    openTask(val) {
      const {task, index} = val;
      this.currentTaskData = Object.assign({}, task);
      this.openedTaskIndex = index;

      this.menuOpenTask();
    },
    //Menu config
    menuOpenTask() {
      this.$store.commit('overlay/open');

      this.$refs.todoOpenTask.open();
      this.$refs.TodoOverlayedTask.close();
      this.$refs.TodoQuickMenu.close();
    },
    moveTask(colum) {
      this.$store.commit('overlay/close');

      this.relocateTodo({
        title: this.currentTaskData.title, 
        status: this.todos[colum].columTitle,
        index: 0,
      });

      this.removeTaskFromArr({
        column: this.openedTaskIndex.colum,
        task: this.openedTaskIndex.task
      });

      this.addTaksToArr({
        column: colum,
        task: 0,
        data: this.currentTaskData
      });
    },
    deleteTask() {
      this.deleteTodo({
        title: this.currentTaskData.title, 
        column: this.openedTaskIndex.colum, 
        task: this.openedTaskIndex.task
      }); 
    },
    openWarningDelete() {
      this.$refs.todoOpenTask.close();
      this.$refs.TodoOverlayedTask.close();
      this.$refs.TodoQuickMenu.close();

      this.$refs.ActionWarning.open();
    }
  },
  created() {
    let self = this
    setInterval(function () {
      self.dateNow = new Date().getTime();
      self.dateNow = Number(self.dateNow);
    }, 60000)
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
    position: relative;
    display: flex;
    align-items: flex-start;
    width: fit-content;
    height: 100%;

    padding-bottom: 20px;
  }
  .animate {
    transition: transform .3s ease;
  }

  @media (max-width: 600px) {
    .container {
      overflow: hidden;
    }
    main {
      width: 100%;
      padding-bottom: 64px; /* Padding from sldier controller */
    }
  }
</style>
