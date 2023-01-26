import React, { useEffect } from 'react';
import { IonButton, IonContent, IonIcon, IonImg, IonPage, IonSpinner, IonText, IonTitle, useIonRouter } from '@ionic/react';
import { Center } from 'ui/components/generic/Center';

import { t } from 'i18next';
import { arrowDown } from 'ionicons/icons';
import QuestionCard from 'ui/components/questionspage/QuestionCard';
import { supabase } from 'apis/supabaseClient';
import { useAuthUserStore } from 'store/user';
import { useUserStore } from 'store/userInformation';

import { Button, Empty } from 'antd';
import { BGGradient } from 'ui/components/generic/BGGradient';

const Questions: React.FC = () => {

  type QuestionCard = {
    questionID: number;
    question: string;
    askedTo: string;
    askedBy: string;
    askedOn: Date;
    answered: boolean;
  }

  const router = useIonRouter();

  const [questions, setQuestions] = React.useState<QuestionCard[]>();
  const [loading, setLoading] = React.useState<boolean>(true);

  const authUser = useAuthUserStore((state) => state.authUser);
  const resetAuthUser = useAuthUserStore((state) => state.resetAuthUser);
  const [user, updateUser] = useUserStore((state) => [state.user, state.updateUser]);

  useEffect(() => {
    supabase
        .from('questions')
        .select()
        .eq('answered', false)
        .eq('askedTo', user.username)
        .then((d) => {
          setQuestions(d.data as QuestionCard[]);
          setLoading(false);
        });
  }, [(loading == true)]);

  return (
    <IonContent fullscreen>
      <section className='w-full h-full relative'>
        <BGGradient />
          { !loading ? (
            <div className='flex justify-center pb-20'>
              <div className='relative w-full backdrop-brightness-[2] max-w-2xl drop-shadow-lg m-20 p-4 text-center'>
                <IonText className='text-6xl' color='light'>{t('questions.yourQuestions')}</IonText><br /><br />
                    {(questions?.length !== 0) ? (
                      questions?.map((q, i) => <QuestionCard key={i} question={q.question} questionID={q.questionID} askedBy={q.askedBy} askedOn={q.askedOn} setLoading={setLoading} />)
                    ) : (
                      <Empty description={
                        <span className='text-white text-lg'>
                          {t('questions.noQuestionsYet')}
                        </span>
                      } className='my-4'>
                        <IonButton onClick={() => router.push('/users')}>{t('questions.seeUsers')}</IonButton>
                      </Empty>
                )}
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

export default Questions;
