import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCog, faChevronLeft, faPlus, faBars, faTimes, faChevronUp, faChevronDown, faPen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add( faCog, faChevronLeft, faPlus, faBars, faTimes,faChevronUp, faChevronDown, faPen )

Vue.component('font-awesome-icon', FontAwesomeIcon) 