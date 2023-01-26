import React from 'react';
import { IonButton, IonContent, IonIcon, IonImg, IonPage, IonText, IonTitle, useIonRouter } from '@ionic/react';
import { Center } from 'ui/components/generic/Center';

import { t } from 'i18next';
import { arrowDown } from 'ionicons/icons';
import { BGGradient } from 'ui/components/generic/BGGradient';

const UserNotFound: React.FC = () => {

  return (
    <IonContent fullscreen>
      <section className='w-full h-full relative'>
        <BGGradient />
        <Center>
          <div className='relative w-full backdrop-brightness-[2] max-w-2xl drop-shadow-lg m-20 p-4 text-center'>
            <IonText>User Not Found...</IonText>
          </div>
        </Center>
      </section>
    </IonContent>
  );
};

export default UserNotFound;
