import React from 'react';
import { IonButton, IonContent, IonIcon, IonImg, IonInput, IonItem, IonLabel, IonPage, IonRedirect, IonText, IonTitle, IonToggle, useIonRouter, useIonToast } from '@ionic/react';
import { Center } from 'ui/components/generic/Center';

import { t } from 'i18next';
import { arrowDown, helpOutline, checkmark } from 'ionicons/icons';

import { useAuthUserStore } from 'store/user';
import { useUserStore, UserInfo } from 'store/userInformation';
import GoBackButton from 'ui/components/generic/GoBackButton';
import { supabase } from 'apis/supabaseClient';
import { BGGradient } from 'ui/components/generic/BGGradient';

const EditProfile: React.FC = () => {
  const router = useIonRouter();
  const [present] = useIonToast();

  const authUser = useAuthUserStore((state) => state.authUser);
  const resetAuthUser = useAuthUserStore((state) => state.resetAuthUser);
  const [user, updateUser] = useUserStore((state) => [state.user, state.updateUser]);

  function handleUpdate() {
    supabase
      .from('profile')
      .update(
        {
          first_name: (document.querySelector('#fName') as HTMLInputElement).value,
          last_name: (document.querySelector('#lName') as HTMLInputElement).value,
          avatar: (document.querySelector('#avatar') as HTMLInputElement).value,
        }
      )
      .eq('id', authUser?.id)
      .then(() => {
        updateUser(
          {
            id: user.id,
            username: user.username,
            first_name: (document.querySelector('#fName') as HTMLInputElement).value,
            last_name: (document.querySelector('#lName') as HTMLInputElement).value,
            avatar: (document.querySelector('#avatar') as HTMLInputElement).value,
          }
        );
        present({
          message: t('editProfile.updatedSuccessfully'),
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
              {authUser?.id == user.id ? (
                <>
                  <IonItem>
                    <IonLabel>{t('editProfile.UUID')}: </IonLabel><IonInput type='text' value={authUser?.id} disabled></IonInput>
                  </IonItem>
                  <IonItem>
                      <IonLabel>{t('editProfile.email')}: </IonLabel><IonInput type='text' value={authUser?.email} disabled></IonInput>
                  </IonItem>
                  <IonItem>
                      <IonLabel>{t('editProfile.username')}: </IonLabel><IonInput type='text' value={user.username} disabled></IonInput>
                  </IonItem>
                  <IonItem>
                      <IonLabel>{t('editProfile.firstName')}: </IonLabel><IonInput type='text' value={user.first_name} id='fName'></IonInput>
                  </IonItem>
                  <IonItem>
                      <IonLabel>{t('editProfile.lastName')}: </IonLabel><IonInput type='text' value={user.last_name} id='lName'></IonInput>
                  </IonItem>
                  <IonItem>
                      <IonLabel>{t('editProfile.avatarURL')}: </IonLabel><IonInput type='text' value={user.avatar} id='avatar'></IonInput>
                  </IonItem>
                  <IonButton type="submit" expand="block" onClick={handleUpdate}>{t('editProfile.updateInfo')}</IonButton>
                </>
                ) : (
                  <IonRedirect to={'/user' + authUser?.id + '/edit'} />
                )}
            </div>
          </Center>
        </section>
      </IonContent>
  );
};

export default EditProfile;
