/**
 * @author Icon
 * @description: //TODO
 * @date 2022-06-24 10:55
 */
import React, { useEffect, useRef, useState } from 'react';
import { Button, Space, Input, Card } from '@arco-design/web-react';

export enum ReadyState {
  Connecting = 0,
  Open = 1,
  Closing = 2,
  Closed = 3,
}
const Index = () => {
  const [userName, setUserName] = useState<string>();
  const [message, setMessage] = useState<string>('');
  const [readyState, setReadyState] = useState<ReadyState>(ReadyState.Closed);
  const ws = useRef<WebSocket>();
  const onConnectWs = () => {
    ws.current = new WebSocket('ws://localhost:7003');
    setReadyState(ReadyState.Connecting);
    ws.current.onerror = (event) => {
      console.log(event)
      setReadyState(ws.current?.readyState || ReadyState.Closed);
    };
    ws.current.onopen = (event) => {
      console.log('open: ', event)
      setReadyState(ws.current?.readyState || ReadyState.Open);
    };
    ws.current.onmessage = (message: WebSocketEventMap['message']) => {
      console.log(message)
    };
    ws.current.onclose = (event) => {
      setReadyState(ws.current?.readyState || ReadyState.Closed);
    };
  }
  const onSendMessage = () => {
    if (readyState === ReadyState.Open || !message?.length) {
      const content = {
        userName,
        message,
      }
      ws.current?.send(JSON.stringify(content));
    }
  }
  const onClose = () => {
    if (readyState === ReadyState.Open) {
      ws.current?.close();
    }
  }
  useEffect(() => {
    return () => {
      ws.current?.close();
    }
  }, [])
  return (
    <Card>
      <Space direction='vertical'>
        <Input
          placeholder='请输入您的用户名'
          disabled={readyState === ReadyState.Open}
          onChange={(v) => setUserName(v)}
        />
        <Input
          placeholder='请输入内容'
          disabled={!userName?.length || readyState === ReadyState.Closed}
          addAfter={<a onClick={onSendMessage} style={{cursor: 'pointer'}}>Send</a>}
          onChange={(v) => setMessage(v)}
        />
        <Space>
          <Button onClick={onConnectWs} disabled={!userName?.length || readyState === ReadyState.Open}>{readyState === ReadyState.Closed ? 'connect' : 'connecting'}</Button>
          <Button onClick={onClose} disabled={readyState === ReadyState.Closed}>close</Button>
        </Space>
      </Space>
    </Card>
  )
}

export default Index;
