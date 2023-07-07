import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect} from 'react';
import LocalizedStrings from 'react-native-localization';

let TranslationStrings = new LocalizedStrings({
  //spanish
  es: {
    WELCOME: 'Bienvenido',
    VIEW_ALL: 'Ver todo',
    Categories: 'Categoria',
    Categories1: 'Categorias',
    MANAGE_SHIPPING_ADDRESS: 'Administrar dirección de envío',
    Language: 'Idioma',

    INVITE_FRIENDS: 'Invitar amigos',
    BANNER_ADVERTISEMENT: 'Anuncio publicitario',
    BLOGS: 'Blogs',
    PRIVACY_POLICY: 'política de privacidad',
    TERMS_AND_CONDITIONS: 'Términos y condiciones',
    LOGOUT: 'CERRAR SESIÓN',
    //
    SHIPPING_ADDRESS: 'Dirección de envío',
    //shipping address
    EDIT: 'Editar',
    USER_NAME: 'Nombre de usuario',
    ADDRESS1: 'Dirección 1',
    ADDRESS2: 'Dirección 2',
    COUNTRY: 'País',
    CITY: 'Ciudad',

    //add shipping address
    ADD_SHIPPING_ADDRESS: 'Agregar dirección de envío',
    ENTER_ADDRESS_1: 'Ingrese la dirección 1',
    ENTER_ADDRESS_2: 'Ingrese la dirección 1',
    SELECT_COUNTRY: 'Seleccionar país',
    SELECT_CITY: 'Ciudad selecta',
    ENTER_ZIP_CODE: 'Ingresa tu código postal',
    ENTER_PHONE_NUMBER: 'Ingresa número telefónico',

    // SAVE: 'ahorrar',
    SAVE: 'agregar',
    PLEASE_SELECT_COUNTRY_FIRST: 'Seleccione primero el país',

    SEARCH: 'Buscar',
    CONTINUE: 'Continuar',

    INVITE_FRIENDS_VIA: 'Invitar amigos a través de',
    INVITE_FRIENDS_VIA_MESSENGER: 'Invitar amigos a través de Messenger',
    INVITE_FRIENDS_VIA_WHATSAPP: 'Invitar amigos a través de Whatsapp',
    INVITE_FRIENDS_VIA_MAIL: 'Invitar amigos por correo electronico',

    ADD_BANNER: 'Agregar pancarta',

    DAY: 'Día',
    UPLOAD_IMAGE: 'Cargar imagen',
    ADD_BANNER_LINK: 'Agregar enlace de banner',
    START_DATE: 'Fecha de inicio',
    END_DATE: 'Fecha final',
    TOTAL_AMOUNT: 'Cantidad total',
    ACCOUNT_FEE: 'Tarifa de cuenta',
    PAY_NOW: 'PAGAR AHORA',

    // CATEGORY: "Category",
    CATEGORY: 'Categoría',
    SUB_CATEGORY: 'Subcategoría',

    REFERENCES: 'Referencias',
    DESCRIPTION: 'Descripción',

    CONFIRMATION: 'Confirmación',
    DO_YOU_REALLY_WANT_TO_LOGOUT: '¿Realmente desea cerrar la sesión?',
    YES: 'Sí',
    CANCEL: 'Cancelar',

    SOLD: 'Vendido',

    // CHATS: "charlas",
    CHATS: 'Conversaciones',
    ONLINE: 'En línea',
    TYPE_A_MESSAGE: 'Escriba un mensaje',
    UPLOAD_FROM_CAMERA: 'Subir desde la cámara',
    UPLOAD_FROM_GALLERY: 'Subir desde la galería',

    ITEM_PRICE: 'Precio del articulo',
    OFFER_PRICE: 'Precio de oferta',
    EXCHANGE_OFFER: 'Oferta de Intercambio',
    ACCEPT: 'Aceptar',
    REJECT: 'Rechazar',
    TALK_ON_CHAT: 'hablar por chat',

    UPLOAD_ITEMS: 'Cargar elementos',
    ITEM_TITLE: 'Título del artículo',
    ITEM_PRICE: 'Precio del articulo',
    SELECT_CATEGORY: 'Selecciona una categoría',
    SELECT_SUB_CATEGORY: 'Seleccionar subcategoría',
    SELECT_PRODUCT_CONDITION: 'Seleccione la condición del producto',
    YOUTUBE_LINK: 'Enlace de Youtube',
    OPTIONAL: 'Opcional',
    ENTER_LOCATION: 'Ingrese la ubicación',
    PICKUP_OR_DELIVERY_SHIPPING_PRICE: 'Precio de envío RECOGIDA o Entrega',
    DONT_CHECK_ANY_OPTION_IF_YOU_WANT_TO_RECEIVE_OFFERS: `No marques ninguna opción si quieres recibir ofertas`,
    NO_EXCHANGE_TO_BUY: 'Sin intercambio para comprar',
    FIXED_PRICE: 'Precio fijo',
    CHECK_IF_YOU_WANT_TO_GIVE_ITEM_FOR_FREE:
      'Marca si quieres dar un artículo gratis',
    GIVING_AWAY: 'Regalando',
    UPLOAD: 'SUBIR',
    UPLOAD_IMAGES: 'Subir Imágenes',

    SUCCESS: 'Éxito',
    ITEM_UPLOADED_SUCCESSFULLY: 'Subida del artículo con éxito',
    DO_YOU_WANT_TO_PROMOTE_YOUR_LISTING: '¿Quieres promocionar tu anuncio?',
    NOT_NOW: 'Ahora no',

    NOTIFICATIONS: 'Notificaciones',
    NO_RECORD_FOUND: 'ningún record fue encontrado',

    // SUBMIT: "ENTREGAR",
    SUBMIT: 'Confirmar',
    COUNTER_OFFER: 'Contraoferta',
    ENTER_PRICE: 'Introducir precio',
    SHIPPING_PRICE: 'Precio de envío',
    OFFER_ACCEPTED_SUCCESSFULLY: 'Oferta aceptada con éxito',
    OFFER_REJECTED_SUCCESSFULLY: 'Oferta rechazada con éxito',
    OK: 'DE ACUERDO',

    // FOLLOWERS: "Seguidoras",
    FOLLOWERS: 'Siguidores',
    // FOLLOWINGS: "Seguidoras",
    FOLLOWINGS: 'Siguiendo',

    FOLLOW: 'Seguir',
    FOLLOWING: 'Seguidores',

    // RATE: "Tasa",
    RATE: 'Calificación',
    // LISTINGS: "Listados",
    LISTINGS: 'Publicaciones',
    LIKED_ITEMS: 'Artículos que te gustan',
    EXCHANGES: 'Intercambios',
    PROMOTIONS: 'Promociones',
    SALE_AND_ORDERS: 'Venta y pedidos',
    SALES: 'Ventas',
    ORDERS: 'Ordenes',

    SETTINGS: 'Ajustes',
    EDIT_PROFILE: 'Editar perfil',
    CHANGE_PASSWORD: 'Cambiar la contraseña',
    LOCATION: 'Ubicación',
    VERIFY_ACCOUNT: 'Verificar Cuenta',

    ENTER_USERNAME: 'Introduzca su nombre de usuario',
    ENTER_FIRST_NAME: 'Ingrese el nombre',
    ENTER_LAST_NAME: 'Introduzca el apellido',
    ENTER_PHONE_NO: 'Ingresa número telefónico',
    YOU_CANNOT_EDIT_YOUR_EMAIL: `No puedes editar tu correo electrónico.`,
    UPDATE: 'Actualizar',
    USER_PROFILE_UPDATED: 'Perfil de usuario actualizado',
    GO_BACK: 'REGRESA',

    OLD_PASSWORD: 'Contraseña anterior',
    NEW_PASSWORD: 'Nueva contraseña',
    CONFIRM_PASSWORD: 'Confirmar Contraseña',
    CHANGE: 'CAMBIAR',
    ADD: 'AGREGAR',

    PROFILE_PICTURE: 'Foto de perfil',
    UPLOAD_YOUR_PICTURE: 'Sube tu foto',
    UPLOAD_DOCUMENTS: 'Subir documentos',
    VERIFY: 'VERIFICAR',
    VERIFICATION_DOCUMENTS: 'Documentos de verificación',
    DOCUMENTS: 'Documentos',

    COMMENTS: 'Comentarios',
    // LIKES: "Gustos",
    LIKES: 'Me Gusta',
    // VIEWS: "Puntos de vista",
    VIEWS: 'Vistas',
    PRODUCT_CONDITION: 'Condición del producto',
    // DATE_OF_LISTING: "Fecha de cotización",
    DATE_OF_LISTING: 'Fecha de publicación',
    SHIPPING_COST: 'Costo de envío',
    VIEW_INSIGHTS: 'VER PERSPECTIVAS',
    PROMOTE: 'Destacar',

    REPORT_ITEM: 'Reportar articulo',
    ENTER_DESCRIPTION: 'Ingrese la descripción',
    REPORT: 'INFORME',
    EDIT_ITEM: 'Editar elemento',
    MARK_AS_SOLD: 'Marcar como vendido',
    DELETE: 'Borrar',
    SHARE: 'Compartir',
    // MAKE_AN_OFFER: "Haz una oferta",
    MAKE_AN_OFFER: 'Hacer oferta',
    VIEW_PROFILE: 'Ver perfil',
    REQUEST_EXCHANGE: 'Intercambio petición',

    IN_COMING_EXCHANGE: 'En próximos intercambios',
    OUT_GOING_EXCHANGE: 'Intercambios salientes',
    SUCCESS_EXCHANGE: 'Intercambios de éxito',
    FAILED_EXCHANGE: 'Intercambios fallidos',
    NO_DATA_FOUND: 'Datos no encontrados',

    // SELLER_DETAILS: "Detalles de la vendedora",
    SELLER_DETAILS: 'Detalles del vendedor',
    // BUY_NOW: "Comprar ahora",
    BUY_NOW: 'Comprar',
    // CHAT: "Charlar",
    CHAT: 'Preguntar',
    // CHAT_List: "Conversaciones",

    ADD_COMMENT: 'Agregar comentario',
    ENTER_COMMENT: 'Introducir comentario',

    APPLY_FILTERS: 'Aplicar filtros',
    ENTER_DISTANCE: 'Introducir distancia',
    POSTED_WITHIN: 'Publicado Dentro',
    SORT_BY: 'Ordenar por',
    SELECT_THE_DISTANCE: 'Seleccione la distancia',
    DONE: 'Hecho',

    FILTER_RESULTS: 'Filtrar Resultados',
    SELECT_POSTED_RANGE: 'Seleccionar rango publicado',
    SELECT_SORT_BY: 'Seleccione Ordenar por',
    ONE_DAY: 'Un día',
    ONE_WEEK: 'Una semana',
    ONE_MONTH: 'Un mes',
    NAME: 'Nombre',
    TIME: 'Tiempo',

    SEARCH_HERE: 'Busca aquí',
    TRENDING_SEARCHES: 'Búsquedas de tendencias',

    //Auth
    SIGN_IN: 'Iniciar sesión',
    PLEASE_SIGN_IN_TO_YOUR_ACCOUNT: 'Inicie sesión en su cuenta',
    EMAIL_ADDRESS: 'Dirección de correo electrónico',
    PASSWORD: 'Contraseña',
    FORGET_PASSWORD: 'Contraseña olvidada',
    // DO_NOT_HAVE_AN_ACCOUNT: `no tengo una cuenta`,
    DO_NOT_HAVE_AN_ACCOUNT: `No tienes cuenta?`,
    SIGN_UP: 'Regístrate',

    SIGN_UP_WITH_GOOGLE: 'Regístrese con Google',
    SIGN_IN_WITH_GOOGLE: 'Inicia sesión con Google',

    SELECT_ROLE: 'Seleccionar rol',
    SIGN_UP_TO_CREATE_YOUR_ACCOUNT: 'Regístrese para crear su cuenta',
    ALREADY_HAVE_AN_ACCOUNT: 'Regístrese para crear su cuenta',
    ALREADY_HAVE_AN_ACCOUNT: 'Ya tienes una cuenta',

    CREATE_PROFILE: 'Crear perfil',
    ENTER_COUNTRY_NAME: 'Ingrese el nombre del país',
    ENTER_CITY_NAME: 'Ingrese el nombre de la ciudad',
    CREATE: 'Crear',

    ERROR: 'Error',
    USER_ALREADY_REGISTERED: 'Usuario ya registrada',

    PLEASE_ENTER_USERNAME: 'Ingrese el nombre de usuario',
    PLEASE_ENTER_FIRST_NAME: 'Ingrese el nombre',
    PLEASE_ENTER_LAST_NAME: 'Ingrese el apellido',
    PLEASE_ENTER_COUNTRY_NAME: 'Ingrese el nombre del país',
    PLEASE_ENTER_CITY_NAME: 'Ingrese el nombre de la ciudad',
    PLEASE_ENTER_EMAIL: 'Ingrese el correo electrónico',
    PLEASE_ENTER_PASSWORD: 'Por favor, ingrese contraseña',
    PLEASE_ENTER_CONFIRM_PASSWORD: 'Por favor ingrese Confirmar contraseña',
    PLEASE_ENTER_PHONE_NUMBER: 'Ingrese el número de teléfono',
    INCORRECT_EMAIL: 'email incorrecto',
    PLEASE_ENTER_SIX_DIGIT_PASSWORD: 'Ingrese la contraseña de 6 dígitos',
    PLEASE_ENTER_SAME_PASSWORD: 'Ingrese la misma contraseña',
    PLEASE_SELECT_ROLE: 'Seleccione Rol',
    ENTER_EMAIL_TO_GET_A_VERIFICATION_CODE:
      'Ingrese el correo electrónico para obtener un código de verificación',
    GET_CODE: 'Obtener código',
    SOMETHING_WENT_WRONG: 'Algo salió mal',
    VERIFICATIONS: 'Verificaciones',
    ENTER_CODE_THAT_YOU_RECEIVED_ON_EMAIL:
      'Ingrese el código que recibió en el correo electrónico',
    RESEND_CODE: 'Reenviar codigo',
    RESET_PASSWORD: 'Restablecer la contraseña',
    CREATE_A_STRONG_PASSWORD: 'Crear una contraseña segura',
    RESET: 'Reiniciar',
    PASSWORD_UPDATED_SUCCESSFULLY: 'Contraseña actualizada exitosamente',

    PLEASE_ENTER_ITEM_TITLE: 'Ingrese el título del artículo',
    PLEASE_ENTER_ITEM_DESCRIPTION: 'Ingrese la descripción del artículo',
    LOCATION_IS_REQUIRED: 'Se requiere ubicación',
    PLEASE_SELECT_A_CATEGORY: 'Porfavor seleccione una categoría',
    PLEASE_SELECT_A_SUB_CATEGORY: 'Seleccione una subcategoría',
    PLEASE_SELECT_PRODUCT_CONDITION: 'Seleccione la condición del producto',
    NO_IMAGE_SELECTED: 'Ninguna imagen seleccionada',
    REPORT_SUCCESSFULLY: 'Informe con éxito',
    REVIEW_ADDED_SUCCESSFULLY: 'Revisión añadida con éxito',

    DO_YOU_REALLY_WANT_TO_DELETE_THE_LISTINGS:
      '¿De verdad quieres eliminar los listados?',
    DO_YOU_REALLY_WANT_TO_REPORT: '¿De verdad quieres denunciar',
    RATE_PROFILE: 'Perfil de tarifa',

    BUY: 'Comprar',
    CARD_INFO: 'Información de la tarjeta',
    EXPIRY_DATE: 'fecha de caducidad',
    ENTER_CVC: 'Ingrese CVC',
    PAY: 'Pagar',
    ENTER_CARD_NUMBER: 'Ingrese el número de tarjeta',
    SAVE_CARD: 'Guardar tarjeta',
    PAYED_SUCCESSFULLY: 'Pagado con éxito',
    CHECKOUT: 'Verificar',
    TOTAL_ITEMS: 'Articulos totales',
    TOTAL_PRICE: 'Precio total',
    // NEXT: "Próxima",
    NEXT: 'Siguiente',

    CONFIRM_ADDRESS: 'Confirmar dirección',
    NO_ADDRESS_ADDED_FIRST_ADD_SHIPPING_ADDRESS:
      'Sin dirección agregada, primero agregue la dirección de envío',
    ADD_ADDRESS: 'Añadir dirección',

    CHOOSE_PAYMENT_METHOD: 'Elige el método de pago',
    CREDIT_CARD: 'Tarjeta de crédito',
    BIT_COIN: 'Bitcoin',
    PAY_ON_DELIVERY: 'Pagar cuando reciba',
    PAY_ON_PICKUP: 'Paga al recogerlo',
    PRICE_OFFER: 'Precio de oferta',
    SELECT_ITEM: 'Seleccione un artículo',
    MAKE_COUNTER_OFFER: 'Hacer contraoferta',
    ITEM_UPDATED_SUCCESSFULLY: 'Artículo actualizado con éxito',

    INSIGHTS: 'Perspectivas',
    POPULARITY: 'Popularidad',
    TOTAL_VISITED_CITIES: 'Total de ciudades visitadas',
    MOST_VISITED_CITIES: 'Ciudades más visitadas',

    PAYMENT_METHOD: 'Método de pago',
    FEATURES: 'Características',
    BUY_AT: 'Compra en',
    REVIEWS: 'Reseñas',
    ENTER_YOUR_EMAIL_FOR_ACCOUNT_VERIFICATION:
      'Ingrese su correo electrónico para la verificación de la cuenta',
    SEND: 'Enviar',

    URGENT: 'Urgente',
    ADVERTISEMENT: 'Publicidad',
    EXPIRED: 'Expirado',

    LIKE_NEW: 'Como nuevo',
    LIGHTLY_USED: 'Poco usado',
    HEAVELY_USED: 'Muy usado',
    NEW: 'Nuevo',

    All: 'Todo',
    BUYERS: 'Compradoras',
    RATE_BUYER: 'Tasa de comprador',

    RATE_SELLER: 'Calificar a la vendedora',

    REMEMBER_ME: 'Acuérdate de mí',

    SHIPPING_ADDRESS_UPDATED_SUCCESSFULLY:
      'Dirección de envío actualizada exitosamente',

    SHIPPING_ADDRESS_CREATED_SUCCESSFULLY:
      'Dirección de envío creada con éxito.',
    AD: 'Destacado',

    OFFERS: 'Ofertas',

    VERIFICATION_TOP_MESSAGE:
      'Mejore la credibilidad y genere confianza en sus transacciones en línea mediante la verificación de su cuenta. Como usuario verificado, se le reconoce como una persona o empresa legítima, lo que aumenta la confianza tanto de los compradores como de los vendedores en sus interacciones con usted". Plus le permite recibir pagos a través de nuestras aplicaciones con tarjeta de crédito, Bitcoin y PayPal, y recibe su dinero a través de Bitcoin, PayPal y transferencia bancaria, esto aumentará sus ventas y lo ayudará a cerrar más negocios.',
    PAYOUT: 'Pago',

    CANCEL_SUBSCRIPTION: 'Cancelar suscripción',

    BITCOIN_WALLET: 'Billetera Bitcoin',
    PAYPAL_EMAIL: 'E-mail de Paypal',
    BANK_Account: 'Cuenta bancaria',

    ENTER_BITCOIN_WALLY: 'Introduzca Bitcoin Wally',
    ENTER_PAYPAL_EMAIL: 'Ingrese el correo electrónico de PayPal',
    ENTER_BANK_ACCOUNT_NUMBER: 'Ingrese el número de cuenta bancaria',

    SELECT_PAYOUT_METHODS: 'Seleccionar métodos de pago',
    AFFILIATE: 'Afiliación',
    PLEASE_UPLOAD_ATLEAST_ONE_IMAGE: 'Sube al menos una imagen.',

    // live streaming
    START_LIVE: 'Empezar el en vivo',
    LIVE_STREAMING: 'Transmisión en vivo',
    MY_STREAMING: 'Mis transmisiones',
    TYPE_SOMETHING: 'Escribe algo',
    PRODUCTS: 'Productos',
    QUANTITY: 'Cantidad',
    GO_LIVE_NOW: 'IR en vivo ahora',
  },
  en: {
    //home
    WELCOME: 'Welcome',
    VIEW_ALL: 'View All',
    Categories: 'Categories',
    Categories1: 'Categories',
    //drawer
    MANAGE_SHIPPING_ADDRESS: 'Manage shipping address',
    Language: 'Language',
    INVITE_FRIENDS: 'Invite Friends',
    BANNER_ADVERTISEMENT: 'Banner Advertisement',
    BLOGS: 'Blogs',
    PRIVACY_POLICY: 'Privacy Policy',
    TERMS_AND_CONDITIONS: 'Terms & Conditions',
    LOGOUT: 'LOGOUT',
    //
    SHIPPING_ADDRESS: 'Shipping Address',

    //shipping address
    EDIT: 'Edit',
    USER_NAME: 'User Name',
    ADDRESS1: 'Address 1',
    ADDRESS2: 'Address 2',
    COUNTRY: 'Country',
    CITY: 'City',

    //add shipping address
    ADD_SHIPPING_ADDRESS: 'Add Shipping Address',
    ENTER_ADDRESS_1: 'Enter Address 1',
    ENTER_ADDRESS_2: 'Enter Address 1',
    SELECT_COUNTRY: 'Select Country',
    SELECT_CITY: 'Select City',
    ENTER_ZIP_CODE: 'Enter ZIP Code',
    ENTER_PHONE_NUMBER: 'Enter Phone Number',

    SAVE: 'SAVE',
    PLEASE_SELECT_COUNTRY_FIRST: 'Please Select Country First',

    SEARCH: 'Search',
    CONTINUE: 'Continue',

    INVITE_FRIENDS_VIA: 'Invite friends via',
    INVITE_FRIENDS_VIA_MESSENGER: 'Invite friends via Messenger',
    INVITE_FRIENDS_VIA_WHATSAPP: 'Invite friends via Whatsapp',
    INVITE_FRIENDS_VIA_MAIL: 'Invite friends via Mail',

    ADD_BANNER: 'Add Banner',
    DAY: 'Day',
    UPLOAD_IMAGE: 'Upload Image',
    ADD_BANNER_LINK: 'Add banner link',
    START_DATE: 'Start Date',
    END_DATE: 'End Date',
    TOTAL_AMOUNT: 'Total Amount',
    ACCOUNT_FEE: 'Account Fee',
    PAY_NOW: 'PAY NOW',

    CATEGORY: 'Category',
    SUB_CATEGORY: 'Sub Category',

    REFERENCES: 'References',
    DESCRIPTION: 'Description',

    CONFIRMATION: 'Confirmation',
    DO_YOU_REALLY_WANT_TO_LOGOUT: 'Do you really want to Logout?',
    YES: 'Yes',
    CANCEL: 'Cancel',

    SOLD: 'Sold',

    CHATS: 'Chats',
    ONLINE: 'Online',
    TYPE_A_MESSAGE: 'Type a message',
    UPLOAD_FROM_CAMERA: 'Upload from Camera',
    UPLOAD_FROM_GALLERY: 'Upload from Gallery',

    ITEM_PRICE: 'Item Price',
    OFFER_PRICE: 'Offer Price',
    EXCHANGE_OFFER: 'Exchange Offer',
    ACCEPT: 'Accept',
    REJECT: 'Reject',
    TALK_ON_CHAT: 'Talk on chat',

    UPLOAD_ITEMS: 'Upload Items',
    ITEM_TITLE: 'Item Title',
    ITEM_PRICE: 'Item Price',
    SELECT_CATEGORY: 'Select Category',
    SELECT_SUB_CATEGORY: 'Select Sub Category',
    SELECT_PRODUCT_CONDITION: 'Select Product Condition',
    YOUTUBE_LINK: 'Youtube Link',
    OPTIONAL: 'Optional',
    ENTER_LOCATION: 'Enter Location',
    PICKUP_OR_DELIVERY_SHIPPING_PRICE: 'PICKUP or Delivery shipping price',
    DONT_CHECK_ANY_OPTION_IF_YOU_WANT_TO_RECEIVE_OFFERS: `Don't check any option if you want to receive offers`,
    NO_EXCHANGE_TO_BUY: 'No Exchange to Buy',
    FIXED_PRICE: 'Fixed Price',
    CHECK_IF_YOU_WANT_TO_GIVE_ITEM_FOR_FREE:
      'Check if you want to give item for free',
    GIVING_AWAY: 'Giving Away',
    UPLOAD: 'UPLOAD',
    UPLOAD_IMAGES: 'Upload Images',

    SUCCESS: 'Success',
    ITEM_UPLOADED_SUCCESSFULLY: 'Item Upload Successfully',
    DO_YOU_WANT_TO_PROMOTE_YOUR_LISTING: 'Do you want to promote Your Listing?',
    NOT_NOW: 'Not Now',

    NOTIFICATIONS: 'Notifications',
    NO_RECORD_FOUND: 'No Record Found',

    SUBMIT: 'SUBMIT',
    COUNTER_OFFER: 'Counter Offer',
    ENTER_PRICE: 'Enter Price',
    SHIPPING_PRICE: 'Shipping Price',
    OFFER_ACCEPTED_SUCCESSFULLY: 'Offer Accepted Successfully',
    OFFER_REJECTED_SUCCESSFULLY: 'Offer Rejected Successfully',
    OK: 'OK',

    FOLLOWERS: 'Followers',
    FOLLOWINGS: 'Followings',

    FOLLOW: 'Follow',
    FOLLOWING: 'Following',

    RATE: 'Rate',
    LISTINGS: 'Listings',
    LIKED_ITEMS: 'Liked Items',
    EXCHANGES: 'Exchanges',
    PROMOTIONS: 'Promotions',
    SALE_AND_ORDERS: 'Sale & Orders',
    SALES: 'Sales',
    ORDERS: 'Orders',

    SETTINGS: 'Settings',
    EDIT_PROFILE: 'Edit Profile',
    CHANGE_PASSWORD: 'Change Password',
    LOCATION: 'Location',
    VERIFY_ACCOUNT: 'Verify Account',

    ENTER_USERNAME: 'Enter Username',
    ENTER_FIRST_NAME: 'Enter First Name',
    ENTER_LAST_NAME: 'Enter Last Name',
    ENTER_PHONE_NO: 'Enter Phone Number',
    YOU_CANNOT_EDIT_YOUR_EMAIL: `You can't edit your email`,
    UPDATE: 'Update',
    USER_PROFILE_UPDATED: 'User Profile Updated',
    GO_BACK: 'GO BACK',

    OLD_PASSWORD: 'Old Password',
    NEW_PASSWORD: 'New Password',
    CONFIRM_PASSWORD: 'Confirm Password',
    CHANGE: 'CHANGE',
    ADD: 'ADD',

    PROFILE_PICTURE: 'Profile Picture',
    UPLOAD_YOUR_PICTURE: 'Upload your picture',
    UPLOAD_DOCUMENTS: 'Upload Documents',
    VERIFY: 'VERIFY',
    VERIFICATION_DOCUMENTS: 'Verification Documents',
    DOCUMENTS: 'Documents',

    COMMENTS: 'Comments',
    LIKES: 'Likes',
    VIEWS: 'Views',
    PRODUCT_CONDITION: 'Product Condition',
    DATE_OF_LISTING: 'Date Of Listing',
    SHIPPING_COST: 'Shipping Cost',
    VIEW_INSIGHTS: 'VIEW INSIGHTS',
    PROMOTE: 'PROMOTE',

    REPORT_ITEM: 'Report Item',
    ENTER_DESCRIPTION: 'Enter Description',
    REPORT: 'REPORT',
    EDIT_ITEM: 'Edit Item',
    MARK_AS_SOLD: 'Mark as Sold',
    DELETE: 'Delete',
    SHARE: 'Share',
    MAKE_AN_OFFER: 'Make an Offer',
    VIEW_PROFILE: 'View Profile',
    REQUEST_EXCHANGE: 'Request Exchange',

    IN_COMING_EXCHANGE: 'In coming Exchanges',
    OUT_GOING_EXCHANGE: 'Out going Exchanges',
    SUCCESS_EXCHANGE: 'Success Exchanges',
    FAILED_EXCHANGE: 'Failed Exchanges',

    NO_DATA_FOUND: 'No Data Found',
    SELLER_DETAILS: 'Seller Details',
    BUY_NOW: 'Buy Now',
    CHAT: 'Chat',

    ADD_COMMENT: 'Add Comment',
    ENTER_COMMENT: 'Enter Comment',

    APPLY_FILTERS: 'Apply Filters',
    ENTER_DISTANCE: 'Enter Distance',
    POSTED_WITHIN: 'Posted within',
    SORT_BY: 'Sort by',
    SELECT_THE_DISTANCE: 'Select the Distance',
    DONE: 'Done',
    FILTER_RESULTS: 'Filter Results',
    SELECT_POSTED_RANGE: 'Select Posted Range',
    SELECT_SORT_BY: 'Select Sort By',
    ONE_DAY: 'One Day',
    ONE_WEEK: 'One Week',
    ONE_MONTH: 'One Month',
    NAME: 'Name',
    TIME: 'Time',

    SEARCH_HERE: 'Search Here',
    TRENDING_SEARCHES: 'Trending Searches',

    //Auth
    SIGN_IN: 'Sign In',
    PLEASE_SIGN_IN_TO_YOUR_ACCOUNT: 'Please Sign In to your account',
    EMAIL_ADDRESS: 'Email Address',
    PASSWORD: 'Password',
    FORGET_PASSWORD: 'Forget Password',
    DO_NOT_HAVE_AN_ACCOUNT: `Don't have an account`,
    SIGN_UP: 'Sign Up',

    SIGN_UP_WITH_GOOGLE: 'Sign up with Google',
    SIGN_IN_WITH_GOOGLE: 'Sign in with Google',

    SELECT_ROLE: 'Select Role',
    SIGN_UP_TO_CREATE_YOUR_ACCOUNT: 'Sign Up to create your account',
    ALREADY_HAVE_AN_ACCOUNT: 'Sign Up to create your account',
    ALREADY_HAVE_AN_ACCOUNT: 'Already Have an Account',

    CREATE_PROFILE: 'Create Profile',
    ENTER_COUNTRY_NAME: 'Enter Country Name',
    ENTER_CITY_NAME: 'Enter City Name',
    CREATE: 'Create',

    ERROR: 'Error',
    USER_ALREADY_REGISTERED: 'User Already Registered',

    PLEASE_ENTER_USERNAME: 'Please Enter User Name',
    PLEASE_ENTER_FIRST_NAME: 'Please Enter First Name',
    PLEASE_ENTER_LAST_NAME: 'Please Enter Last Name',
    PLEASE_ENTER_COUNTRY_NAME: 'Please Enter Country Name',
    PLEASE_ENTER_CITY_NAME: 'Please Enter City Name',
    PLEASE_ENTER_EMAIL: 'Please Enter Email',
    PLEASE_ENTER_PASSWORD: 'Please Enter Password',
    PLEASE_ENTER_CONFIRM_PASSWORD: 'Please Enter Confirm Password',
    PLEASE_ENTER_PHONE_NUMBER: 'Please Enter Phone Number',
    INCORRECT_EMAIL: 'Incorrect Email',
    PLEASE_ENTER_SIX_DIGIT_PASSWORD: 'Please Enter 6 digit Password',
    PLEASE_ENTER_SAME_PASSWORD: 'Please Enter Same Password',
    PLEASE_SELECT_ROLE: 'Please Select Role',

    ENTER_EMAIL_TO_GET_A_VERIFICATION_CODE:
      'Enter email to get a verification code',
    GET_CODE: 'Get Code',
    SOMETHING_WENT_WRONG: 'Something went wrong',
    VERIFICATIONS: 'Verifications',
    ENTER_CODE_THAT_YOU_RECEIVED_ON_EMAIL:
      'Enter Code that you received on email',
    RESEND_CODE: 'Resend Code',
    RESET_PASSWORD: 'Reset Password',
    CREATE_A_STRONG_PASSWORD: 'Create a strong password',
    RESET: 'Reset',
    PASSWORD_UPDATED_SUCCESSFULLY: 'Password updated successfully',

    PLEASE_ENTER_ITEM_TITLE: 'Please Enter Item Title',
    PLEASE_ENTER_ITEM_DESCRIPTION: 'Please Enter Item Description',
    LOCATION_IS_REQUIRED: 'Location is required',
    PLEASE_SELECT_A_CATEGORY: 'Please select a category',
    PLEASE_SELECT_A_SUB_CATEGORY: 'Please select a sub category',
    PLEASE_SELECT_PRODUCT_CONDITION: 'Please select Product Condition',

    NO_IMAGE_SELECTED: 'No Image Selected',
    REPORT_SUCCESSFULLY: 'Report Successfully',
    REVIEW_ADDED_SUCCESSFULLY: 'Review Added Successfully',

    DO_YOU_REALLY_WANT_TO_DELETE_THE_LISTINGS:
      'Do you really want to Delete the listings?',

    DO_YOU_REALLY_WANT_TO_REPORT: 'Do you really want to Report',
    RATE_PROFILE: 'Rate Profile',

    BUY: 'Buy',
    CARD_INFO: 'Card Info',
    EXPIRY_DATE: 'expiry date',
    ENTER_CVC: 'Enter CVC',
    PAY: 'Pay',
    ENTER_CARD_NUMBER: 'Enter Card Number',
    SAVE_CARD: 'Save Card',
    PAYED_SUCCESSFULLY: 'Payed Successfully',
    CHECKOUT: 'Checkout',
    TOTAL_ITEMS: 'Total Items',
    TOTAL_PRICE: 'Total Price',
    NEXT: 'Next',

    CONFIRM_ADDRESS: 'Confirm Address',
    NO_ADDRESS_ADDED_FIRST_ADD_SHIPPING_ADDRESS:
      'No Address Added, First Add Shipping Address',
    ADD_ADDRESS: 'Add Address',
    CHOOSE_PAYMENT_METHOD: 'Choose Payment Method',
    CREDIT_CARD: 'Credit Card',
    BIT_COIN: 'Bit Coin',
    PAY_ON_DELIVERY: 'Pay on Delivery',
    PAY_ON_PICKUP: 'Pay on Pickup',

    PRICE_OFFER: 'Price Offer',
    SELECT_ITEM: 'Select Item',
    MAKE_COUNTER_OFFER: 'Make Counter Offer',
    ITEM_UPDATED_SUCCESSFULLY: 'Item Updated Successfully',

    INSIGHTS: 'Insights',
    POPULARITY: 'Popularity',
    TOTAL_VISITED_CITIES: 'Total Visited Cities',
    MOST_VISITED_CITIES: 'Most Visited Cities',

    PAYMENT_METHOD: 'Payment Method',
    FEATURES: 'Features',
    BUY_AT: 'Buy at',
    REVIEWS: 'Reviews',
    ENTER_YOUR_EMAIL_FOR_ACCOUNT_VERIFICATION:
      'Enter your email for account verification',
    SEND: 'Send',

    URGENT: 'Urgent',
    ADVERTISEMENT: 'Advertisement',
    EXPIRED: 'Expired',

    LIKE_NEW: 'like new',
    LIGHTLY_USED: 'lightly used',
    HEAVELY_USED: 'heavely used',
    NEW: 'New',

    All: 'All',

    BUYERS: 'Buyers',
    RATE_BUYER: 'Rate Buyer',
    RATE_SELLER: 'Rate Seller',
    REMEMBER_ME: 'Remember Me',

    SHIPPING_ADDRESS_UPDATED_SUCCESSFULLY:
      'Shipping Address updated successfully',

    SHIPPING_ADDRESS_CREATED_SUCCESSFULLY:
      'Shipping Address created Successfully.',
    AD: 'Ad',

    OFFERS: 'Offers',

    VERIFICATION_TOP_MESSAGE:
      'Enhance credibility and build trust in your online transactions by verifying your account. As a verified user, you are recognized as a legitimate individual or business, increasing the confidence of both buyers and sellers in their interactions with you." Plus allows you to get pay through our apps with credit card, Bitcoin and PayPal, and you receive your money through Bitcoin, PayPal and bank transfer, this will increase your sells and help you closed more deals.',

    PAYOUT: 'Payout',

    CANCEL_SUBSCRIPTION: 'Cancel Subscription',

    BITCOIN_WALLET: 'Bitcoin Wallet',
    PAYPAL_EMAIL: 'PayPal Email',
    BANK_Account: 'Bank Account',

    ENTER_BITCOIN_WALLY: 'Enter Bitcoin Wally',
    ENTER_PAYPAL_EMAIL: 'Enter PayPal Email',
    ENTER_BANK_ACCOUNT_NUMBER: 'Enter Bank Account Number',

    SELECT_PAYOUT_METHODS: 'Select Payout Methods',
    AFFILIATE: 'Affiliate',
    PLEASE_UPLOAD_ATLEAST_ONE_IMAGE: 'Please upload at least one image',

    // live streaming
    START_LIVE: 'Start Live',
    LIVE_STREAMING: 'Live Streaming',
    MY_STREAMING: 'My Streams',
    TYPE_SOMETHING: 'Type Something',
    PRODUCTS: 'Products',
    QUANTITY: 'Quantity',

    GO_LIVE_NOW: 'Go Live Now',
  },
});

// useEffect(() => {
//   getSelectedLanguage();
// }, []);

// const getSelectedLanguage = async () => {
//   let language = await AsyncStorage.getItem("Language");
//   if (language) {
//     console.log("language : ", language);
//     ChangeAppLanguage(language);
//   } else {
//     ChangeAppLanguage("en");
//     console.log("else_________________________________");
//     await AsyncStorage.setItem("Language", "en");
//   }
// };
// TranslationStrings.setLanguage("es");

export function ChangeAppLanguage(lang) {
  TranslationStrings.setLanguage(lang);
}
export default TranslationStrings;
