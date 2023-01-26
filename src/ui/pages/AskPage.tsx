import React from 'react';
import { IonButton, IonContent, IonIcon, IonImg, IonInput, IonItem, IonLabel, IonPage, IonText, IonTitle, IonToggle, useIonRouter, useIonToast } from '@ionic/react';
import { Center } from 'ui/components/generic/Center';

import { t } from 'i18next';
import { arrowDown, checkmark, helpOutline } from 'ionicons/icons';
import GoBackButton from 'ui/components/generic/GoBackButton';
import { useLocation } from 'react-router';
import { supabase } from 'apis/supabaseClient';
import { useUserStore } from 'store/userInformation';
import { BGGradient } from 'ui/components/generic/BGGradient';

const AskPage: React.FC = () => {
  const router = useIonRouter();
  const location = useLocation();
  const [present] = useIonToast();
  
  const [user, updateUser] = useUserStore((state) => [state.user, state.updateUser]);
  
  const profileUsername = location.pathname.split('/')[2].split('/')[0];

  async function sendQuestion() {
    await supabase
      .from('questions')
      .insert(
        {
          question: (document.querySelector('#question') as HTMLInputElement).value,
          askedTo: profileUsername,
          askedBy: (document.querySelector('#anonymous') as HTMLInputElement).checked ? null : user.username,
          askedOn: new Date().toISOString()
        }
      )
      .then(() => {
        present({
          message: t('askPage.successfullyAskedQuestion'),
          duration: 1500,
          position: 'bottom',
          icon: checkmark
        });
        router.push('.');
      });
  }

  return (
      <IonContent fullscreen>
        <section className='w-full h-full relative'>
        <BGGradient />
          <GoBackButton />
          <Center>
            <div className='relative w-full backdrop-brightness-[2] max-w-2xl drop-shadow-lg m-20 p-4 text-center'>
                <IonText className='text-6xl' color='light'>{t('askPage.askAQuestion')}</IonText><br /><br />
                <IonText className='text-2xl' color='light'>{t('askPage.youAreAsking')} <IonText>@{profileUsername}</IonText></IonText>
                <IonItem color={'white-background'} className='mt-4'>
                    <IonInput placeholder={t('askPage.enterQuestionHere')} required class="h-[59px] items-center" id="question" />
                    <IonIcon icon={helpOutline} size="medium" className="text-primary-brand" />
                </IonItem>
                <IonItem color={'white-background'}>
                    <IonLabel>{t('askPage.askAnonymously')}</IonLabel>
                    <IonToggle id='anonymous' />
                </IonItem>
                <div className='flex justify-center mt-4'>
                  <IonButton onClick={sendQuestion} expand='full' className='w-64'>{t('askPage.ask')}</IonButton>
                </div>
            </div>
          </Center>
        </section>
      </IonContent>
  );
};

export default AskPage;
