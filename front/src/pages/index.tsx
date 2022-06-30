import { lazy } from 'react';

export const Home = lazy(() => import('./Home'));

export const Mine = lazy(() => import('./Mine'));

export const Activity = lazy(() => import('./Activity'));
export const Project = lazy(() => import('./Activity/Project'));

export const Message = lazy(() => import('./Message'));
export const Chat = lazy(() => import('./Chat'));

export const Test = lazy(() => import('./Test'));

export const Launch = lazy(() => import('./Launch'));
