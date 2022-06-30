/**
 * @author Icon
 * @description: //TODO
 * @date 2022-06-24 10:55
 */
import React, { useEffect, useState, useRef, useMemo } from 'react';
import { io, Socket } from 'socket.io-client';
import { Input, Modal, Message } from '@arco-design/web-react';
import useUpdate from './useUpdate';
import offlineImg from './imgs/offline.png';
import callImg from './imgs/call.png';
import styles from './styles.module.less';

const InputSearch = Input.Search;
export enum ReadyState {
  Connecting = 0,
  Open = 1,
  Closing = 2,
  Closed = 3,
}
type MessageType = {
  userName: string;
  message: string;
}
type Room = {
  count?: number;
}
const Index = () => {
  const [visible, setVisible] = useState<boolean>(true);
  const [room, setRoom] = useState<Room>();
  const [userName, setUserName] = useState<string>();
  const [allMessage, setAllMessage] = useState<MessageType[]>([]);
  const [message, setMessage] = useState<string | undefined>();
  const [readyState, setReadyState] = useState<ReadyState>(ReadyState.Closed);

  const update = useUpdate();

  const ws = useRef<Socket>();

  const onConnectWs = () => {
    ws.current = io();
    setReadyState(ReadyState.Connecting);
    ws.current.on('disconnect', () => {
      setReadyState(ReadyState.Closed);
    })
    ws.current.on('connect', () => {
      onJoin();
      setReadyState(ReadyState.Open);
    })
    ws.current.on('message', (message) => {
      setAllMessage(prev => {
        if (prev && Array.isArray(prev)) {
          prev?.push(message);
        }
        return prev;
      })
      update();
    })
    ws.current.on('leave', (message) => {
      Message.error(`${message.userName} ${message.action}`);
      setRoom({ count: message.count });
    })
    ws.current.on('joinNoticeSelf', (message) => {
      Message.success(`${message.action} 现在可以开始聊天了`);
      setRoom({ count: message.count });
    })
    ws.current.on('joinNoticeOthers', (message) => {
      Message.success(`${message.userName} ${message.action}`);
      setRoom({ count: message.count });
    })
  }
  const onJoin = () => {
    ws.current?.emit('join', {
      userName,
    })
  }
  const onSendMessage = () => {
    if (readyState === ReadyState.Open && message?.length) {
      const content = {
        userName,
        message,
      }
      ws.current?.emit('message', content);
      setMessage(undefined);
    }
  }
  const onClose = () => {
    if (readyState === ReadyState.Open) {
      ws.current?.close();
    }
  }
  useEffect(() => {
    return () => {
      onClose();
    }
  }, [])
  useEffect(() => {
    if (!visible) {
      onConnectWs();
    }
  }, [visible])

  const buildContent = useMemo(() => {
    return allMessage.map((item, index) => {
      if (item.userName === userName) {
        return (
          <div className={`${styles.contentBox} ${styles.contentSelfBox}`} key={index}>
            <div className={styles.contentSelf}>
              <div className={styles.userName}>{item.userName}</div>
              <div className={styles.message}>{item.message}</div>
            </div>
          </div>
        )
      }
      return (
        <div className={`${styles.contentBox} ${styles.contentOthersBox}`} key={index}>
          <div className={styles.contentOthers}>
            <div className={styles.userName}>{item.userName}</div>
            <div className={styles.message}>{item.message}</div>
          </div>
        </div>
      )
    })
  }, [JSON.stringify(allMessage)])
  return (
    <div>
      <div className={styles.chat}>
        <div className={styles.header}>
          {userName}
          {readyState === ReadyState.Open ? <span> ({room?.count}人)</span> : null}
        </div>
        <div className={styles.content}>{buildContent}</div>
        <div className={styles.footer}>
          <InputSearch
            value={message}
            searchButton={'Send'}
            placeholder='请输入内容'
            disabled={readyState === ReadyState.Closed}
            onChange={(v) => setMessage(v)}
            onSearch={onSendMessage}
          />
        </div>
        {
          readyState === ReadyState.Open ? (
            <img
              className={styles.offline}
              src={offlineImg}
              onClick={onClose}
              alt=""
            />
          ) : (
            <img
              className={styles.offline}
              src={callImg}
              onClick={onConnectWs}
              alt=""
            />
          )
        }
      </div>
      <Modal
        visible={visible}
        closable={false}
        onOk={() => {
          if (userName?.length) {
            setVisible(false);
          } else {
            Message.error('请输入您的用户名')
          }
        }}
        onCancel={() => {
          if (userName?.length) {
            setVisible(false);
          } else {
            Message.error('请输入您的用户名')
          }
        }}
      >
        <Input
          placeholder='请输入您的用户名'
          disabled={readyState === ReadyState.Open}
          onChange={(v) => setUserName(v)}
        />
      </Modal>
    </div>
  )
}

export default Index;
