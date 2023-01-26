import React, { useEffect, useState } from 'react';
import { Route, Redirect, useLocation } from 'react-router';
import { IonReactRouter } from '@ionic/react-router';
import {
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonTabs,
  IonRouterOutlet,
  IonButtons,
  IonContent,
  IonHeader,
  IonMenu,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  IonItem,
  IonButton,
  useIonRouter,
  IonText,
  useIonToast,
} from '@ionic/react';
import { peopleOutline, ticketOutline, walletOutline, cameraOutline, homeOutline, personOutline, pencilOutline, codeSlashOutline, earth } from 'ionicons/icons';

import Feed from './tabs/feed/Feed';
import Users from './tabs/users/Users';
import Questions from './tabs/questions/Questions';
import UserProfile from './UserProfile';

import { supabase } from 'apis/supabaseClient';
import { useAuthUserStore } from 'store/user';
import { useUserStore, UserInfo } from 'store/userInformation';


import create from 'zustand';
import AskPage from './AskPage';
import EditProfile from './EditProfile';
import UserNotFound from './UserNotFound';
import i18next, { t } from 'i18next';
import EdgeFunction from './tabs/edgefunction/EdgeFunction';
import { Button, Dropdown, MenuProps } from 'antd';

const items: MenuProps['items'] = [
  {
    key: 'en',
    label: (
      <IonText>English</IonText>
    ),
  },
  {
    key: 'da',
    label: (
      <IonText>Dansk</IonText>
    ),
  },
];

const HomePage: React.FC = () => {
  const router = useIonRouter();

  const authUser = useAuthUserStore((state) => state.authUser);
  const resetAuthUser = useAuthUserStore(state => state.resetAuthUser);
  const [user, updateUser] = useUserStore(state => [state.user, state.updateUser]);
  const location = useLocation();
  const [present] = useIonToast();

  const [language, setLanguage] = useState<string>(localStorage.getItem('language') || 'en');

  function handleLanguageChange(lang: string) {
    i18next.changeLanguage(lang, (err, t) => {
      if (err) return console.log('something went wrong loading', err);
    });
  }

  const onClick: MenuProps['onClick'] = ({ key }) => {
    handleLanguageChange(key);

    present({
      message: t('generic.changedLanguage'),
      duration: 1500,
      position: 'bottom',
      icon: earth
    });
    
    setLanguage(key);
    localStorage.setItem('language', key);
  };

  useEffect(() => {
    handleLanguageChange(language);

    if (!authUser) router.push('/login');

    (async () => {
      const { data, error } = await supabase
        .from('profile')
        .select()
        .eq('id', authUser?.id);
      const d: any = data;
      const userInfo:UserInfo = d[0];
      updateUser(userInfo);
    })();
  }, [router, authUser, language]);

  useEffect(() => {
    return;
  }, [location]);

  const handleLogOut = async () => {
    resetAuthUser();
    await supabase.auth.signOut();
    router.push('/login');
  };

  const pages = [
    {
      icon: homeOutline,
      path: '/feed',
      component: Feed,
      redirect: true,
    },
    {
      icon: peopleOutline,
      path: '/users',
      component: Users,
      redirect: false,
    },
    {
      icon: pencilOutline,
      path: '/questions',
      component: Questions,
      redirect: false,
    },
    {
      icon: personOutline,
      path: '/user',
      component: UserProfile,
      redirect: false,
    },
    {
      icon: codeSlashOutline,
      path: '/edgefunction',
      component: EdgeFunction,
      redirect: false,
    },
    

    // Non-Tab pages
    {
      path: '/user-not-found',
      component: authUser?.id ? UserNotFound: HomePage,
    },
    {
      path: '/user/:user',
      component: authUser?.id ? UserProfile : HomePage,
      redirect: false,
    },
    {
      path: '/user/:user/ask',
      component: authUser?.id ? AskPage : HomePage,
      redirect: false,
    },
    {
      path: '/user/:user/edit',
      // Profile auth inside component
      component: authUser?.id ? EditProfile : HomePage,
      redirect: false,
    },

  ];

  return (
    <IonPage id="main-content">
      <IonHeader>
        <IonToolbar color='dark'>

          {/* Language Selector */}
          <Dropdown menu={{ items, onClick }} placement="bottom" className='float-right mr-2'>
            <IonButton onClick={e => e.preventDefault()} >
              <IonIcon icon={earth} />
            </IonButton>
          </Dropdown>
          
          <IonButton onClick={handleLogOut} slot="end">
            {t('homePage.logOut')}
          </IonButton>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonReactRouter>
          <IonTabs>
            <IonRouterOutlet>
              <Route key="userKey" path="/user/*" component={UserProfile}/>
              {pages.map((p, i) => {
                return <Route key={i} exact path={p.path} component={p.component} />;
              })}

              <Route exact path="/home">
                <Redirect to={pages.filter((p) => p.redirect)[0].path} />
              </Route>
            </IonRouterOutlet>

            <IonTabBar slot="bottom" color='dark' class={'h-[70px]'}>
              {pages.map((p, i) => {
                if (p.icon) return (
                  <IonTabButton key={i} tab={`tab${i}`} href={p.path} style={{ '--color-selected': '#bb78fa' }}>
                    <IonIcon icon={p.icon} />
                  </IonTabButton>
                );
              })}
            </IonTabBar>
          </IonTabs>
        </IonReactRouter>
      </IonContent>
    </IonPage>
  );
};

export default HomePage;



//const menuItems = [{ name: 'Settings' }, { name: 'Account' }, { name: 'Questionnaire' }, { name: 'Logout' }];
