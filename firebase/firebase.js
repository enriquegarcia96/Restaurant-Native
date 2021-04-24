import app from 'firebase/app';
import 'firebase/firestore';

import firebaseConfig from './config';

class Firebase{
    
    constructor(){
        if (!app.apps.length) {

            //--- inicia firebase y le pasa la configuracion ---//
            app.initializeApp(firebaseConfig);
            app.firestore().settings({ experimentalForceLongPolling: true })
        }

        //--- tengo la referencia a database ---//
        this.db = app.firestore();

    }
}


const firebase = new Firebase();

export default firebase;