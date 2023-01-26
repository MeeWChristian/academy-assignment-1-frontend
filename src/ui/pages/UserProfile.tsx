import React, { useEffect, useState } from 'react';
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonIcon, IonImg, IonPage, IonSearchbar, IonSpinner, IonText, IonTitle, useIonRouter } from '@ionic/react';
import { Center } from 'ui/components/generic/Center';

import { t } from 'i18next';
import { useLocation, useParams } from 'react-router';
import { supabase } from 'apis/supabaseClient';
import { heart } from 'ionicons/icons';
import AnswerCard from 'ui/components/userpage/AnswerCard';
import { useUserStore } from 'store/userInformation';
import { Empty } from 'antd';
import { BGGradient } from 'ui/components/generic/BGGradient';

type Props = {
  history: any;
  location: any;
  match: any;
  staticContext?: any;
}

const UserProfile: React.FC<Props> = (props) => {
  const params = useParams() as any;
  const router = useIonRouter();
  const location = useLocation();
  
  const profileUsername = location.pathname.split('/')[2];

  const [user, updateUser] = useUserStore((state) => [state.user, state.updateUser]);

  type ProfileUserInfo = {
    username: string;
    first_name: string;
    last_name: string;
    avatar: string;
  }

  type AnswerCards = {
    question: string;
    answer: string;
    askedBy: string;
    answeredOn: Date;
  }

  const [profileUserInfo, setProfileUserInfo] = useState<ProfileUserInfo>();
  const [dataLoaded, setDataLoaded] = useState(false);

  const [answers, setAnswers] = useState<AnswerCards[]>([]);
  const [answersLoading, setAnswersLoading] = useState(true);


  useEffect(() => {
    let processed = 0;
      if (profileUsername == undefined) return router.push('/user/' + user.username);
  
      supabase
        .from('profile')
        .select('username, first_name, last_name, avatar')
        .eq('username', profileUsername)
        .then((res) => {
          let data: any = res.data;
          data = data[0];
        
          if (!data) return router.push('/user-not-found');
          setProfileUserInfo(data as ProfileUserInfo);
          setDataLoaded(true);
        });

        const qaArray: Array<AnswerCards> = [];
    
    supabase
        .from('questions')
        .select()
        .eq('askedTo', profileUsername)
        .eq('answered', true)
        .then(questions => {

          if (questions.data?.length !== 0) {

            questions.data?.forEach((que, i, arr) => {
              supabase
                .from('answers')
                .select()
                .eq('answeredQuestionID', que.questionID)
                .neq('answer', false)
                .then(ans => {
                  if (ans.data?.length !== 0) {
                    const answer = ans.data![0].answer;
                    const answeredOn = new Date(ans.data![0].answeredOn.toLocaleString({ timeZone: 'UTC' }));
                    qaArray.push(
                      {
                        question: que.question,
                        answer,
                        askedBy: que.askedBy,
                        answeredOn
                      } as AnswerCards
                    );
                  }

                  processed++;
                  if (processed == arr.length) {
                    qaArray.sort((a: AnswerCards, b: AnswerCards) => b.answeredOn.getTime() - a.answeredOn.getTime());
                    setAnswers(qaArray as AnswerCards[]);
                    setAnswersLoading(false);
                  }
                });
              });
          } else {
            setAnswers([]);
            setAnswersLoading(false);
          }
        });
  }, [location, answersLoading == true]);

  // Refresh?
  
  return (
    <IonContent fullscreen>
        <div className='h-full w-full absolute flex justify-center' id='top'>
            <BGGradient />  
              { (dataLoaded) ? (
                <div className='sm:py-8 z-[1] w-full sm:w-[576px] md:w-[704px] lg:w-[960px]'>
                  <div className='h-full sm:h-auto sm:pb-28'>
                    <div className='w-full h-full min-w-[300px] z-[2] drop-shadow-2xl text-white backdrop-brightness-[2]'>
                        <div className='w-full h-36 lg:h-52 overflow-hidden'>
                            <div className='w-full h-full p-6'>
                              {profileUserInfo?.username === user.username && (
                                <IonButton className='float-right' onClick={() => router.push('/user/' + profileUserInfo?.username + '/edit')}>{t('userProfile.editProfile')}</IonButton>
                              )}
                              <IonImg src={profileUserInfo?.avatar || 'https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg'} className='absolute w-36 lg:w-52 h-36 lg:h-52 rounded-xl overflow-hidden mt-12 lg:mt-20 ml-[-1em] sm:ml-4 border-2 border-neutral-900 object-cover pointer-events-none' />
                              <IonText className='relative bottom-[-84px] left-[138px] lg:bottom-[-138px] sm:left-[10.5rem] lg:left-60 text-2xl lg:text-4xl text-white' style={{ 'textShadow': '0 0 20px black' }}>
                                {
                                  (profileUserInfo?.first_name && profileUserInfo?.last_name) ? (
                                    <>
                                      {profileUserInfo.first_name} {profileUserInfo.last_name} <IonText className='text-base lg:text-2xl text-neutral-400'>@{profileUserInfo?.username}</IonText>
                                    </>
                                  ) : (
                                    <>
                                      @{profileUserInfo?.username}
                                    </>
                                  )
                                }
                              </IonText>
                            </div>
                        </div>
                        <div className='bg-neutral-900'>
                          <div className='ml-40 sm:ml-48 lg:ml-[16.5rem] gap-2 md:gap-4 text-center flex flex-wrap justify-center sm:flex-nowrap items-center'>
                            <div className='hover:text-primary-color'>
                              <IonText className='text-sm sm:text-md md:text-lg'>{t('userProfile.answers')}</IonText><br />
                              <IonText className='text-md sm:text-lg md:text-2xl'>{answers.length || 0}</IonText>
                            </div>
                            <div className='hover:text-primary-color'>
                              <IonText className='text-sm sm:text-md md:text-lg'>{t('userProfile.questions')}</IonText><br />
                              <IonText className='text-md sm:text-lg md:text-2xl'>0</IonText>
                            </div>
                            <div className='sm:w-full inline-flex flex-wrap justify-start sm:justify-center mx-2'>
                              <IonButton onClick={() => router.push('/user/' + profileUserInfo?.username + '/ask')} className='w-full sm:mr-8 max-w-[128px] sm:max-w-none'>{t('userProfile.askQuestion')}</IonButton>
                            </div>
                          </div>
                        </div>
                        
                        <div className='px-6 py-1 sm:pt-6 mt-[-1px] w-full h-full bg-neutral-900 mx-'>
                          <div className='lg:pt-4'>
                            {!answersLoading ? (
                              (answers?.length !== 0) ? (
                                answers?.map((a, i) => <AnswerCard key={i} question={a.question} askedBy={a.askedBy} answer={a.answer} answeredOn={new Date(a.answeredOn)}  />)
                              ) : (
                                <Empty description={
                                  <span className='text-white text-lg'>
                                    {t('userProfile.noAnswersYet')}
                                  </span>
                                } className='my-12' />
                              )
                            ) : (
                              <Center>
                                <IonSpinner name='dots' color='light' className="text-4xl my-12"></IonSpinner>
                              </Center>
                            )}
                          </div>
                        </div>
                    </div>
                  </div>
              </div>
              ) : (
                <Center>
                  <IonSpinner name='dots' color='light' className="text-4xl"></IonSpinner>
                </Center>
              )}
              
        </div>
      </IonContent>
  );
};

export default UserProfile;
