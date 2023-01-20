import React, { useEffect, useState } from 'react';
import { IonContent, IonTitle } from '@ionic/react';
import TakePicture from 'ui/components/frontpage/take-picture/TakePicture';
import { Photo } from '@capacitor/camera';
import { ArrayElement, supabase } from 'apis/supabaseClient';

const Feed: React.FC = () => {

  const [users, setUsers] = useState<any[]>();  
  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from('users')
        .select();
      setUsers(data as unknown as any[]);
    })();
  }, []);

  return (
    <IonContent color={'white-background'}>
      <p>Feed</p>
      {
        (users) ? (
          users.map((user, i) => {
            return <p key={i}>{user.uuid}</p>;
          })
        ) : (
          <p>Loading...</p>
        )}
    </IonContent>
  );
};

export default Feed;
