import React, { useEffect, useState } from 'react';
import { IonButton, IonIcon, IonInput, IonItem, IonText, useIonRouter, useIonLoading, useIonAlert, useIonToast } from '@ionic/react';
import { at, eyeOffOutline, eyeOutline, lockClosedOutline, personAdd } from 'ionicons/icons';
import { useAuthUserStore } from 'store/user';
import { supabase } from 'apis/supabaseClient';
import SocialLoginButton from '../social-login-buttons/SocialLoginButton';
import { Provider } from '@supabase/supabase-js';
import Separator from 'ui/components/generic/Separator';
import { t } from 'i18next';

type LoginFormProps = {
  togglePasswordButtonType?: 'text' | 'icon' | 'none';
};

const LoginForm: React.FC<LoginFormProps> = ({ togglePasswordButtonType = 'icon' }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isSubmitDisabled, setIsSubmitDisabled] = useState<boolean>(true);
  const [isPasswordRevealed, setIsPasswordRevealed] = useState<boolean>(false);

  const router = useIonRouter();
  const [present, dismiss] = useIonLoading();
  const [presentAlert] = useIonAlert();
  const toast = useIonToast();

  const setAuthUser = useAuthUserStore((state) => state.setAuthUser);

  useEffect(() => {
    setIsSubmitDisabled(!(email.includes('@') && password !== ''));
  }, [email, password]);

  const togglePassword = () => setIsPasswordRevealed(!isPasswordRevealed);

  const handleLogin = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    await present({ message: t('authentication.signingIn') });
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (data.user && data.user.aud === 'authenticated') {
      setAuthUser(data.user);
      await dismiss();
      router.push('/home');
    } else {
      await dismiss();
      await presentAlert({
        header: t('authentication.loginFailed'),
        message: error?.message,
        buttons: ['OK'],
      });
    }
  };

  const signInWithThirdParty = async (variant: Provider) => {
    await present({ message: t('authentication.redirecting') });
    const { error } = await supabase.auth.signInWithOAuth({
      provider: variant,
    });
    if (error) return await presentAlert({ header: t('authentication.genericError'), message: error?.message, buttons: ['OK'] });
    await dismiss();
  };

  const handleForgottenPassword = () => router.push('/forgotpassword');

  const makeToggleRevealButton = () => {
    if (togglePasswordButtonType === 'none') return;
    if (togglePasswordButtonType === 'icon') {
      return <IonIcon icon={isPasswordRevealed ? eyeOutline : eyeOffOutline} size="medium" onClick={togglePassword} className="text-primary-brand" />;
    }
    return (
      <div className="mr-1 text-sm font-bold cursor-pointer text-primary-brand" onClick={togglePassword}>
        {isPasswordRevealed ? <IonText>{t('authentication.hide')}</IonText> : <IonText>{t('authentication.show')}</IonText>}
      </div>
    );
  };

  return (
    <div className="flex h-full justify-center items-center w-full">
      <form className="sm:w-[400px] w-3/4" onSubmit={handleLogin}>
        <IonText className="text-primary-brand text-xl font-extrabold">{t('authentication.login')}</IonText>
        <IonItem lines="none" color={'white-background'} class="border border-grey-text mt-8">
          <IonInput
            value={email}
            placeholder={t('authentication.email')}
            onIonChange={(e) => setEmail(e.detail.value ?? '')}
            type="email"
            required
            class="h-[59px] items-center"
          />
          <IonIcon icon={at} size="medium" className="text-primary-brand" />
        </IonItem>

        <IonItem lines="none" color={'white-background'} class="border border-grey-text mt-5">
          <IonInput
            value={password}
            placeholder={t('authentication.password')}
            onIonChange={(e) => setPassword(e.detail.value ?? '')}
            type={isPasswordRevealed ? 'text' : 'password'}
            required
            class="h-[59px] items-center"
          />
          {password !== '' && makeToggleRevealButton()}
          {password === '' && togglePasswordButtonType !== 'none' && <IonIcon icon={lockClosedOutline} size="medium" className="text-primary-brand" />}
        </IonItem>
        <div className="mt-5">
          <IonButton expand="full" className="w-full" onClick={handleLogin} disabled={isSubmitDisabled}>
            {t('authentication.login')}
          </IonButton>
          <button className="hidden" type="submit" />
        </div>

        <div className="w-full flex justify-end my-3">
          <IonText onClick={handleForgottenPassword} className="text-primary-brand hover:cursor-pointer">
            {t('authentication.forgotPassword')}
          </IonText>
        </div>

        <Separator text={t('authentication.or')} />

        <div className="flex justify-between gap-2">
          <SocialLoginButton provider="facebook" onClick={() => signInWithThirdParty('facebook')} />
          <SocialLoginButton provider="google" onClick={() => signInWithThirdParty('google')} />
          <SocialLoginButton provider="apple" onClick={() => signInWithThirdParty('apple')} />
        </div>

        <div className="mt-10">
          <IonText className="text-primary-brand text-xl">{t('authentication.noAccountQuestion')} <IonText className='cursor-pointer font-semibold' onClick={() => router.push('/register')}>{t('authentication.registerLink')}</IonText></IonText>
        </div>
      </form>
    </div>
  );
};
export default LoginForm;
