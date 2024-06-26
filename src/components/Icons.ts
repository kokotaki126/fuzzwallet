import { library } from '@fortawesome/fontawesome-svg-core';
import { faDiscord, faGithub, faTwitter, faXTwitter } from '@fortawesome/free-brands-svg-icons';
import { faCopy, faPaperPlane, faQuestionCircle } from '@fortawesome/free-regular-svg-icons';
import {
  faBars,
  faBolt,
  faBook,
  faCheck,
  faChevronDown,
  faChevronRight,
  faCircleInfo,
  faCompress,
  faExpand,
  faExternalLink,
  faFaucet,
  faHouseUser,
  faMagnifyingGlass,
  faRefresh,
  faShoppingBag,
  faSignOut,
  faSpinner,
} from '@fortawesome/free-solid-svg-icons';
import { faGears } from '@fortawesome/free-solid-svg-icons/faGears';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
/* add icons to the library */
[
  faCircleInfo,
  faQuestionCircle,
  faExpand,
  faCompress,
  faXTwitter,
  faPaperPlane,
  faRefresh,
  faBars,
  faSpinner,
  faCopy,
  faMagnifyingGlass,
  faGithub,
  faExternalLink,
  faShoppingBag,
  faSignOut,
  faTwitter,
  faDiscord,
  faHouseUser,
  faGears,
  faBolt,
  faBook,
  faCheck,
  faChevronRight,
  faChevronDown,
  faFaucet,
].forEach((icon: any) => {
  library.add(icon);
});

export default (app: any) => app.component('font-awesome-icon', FontAwesomeIcon);

