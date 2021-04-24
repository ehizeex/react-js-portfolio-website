import { TOTAL_SCREENS } from './commonUtils';
import { Subject } from 'rxjs';

export default class ScrollService {

  /* SINGLETON CLASS INSTANCE */
  static scrollHandler = new ScrollService();

  /* BROADCASTERS */
  static currentScreenBroadcaster = new Subject();
  static currentScreenFadeIn = new Subject();

  constructor() {
    /* ADD SCROLL EVENT TO WINDOW */
    window.addEventListener('scroll', this.checkCurrentScreenUnderViewport);
  }

  /* SCROLL TO HIRE ME / CONTACT ME SCREEN */
  scrollToHireMe = () => {
    let contactMeScreen = document.getElementById("Contact Me");
    if (!contactMeScreen) return;

    contactMeScreen.scrollIntoView({ behavior: "smooth" });
  };

  /* CHECK IF ELEMENT IS IN VIEW */
  isElementInView = (elem, type) => {
    let rec = elem.getBoundingClientRect();
    let elementTop = rec.top;
    let elemBottom = rec.bottom;

    /* Partially Visible */
    let partiallyVisible = elementTop < window.innerHeight && elemBottom >= 0;

    /* Completely Visible */
    let completelyVisible = elementTop >= 0 && elemBottom <= window.innerHeight;

    switch (type) {
      case "partial":
          return partiallyVisible;
        
      case "complete":
          return completelyVisible;
    
      default:
          return false;
    }
  };
  
  /* CHECK THE SCREEN THATS CURRENTLY UNDER VIEWPORT */
  checkCurrentScreenUnderViewport = (event) => {
    if(!event || Object.keys(event).length < 1)
    return;

    for(let screen of TOTAL_SCREENS){
      let screenFromDOM = document.getElementById(screen.screen_name);
      if(!screenFromDOM)
      continue;

      let fullyVisible = this.isElementInView(screenFromDOM, "complete");
      let partiallyVisible = this.isElementInView(screenFromDOM, "partial");

      if(fullyVisible || partiallyVisible) {
        if(partiallyVisible && !screen.alreadyRendered){
          //BROADCAST FADE IN EFFECT
          ScrollService.currentScreenFadeIn.next({
            fadeInScreen: screen.screen_name
          });
          screen['alreadyRendered'] = true;
          break;
        }

        if (fullyVisible) {
          // BROADCAST SCREEN NAME
          ScrollService.currentScreenBroadcaster.next({
            screenInView: screen.screen_name
          });
          break;
        }
      }
    }
  }

}
