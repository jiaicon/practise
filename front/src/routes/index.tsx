/**
 * @author Icon
 * @description: //TODO
 * @date 2022-06-24 11:01
 */
import React, { Suspense } from 'react';
import { Routes, Route, useRoutes } from 'react-router-dom';
import Layout from './../layout';
import {
  Home,
  Mine,
  Activity,
  Project,
  Message,
  Chat,
  Test,
  Launch,
} from './../pages';

const Index = () => {
  const element = useRoutes([
    {
      path: '/',
      element: (
        <Suspense fallback={<>...</>}>
          <Launch />
        </Suspense>
      )
    },
    {
      path: '/app',
      element: (
        <Suspense fallback={<>...</>}>
          <Layout />
        </Suspense>
      ),
      children: [
        {
          index: true,
          element: (
            <Suspense fallback={<>...</>}>
              <Home />
            </Suspense>
          )
        },
        {
          path: 'activity',
          element: (
            <Suspense fallback={<>...</>}>
              <Activity />
            </Suspense>
          )
        },
        {
          path: 'mine',
          element: (
            <Suspense fallback={<>...</>}>
              <Mine />
            </Suspense>
          )
        }
      ]
    },
    {
      path: '/message',
      element: (
        <Suspense fallback={<>...</>}>
          <Message />
        </Suspense>
      )
    },
    {
      path: '/chat',
      element: (
        <Suspense fallback={<>...</>}>
          <Chat />
        </Suspense>
      )
    },
    {
      path: '/test',
      element: (
        <Suspense fallback={<>...</>}>
          <Test />
        </Suspense>
      )
    }
  ])
  return element;
  return (
    <Routes>
      <Route
        path="/"
        element={(
          <Suspense fallback={<>...</>}>
            <Layout />
          </Suspense>
        )}
      >
        <Route index element={(
          <Suspense fallback={<>...</>}>
            <Home />
          </Suspense>
        )} />
        <Route
          path="activity"
          element={(
            <Suspense fallback={<>...</>}>
              <Activity />
            </Suspense>
          )}
        />
        <Route
          path="mine"
          element={(
            <Suspense fallback={<>...</>}>
              <Mine />
            </Suspense>
          )}
        />
      </Route>
    </Routes>
  )
}

export default Index;
