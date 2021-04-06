import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCog, faChevronLeft, faPlus, faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add( faCog, faChevronLeft, faPlus, faBars )

Vue.component('font-awesome-icon', FontAwesomeIcon) 