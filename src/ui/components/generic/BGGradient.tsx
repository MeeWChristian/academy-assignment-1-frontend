import { FC } from 'react';

type GradientProps = {
    absolute?: boolean
}

export const BGGradient: FC<GradientProps> = ({ absolute }) => <div className={(absolute ? 'absolute' : 'fixed') + ' w-full h-full animate-bg-scroll bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 bg-[length:400%_400%] brightness-[0.5]'}></div>;