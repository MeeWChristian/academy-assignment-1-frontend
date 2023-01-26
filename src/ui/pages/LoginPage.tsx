import React from 'react';
import { IonPage, IonContent, IonButton, IonIcon } from '@ionic/react';
import LoginForm from 'ui/components/authentication/login/LoginForm';
import { t } from 'i18next';
import { arrowDown } from 'ionicons/icons';
import { Center } from 'ui/components/generic/Center';
import { BGGradient } from 'ui/components/generic/BGGradient';

const LoginPage: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen className="h-full w-full">
        <BGGradient />
          <Center>
            <div className='relative p-12 backdrop-brightness-[2] max-w-2xl drop-shadow-lg m-20'>
              <LoginForm togglePasswordButtonType="icon" />
            </div>
          </Center>       
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;
