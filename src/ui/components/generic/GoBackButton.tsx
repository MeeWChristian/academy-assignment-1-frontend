import { IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonText, IonCardContent, IonIcon, useIonRouter, IonBackButton, IonButton, IonButtons } from '@ionic/react';
import { t } from 'i18next';
import { arrowBack, heart } from 'ionicons/icons';
import React from 'react';

const GoBackButton: React.FC = () => {
    const router = useIonRouter();
    
    return (
        <div onClick={(e) => {e.preventDefault(); router.push('.');}}>
            <IonButton fill='clear' color='light'>
                <IonIcon icon={arrowBack}></IonIcon>
                {t('generic.goBack')}
            </IonButton>
        </div>
    );
};
export default GoBackButton;


