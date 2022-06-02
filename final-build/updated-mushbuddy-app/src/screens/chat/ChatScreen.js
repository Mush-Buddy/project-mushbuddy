import React, { useState, useCallback, useEffect } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import { useSelector, useDispatch } from 'react-redux';
import { getDataAPI, patchDataAPI, postDataAPI } from '../../utils/fetchData'

const ChatScreen = (props) => {
    const { route } = props;
    const userId = route.params.userId;
    const { auth } = useSelector(state => state);
    const { socket } = useSelector(state => state.socket);
    const [text, setText] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const get_data = async () => {
            const res = await getDataAPI(`message/${userId}`, auth.token)
            const newData = res.data.messages;
            console.log(newData)
            const mapped_messages = newData.map(m => {
                return {
                    _id: m._id,
                    text: m.text,
                    createdAt: m.createdAt,
                    user: {
                        _id: m.sender
                    }
                }
            })
            setMessages(mapped_messages)
        }
        get_data()
    },[])

    
    useEffect(() => {
        const callback = (msg) => {
            let giftedNewChat = {
                _id: msg._id,
                text: msg.text,
                createdAt: msg.createdAt,
                user: {
                    _id: msg.sender
                }
            }
            console.log('addtoclientrequest')
            setMessages(previousMessages => GiftedChat.append(previousMessages, giftedNewChat) )
        }

        socket.on('addMessageToClient', callback)
        return () => {
            console.log('turnofflistener')
            socket.off("addMessageToClient", callback);
         }
    },[socket])

    const onSend = async () => {
        console.log('text=',text)
        const msg = {
            sender: auth.user._id,
            recipient: userId,
            text, 
            createdAt: new Date().toISOString()
        }
        const new_msg = await postDataAPI('message', msg, auth.token)
        console.log(new_msg.data)
        socket.emit('addMessage', {...new_msg.data })
    }

    return (
      <GiftedChat
        renderAvatar={null}
        text={text}
        onInputTextChanged={text => setText(text)}
        messages={messages}
        onSend={() => onSend()}
        user={{
          _id: auth.user._id,
        }}
      />
    )
};


export default ChatScreen;