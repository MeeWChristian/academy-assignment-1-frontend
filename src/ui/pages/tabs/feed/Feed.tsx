import React, { useEffect, useState } from 'react';
import { IonButton, IonContent, IonText, IonTitle, useIonRouter } from '@ionic/react';
import TakePicture from 'ui/components/frontpage/take-picture/TakePicture';
import { Photo } from '@capacitor/camera';
import { ArrayElement, supabase } from 'apis/supabaseClient';
import { BGGradient } from 'ui/components/generic/BGGradient';
import { Center } from 'ui/components/generic/Center';
import { t } from 'i18next';

const Feed: React.FC = () => {


  return (
    <IonContent fullscreen>
      <section className='w-full h-full relative'>
        <BGGradient />
        <Center>
          <div className='relative w-full backdrop-brightness-[2] max-w-2xl drop-shadow-lg m-20 p-4 text-center'>
          <IonText className='text-center bold text-3xl sm:text-5xl md:text-7xl'>{t('landingPage.welcomeTo')}<br /><span className='font-extrabold text-transparent text-6xl sm:text-8xl md:text-9xl bg-clip-text bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500' style={{ filter: 'drop-shadow(3px 3px 1px black)' }}>{t('generic.brand')}</span></IonText>  
          </div>
        </Center>
      </section>
  </IonContent>
  );
};

export default Feed;
