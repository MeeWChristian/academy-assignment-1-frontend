import React from 'react';
import { IonButton, IonContent, IonIcon, IonImg, IonPage, IonText, IonTitle, useIonAlert, useIonRouter } from '@ionic/react';
import { Center } from 'ui/components/generic/Center';

import { t } from 'i18next';
import { arrowDown } from 'ionicons/icons';
import { BGGradient } from 'ui/components/generic/BGGradient';
import { supabase } from 'apis/supabaseClient';

const EdgeFunction: React.FC = () => {

    const [presentAlert] = useIonAlert();

    function executeEdgeFunction() {
        presentAlert({
            header: t('edgeFunction.edgeFunctionExample'),
            message: t('edgeFunction.enterName'),
            inputs: [
            {
                type: 'text',
                placeholder: t('edgeFunction.name'),
            }
            ],
            buttons: [
                {
                    text: t('edgeFunction.submit'),
                    handler: (data) => {
                        supabase.functions.invoke('TestingFunction', {
                            body: {
                                name: data[0]
                            }
                        }).then(d => {
                            presentAlert({
                                header: t('edgeFunction.responseFromEdgeFunction'),
                                message: d.data.message,
                                buttons: [t('edgeFunction.ok')],
                            });
                        });
                    }
                }
            ],
        });
    }

  return (
    <IonContent fullscreen>
      <section className='w-full h-full relative'>
        <BGGradient />
        <Center>
          <div className='relative w-full backdrop-brightness-[2] max-w-2xl drop-shadow-lg m-20 p-4 text-center'>
              <IonButton onClick={executeEdgeFunction}>{t('edgeFunction.runEdgeFunction')}</IonButton>
          </div>
        </Center>
      </section>
    </IonContent>
  );
};

export default EdgeFunction;
