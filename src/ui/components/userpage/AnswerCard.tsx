import { IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonText, IonCardContent, IonIcon, useIonRouter } from '@ionic/react';
import { t } from 'i18next';
import { heart } from 'ionicons/icons';
import React from 'react';

const AnswerCard: React.FC<{ question: string, askedBy: string | null, answer: string, answeredOn: Date }> = ({ question, askedBy, answer, answeredOn }) => {
    const router = useIonRouter();

    const scrollTo = (ele: string) => {
        const element = document.getElementById(ele);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
    };
    
    return (
        <IonCard color='dark'>
            <IonCardHeader>
                <IonCardTitle>{question}</IonCardTitle>
                <IonCardSubtitle>{t('userProfile.askedBy')} {askedBy
                    ? <IonText onClick={() => {
                        router.push('/user/' + askedBy);
                        scrollTo('top');
                    }} className='text-primary-color cursor-pointer'>@{askedBy}</IonText>
                    : <IonText className='text-primary-color'>???</IonText>}
                </IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent className='pb-0'>
                <IonText>{answer}</IonText>
            </IonCardContent>
            <div className='gap-4 w-full px-5 text-xl py-2 inline-flex items-center'>
                <div className='inline-flex items-center hover:text-red-400 cursor-pointer gap-1'>
                    <IonIcon icon={heart}></IonIcon>
                    <IonText>0</IonText>
                </div>

                <IonText className='text-base text-neutral-400'>{t('userProfile.answered')}: { new Date(answeredOn + 'Z').toLocaleString('en-GB') }</IonText>
            </div>
        </IonCard>
    );
};
export default AnswerCard;
