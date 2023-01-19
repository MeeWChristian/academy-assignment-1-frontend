import React from 'react';
import { IonButton, IonContent, IonIcon, IonImg, IonPage, IonText, IonTitle, useIonRouter } from '@ionic/react';
import { Center } from 'ui/components/generic/Center';

import { t } from 'i18next';
import { arrowDown } from 'ionicons/icons';

const LandingPage: React.FC = () => {
  const router = useIonRouter();

  const scrollTo = (ele: string) => {
    const element = document.getElementById(ele);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        <section className='w-full relative'>
          <div className='absolute w-full h-full animate-bg-scroll bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 bg-[length:400%_400%] brightness-[0.5]'></div>
          <Center>
            <div className='relative h-full w-full backdrop-brightness-[2] max-w-2xl  drop-shadow-lg m-20 p-4'>
              <p className='text-center bold text-3xl sm:text-5xl md:text-7xl'>{t('landingPage.welcomeTo')}<br /><span className='font-extrabold text-transparent text-6xl sm:text-8xl md:text-9xl bg-clip-text bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500' style={{ filter: 'drop-shadow(3px 3px 1px black)' }}>{t('landingPage.brand')}</span></p>
              <p className='text-center text-md sm:text-2xl md:text-4xl'>{t('landingPage.introduction')}</p>
              <div className='flex justify-center my-4'>
                <IonButton onClick={() => router.push('/login')} expand='full' className='w-64'>{t('landingPage.login')}</IonButton>
                <IonButton onClick={() => router.push('/register')} expand='full' className='w-64'>{t('landingPage.signup')}</IonButton>
              </div>
              <div className='flex justify-center'><IonIcon icon={arrowDown} className='text-2xl sm:text-5xl cursor-pointer animate-arrow-bounce hover:text-gray-300' onClick={() => scrollTo('about')} /></div>
            </div>
          </Center>
        </section>
        <section className='bg-black flex justify-center px-10'>

          {/* TODO: Make Components */}
          <div className='max-w-2xl' id='about'>
            <div className='py-10'>
              <p className='text-white text-center text-5xl sm:text-6xl'>{t('landingPage.whatIs')} <span className='font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500' style={{ filter: 'drop-shadow(3px 3px 1px black)' }}>{t('landingPage.brand')}</span>?</p>
              <p className='text-white text-center max-w-3xl text-lg sm:text-xl mt-3 sm:mt-4'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat nemo tempora at itaque adipisci sequi et exercitationem rerum! Cum, quia? Reiciendis beatae quo cum vitae repellat numquam nihil minus sit?</p>
            </div>
            <div className='py-10'>
              <p className='text-white text-center text-5xl sm:text-6xl'>How does it work?</p>
              <p className='text-white text-center max-w-3xl text-lg sm:text-xl mt-3 sm:mt-4'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat nemo tempora at itaque adipisci sequi et exercitationem rerum! Cum, quia? Reiciendis beatae quo cum vitae repellat numquam nihil minus sit?</p>
            </div>
            <div className='py-10'>
              <p className='text-white text-center text-5xl sm:text-6xl'>Lorem</p>
              <p className='text-white text-center max-w-3xl text-lg sm:text-xl mt-3 sm:mt-4'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat nemo tempora at itaque adipisci sequi et exercitationem rerum! Cum, quia? Reiciendis beatae quo cum vitae repellat numquam nihil minus sit?</p>
            </div>
            <div className='py-10'>
              <p className='text-white text-center text-5xl sm:text-6xl'>Ipsum</p>
              <p className='text-white text-center max-w-3xl text-lg sm:text-xl mt-3 sm:mt-4'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat nemo tempora at itaque adipisci sequi et exercitationem rerum! Cum, quia? Reiciendis beatae quo cum vitae repellat numquam nihil minus sit?</p>
            </div>
          </div>
        </section>
      </IonContent>
    </IonPage>
  );
};

export default LandingPage;
