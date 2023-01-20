import React, { useEffect, useState } from 'react';
import { IonButton, IonContent, IonIcon, IonImg, IonPage, IonText, IonTitle, useIonRouter } from '@ionic/react';
import { Center } from 'ui/components/generic/Center';

import { t } from 'i18next';
import { useParams } from 'react-router';
import { supabase } from 'apis/supabaseClient';

const UserProfile: React.FC = () => {

  const params = useParams() as any;
  const router = useIonRouter();
  console.log(params.user);

  type UserInfo = {
    avatar: string;
    first_name: string;
    last_name: string;
  }

  const [userInfo, setUserInfo] = useState<UserInfo>();
  useEffect(() => {
    supabase.from('users').select('avatar, first_name, last_name').eq('username', params.user).then((res) => {
        let data: any = res.data;
        data = data[0];
        setUserInfo(data as UserInfo);
    });
  }, []);
  
  return (
    <IonPage>
      <IonContent fullscreen>
        <div className='h-full w-full flex justify-center'>
            <div className='fixed w-full h-full animate-bg-scroll bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 bg-[length:400%_400%] brightness-[0.5]'></div>
            <div className='py-16 z-[1] w-2/3'>
              <div className='pb-12'>
                  <div className='bg-white w-full max-w-[800px] min-w-[300px] z-[2] drop-shadow-2xl rounded-3xl'>
                      <div className='w-full h-32 overflow-hidden rounded-t-3xl w-'>
                          <div className='w-full h-full bg-red-700 p-6'>
                            <IonImg src={userInfo?.avatar} className='absolute w-28 rounded-full overflow-hidden mt-11 border-2 border-white' />
                            <IonText className='relative bottom-[-74px] left-[120px] text-2xl text-white'>{userInfo?.first_name} {userInfo?.last_name}</IonText>
                          </div>
                      </div>
                      <div className='p-6 pt-16 w-full h-full'>
                      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Inventore, a aliquid! Magni earum excepturi dignissimos mollitia? Harum, fugiat! Pariatur consequatur commodi, cumque sit hic veniam exercitationem odit atque dolore beatae?<br/>
                      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Inventore, a aliquid! Magni earum excepturi dignissimos mollitia? Harum, fugiat! Pariatur consequatur commodi, cumque sit hic veniam exercitationem odit atque dolore beatae?<br/>
                      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Inventore, a aliquid! Magni earum excepturi dignissimos mollitia? Harum, fugiat! Pariatur consequatur commodi, cumque sit hic veniam exercitationem odit atque dolore beatae?<br/>
                      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Inventore, a aliquid! Magni earum excepturi dignissimos mollitia? Harum, fugiat! Pariatur consequatur commodi, cumque sit hic veniam exercitationem odit atque dolore beatae?<br/>
                      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Inventore, a aliquid! Magni earum excepturi dignissimos mollitia? Harum, fugiat! Pariatur consequatur commodi, cumque sit hic veniam exercitationem odit atque dolore beatae?<br/>
                      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Inventore, a aliquid! Magni earum excepturi dignissimos mollitia? Harum, fugiat! Pariatur consequatur commodi, cumque sit hic veniam exercitationem odit atque dolore beatae?<br/>
                      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Inventore, a aliquid! Magni earum excepturi dignissimos mollitia? Harum, fugiat! Pariatur consequatur commodi, cumque sit hic veniam exercitationem odit atque dolore beatae?<br/>
                      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Inventore, a aliquid! Magni earum excepturi dignissimos mollitia? Harum, fugiat! Pariatur consequatur commodi, cumque sit hic veniam exercitationem odit atque dolore beatae?<br/>
                      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Inventore, a aliquid! Magni earum excepturi dignissimos mollitia? Harum, fugiat! Pariatur consequatur commodi, cumque sit hic veniam exercitationem odit atque dolore beatae?<br/>
                      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Inventore, a aliquid! Magni earum excepturi dignissimos mollitia? Harum, fugiat! Pariatur consequatur commodi, cumque sit hic veniam exercitationem odit atque dolore beatae?<br/>
                      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Inventore, a aliquid! Magni earum excepturi dignissimos mollitia? Harum, fugiat! Pariatur consequatur commodi, cumque sit hic veniam exercitationem odit atque dolore beatae?<br/>
                      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Inventore, a aliquid! Magni earum excepturi dignissimos mollitia? Harum, fugiat! Pariatur consequatur commodi, cumque sit hic veniam exercitationem odit atque dolore beatae?<br/>
                      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Inventore, a aliquid! Magni earum excepturi dignissimos mollitia? Harum, fugiat! Pariatur consequatur commodi, cumque sit hic veniam exercitationem odit atque dolore beatae?<br/>
                      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Inventore, a aliquid! Magni earum excepturi dignissimos mollitia? Harum, fugiat! Pariatur consequatur commodi, cumque sit hic veniam exercitationem odit atque dolore beatae?<br/>
                      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Inventore, a aliquid! Magni earum excepturi dignissimos mollitia? Harum, fugiat! Pariatur consequatur commodi, cumque sit hic veniam exercitationem odit atque dolore beatae?<br/>
                      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Inventore, a aliquid! Magni earum excepturi dignissimos mollitia? Harum, fugiat! Pariatur consequatur commodi, cumque sit hic veniam exercitationem odit atque dolore beatae?<br/>
                      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Inventore, a aliquid! Magni earum excepturi dignissimos mollitia? Harum, fugiat! Pariatur consequatur commodi, cumque sit hic veniam exercitationem odit atque dolore beatae?<br/>
                      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Inventore, a aliquid! Magni earum excepturi dignissimos mollitia? Harum, fugiat! Pariatur consequatur commodi, cumque sit hic veniam exercitationem odit atque dolore beatae?<br/>
                      
                      </div>
                  </div>
              </div>
            </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default UserProfile;
