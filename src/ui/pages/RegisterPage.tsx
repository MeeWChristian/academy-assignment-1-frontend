import { IonPage, IonContent } from '@ionic/react';
import React from 'react';
import LoginForm from 'ui/components/authentication/login/LoginForm';
import RegisterForm from 'ui/components/authentication/register/RegisterForm';
import { BGGradient } from 'ui/components/generic/BGGradient';
import { Center } from 'ui/components/generic/Center';

const RegisterPage: React.FC = () => (
  <IonPage>
    <IonContent fullscreen className="h-full w-full">
      <BGGradient />
        <Center>
          <div className='relative p-12 backdrop-brightness-[2] max-w-2xl drop-shadow-lg m-20'>
            <RegisterForm togglePasswordButtonType="icon" />
          </div>
        </Center>       
    </IonContent>
  </IonPage>
);

export default RegisterPage;
