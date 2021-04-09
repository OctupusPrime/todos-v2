import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCog, faChevronLeft, faPlus, faBars, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add( faCog, faChevronLeft, faPlus, faBars, faTimes )

Vue.component('font-awesome-icon', FontAwesomeIcon) 