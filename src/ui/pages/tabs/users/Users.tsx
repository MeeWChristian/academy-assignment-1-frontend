import React, { useEffect, useState } from 'react';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonImg, IonSpinner, IonText, IonTitle, useIonRouter } from '@ionic/react';
import { supabase } from 'apis/supabaseClient';
import { Center } from 'ui/components/generic/Center';
import { BGGradient } from 'ui/components/generic/BGGradient';
import { t } from 'i18next';


const Tab2: React.FC = () => {
  type User = {
    id: string;
    username: string;
    first_name: string;
    last_name: string;
    avatar: string;
  }

  const router = useIonRouter();

  const [users, setUsers] = useState<User[]>();
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from('profile')
        .select();
      setUsers(data as unknown as User[]);
      setDataLoaded(true);
    })();
  }, []);

  return (
    <IonContent color={'white-background'}>
      <section className='w-full h-full relative'>
        <BGGradient />
        { (dataLoaded) ? (
          <div className='flex justify-center'>
            <div className='relative w-full backdrop-brightness-[2] max-w-2xl drop-shadow-lg m-20 p-4 text-center'>
              <IonText className='text-6xl' color='light'>{t('users.users')}</IonText>
              <div className='flex flex-wrap justify-center'>
                {
                  users?.map((user, i) => {
                    return (
                      <IonCard key={i} color='dark' className='h-64 w-[26rem] cursor-pointer' onClick={() => router.push('/user/' + user.username)}>
                        <div className='w-full h-48'>
                          <IonImg src={user.avatar || 'https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg'} className="h-full w-full object-cover object-center" />
                        </div>
                          <IonHeader className='text-4xl h-16 leading-[4rem]'>{user.username}</IonHeader>
                      </IonCard>
                    );
                  })
                }
              </div>
            </div>
          </div>
        ) : (
          <Center>
            <IonSpinner name='dots' color='light' className="text-4xl"></IonSpinner>
          </Center>
        )}
      </section>
    </IonContent>
  );
};

export default Tab2;
