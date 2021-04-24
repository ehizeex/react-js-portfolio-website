export default class Animations {

  /* SINGLETON CLASS INSTANCE */
  static animations = new Animations();

  fadeInScreen = (screen_name) => {
    let screen = document.getElementById(screen_name);
    if(!screen_name || !screen)
    return;

    screen.style.opacity = "1";
    screen.style.transform = "translateY(0px)";
  }
}
