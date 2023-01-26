import { IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonText, IonCardContent, IonIcon, useIonRouter, IonInput, IonLabel, IonButton, useIonToast } from '@ionic/react';
import { supabase } from 'apis/supabaseClient';
import { t } from 'i18next';
import { checkmark, closeOutline, heart } from 'ionicons/icons';
import React, { useEffect } from 'react';

const QuestionCard: React.FC<{ question: string, questionID: number, askedBy: string | null, askedOn: Date, setLoading: (value: boolean) => void; }> = ({ question, questionID, askedBy, askedOn, setLoading }) => {
    const router = useIonRouter();
    const [answer, setAnswer] = React.useState<string>('');
    const [present] = useIonToast();

    function answerQuestion() {
        supabase
            .from('answers')
            .insert(
                {
                    answeredQuestionID: questionID,
                    answer,
                    answeredOn: new Date().toISOString()
                }
            ).then(() => {
                supabase
                    .from('questions')
                    .update(
                        {
                            answered: true
                        }
                    )
                    .eq('questionID', questionID).then(() => setLoading(true));
                present({
                    message: t('questions.answerSubmitted'),
                    duration: 1500,
                    position: 'bottom',
                    icon: checkmark
                });
            });
    }

    function removeQuestion() {
        supabase
            .from('answers')
            .insert(
                {
                    answeredQuestionID: questionID,
                    answer: false,
                    answeredOn: new Date().toISOString()
                }
            ).then(() => {
                supabase
                    .from('questions')
                    .update(
                        {
                            answered: true
                        }
                    )
                    .eq('questionID', questionID).then(() => setLoading(true));
                
                present({
                    message: t('questions.disquardedQuestion'),
                    duration: 1500,
                    position: 'bottom',
                    icon: closeOutline
                });
            });
    }
    
    return (
            <IonCard color='dark' className='text-left'>
                <IonCardHeader>
                    <IonIcon icon={closeOutline} onClick={removeQuestion} className='float-right inline-block text-2xl cursor-pointer hover:text-primary-color relative z-[5]' />
                    <IonCardTitle>{question}</IonCardTitle>
                    <IonCardSubtitle>{t('questions.askedBy')} {askedBy
                        ? <IonText onClick={() => {
                            router.push('/user/' + askedBy);
                        }} className='text-primary-color cursor-pointer'>@{askedBy}</IonText>
                        : <IonText className='text-primary-color'>???</IonText>}
                    </IonCardSubtitle>
                </IonCardHeader>
                <IonCardContent className='pb-0'>
                    <IonInput placeholder={t('questions.typeYourAnswer')} className='backdrop-brightness-0.5 bg-neutral-900 indent-2' onIonChange={(e) => setAnswer(e.detail.value ?? '')}></IonInput>
                    <IonButton className='my-2' onClick={answerQuestion}>{t('questions.answer')}</IonButton>
                </IonCardContent>
                <div className='gap-4 w-full px-5 text-xl py-2 inline-flex items-center'>
                    <IonText className='text-base text-neutral-400'>{t('questions.asked')}: { new Date(askedOn + 'Z').toLocaleString('en-GB') }</IonText>
                </div>
            </IonCard>
    );
};
export default QuestionCard;
