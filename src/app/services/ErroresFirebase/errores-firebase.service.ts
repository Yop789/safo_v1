import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ErroresFirebaseService {
  constructor() {}

  async handleFirebaseError(error: any): Promise<string> {
    let errorMessage: string;

    switch (error.code) {
      case 'auth/claims-too-large':
        errorMessage =
          'La carga útil de la reclamación supera el tamaño máximo de 1,000 bytes.';
        break;
      case 'auth/email-already-in-use':
        errorMessage =
          'Otro usuario ya está utilizando el correo electrónico proporcionado. Cada usuario debe tener un correo electrónico único.';
        break;
      case 'auth/id-token-expired':
        errorMessage =
          'El token de ID de Firebase que se proporcionó está vencido.';
        break;
      case 'auth/id-token-revoked':
        errorMessage = 'Se revocó el token de ID de Firebase.';
        break;
      case 'auth/insufficient-permission':
        errorMessage =
          'La credencial que se usó para inicializar el SDK de Admin no tiene permisos suficientes para acceder al recurso de Authentication solicitado. Consulta cómo configurar un proyecto de Firebase si necesitas ver la documentación para generar una credencial con los permisos apropiados y usarla a fin de autenticar los SDK de Admin.';
        break;
      case 'auth/internal-error':
        errorMessage =
          'El servidor de Authentication encontró un error inesperado cuando se intentaba procesar la solicitud. Para obtener información adicional, revisa la respuesta del servidor de autenticación, que debería estar incluida en el mensaje de error. Si el error persiste, avísanos mediante nuestro canal de asistencia de informe de errores.';
        break;
      case 'auth/invalid-argument':
        errorMessage =
          'Se proporcionó un argumento no válido para un método de autenticación. El mensaje de error debe incluir información adicional.';
        break;
      case 'auth/invalid-claims':
        errorMessage =
          'Los atributos personalizados del reclamo que se entregaron a setCustomUserClaims() no son válidos.';
        break;
      case 'auth/invalid-continue-uri':
        errorMessage =
          'La URL de continuación debe ser una cadena de URL válida.';
        break;
      case 'auth/invalid-creation-time':
        errorMessage =
          'La hora de creación debe ser una cadena de fecha en formato UTC válida.';
        break;
      case 'auth/invalid-credential':
        errorMessage =
          'La credencial que se usa para autenticar los SDK de Admin no se puede emplear a fin de realizar la acción deseada. Algunos métodos de autenticación, como createCustomToken() y verifyIdToken(), requieren que los SDK se inicialicen con una credencial de certificado en lugar de un token de actualización o una credencial predeterminada de la aplicación. Consulta Inicializa el SDK para ver documentación sobre cómo autenticar el SDK de Admin con una credencial de certificado.';
        break;
      case 'auth/invalid-disabled-field':
        errorMessage =
          'El valor que se proporcionó para la propiedad del usuario disabled no es válido. Debe ser un booleano.';
        break;
      case 'auth/invalid-display-name':
        errorMessage =
          'El valor que se proporcionó para la propiedad del usuario displayName no es válido. Debe ser una cadena que no esté vacía.';
        break;
      case 'auth/invalid-dynamic-link-domain':
        errorMessage =
          'El dominio del vínculo dinámico proporcionado no se configuró o no se autorizó para el proyecto actual.';
        break;
      case 'auth/invalid-email':
        errorMessage =
          'El valor que se proporcionó para la propiedad del usuario email no es válido. Debe ser una dirección de correo electrónico en formato de cadena.';
        break;
      case 'auth/invalid-email-verified':
        errorMessage =
          'El valor que se proporcionó para la propiedad del usuario emailVerified no es válido. Debe ser un booleano.';
        break;
      case 'auth/invalid-hash-algorithm':
        errorMessage =
          'El algoritmo de hash debe coincidir con las cadenas de la lista de algoritmos compatibles.';
        break;
      case 'auth/invalid-hash-block-size':
        errorMessage =
          'El tamaño del conjunto de hash debe ser un número válido.';
        break;
      case 'auth/invalid-hash-derived-key-length':
        errorMessage =
          'La longitud de la clave derivada de hash debe ser un número válido.';
        break;
      case 'auth/invalid-hash-key':
        errorMessage = 'La clave de hash debe ser un búfer de bytes válido.';
        break;
      case 'auth/invalid-hash-memory-cost':
        errorMessage =
          'El costo de la memoria de hash debe ser un número válido.';
        break;
      case 'auth/invalid-hash-parallelization':
        errorMessage = 'La paralelización de hash debe ser un número válido.';
        break;
      case 'auth/invalid-hash-rounds':
        errorMessage = 'Las rondas de hash deben ser un número válido.';
        break;
      case 'auth/invalid-hash-salt-separator':
        errorMessage =
          'El campo del separador de sal del algoritmo de hash debe ser un búfer de bytes válido.';
        break;
      case 'auth/invalid-id-token':
        errorMessage =
          'El token de ID que se proporcionó no es un token de ID de Firebase válido.';
        break;
      case 'auth/invalid-last-sign-in-time':
        errorMessage =
          'La hora del último acceso debe ser una cadena de fecha en formato UTC válida.';
        break;
      case 'auth/invalid-login-credentials':
        errorMessage = 'Usuarios o contraseña incorrectos';
        break;
      case 'auth/invalid-page-token':
        errorMessage =
          'El token de página siguiente que se entregó en listUsers() no es válido. Debe ser una cadena válida que no esté vacía.';
        break;
      case 'auth/invalid-password':
        errorMessage =
          'El valor que se proporcionó para la propiedad del usuario password no es válido. Debe ser una cadena con al menos seis caracteres.';
        break;
      case 'auth/invalid-password-hash':
        errorMessage =
          'El hash de contraseñas debe ser un búfer de bytes válido.';
        break;
      case 'auth/invalid-password-salt':
        errorMessage =
          'La contraseña con sal debe ser un búfer de bytes válido.';
        break;
      case 'auth/invalid-phone-number':
        errorMessage =
          'El valor que se proporcionó para phoneNumber no es válido. Debe ser una cadena de identificador que no esté vacía y que cumpla con el estándar E.164.';
        break;
      case 'auth/invalid-photo-url':
        errorMessage =
          'El valor que se proporcionó para la propiedad del usuario photoURL no es válido. Debe ser una URL en formato de cadena.';
        break;
      case 'auth/invalid-provider-data':
        errorMessage = 'providerData debe ser una serie de objetos UserInfo.';
        break;
      case 'auth/invalid-provider-id':
        errorMessage =
          'providerId debe ser una cadena del identificador del proveedor compatible válida.';
        break;
      case 'auth/invalid-oauth-responsetype':
        errorMessage =
          'Se debe configurar solo un responseType de OAuth como verdadera.';
        break;
      case 'auth/invalid-session-cookie-duration':
        errorMessage =
          'La duración de la cookie de sesión debe ser un número válido en milisegundos que vaya entre los 5 minutos y las 2 semanas.';
        break;
      case 'auth/invalid-uid':
        errorMessage =
          'El uid proporcionado debe ser una cadena no vacía con un máximo de 128 caracteres.';
        break;
      case 'auth/maximum-user-count-exceeded':
        errorMessage =
          'Se excedió la cantidad máxima de usuarios permitidos para importar.';
        break;
      case 'auth/missing-android-pkg-name':
        errorMessage =
          'Si es obligatorio instalar la app para Android, debe proporcionarse un nombre de paquete de Android.';
        break;
      case 'auth/missing-continue-uri':
        errorMessage =
          'Se debe proporcionar una URL de continuación válida en la solicitud.';
        break;
      case 'auth/missing-hash-algorithm':
        errorMessage =
          'Para importar usuarios con hash de contraseñas, es necesario proporcionar el algoritmo de hash y sus parámetros.';
        break;
      case 'auth/missing-ios-bundle-id':
        errorMessage = 'Falta un ID del paquete en la solicitud.';
        break;
      case 'auth/missing-uid':
        errorMessage =
          'Se requiere un identificador uid para la operación actual.';
        break;
      case 'auth/missing-oauth-client-secret':
        errorMessage =
          'El secreto de cliente de la configuración de OAuth es obligatorio para habilitar el flujo de código de OIDC.';
        break;
      case 'auth/operation-not-allowed':
        errorMessage =
          'El proveedor de acceso proporcionado está inhabilitado para tu proyecto de Firebase. Habilítalo en la sección Método de acceso de Firebase console.';
        break;
      case 'auth/phone-number-already-exists':
        errorMessage =
          'Otro usuario ya utiliza el phoneNumber proporcionado. Cada usuario debe tener un phoneNumber único.';
        break;
      case 'auth/project-not-found':
        errorMessage =
          'No se encontró ningún proyecto de Firebase para la credencial que se usó para inicializar los SDK de Admin. Consulta cómo configurar un proyecto de Firebase si necesitas ver la documentación para generar la credencial de tu proyecto y usarla a fin de autenticar los SDK de Admin.';
        break;
      case 'auth/reserved-claims':
        errorMessage =
          'Una o más reclamaciones personalizadas de usuarios que se entregaron a setCustomUserClaims() están reservadas. Por ejemplo, no deben usarse reclamos específicos de OIDC (p. ej., sub, iat, iss, exp, aud o auth_time) como claves para reclamos personalizados.';
        break;
      case 'auth/session-cookie-expired':
        errorMessage =
          'La cookie proporcionada de la sesión de Firebase venció.';
        break;
      case 'auth/session-cookie-revoked':
        errorMessage = 'Se revocaron las cookies de la sesión de Firebase.';
        break;
      case 'auth/too-many-requests':
        errorMessage = 'La cantidad de solicitudes supera el máximo permitido.';
        break;
      case 'auth/uid-already-exists':
        errorMessage =
          'Otro usuario ya utiliza el uid proporcionado. Cada usuario debe tener un uid único.';
        break;
      case 'auth/unauthorized-continue-uri':
        errorMessage =
          'El dominio de la URL de continuación no está en la lista blanca. Inclúyelo en la lista en Firebase console.';
        break;
      case 'auth/user-not-found':
        errorMessage =
          'No existe ningún registro de usuario que corresponda al identificador proporcionado.';
        break;
      default:
        errorMessage =
          'Ocurrió un error inesperado. Por favor, inténtalo de nuevo.';
        break;
    }

    return errorMessage;
  }
}
