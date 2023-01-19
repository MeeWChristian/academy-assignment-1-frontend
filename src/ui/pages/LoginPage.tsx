import React from 'react';
import { IonPage, IonContent, IonButton, IonIcon } from '@ionic/react';
import LoginForm from 'ui/components/authentication/login/LoginForm';
import { t } from 'i18next';
import { arrowDown } from 'ionicons/icons';
import { Center } from 'ui/components/generic/Center';

const LoginPage: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen className="h-full w-full">
        <div className='absolute w-full h-full animate-bg-scroll bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 bg-[length:400%_400%] brightness-[0.5]'></div>
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
