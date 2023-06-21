const IMAGES_DIR = '../../assets/images/';
const FLAG_DIR = '../../assets/images/Flag/';

//////////////Drawer Images/////////////
const Drawer_IMAGES_DIR = '../../assets/images/Drawer/';

//////////////BottomTab Images/////////////
const BottomTab_IMAGES_DIR = '../../assets/images/BottomTab/';

const appImages = {
  //Flag
  usa: require(FLAG_DIR + 'usa.png'),
  spain: require(FLAG_DIR + 'spain.png'),

  //////////////////Onboarding////////////
  Onboarding: require(IMAGES_DIR + 'Onboarding.png'),

  no_image: require(IMAGES_DIR + 'image.png'),

  ////////textinput icons///////////
  email: require(IMAGES_DIR + 'email.png'),
  lock: require(IMAGES_DIR + 'lock.png'),
  downarrow: require(IMAGES_DIR + 'arrow-down.png'),

  //////////////app logo////////
  logo: require(IMAGES_DIR + 'logo.png'),

  ////////////socailicons/////////
  apple: require(IMAGES_DIR + 'apple.png'),
  facebook: require(IMAGES_DIR + 'facebook.png'),
  google: require(IMAGES_DIR + 'google.png'),
  google1: require(IMAGES_DIR + 'google1.png'),

  /////////////////Profile/////////////
  User: require(IMAGES_DIR + 'User.png'),
  Camera: require(IMAGES_DIR + 'cameraicon.png'),

  ///////////////slider//////////
  sliderchat: require(IMAGES_DIR + 'chatmenu.png'),

  ///////////////Exchange Icon//////////
  exchangeicon: require(IMAGES_DIR + 'Exchange.png'),
  horizontalexchangeicon: require(IMAGES_DIR + 'horiexchange.png'),

  /////////////////modal imgaes///////////
  sucess: require(IMAGES_DIR + 'modalsucess.png'),
  failed: require(IMAGES_DIR + 'modalfailed.png'),
  confirm: require(IMAGES_DIR + 'modalconfirmation.png'),

  //////////////////////Upload///////////////
  UploadIcpn: require(IMAGES_DIR + 'upload.png'),
  ImageIcon: require(IMAGES_DIR + 'image.png'),
  dogIcon: require(IMAGES_DIR + 'dashboard.png'),

  //////////////////Drawer Images////////////
  drawerpayment: require(Drawer_IMAGES_DIR + 'payment.png'),
  drawercard: require(Drawer_IMAGES_DIR + 'card.png'),
  drawerlanguage: require(Drawer_IMAGES_DIR + 'language.png'),
  drawerchat: require(Drawer_IMAGES_DIR + 'chat.png'),
  drawerbanner: require(Drawer_IMAGES_DIR + 'ad.png'),
  drawerblogs: require(Drawer_IMAGES_DIR + 'blogs.png'),
  drawerpolicy: require(Drawer_IMAGES_DIR + 'policy.png'),
  drawerterms: require(Drawer_IMAGES_DIR + 'terms.png'),
  draweruser: require(Drawer_IMAGES_DIR + 'draweruser.png'),

  ///////////////////////Categories icons///////////
  SaleIcon: require(IMAGES_DIR + 'sale-min.png'),
  PetsIcon: require(IMAGES_DIR + 'pets-min.png'),
  VehicleIcon: require(IMAGES_DIR + 'vehicle-min.png'),
  PropertyIcon: require(IMAGES_DIR + 'property-min.png'),
  ClothIcon: require(IMAGES_DIR + 'cloth-min.png'),
  BagsIcon: require(IMAGES_DIR + 'Bags-min.png'),
  ShoesIcon: require(IMAGES_DIR + 'shoes-min.png'),
  FurnitureIcon: require(IMAGES_DIR + 'furniture-min.png'),

  ///////////////////////BottomTab icons///////////
  HomeIcon: require(BottomTab_IMAGES_DIR + 'home.png'),
  ChatIcon: require(BottomTab_IMAGES_DIR + 'chat.png'),
  AddIcon: require(BottomTab_IMAGES_DIR + 'add.png'),
  BellIcon: require(BottomTab_IMAGES_DIR + 'notifications.png'),
  PersonIcon: require(BottomTab_IMAGES_DIR + 'tabuser.png'),

  /////////////////selected image////////
  selectedbg: require(IMAGES_DIR + 'selectedimage.png'),

  /////////////////////Chat//////////////////
  offlinechatdot: require(IMAGES_DIR + 'offlinedot.png'),
  onlinechatdot: require(IMAGES_DIR + 'onlinedot.png'),
  sendicon: require(IMAGES_DIR + 'send.png'),

  /////////////////selected image////////
  Icon_Chat: require(IMAGES_DIR + 'chat_icon.png'),

  /////////////////selttings image////////
  send_email: require(IMAGES_DIR + 'send_email.png'),
  verify_email: require(IMAGES_DIR + 'verify_email.png'),
  pending_account: require(IMAGES_DIR + 'pending_account.png'),

  live: require(IMAGES_DIR + 'live.png'),
  live_stream_bg: require(IMAGES_DIR + 'live_stream_bg.png'),
  user2: require(IMAGES_DIR + 'user2.png'),
};
export {appImages};
